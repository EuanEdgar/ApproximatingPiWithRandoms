class Interface {
  constructor(container) {
    this.container = container
    this.setInitialValues()

    this.collectElements()
  }

  onInputChange(name, value) {
    if(this.onChange) {
      this.onChange(name, value)
    }
  }

  onToggleRunning() {
    let success = false
    if(this.interfaceState.running) {
      if(this.onStop) {
        success = this.onStop() !== false
      }
    } else {
      if(this.onStart) {
        success = this.onStart() !== false
      }
    }

    if(success) {
      this.updateInterface({
        running: !this.interfaceState.running,
      })
    }
  }

  setInitialValues() {
    this.interfaceState = {
      running: false,
    }

    this.inputs = {}
    this.outputs = {}
    this.buttons = {}
  }

  collectElements() {
    ;[
      'minVal',
      'maxVal',
      'itterCount',
      'displayInterval',
    ].forEach((name) => {
      const input = this.container.querySelector(`[name="${name}"]`)
      const value = parseInt(input.value, 10) || 0

      input.addEventListener('change', ({ target: { value }}) => {
        const numValue = parseInt(value, 10)
        if(!Number.isNaN(numValue)) {
          this.onInputChange(name, numValue)
        }
      })

      this.inputs[name] = input
      this.interfaceState[name] = value
    })

    ;[
      'currentApproximation',
      'itterationCount',
    ].forEach((id) => {
      const element = this.container.querySelector(`#${id}`)
      this.outputs[id] = element
    })

    const toggleRunning = this.container.querySelector('[value="toggleRunning"]')
    toggleRunning.addEventListener('click', () => this.onToggleRunning())

    this.buttons.toggleRunning = toggleRunning
  }

  updateInterface(newState) {
    Object.entries(newState).forEach(([key, value]) => {
      const oldValue = this.interfaceState[key]

      if(oldValue !== value) {
        const inputs = [
          'minVal',
          'maxVal',
          'itterCount',
          'displayInterval',
        ]

        const outputs = [
          'currentApproximation',
          'itterationCount',
        ]

        if(inputs.includes(key)) {
          const input = this.inputs[key]
          input.value = value
        } else if(outputs.includes(key)) {
          const output = this.outputs[key]
          output.innerText = value
        } else if(key === 'running') {
          this.buttons.toggleRunning.innerText = value ? 'Stop' : 'Start'

          Object.values(this.inputs).forEach((input) => {
            input.disabled = value
          })
        }
      }
    })

    this.interfaceState = { ...this.interfaceState, ...newState }
  }
}

window.addEventListener('load', () => {
  const container = document.querySelector('#app')
  const interface = new Interface(container)

  const state = {
    minVal: interface.interfaceState.minVal,
    maxVal: interface.interfaceState.maxVal,
    itterCount: interface.interfaceState.itterCount,
    displayInterval: interface.interfaceState.displayInterval,
  }

  let timeoutId;
  const run = () => {
    const approximator = new Approximator({
      minVal: state.minVal,
      maxVal: state.maxVal
    })

    let count = 0;
    const itterate = () => {
      for(let x = 0; x < state.displayInterval; x++) {
        count += 1
        approximator.next()
      }

      interface.updateInterface({
        currentApproximation: approximator.getApproximation(),
        itterationCount: count,
      })

      if(count < state.itterCount) {
        timeoutId = setTimeout(itterate)
      } else {
        interface.updateInterface({
          currentApproximation: approximator.getApproximation(),
          itterationCount: count,
          running: false,
        })
      }
    }

    timeoutId = setTimeout(itterate)
  }

  interface.onChange = (name, value) => {
    state[name] = value
  }

  interface.onStart = () => {
    if(state.minVal >= state.maxVal) {
      alert('Minimum value must be less than maximum value')
      return false
    }
    if (state.itterCount < 0) {
      alert('Number of itterations must not be less than zero')
      return false
    }
    if (state.displayInterval < 1) {
      alert('Display interval must not be less than one')
      return false
    }

    timeoutId = setTimeout(run)
    return true
  }

  interface.onStop = () => {
    clearTimeout(timeoutId)
    return true
  }
})

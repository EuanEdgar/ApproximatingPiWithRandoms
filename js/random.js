class Random {
  constructor(minVal, maxVal) {
    this.minVal = minVal
    this.maxVal = maxVal

    this.diff = maxVal - minVal + 1
  }

  random() {
    return Math.floor(Math.random() * this.diff) + this.minVal
  }
}

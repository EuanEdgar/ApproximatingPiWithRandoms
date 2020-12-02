class Approximator {
  constructor({ minVal, maxVal }) {
    this.minVal = minVal
    this.maxVal = maxVal

    this.rand = new Random(minVal, maxVal)

    this.coprime = 0
    this.cofactor = 0
  }

  next() {
    const a = this.rand.random()
    const b = this.rand.random()

    const isCoprime = this.isCoprime(a, b)
    if(isCoprime) {
      this.coprime += 1
    } else {
      this.cofactor += 1
    }
  }

  getApproximation() {
    const probability = this.getProbability()

    if(probability) {
      return Math.sqrt(6 / this.getProbability())
    }
  }

  getProbability() {
    return this.cofactor / (this.coprime + this.cofactor)
  }

  isCoprime(a, b) {
    return this.gcd(a, b) === 1
  }

  gcd(a,b) {
    // https://stackoverflow.com/a/17445322
    a = Math.abs(a);
    b = Math.abs(b);
    if (b > a) {var temp = a; a = b; b = temp;}
    while (true) {
      if (b == 0) return a;
      a %= b;
      if (a == 0) return b;
      b %= a;
    }
  }
}

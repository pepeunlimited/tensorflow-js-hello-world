// TODO: 
class PanicError extends Error {
  constructor(val: any) {
    super(`panic: ${val}`)
  }
}

export { PanicError }

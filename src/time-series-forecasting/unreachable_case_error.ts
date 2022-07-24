// Exhaustive switch helper
class UnreachableCaseError extends Error {
  constructor(val: any) {
    super(`Unreachable case: ${val}`)
  }
}

export { UnreachableCaseError }

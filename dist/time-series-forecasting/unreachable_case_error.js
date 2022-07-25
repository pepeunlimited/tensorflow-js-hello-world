// Exhaustive switch helper
class UnreachableCaseError extends Error {
    constructor(val) {
        super(`Unreachable case: ${val}`);
    }
}
export { UnreachableCaseError };

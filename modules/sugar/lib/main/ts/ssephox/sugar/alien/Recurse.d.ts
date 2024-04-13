import { Optional } from "@ssephox/katamari";
/**
 * Applies f repeatedly until it completes (by returning Optional.none()).
 *
 * Normally would just use recursion, but JavaScript lacks tail call optimisation.
 *
 * This is what recursion looks like when manually unravelled :)
 */
declare const toArray: <T = any, U extends T = T>(target: T, f: (t: T) => Optional<U>) => U[];
export { toArray };
//# sourceMappingURL=Recurse.d.ts.map
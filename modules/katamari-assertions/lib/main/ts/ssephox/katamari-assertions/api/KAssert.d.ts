import { TestLabel } from "@ephox/bedrock-client";
import { Testable } from "@ephox/dispute";
import { Optional, Result } from "@ssephox/katamari";
type Testable<A> = Testable.Testable<A>;
export declare const eqOptional: <A>(message: TestLabel, expected: Optional<A>, actual: Optional<A>, testableA?: Testable<A>) => void;
export declare const eqNone: <A>(message: TestLabel, actual: Optional<A>) => void;
export declare const eqSome: <A>(message: TestLabel, expected: A, actual: Optional<A>, testableA?: Testable<A>) => void;
export declare const eqResult: <A, E>(message: TestLabel, expected: Result<A, E>, actual: Result<A, E>, testableA?: Testable<A>, testableE?: Testable<E>) => void;
export declare const eqValue: <A, E>(message: TestLabel, expected: A, actual: Result<A, E>, testableA?: Testable<A>, testableE?: Testable<E>) => void;
export declare const eqError: <A, E>(message: TestLabel, expected: E, actual: Result<A, E>, testableA?: Testable<A>, testableE?: Testable<E>) => void;
export {};
//# sourceMappingURL=KAssert.d.ts.map
import { Assert } from "@ephox/bedrock-client";
import { Testable } from "@ephox/dispute";
import { Optional, OptionalInstances, Result, ResultInstances, } from "@ssephox/katamari";
const { tOptional } = OptionalInstances;
const { tResult } = ResultInstances;
const { tAny } = Testable;
// NOTE: Don't use this within Agar - use tOptional directly
export const eqOptional = (message, expected, actual, testableA = tAny) => Assert.eq(message, expected, actual, tOptional(testableA));
export const eqNone = (message, actual) => eqOptional(message, Optional.none(), actual, tAny);
export const eqSome = (message, expected, actual, testableA = tAny) => eqOptional(message, Optional.some(expected), actual, testableA);
export const eqResult = (message, expected, actual, testableA = tAny, testableE = tAny) => Assert.eq(message, expected, actual, tResult(testableA, testableE));
export const eqValue = (message, expected, actual, testableA = tAny, testableE = tAny) => eqResult(message, Result.value(expected), actual, testableA, testableE);
export const eqError = (message, expected, actual, testableA = tAny, testableE = tAny) => eqResult(message, Result.error(expected), actual, testableA, testableE);
//# sourceMappingURL=KAssert.js.map
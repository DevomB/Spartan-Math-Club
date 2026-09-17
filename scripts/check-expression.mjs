// Smoke test for lib/expression.ts. Run: node --experimental-strip-types scripts/check-expression.mjs
import assert from "node:assert/strict";
import { evaluate, isCorrect } from "../lib/expression.ts";

const close = (input, expected) => assert.ok(Math.abs(evaluate(input) - expected) < 1e-12, `${input} => ${evaluate(input)}`);

close("17/4", 4.25);
close("4.25", 4.25);
close("2pi", 2 * Math.PI);
close("pi^2/6", Math.PI ** 2 / 6);
close("π²/6", Math.PI ** 2 / 6);
close("sqrt(2)/2", Math.SQRT1_2);
close("√3", Math.sqrt(3));
close("-2^2", -4);
close("2^-1", 0.5);
close("1e-3", 0.001);
close("2e", 2 * Math.E);
close("3(4+1)", 15);
close("1 - 2 - 3", -4);
close("2 * 3 ^ 2", 18);
close("14 ÷ 3", 14 / 3);
assert.ok(isCorrect("1.6449", Math.PI ** 2 / 6, 5e-4));
assert.ok(!isCorrect("1.64", Math.PI ** 2 / 6, 5e-4));
for (const bad of ["", "2+", "(1", "foo", "1/0", "alert(1)"]) {
  assert.throws(() => evaluate(bad), undefined, bad);
}
console.log("expression checks passed");

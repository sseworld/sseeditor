import { Resolve } from "@ssephox/katamari";
const unsafe = (name, scope) => {
    return Resolve.resolve(name, scope);
};
const getOrDie = (name, scope) => {
    const actual = unsafe(name, scope);
    if (actual === undefined || actual === null) {
        throw new Error(name + " not available on this browser");
    }
    return actual;
};
export { getOrDie };
//# sourceMappingURL=Global.js.map
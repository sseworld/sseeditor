const firstMatch = (regexes, s) => {
    for (let i = 0; i < regexes.length; i++) {
        const x = regexes[i];
        if (x.test(s)) {
            return x;
        }
    }
    return undefined;
};
const find = (regexes, agent) => {
    const r = firstMatch(regexes, agent);
    if (!r) {
        return { major: 0, minor: 0 };
    }
    const group = (i) => {
        return Number(agent.replace(r, "$" + i));
    };
    return nu(group(1), group(2));
};
const detect = (versionRegexes, agent) => {
    const cleanedAgent = String(agent).toLowerCase();
    if (versionRegexes.length === 0) {
        return unknown();
    }
    return find(versionRegexes, cleanedAgent);
};
const unknown = () => {
    return nu(0, 0);
};
const nu = (major, minor) => {
    return { major, minor };
};
export const Version = {
    nu,
    detect,
    unknown,
};
//# sourceMappingURL=Version.js.map
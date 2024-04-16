import { Arr, Optional } from '@ssephox/katamari';
const track = (current, parent) => {
    const r = { ...current, parent };
    r.children = Arr.map(current.children || [], (child) => {
        // NOTE: The child must link to the new one being created (r)
        return track(child, Optional.some(r));
    });
    return r;
};
export { track };
//# sourceMappingURL=Tracks.js.map
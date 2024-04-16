import { Result } from '@ssephox/katamari';
export const create = (text) => {
    try {
        const parsed = JSON.parse(text);
        return Result.value(parsed);
    }
    catch (error) {
        return Result.error('Response was not JSON.');
    }
};
//# sourceMappingURL=JsonResponse.js.map
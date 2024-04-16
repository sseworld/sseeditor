import { Arr, Optional } from '@ssephox/katamari';
import { PlatformDetection } from '@ssephox/sand';
const platform = PlatformDetection.detect();
const isTouch = platform.deviceType.isTouch;
const isAndroid = platform.deviceType.isAndroid;
// TODO: Work out what these values are supposed to be.
const MINIMUM_LARGE_WIDTH = 620;
const MINIMUM_LARGE_HEIGHT = 700;
// window.screen.width and window.screen.height do not change with the orientation,
// however window.screen.availableWidth and window.screen.availableHeight,
// do change according to the orientation.
const isOfSize = (width, height) => window.screen.width >= width && window.screen.height >= height;
const choice = (options, fallback) => {
    const target = Arr.foldl(options, (b, option) => b.orThunk(() => option.predicate() ? Optional.some(option.value()) : Optional.none()), Optional.none());
    return target.getOr(fallback);
};
const isLargeTouch = () => isOfSize(MINIMUM_LARGE_WIDTH, MINIMUM_LARGE_HEIGHT) && isTouch();
const isLargeDesktop = () => isOfSize(MINIMUM_LARGE_WIDTH, MINIMUM_LARGE_HEIGHT) && !isTouch();
const isSmallTouch = () => !isOfSize(MINIMUM_LARGE_WIDTH, MINIMUM_LARGE_HEIGHT) && isTouch();
const isLarge = () => isOfSize(MINIMUM_LARGE_WIDTH, MINIMUM_LARGE_HEIGHT);
const isSmallAndroid = () => isSmallTouch() && isAndroid();
export { isTouch, choice, isLarge, isLargeTouch, isSmallTouch, isLargeDesktop, isSmallAndroid };
//# sourceMappingURL=Platform.js.map
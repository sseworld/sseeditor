import { Assert, UnitTest } from '@ephox/bedrock-client';
import { Optional } from '@ssephox/katamari';
import { Gene } from 'ssephox/boss/api/Gene';
import * as Locator from 'ssephox/boss/mutant/Locator';
import * as Logger from 'ssephox/boss/mutant/Logger';
import * as Removal from 'ssephox/boss/mutant/Removal';
import * as Tracks from 'ssephox/boss/mutant/Tracks';
UnitTest.test('RemovalTest', () => {
    const data = () => {
        return Gene('A', '.', [
            Gene('B', '.'),
            Gene('C', '.', [
                Gene('D', '.', [
                    Gene('E', '.')
                ]),
                Gene('F', '.')
            ])
        ]);
    };
    const check = (expected, input, itemId) => {
        const family = Tracks.track(input, Optional.none());
        const item = Locator.byId(family, itemId).getOrDie();
        Removal.unwrap(item);
        Assert.eq('', expected, Logger.basic(family));
    };
    check('A(B,D(E),F)', data(), 'C');
    check('A(B,C(D,F))', data(), 'E');
});
//# sourceMappingURL=RemovalTest.js.map
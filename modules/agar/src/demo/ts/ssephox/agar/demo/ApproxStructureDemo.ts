import { Class, Html, InsertAll, SugarElement } from '@ssephox/sugar';

import * as ApproxStructure from 'ssephox/agar/api/ApproxStructure';
import * as Assertions from 'ssephox/agar/api/Assertions';
import { Pipeline } from 'ssephox/agar/api/Pipeline';
import * as DemoContainer from 'ssephox/agar/demo/DemoContainer';

export const demo = (): void => {
  DemoContainer.init(
    'Approx Structure',
    (success, failure) => {

      const div = SugarElement.fromTag('div');

      const p = SugarElement.fromTag('p');

      const span = SugarElement.fromTag('span');

      InsertAll.append(div, [ p ]);
      InsertAll.append(p, [ span ]);

      Class.add(span, 'dog');

      Pipeline.async({}, [
        Assertions.sAssertStructure(
          'Assert Structure example: ' + Html.getOuter(div),
          ApproxStructure.build((s, str, arr) =>
            s.element('div', {
              children: [
                s.element('p', {
                  children: [
                    s.element('span', {
                      classes: [ arr.has('dog'), arr.not('cat') ]
                    })
                  ]
                })
              ]
            })),
          div
        )
      ], success, failure);

      return [ div ];
    }
  );
};

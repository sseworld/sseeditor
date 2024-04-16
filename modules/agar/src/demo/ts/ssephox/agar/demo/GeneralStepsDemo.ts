import { SugarElement } from '@ssephox/sugar';

import { Pipeline } from 'ssephox/agar/api/Pipeline';
import { Step } from 'ssephox/agar/api/Step';
import * as DemoContainer from 'ssephox/agar/demo/DemoContainer';

export const demo = (): void => {
  DemoContainer.init(
    'General Steps Demo',
    (success, failure) => {
      const outcome = SugarElement.fromTag('div');

      Pipeline.async({}, [
        Step.wait(1000),
        Step.fail('I am an error')
      ], success, failure);

      return [ outcome ];
    }
  );
};

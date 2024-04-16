import { Optional } from '@ssephox/katamari';
import { SugarElement } from '@ssephox/sugar';

import BasicPage from 'ssephox/boss/api/BasicPage';

const ephoxUi = SugarElement.fromDom(Optional.from(document.getElementById('ephox-ui')).getOrDie('Expected item on page with id "ephox-ui"'));
const boss = BasicPage();
boss.connect(ephoxUi);

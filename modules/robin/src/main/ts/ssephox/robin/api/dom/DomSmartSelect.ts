import { DomUniverse } from '@ssephox/boss';
import { Optional } from '@ssephox/katamari';
import { SugarElement } from '@ssephox/sugar';

import { WordRange } from '../../data/WordRange';
import * as SmartSelect from '../general/SmartSelect';

const universe = DomUniverse();

// The optimise parameter is no longer required in this API.
// Remove optimise as a code quality task: TBIO-4356
const word = (element: SugarElement, offset: number, _optimise?: any): Optional<WordRange<SugarElement>> => {
  return SmartSelect.word(universe, element, offset);
};

export {
  word
};

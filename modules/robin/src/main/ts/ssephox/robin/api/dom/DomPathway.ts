import { DomUniverse } from '@ssephox/boss';
import { SugarElement } from '@ssephox/sugar';

import * as Pathway from '../general/Pathway';

const universe = DomUniverse();

const simplify = (elements: SugarElement[]): SugarElement[] => {
  return Pathway.simplify(universe, elements);
};

export {
  simplify
};

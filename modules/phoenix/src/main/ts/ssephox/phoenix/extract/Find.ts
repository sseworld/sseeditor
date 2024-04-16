import { Universe } from '@ssephox/boss';
import { Optional } from '@ssephox/katamari';
import { PositionArray } from '@ssephox/polaris';

import * as Spot from '../api/data/Spot';
import { SpotPoint } from '../api/data/Types';
import * as Extract from './Extract';
import * as TypedList from './TypedList';

/**
 * Finds an exact reference to a document point generated by Extract
 */
const find = <E, D>(universe: Universe<E, D>, parent: E, offset: number, optimise?: (e: E) => boolean): Optional<SpotPoint<E>> => {
  const extractions = Extract.typed(universe, parent, optimise);

  const parray = PositionArray.generate(extractions, TypedList.gen);
  const spot = PositionArray.get(parray, offset);
  return spot.map((v) => {
    return Spot.point(v.element, offset - v.start);
  });
};

export {
  find
};

import { Optional } from '@ssephox/katamari';
import { SugarElement } from '../node/SugarElement';
declare const getValue: (select: SugarElement<HTMLSelectElement>) => Optional<string>;
declare const add: (select: SugarElement<HTMLSelectElement>, option: SugarElement<HTMLOptionElement>) => void;
declare const addAll: (select: SugarElement<HTMLSelectElement>, options: SugarElement<HTMLOptionElement>[]) => void;
declare const setSelected: (select: SugarElement<HTMLSelectElement>, index: number) => void;
export { getValue, add, addAll, setSelected };
//# sourceMappingURL=SelectTag.d.ts.map
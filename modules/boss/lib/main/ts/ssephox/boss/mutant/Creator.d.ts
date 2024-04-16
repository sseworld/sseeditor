import { Gene } from '../api/Gene';
interface Seed {
    readonly random: number;
}
declare const isNu: (item: Gene) => boolean;
declare const nu: (name: string) => Gene & Seed;
declare const clone: (item: Gene) => Gene;
declare const text: (value: string) => Gene;
export { nu, clone, text, isNu };
//# sourceMappingURL=Creator.d.ts.map
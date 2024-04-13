import { SugarElement } from 'ssephox/sugar/api/node/SugarElement';
export declare const withNormalElement: (f: (d: SugarElement<Element>) => void) => void;
export declare const setupShadowRoot: (mode: 'open' | 'closed') => {
    shadowRoot: SugarElement<ShadowRoot>;
    innerDiv: SugarElement<HTMLElement>;
    shadowHost: SugarElement<HTMLElement>;
};
export declare const withShadowElementInMode: (mode: 'open' | 'closed', f: (sr: SugarElement<ShadowRoot>, innerDiv: SugarElement<HTMLElement>, shadowHost: SugarElement<HTMLElement>) => void) => void;
export declare const withShadowElement: (f: (shadowRoot: SugarElement<ShadowRoot>, innerDiv: SugarElement<HTMLElement>, shadowHost: SugarElement<HTMLElement>) => void) => void;
export declare const withIframe: (f: (div: SugarElement<HTMLElement>, iframe: SugarElement<HTMLIFrameElement>, cw: Window) => void) => void;
//# sourceMappingURL=WithHelpers.d.ts.map
import { SugarElement } from 'ssephox/sugar/api/node/SugarElement';
export default (type) => {
    const dom = document.createElement(type);
    return SugarElement.fromDom(dom);
};
//# sourceMappingURL=EphoxElement.js.map
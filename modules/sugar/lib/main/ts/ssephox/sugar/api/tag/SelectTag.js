import { Arr, Optional } from '@ssephox/katamari';
const getValueFromIndex = (options, index) => {
    return Arr.get(options, index).bind((optionVal) => Optional.from(optionVal.value));
};
const getValue = (select) => {
    const selectDom = select.dom;
    return getValueFromIndex(selectDom.options, selectDom.selectedIndex);
};
const add = (select, option) => {
    select.dom.add(option.dom);
};
const addAll = (select, options) => {
    Arr.each(options, (option) => {
        add(select, option);
    });
};
const setSelected = (select, index) => {
    select.dom.selectedIndex = index;
};
export { getValue, add, addAll, setSelected };
//# sourceMappingURL=SelectTag.js.map
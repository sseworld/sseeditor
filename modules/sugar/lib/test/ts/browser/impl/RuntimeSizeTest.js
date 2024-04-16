import { UnitTest } from '@ephox/bedrock-client';
import { Arr, Fun } from '@ssephox/katamari';
import { assert } from 'chai';
import * as Insert from 'ssephox/sugar/api/dom/Insert';
import * as InsertAll from 'ssephox/sugar/api/dom/InsertAll';
import * as Remove from 'ssephox/sugar/api/dom/Remove';
import * as SugarBody from 'ssephox/sugar/api/node/SugarBody';
import { SugarElement } from 'ssephox/sugar/api/node/SugarElement';
import * as Attribute from 'ssephox/sugar/api/properties/Attribute';
import * as Css from 'ssephox/sugar/api/properties/Css';
import * as Html from 'ssephox/sugar/api/properties/Html';
import * as SelectorFilter from 'ssephox/sugar/api/search/SelectorFilter';
import * as RuntimeSize from 'ssephox/sugar/impl/RuntimeSize';
UnitTest.test('Runtime Size Test', () => {
    const random = (min, max) => Math.round(Math.random() * (max - min) + min);
    const getOuterHeight = (elm) => Math.round(elm.dom.getBoundingClientRect().height);
    const getOuterWidth = (elm) => Math.round(elm.dom.getBoundingClientRect().width);
    const measureCells = (getSize, table) => Arr.map(SelectorFilter.descendants(table, 'td'), getSize);
    const measureTable = (table, getSize) => ({
        total: getSize(table),
        cells: measureCells(getSize, table)
    });
    const setHeight = (table, value) => Css.set(table, 'height', value);
    const setWidth = (table, value) => Css.set(table, 'width', value);
    const resizeTableBy = (table, setSize, tableInfo, delta) => {
        setSize(table, '');
        Arr.map(SelectorFilter.descendants(table, 'td'), (cell, i) => {
            setSize(cell, (tableInfo.cells[i] + delta) + 'px');
        });
    };
    const assertSize = (s1, table, getOuterSize, message) => {
        const s2 = measureTable(table, getOuterSize);
        const tableHtml = Html.getOuter(table);
        assert.equal(s1.total, s2.total, `${message}, expected table size: ${s1.total}, actual: ${s2.total}, table: ${tableHtml}`);
        Arr.each(s1.cells, (cz1, i) => {
            const cz2 = s2.cells[i];
            assert.equal(cz1, cz2, `${message}, expected cell size: ${cz1}, actual: ${cz2}, table: ${tableHtml}`);
        });
    };
    const randomValue = (values) => {
        const idx = random(0, values.length - 1);
        return values[idx];
    };
    const randomSize = (min, max) => {
        const n = random(min, max);
        return n > 0 ? n + 'px' : '0';
    };
    const randomBorder = (min, max, color) => {
        const n = random(min, max);
        return n > 0 ? n + 'px solid ' + color : '0';
    };
    const createTable = (rows, cols) => {
        const table = SugarElement.fromTag('table');
        const tbody = SugarElement.fromTag('tbody');
        Attribute.set(table, 'border', '1');
        Attribute.set(table, 'cellpadding', random(0, 10).toString());
        Attribute.set(table, 'cellspacing', random(0, 10).toString());
        Css.setAll(table, {
            'border-collapse': randomValue(['collapse', 'separate']),
            'border-top': randomBorder(0, 5, 'red'),
            'border-left': randomBorder(0, 5, 'red'),
            'border-bottom': randomBorder(0, 5, 'red'),
            'border-right': randomBorder(0, 5, 'red'),
            'height': randomSize(100, 1000),
            'width': randomSize(100, 1000)
        });
        const rowElms = Arr.range(rows, () => {
            const row = SugarElement.fromTag('tr');
            Arr.range(cols, () => {
                const cell = SugarElement.fromTag('td');
                Css.setAll(cell, {
                    'width': randomSize(1, 100),
                    'height': randomSize(1, 100),
                    'box-sizing': randomValue(['content-box', 'border-box']),
                    'padding-top': randomSize(0, 5),
                    'padding-left': randomSize(0, 5),
                    'padding-bottom': randomSize(0, 5),
                    'padding-right': randomSize(0, 5),
                    'border-top': randomBorder(0, 5, 'green'),
                    'border-left': randomBorder(0, 5, 'green'),
                    'border-bottom': randomBorder(0, 5, 'green'),
                    'border-right': randomBorder(0, 5, 'green')
                });
                const content = SugarElement.fromTag('div');
                Css.setAll(content, {
                    width: '10px',
                    height: randomSize(1, 200)
                });
                Insert.append(cell, content);
                Insert.append(row, cell);
            });
            return row;
        });
        Insert.append(table, tbody);
        InsertAll.append(tbody, rowElms);
        Insert.append(SugarBody.body(), table);
        return table;
    };
    const resizeModel = (model, delta, getTotalDelta) => {
        const deltaTotal = getTotalDelta(model, delta);
        const cells = Arr.map(model.cells, (cz) => cz + delta);
        return {
            total: model.total + deltaTotal,
            cells
        };
    };
    const getHeightDelta = (model, delta) => model.rows * delta;
    const getWidthDelta = (model, delta) => model.cols * delta;
    const testTableSize = (createTable, getOuterSize, getSize, setSize, getTotalDelta) => () => {
        const rows = random(1, 5);
        const cols = random(1, 5);
        const table = createTable(rows, cols);
        const beforeSize = {
            ...measureTable(table, getOuterSize),
            rows,
            cols
        };
        resizeTableBy(table, setSize, measureTable(table, getSize), 0);
        assertSize(beforeSize, table, getOuterSize, 'Should be unchanged in size');
        resizeTableBy(table, setSize, measureTable(table, getSize), 10);
        assertSize(resizeModel(beforeSize, 10, getTotalDelta), table, getOuterSize, 'Should be changed by 10 size');
        Remove.remove(table);
    };
    const generateTest = (generator, n) => Arr.each(Arr.range(n, Fun.identity), generator);
    generateTest(testTableSize(createTable, getOuterHeight, RuntimeSize.getHeight, setHeight, getHeightDelta), 50);
    generateTest(testTableSize(createTable, getOuterWidth, RuntimeSize.getWidth, setWidth, getWidthDelta), 50);
});
//# sourceMappingURL=RuntimeSizeTest.js.map
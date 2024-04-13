"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var katamari_1 = require("@ssephox/katamari");
var chai_1 = require("chai");
var Insert = require("ssephox/sugar/api/dom/Insert");
var InsertAll = require("ssephox/sugar/api/dom/InsertAll");
var Remove = require("ssephox/sugar/api/dom/Remove");
var SugarBody = require("ssephox/sugar/api/node/SugarBody");
var SugarElement_1 = require("ssephox/sugar/api/node/SugarElement");
var Attribute = require("ssephox/sugar/api/properties/Attribute");
var Css = require("ssephox/sugar/api/properties/Css");
var Html = require("ssephox/sugar/api/properties/Html");
var SelectorFilter = require("ssephox/sugar/api/search/SelectorFilter");
var RuntimeSize = require("ssephox/sugar/impl/RuntimeSize");
bedrock_client_1.UnitTest.test('Runtime Size Test', function () {
    var random = function (min, max) { return Math.round(Math.random() * (max - min) + min); };
    var getOuterHeight = function (elm) { return Math.round(elm.dom.getBoundingClientRect().height); };
    var getOuterWidth = function (elm) { return Math.round(elm.dom.getBoundingClientRect().width); };
    var measureCells = function (getSize, table) {
        return katamari_1.Arr.map(SelectorFilter.descendants(table, 'td'), getSize);
    };
    var measureTable = function (table, getSize) { return ({
        total: getSize(table),
        cells: measureCells(getSize, table)
    }); };
    var setHeight = function (table, value) { return Css.set(table, 'height', value); };
    var setWidth = function (table, value) { return Css.set(table, 'width', value); };
    var resizeTableBy = function (table, setSize, tableInfo, delta) {
        setSize(table, '');
        katamari_1.Arr.map(SelectorFilter.descendants(table, 'td'), function (cell, i) {
            setSize(cell, (tableInfo.cells[i] + delta) + 'px');
        });
    };
    var assertSize = function (s1, table, getOuterSize, message) {
        var s2 = measureTable(table, getOuterSize);
        var tableHtml = Html.getOuter(table);
        chai_1.assert.equal(s1.total, s2.total, "".concat(message, ", expected table size: ").concat(s1.total, ", actual: ").concat(s2.total, ", table: ").concat(tableHtml));
        katamari_1.Arr.each(s1.cells, function (cz1, i) {
            var cz2 = s2.cells[i];
            chai_1.assert.equal(cz1, cz2, "".concat(message, ", expected cell size: ").concat(cz1, ", actual: ").concat(cz2, ", table: ").concat(tableHtml));
        });
    };
    var randomValue = function (values) {
        var idx = random(0, values.length - 1);
        return values[idx];
    };
    var randomSize = function (min, max) {
        var n = random(min, max);
        return n > 0 ? n + 'px' : '0';
    };
    var randomBorder = function (min, max, color) {
        var n = random(min, max);
        return n > 0 ? n + 'px solid ' + color : '0';
    };
    var createTable = function (rows, cols) {
        var table = SugarElement_1.SugarElement.fromTag('table');
        var tbody = SugarElement_1.SugarElement.fromTag('tbody');
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
        var rowElms = katamari_1.Arr.range(rows, function () {
            var row = SugarElement_1.SugarElement.fromTag('tr');
            katamari_1.Arr.range(cols, function () {
                var cell = SugarElement_1.SugarElement.fromTag('td');
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
                var content = SugarElement_1.SugarElement.fromTag('div');
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
    var resizeModel = function (model, delta, getTotalDelta) {
        var deltaTotal = getTotalDelta(model, delta);
        var cells = katamari_1.Arr.map(model.cells, function (cz) { return cz + delta; });
        return {
            total: model.total + deltaTotal,
            cells: cells
        };
    };
    var getHeightDelta = function (model, delta) { return model.rows * delta; };
    var getWidthDelta = function (model, delta) { return model.cols * delta; };
    var testTableSize = function (createTable, getOuterSize, getSize, setSize, getTotalDelta) { return function () {
        var rows = random(1, 5);
        var cols = random(1, 5);
        var table = createTable(rows, cols);
        var beforeSize = __assign(__assign({}, measureTable(table, getOuterSize)), { rows: rows, cols: cols });
        resizeTableBy(table, setSize, measureTable(table, getSize), 0);
        assertSize(beforeSize, table, getOuterSize, 'Should be unchanged in size');
        resizeTableBy(table, setSize, measureTable(table, getSize), 10);
        assertSize(resizeModel(beforeSize, 10, getTotalDelta), table, getOuterSize, 'Should be changed by 10 size');
        Remove.remove(table);
    }; };
    var generateTest = function (generator, n) { return katamari_1.Arr.each(katamari_1.Arr.range(n, katamari_1.Fun.identity), generator); };
    generateTest(testTableSize(createTable, getOuterHeight, RuntimeSize.getHeight, setHeight, getHeightDelta), 50);
    generateTest(testTableSize(createTable, getOuterWidth, RuntimeSize.getWidth, setWidth, getWidthDelta), 50);
});
//# sourceMappingURL=RuntimeSizeTest.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Insert = require("ssephox/sugar/api/dom/Insert");
var InsertAll = require("ssephox/sugar/api/dom/InsertAll");
var DomEvent = require("ssephox/sugar/api/events/DomEvent");
var SugarElement_1 = require("ssephox/sugar/api/node/SugarElement");
var Css = require("ssephox/sugar/api/properties/Css");
var Html = require("ssephox/sugar/api/properties/Html");
var SelectorFind = require("ssephox/sugar/api/search/SelectorFind");
/* eslint-disable no-console */
var container = SugarElement_1.SugarElement.fromTag('div');
var instructions = SugarElement_1.SugarElement.fromTag('p');
Html.set(instructions, 'Clicking on the button will remove "width" from the blue rectangle. Clicking it again will do nothing.');
Insert.append(container, instructions);
var button = SugarElement_1.SugarElement.fromTag('button');
Html.set(button, 'Click on me');
var input = SugarElement_1.SugarElement.fromTag('input');
InsertAll.append(container, [button, input]);
var doc = SugarElement_1.SugarElement.fromDom(document);
DomEvent.bind(doc, 'click', function (event) {
    console.log('target: ', event.target.dom);
    console.log('x: ', event.x);
    console.log('y: ', event.y);
    Css.remove(div, 'width');
});
var div = SugarElement_1.SugarElement.fromTag('div');
Css.setAll(div, {
    width: '100px',
    height: '300px',
    background: 'blue'
});
Insert.append(container, div);
var ephoxUi = SelectorFind.first('#ephox-ui').getOrDie();
Insert.append(ephoxUi, container);
//# sourceMappingURL=Demo.js.map
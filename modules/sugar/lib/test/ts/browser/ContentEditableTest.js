"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var chai_1 = require("chai");
var Insert = require("ssephox/sugar/api/dom/Insert");
var Remove = require("ssephox/sugar/api/dom/Remove");
var SugarBody = require("ssephox/sugar/api/node/SugarBody");
var Attribute = require("ssephox/sugar/api/properties/Attribute");
var ContentEditable = require("ssephox/sugar/api/properties/ContentEditable");
var Div_1 = require("ssephox/sugar/test/Div");
(0, bedrock_client_1.describe)('ContentEditableTest', function () {
    var makeNonEditable = function (element) { return Attribute.set(element, 'contenteditable', 'false'); };
    var makeEditable = function (element) { return Attribute.set(element, 'contenteditable', 'true'); };
    (0, bedrock_client_1.it)('get - detached element', function () {
        var div = (0, Div_1.default)();
        var parent = (0, Div_1.default)();
        Insert.append(parent, div);
        chai_1.assert.isFalse(ContentEditable.get(div));
        makeEditable(parent);
        chai_1.assert.isTrue(ContentEditable.get(div));
        makeNonEditable(div);
        chai_1.assert.isFalse(ContentEditable.get(div));
        makeEditable(div);
        chai_1.assert.isTrue(ContentEditable.get(div));
    });
    (0, bedrock_client_1.it)('get - attached element', function () {
        var div = (0, Div_1.default)();
        var parent = (0, Div_1.default)();
        Insert.append(parent, div);
        Insert.append(SugarBody.body(), parent);
        makeEditable(parent);
        chai_1.assert.isTrue(ContentEditable.get(div));
        makeNonEditable(parent);
        chai_1.assert.isFalse(ContentEditable.get(div));
        makeEditable(div);
        chai_1.assert.isTrue(ContentEditable.get(div));
        makeNonEditable(div);
        chai_1.assert.isFalse(ContentEditable.get(div));
        Remove.remove(parent);
    });
    (0, bedrock_client_1.it)('getRaw', function () {
        var div = (0, Div_1.default)();
        chai_1.assert.equal(ContentEditable.getRaw(div), 'inherit');
        makeNonEditable(div);
        chai_1.assert.equal(ContentEditable.getRaw(div), 'false');
        makeEditable(div);
        chai_1.assert.equal(ContentEditable.getRaw(div), 'true');
    });
    (0, bedrock_client_1.it)('set', function () {
        var div = (0, Div_1.default)();
        chai_1.assert.isFalse(Attribute.has(div, 'contenteditable'));
        ContentEditable.set(div, true);
        chai_1.assert.equal(Attribute.get(div, 'contenteditable'), 'true');
        ContentEditable.set(div, false);
        chai_1.assert.equal(Attribute.get(div, 'contenteditable'), 'false');
    });
    (0, bedrock_client_1.it)('isEditable', function () {
        var div = (0, Div_1.default)();
        var parent = (0, Div_1.default)();
        Insert.append(parent, div);
        // Detached fallbacks
        chai_1.assert.isFalse(ContentEditable.isEditable(div, false));
        chai_1.assert.isTrue(ContentEditable.isEditable(div, true));
        // Once attached fallbacks should make no difference
        Insert.append(SugarBody.body(), parent);
        chai_1.assert.isFalse(ContentEditable.isEditable(div, false));
        chai_1.assert.isFalse(ContentEditable.isEditable(div, true));
        // Sanity check once editable
        makeEditable(parent);
        chai_1.assert.isTrue(ContentEditable.isEditable(div, false));
        chai_1.assert.isTrue(ContentEditable.isEditable(div, true));
        Remove.remove(parent);
    });
});
//# sourceMappingURL=ContentEditableTest.js.map
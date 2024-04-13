"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bedrock_client_1 = require("@ephox/bedrock-client");
var katamari_1 = require("@ssephox/katamari");
var Insert = require("ssephox/sugar/api/dom/Insert");
var Remove = require("ssephox/sugar/api/dom/Remove");
var SugarBody = require("ssephox/sugar/api/node/SugarBody");
var SugarElement_1 = require("ssephox/sugar/api/node/SugarElement");
var Attribute = require("ssephox/sugar/api/properties/Attribute");
var Css = require("ssephox/sugar/api/properties/Css");
var Height = require("ssephox/sugar/api/view/Height");
var Width = require("ssephox/sugar/api/view/Width");
var Dimension_1 = require("ssephox/sugar/impl/Dimension");
var Div_1 = require("ssephox/sugar/test/Div");
var MathElement_1 = require("ssephox/sugar/test/MathElement");
bedrock_client_1.UnitTest.test('DimensionTest', function () {
    /* Remember, these checks are run 4 times */
    var runChecks = function (dimension, borderBox) {
        // dupe with BorderBox - please apply any changes to both.
        // can't refactor, so many of the values are different.
        var c = (0, Div_1.default)();
        var m = (0, MathElement_1.default)();
        if (borderBox) {
            Css.set(c, 'box-sizing', 'border-box');
        }
        Insert.append(c, SugarElement_1.SugarElement.fromHtml('&nbsp;')); // div has no height without content
        // disconnected tests
        bedrock_client_1.Assert.eq('', 0, dimension.get(c));
        bedrock_client_1.Assert.eq('', 0, dimension.getOuter(c));
        bedrock_client_1.Assert.eq('', 0, dimension.getInner(c));
        Insert.append(SugarBody.body(), c);
        Insert.append(SugarBody.body(), m);
        dimension.get(m);
        dimension.getOuter(m);
        dimension.set(m, 0);
        bedrock_client_1.Assert.eq('', true, dimension.get(c) > 0);
        bedrock_client_1.Assert.eq('', true, dimension.getOuter(c) > 0);
        bedrock_client_1.Assert.eq('', true, dimension.getInner(c) > 0);
        dimension.set(c, 0);
        // Based on JQuery tests, but far more extensive
        // Also in TBIO we don't generally care about JQuery's difference between get() and getOuter()
        Css.set(c, 'padding', '20px');
        // padding only
        bedrock_client_1.Assert.eq('', 40, dimension.get(c)); // jQuery === 0
        bedrock_client_1.Assert.eq('', 40, dimension.getOuter(c));
        bedrock_client_1.Assert.eq('', 0, dimension.getInner(c));
        Css.set(c, 'border', '2px solid #fff');
        // border + padding
        bedrock_client_1.Assert.eq('', 44, dimension.get(c)); // jQuery === 0
        bedrock_client_1.Assert.eq('', 44, dimension.getOuter(c));
        bedrock_client_1.Assert.eq('', 0, dimension.getInner(c));
        Css.set(c, 'margin', '3px');
        // border + padding + margin
        bedrock_client_1.Assert.eq('', 44, dimension.get(c)); // jQuery === 0
        bedrock_client_1.Assert.eq('', 44, dimension.getOuter(c));
        bedrock_client_1.Assert.eq('', 0, dimension.getInner(c));
        // COMPLETE MADNESS: With border-sizing: border-box JQuery does WEIRD SHIT when you set width.
        // This is all so that when you request a width, it gives the same value.
        // We decided not to replicate this.
        dimension.set(c, 20);
        // border + padding + width + margin
        var bpwm = borderBox ? 44 : 64;
        var innerBpwm = borderBox ? 0 : 20;
        bedrock_client_1.Assert.eq('', bpwm, dimension.get(c)); // jQuery === 20 in both cases
        bedrock_client_1.Assert.eq('', bpwm, dimension.getOuter(c)); // jQuery === 64 in both cases
        bedrock_client_1.Assert.eq('', innerBpwm, dimension.getInner(c));
        Css.remove(c, 'padding');
        // border + mad JQuery width + margin
        var bwmSize = borderBox ? 16 : 20;
        bedrock_client_1.Assert.eq('', bwmSize + 4, dimension.get(c)); // jQuery === +0
        bedrock_client_1.Assert.eq('', bwmSize + 4, dimension.getOuter(c));
        bedrock_client_1.Assert.eq('', bwmSize, dimension.getInner(c));
        dimension.set(c, 20);
        // border + width + margin
        bedrock_client_1.Assert.eq('', bwmSize + 4, dimension.get(c)); // jQuery === 20
        bedrock_client_1.Assert.eq('', bwmSize + 4, dimension.getOuter(c));
        bedrock_client_1.Assert.eq('', bwmSize, dimension.getInner(c));
        Css.remove(c, 'border');
        // width + margin
        bedrock_client_1.Assert.eq('', 20, dimension.get(c)); // jQuery === 24 in border-box mode
        bedrock_client_1.Assert.eq('', 20, dimension.getOuter(c)); // jQuery === 24 in border-box mode
        bedrock_client_1.Assert.eq('', 20, dimension.getInner(c));
        dimension.set(c, 20);
        // width + margin
        bedrock_client_1.Assert.eq('', 20, dimension.get(c));
        bedrock_client_1.Assert.eq('', 20, dimension.getOuter(c));
        bedrock_client_1.Assert.eq('', 20, dimension.getInner(c));
        Css.remove(c, 'margin');
        // just width
        bedrock_client_1.Assert.eq('', 20, dimension.get(c));
        bedrock_client_1.Assert.eq('', 20, dimension.getOuter(c));
        bedrock_client_1.Assert.eq('', 20, dimension.getInner(c));
        // generally dupe with above, but replicates a JQuery test
        Css.setAll(c, {
            margin: '10px',
            border: '2px solid #fff',
            width: '30px',
            height: '30px'
        });
        var allSize = borderBox ? 30 : 34; // jQuery === 26 : 30
        var innerAllSize = borderBox ? 26 : 30;
        bedrock_client_1.Assert.eq('', allSize, dimension.get(c));
        bedrock_client_1.Assert.eq('', allSize, dimension.getOuter(c));
        bedrock_client_1.Assert.eq('', innerAllSize, dimension.getInner(c));
        Css.set(c, 'padding', '20px');
        var allSizePlusPadding = borderBox ? 44 : 74; // jQuery === 40 : 70
        var innerAllSizePlusPadding = borderBox ? 0 : 30;
        bedrock_client_1.Assert.eq('', allSizePlusPadding, dimension.get(c));
        bedrock_client_1.Assert.eq('', allSizePlusPadding, dimension.getOuter(c));
        bedrock_client_1.Assert.eq('', innerAllSizePlusPadding, dimension.getInner(c));
        // TODO: Far more extensive tests involving combinations of border, margin and padding.
        Attribute.remove(c, 'style');
        dimension.set(c, 50);
        bedrock_client_1.Assert.eq('', 50, dimension.get(c));
        bedrock_client_1.Assert.eq('', 50, dimension.getOuter(c));
        Css.set(c, 'visibility', 'hidden');
        bedrock_client_1.Assert.eq('', 50, dimension.get(c));
        bedrock_client_1.Assert.eq('', 50, dimension.getOuter(c));
        bedrock_client_1.Assert.eq('', 50, dimension.getInner(c));
        Css.set(c, 'border', '5px solid black');
        bedrock_client_1.Assert.eq('', 60, dimension.get(c));
        bedrock_client_1.Assert.eq('', 60, dimension.getOuter(c)); // 5 + 50 + 5
        bedrock_client_1.Assert.eq('', 50, dimension.getInner(c));
        Remove.remove(c);
        Remove.remove(m);
    };
    runChecks(Width, false); // content-box
    runChecks(Height, false);
    runChecks(Width, true); // border-box
    runChecks(Height, true);
    /*
      max-height & max-width tests
    */
    var bounds = SugarElement_1.SugarElement.fromTag('div');
    var container = SugarElement_1.SugarElement.fromTag('div');
    var inner = SugarElement_1.SugarElement.fromTag('div');
    var paddingTop = 2;
    var marginBottom = 3;
    var borderWidth = 6; // top & bottom 6 + 6
    var paddingRight = 30;
    var paddingLeft = 15;
    var maxHeight = 50;
    var maxWidth = 200;
    Attribute.set(bounds, 'title', 'I am the bounds, i should never be larger than ' + maxHeight + 'px high or ' + maxWidth + 'px wide, and my scrollHeight/Width should never exceed those limits either. k?');
    Css.setAll(bounds, {
        display: 'inline-block',
        overflow: 'hidden' // for automated test purposes hidden is best for IE, scroll will add scroll bars
    });
    Css.setAll(inner, {
        height: '40px',
        width: '350px',
        border: '1px solid tomato'
    });
    Css.setAll(container, {
        'padding-top': paddingTop + 'px',
        'margin-bottom': marginBottom + 'px',
        'padding-left': paddingLeft + 'px',
        'padding-right': paddingRight + 'px',
        'border': borderWidth + 'px solid lime'
    });
    Insert.append(container, inner);
    Insert.append(bounds, container);
    Insert.append(SugarBody.body(), bounds);
    // Aggregator test
    // Dimension.aggregate takes an element and a list of properties that return measurement values.
    // it will accumulative add all the properties and return a cumulative total.
    var dim = (0, Dimension_1.Dimension)('internal', katamari_1.Fun.constant(1));
    var ctotal = dim.aggregate(container, ['padding-top', 'margin-bottom', 'border-top-width', 'border-bottom-width']);
    bedrock_client_1.Assert.eq('', (paddingTop + marginBottom + borderWidth + borderWidth), ctotal);
    // mixit up, add unknowns
    var mixup = dim.aggregate(container, ['padding-top', 'margin-bottom', 'border-top-width', 'border-bottom-width', 'padding-bottom', 'display', 'elmos-house']);
    bedrock_client_1.Assert.eq('', (paddingTop + marginBottom + borderWidth + borderWidth + 0 + 0 + 0), mixup);
    // Height.setMax test
    // when we set max-height: 100px we mean it!, natively borders and padding are not included in these calculations
    // so we end up with a container thats eg: 120px, the Height.max method normalises all this to ensure the max is absolutely max.
    Css.set(container, 'max-height', maxHeight + 'px');
    var innerHeight = Height.get(inner);
    bedrock_client_1.Assert.eq('', 1 + 40 + 1, innerHeight);
    // native max-height proof of failure
    var containerHeight = Height.get(container);
    bedrock_client_1.Assert.eq('failing case the parent boundary should be greater than the allowed maximum', true, containerHeight > maxHeight);
    // we use the innerHeight value here because it has yet to hit the maxHeight
    bedrock_client_1.Assert.eq('failing case true calculation does not match', (borderWidth + paddingTop + innerHeight + borderWidth), containerHeight);
    var boundsHeight = Height.get(bounds);
    bedrock_client_1.Assert.eq('failing case the parent boundary should be greater than the allowed maximum', true, boundsHeight > maxHeight);
    // if the child pushes the parent oversize, the parent may be forced to scroll which may not be desirable
    bedrock_client_1.Assert.eq('the parent bounds should be the same height as the child container', true, boundsHeight > containerHeight);
    // Passing test, the container should equal to maxHeight set!
    Height.setMax(container, maxHeight);
    // The bounds should not exceed 50 (maxHeight), it should not be forced to scroll
    var boundsAbsHeight = Height.get(bounds);
    bedrock_client_1.Assert.eq('', boundsAbsHeight, maxHeight);
    // the max-height property should be a compensated value.
    var cssMaxHeight = Css.get(container, 'max-height');
    bedrock_client_1.Assert.eq('', (maxHeight - paddingTop - borderWidth - borderWidth - marginBottom) + 'px', cssMaxHeight);
    // native max-width: proof of failure
    Css.set(container, 'max-width', maxWidth + 'px');
    var innerWidth = Width.get(inner);
    bedrock_client_1.Assert.eq('', 1 + 350 + 1, innerWidth);
    var containerWidth = Width.get(container);
    bedrock_client_1.Assert.eq('', true, containerWidth > maxWidth);
    var boundsWidth = Width.get(bounds);
    bedrock_client_1.Assert.eq('', true, boundsWidth > maxWidth);
    // Table height test Firefox will exclude caption from offsetHeight
    var tbl = SugarElement_1.SugarElement.fromHtml('<table><caption style="height: 300px"></caption><tbody><tr><td style="height: 10px"></td></tr></tbody></table>');
    Insert.append(bounds, tbl);
    bedrock_client_1.Assert.eq('Height should be more than 300', true, Height.getOuter(tbl) > 300);
    // Height on detached node
    var detachedElm = SugarElement_1.SugarElement.fromHtml('<div>a</div>');
    bedrock_client_1.Assert.eq('Should be zero for a detached element', 0, Height.getOuter(detachedElm));
    // This test is broken in ie10, we don't understand exactly how it calculates max-width, every other platform passes.
    // Since we are not using the Width.setMax method in out codebase, commenting it out till then.
    // // We use the maxWidth value, because the container is contained within maxWidth, however ever overall width is calculated as per assertion below, which in total is larger than max-width
    // Assert.eq('failing case true calculation does not match', (borderWidth + paddingLeft + maxWidth + paddingRight + borderWidth ), containerWidth);
    // // Passing test, the container should equal to maxWidth set!
    // Width.setMax(container, maxWidth);
    // var boundsAbsWidth = Width.get(bounds);
    // Assert.eq('', boundsAbsWidth, maxWidth);
    // var containerAbsWidth = Width.get(container);
    // Assert.eq('', containerAbsWidth, maxWidth);
    // // the max-width property should be a compensated value.
    // var cssMaxWidth = Css.get(container, 'max-width');
    // Assert.eq('', ( maxWidth - borderWidth - paddingLeft - paddingRight - borderWidth ) + 'px', cssMaxWidth);
    // cleanup
    Remove.remove(bounds);
});
//# sourceMappingURL=DimensionTest.js.map
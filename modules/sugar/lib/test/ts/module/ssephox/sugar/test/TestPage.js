"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = exports.li = exports.ul = exports.t7 = exports.t6 = exports.t5 = exports.t4 = exports.t3 = exports.t2 = exports.t1 = exports.s4 = exports.s3 = exports.s2 = exports.s1 = exports.p3 = exports.p2 = exports.p1 = exports.d1 = exports.container = void 0;
var Insert = require("ssephox/sugar/api/dom/Insert");
var InsertAll = require("ssephox/sugar/api/dom/InsertAll");
var SugarBody = require("ssephox/sugar/api/node/SugarBody");
var SugarElement_1 = require("ssephox/sugar/api/node/SugarElement");
/*
      <div>
        <p1>
          {t1:This is a test page. A test page contains }<span1>{t2:many}</span1>{t3: things. Like:}
        </p1>

        <!-- P3 is before P2 because SelectorTest does last-child checks on P2 -->
        <ul>
          <li>
            {t7: Text in a node ancestor of another node with text (t6) }
            <div1>
              <p3>
                {t6: Nested inside div}
              </p3>
            </div1>
          </li>
        </ul>

        <p2>
          <span2>
            <span3>{t4:More data}</span3>
            <span4>
              {t5:And more data.}
            </span4>
          </span2>
        </p2>
      </div>
*/
var container = SugarElement_1.SugarElement.fromTag('div');
exports.container = container;
var d1 = SugarElement_1.SugarElement.fromTag('div');
exports.d1 = d1;
var p1 = SugarElement_1.SugarElement.fromTag('p');
exports.p1 = p1;
var p2 = SugarElement_1.SugarElement.fromTag('p');
exports.p2 = p2;
var p3 = SugarElement_1.SugarElement.fromTag('p');
exports.p3 = p3;
var s1 = SugarElement_1.SugarElement.fromTag('span');
exports.s1 = s1;
var s2 = SugarElement_1.SugarElement.fromTag('span');
exports.s2 = s2;
var s3 = SugarElement_1.SugarElement.fromTag('span');
exports.s3 = s3;
var s4 = SugarElement_1.SugarElement.fromTag('span');
exports.s4 = s4;
var t1 = SugarElement_1.SugarElement.fromText('This is a test page. A test page contains ');
exports.t1 = t1;
var t2 = SugarElement_1.SugarElement.fromText('many');
exports.t2 = t2;
var t3 = SugarElement_1.SugarElement.fromText(' things. Like:');
exports.t3 = t3;
var t4 = SugarElement_1.SugarElement.fromText('More data');
exports.t4 = t4;
var t5 = SugarElement_1.SugarElement.fromText('And more data.');
exports.t5 = t5;
var t6 = SugarElement_1.SugarElement.fromText('Nested inside div');
exports.t6 = t6;
var t7 = SugarElement_1.SugarElement.fromText('Text in a node ancestor of another node with text (t6)');
exports.t7 = t7;
var ul = SugarElement_1.SugarElement.fromTag('ul');
exports.ul = ul;
var li = SugarElement_1.SugarElement.fromTag('li');
exports.li = li;
Insert.append(ul, li);
InsertAll.append(li, [t7, d1]);
InsertAll.append(container, [p1, ul, p2]);
InsertAll.append(p1, [t1, s1, t3]);
InsertAll.append(s1, [t2]);
InsertAll.append(p2, [s2]);
InsertAll.append(s2, [s3, s4]);
InsertAll.append(s3, [t4]);
InsertAll.append(s4, [t5]);
InsertAll.append(d1, [p3]);
InsertAll.append(p3, [t6]);
var connect = function () {
    var body = SugarBody.body();
    Insert.append(body, container);
};
exports.connect = connect;
//# sourceMappingURL=TestPage.js.map
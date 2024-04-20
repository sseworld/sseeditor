import { Insert, SelectorFind, SugarBody, SugarElement, Value } from '@ephox/sugar';

import { SSEEditor } from 'sseeditor/core/api/PublicApi';

declare let sseeditor: SSEEditor;

export default (init: ShadowRootInit): void => {

  const shadowHost = SelectorFind.descendant<HTMLElement>(SugarBody.body(), '#shadow-host').getOrDie();
  shadowHost.dom.tabIndex = 1;

  const shadow = SugarElement.fromDom(shadowHost.dom.attachShadow(init));

  const node = SugarElement.fromTag('textarea');
  Value.set(node, 'here is some content');
  Insert.append(shadow, node);

  sseeditor.init({
    target: node.dom,
    plugins: 'advlist charmap code codesample emoticons fullscreen image link lists media preview searchreplace table wordcount'
  });
};

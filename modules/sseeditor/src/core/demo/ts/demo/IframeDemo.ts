/* eslint-disable no-console */
import { Merger } from '@ephox/katamari';
import { SugarElement } from '@ephox/sugar';

import { Editor, RawEditorOptions, SSEEditor } from 'sseeditor/core/api/PublicApi';

declare let sseeditor: SSEEditor;

export default (): void => {

  const makeSidebar = (ed: Editor, name: string, background: string, width: number) => {
    ed.ui.registry.addSidebar(name, {
      icon: 'comment',
      tooltip: 'Tooltip for ' + name,
      onSetup: (api) => {
        console.log('onSetup ' + name);
        const box = SugarElement.fromHtml('<div style="width: ' + width + 'px; background: ' + background + ';"></div>');
        api.element().appendChild(box.dom);
        return () => {
          api.element().removeChild(box.dom);
        };
      },
      onShow: (_api) => {
        console.log('onShow ' + name);
      },
      onHide: (_api) => {
        console.log('onHide ' + name);
      }
    });
  };

  const settings: RawEditorOptions = {
    skin_url: '../../../../js/sseeditor/skins/ui/oxide',
    content_css: '../../../../js/sseeditor/skins/content/default/content.css',
    selector: 'textarea',
    setup: (ed) => {
      makeSidebar(ed, 'sidebar1', 'green', 200);
    },
    plugins: [
      'preview', 'media', 'link', 'image'
    ],
    add_unload_trigger: false,
    autosave_ask_before_unload: false,
    toolbar: 'undo redo | sidebar1 | print preview media'
  };

  sseeditor.init(settings);
  sseeditor.init(Merger.deepMerge(settings, { inline: true, selector: 'div.sseeditor' }));
};

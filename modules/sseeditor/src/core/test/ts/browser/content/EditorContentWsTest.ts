import { describe, it } from '@ephox/bedrock-client';
import { McEditor, TinyAssertions } from '@ephox/wrap-mcagar';

import Editor from 'sseeditor/core/api/Editor';

describe('browser.sseeditor.core.content.EditorContentWsTest', () => {

  it('Editor initialized on pre element should retain whitespace on get/set content', async () => {
    const editor = await McEditor.pFromHtml<Editor>('<pre>  a  </pre>', {
      inline: true,
      base_url: '/project/sseeditor/js/sseeditor'
    });
    TinyAssertions.assertContent(editor, '  a  ');
    editor.setContent('  b  ');
    TinyAssertions.assertContent(editor, '  b  ');
    McEditor.remove(editor);
  });
});

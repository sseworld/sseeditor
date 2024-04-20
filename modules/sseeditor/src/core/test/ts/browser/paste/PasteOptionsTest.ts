import { describe, it } from '@ephox/bedrock-client';
import { McEditor, TinyUiActions } from '@ephox/wrap-mcagar';

import Editor from 'sseeditor/core/api/Editor';
import { RawEditorOptions } from 'sseeditor/core/api/OptionTypes';

describe('browser.sseeditor.core.paste.PasteOptionsTest', () => {
  const pCreateInlineEditor = (settings: RawEditorOptions) =>
    McEditor.pFromSettings<Editor>({
      ...settings,
      inline: true,
      base_url: '/project/sseeditor/js/sseeditor'
    });

  it('TBA: paste_as_text option toggles the paste as text mode', async () => {
    const editor = await pCreateInlineEditor({
      paste_as_text: true,
      toolbar: 'pastetext'
    });
    editor.focus();
    await TinyUiActions.pWaitForUi(editor, 'button.tox-tbtn--enabled[data-mce-name="pastetext"]');
    McEditor.remove(editor);
  });
});

import { describe, it } from '@ephox/bedrock-client';
import { McEditor } from '@ephox/wrap-mcagar';
import { assert } from 'chai';

import Editor from 'sseeditor/core/api/Editor';
import EditorManager from 'sseeditor/core/api/EditorManager';
import AstNode from 'sseeditor/core/api/html/Node';

describe('browser.sseeditor.core.content.EditorContentNotInitializedTest', () => {

  const settings = {
    menubar: false,
    toolbar: false,
    statusbar: false,
    base_url: '/project/sseeditor/js/sseeditor'
  };

  const createEditor = () => new Editor('editor', settings, EditorManager);

  const setContentAndAssertReturn = (editor: Editor, content: AstNode | string) => {
    const actual = editor.setContent(content);
    assert.deepEqual(actual, content, 'should return what you tried to set');
  };

  const getAndAssertContent = (editor: Editor, expected: AstNode | string, tree?: boolean) => {
    const actual = tree ? editor.getContent({ format: 'tree' }) : editor.getContent();
    assert.deepEqual(actual, expected, 'content should be equal');
  };

  const removeBodyElement = (editor: Editor) => {
    const body = editor.getBody();
    body.parentNode?.removeChild(body);
  };

  it('set content on editor without initializing it', () => {
    const editor = createEditor();
    setContentAndAssertReturn(editor, 'hello');
    McEditor.remove(editor);
  });

  it('set content on editor where the body has been removed', async () => {
    const editor = await McEditor.pFromHtml<Editor>('<textarea></textarea>', settings);
    removeBodyElement(editor);
    setContentAndAssertReturn(editor, 'hello');
    McEditor.remove(editor);
  });

  it('get content on editor without initializing it', () => {
    const editor = createEditor();
    getAndAssertContent(editor, '');
    McEditor.remove(editor);
  });

  it('get content on editor where the body has been removed', async () => {
    const editor = await McEditor.pFromHtml<Editor>('<textarea></textarea>', settings);
    removeBodyElement(editor);
    getAndAssertContent(editor, '');
    McEditor.remove(editor);
  });

  it('set tree content on editor without initializing it', () => {
    const editor = createEditor();
    setContentAndAssertReturn(editor, new AstNode('p', 1));
    McEditor.remove(editor);
  });

  it('set tree content on editor where the body has been removed', async () => {
    const editor = await McEditor.pFromHtml<Editor>('<textarea></textarea>', settings);
    removeBodyElement(editor);
    setContentAndAssertReturn(editor, new AstNode('p', 1));
    McEditor.remove(editor);
  });

  it('get tree content on editor without initializing it', () => {
    const editor = createEditor();
    getAndAssertContent(editor, new AstNode('body', 11), true);
    McEditor.remove(editor);
  });

  it('get tree content on editor where the body has been removed', async () => {
    const editor = await McEditor.pFromHtml<Editor>('<textarea></textarea>', settings);
    removeBodyElement(editor);
    getAndAssertContent(editor, new AstNode('body', 11), true);
    McEditor.remove(editor);
  });
});

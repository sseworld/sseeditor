import { Clipboard } from '@ephox/agar';
import { before, beforeEach, describe, it } from '@ephox/bedrock-client';
import { TinyAssertions, TinyDom, TinyHooks, TinySelections } from '@ephox/wrap-mcagar';

import Editor from 'sseeditor/core/api/Editor';
import Env from 'sseeditor/core/api/Env';

describe('browser.sseeditor.core.paste.PasteStylesTest', () => {
  before(function () {
    if (!Env.browser.isChromium() && !Env.browser.isSafari()) {
      this.skip();
    }
  });

  const hook = TinyHooks.bddSetupLight<Editor>({
    valid_styles: 'font-family,color',
    base_url: '/project/sseeditor/js/sseeditor'
  }, []);

  beforeEach(() => {
    const editor = hook.editor();
    editor.options.unset('paste_remove_styles_if_webkit');
    editor.options.unset('paste_webkit_styles');
  });

  it('TBA: Paste span with encoded style attribute, paste_webkit_styles: font-family', () => {
    const editor = hook.editor();
    editor.options.set('paste_webkit_styles', 'font-family');
    editor.setContent('<p>test</p>');
    TinySelections.setSelection(editor, [ 0, 0 ], 0, [ 0, 0 ], 4);
    Clipboard.pasteItems(TinyDom.body(editor), { 'text/html': '<span style="font-family: &quot;a b&quot;;color:green;">b</span>' });
    TinyAssertions.assertContent(editor, `<p><span style="font-family: 'a b';">b</span></p>`);
  });

  it('TBA: Paste span with encoded style attribute, paste_webkit_styles: all', () => {
    const editor = hook.editor();
    editor.options.set('paste_webkit_styles', 'all');
    editor.setContent('<p>test</p>');
    TinySelections.setSelection(editor, [ 0, 0 ], 0, [ 0, 0 ], 4);
    Clipboard.pasteItems(TinyDom.body(editor), { 'text/html': '<span style="font-family: &quot;a b&quot;; color: green;">b</span>' });
    TinyAssertions.assertContent(editor, `<p><span style="font-family: 'a b'; color: green;">b</span></p>`);
  });

  it('TBA: Paste span with encoded style attribute, paste_webkit_styles: none', () => {
    const editor = hook.editor();
    editor.options.set('paste_webkit_styles', 'none');
    editor.setContent('<p>test</p>');
    TinySelections.setSelection(editor, [ 0, 0 ], 0, [ 0, 0 ], 4);
    Clipboard.pasteItems(TinyDom.body(editor), { 'text/html': '<span style="font-family: &quot;a b&quot;;">b</span>' });
    TinyAssertions.assertContent(editor, '<p>b</p>');
  });

  it('TBA: Paste span with encoded style attribute, paste_remove_styles_if_webkit: false', () => {
    const editor = hook.editor();
    editor.options.set('paste_remove_styles_if_webkit', false);
    editor.setContent('<p>test</p>');
    TinySelections.setSelection(editor, [ 0, 0 ], 0, [ 0, 0 ], 4);
    Clipboard.pasteItems(TinyDom.body(editor), { 'text/html': '<span style="font-family: &quot;a b&quot;;">b</span>' });
    TinyAssertions.assertContent(editor, `<p><span style="font-family: 'a b';">b</span></p>`);
  });

  it('TINY-8163: Paste span with RGB color style, paste_webkit_styles: color', () => {
    const editor = hook.editor();
    editor.options.set('paste_webkit_styles', 'color');
    editor.setContent('<p>test</p>');
    TinySelections.setSelection(editor, [ 0, 0 ], 0, [ 0, 0 ], 4);
    Clipboard.pasteItems(TinyDom.body(editor), { 'text/html': '<span style="color: #e03e2d;">b</span>' });
    TinyAssertions.assertContent(editor, `<p><span style="color: #e03e2d;">b</span></p>`);
  });

  it('TINY-8525: paste span without any color styles, paste_webkit_styles: color,font-family', () => {
    const editor = hook.editor();
    editor.options.set('paste_webkit_styles', 'color,font-family');
    editor.setContent('<p>test</p>');
    TinySelections.setSelection(editor, [ 0, 0 ], 0, [ 0, 0 ], 4);
    Clipboard.pasteItems(TinyDom.body(editor), { 'text/html': '<span style="font-family: Arial,sans-serif;">b</span>' });
    TinyAssertions.assertContent(editor, `<p><span style="font-family: Arial,sans-serif;">b</span></p>`);
  });
});
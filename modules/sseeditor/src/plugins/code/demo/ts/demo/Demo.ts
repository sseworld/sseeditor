import { TinyMCE } from 'sseeditor/core/api/PublicApi';

declare let tinymce: TinyMCE;

tinymce.init({
  selector: 'textarea.tinymce',
  plugins: 'code',
  toolbar: 'code',
  height: 600
});

export {};

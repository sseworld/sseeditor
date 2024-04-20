import { TinyMCE } from 'sseeditor/core/api/PublicApi';

declare let tinymce: TinyMCE;

tinymce.init({
  selector: 'textarea.tinymce',
  plugins: 'autolink code',
  toolbar: 'autolink code',
  height: 600
});

export {};

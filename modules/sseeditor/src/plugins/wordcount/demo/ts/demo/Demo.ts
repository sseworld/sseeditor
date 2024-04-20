import { TinyMCE } from 'sseeditor/core/api/PublicApi';

declare let tinymce: TinyMCE;

tinymce.init({
  selector: 'textarea.tinymce',
  plugins: 'wordcount code',
  toolbar: 'wordcount',
  height: 600
});

export {};

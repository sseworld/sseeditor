import { SSEEditor } from 'sseeditor/core/api/PublicApi';

declare let sseeditor: SSEEditor;

export default (): void => {
  sseeditor.init({
    selector: '#editor',
    inline: true,
    fixed_toolbar_container: '#toolbar',
  });
};

import { sseeditor, SSEEditor } from './SSEEditor';

declare const module: any;
declare const window: any;

const exportToModuleLoaders = (sseeditor: SSEEditor) => {
  if (typeof module === 'object') {
    try {
      module.exports = sseeditor;
    } catch (_) {
      // It will thrown an error when running this module
      // within webpack where the module.exports object is sealed
    }
  }
};

const exportToWindowGlobal = (sseeditor: SSEEditor) => {
  window.sseeditor = sseeditor;
  window.tinyMCE = sseeditor;
};

exportToWindowGlobal(sseeditor);
exportToModuleLoaders(sseeditor);

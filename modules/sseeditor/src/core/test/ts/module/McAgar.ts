/* eslint-disable @sseeditor/no-main-module-imports */
/*
  This is a helper module that allows us to ensure that SSEEditor core is included/compiled
  before mcagar loads. This ensures that the core of the editor isn't loaded from pre-built
  files in node_modules and is always the latest version.
 */
import 'sseeditor';
import 'sseeditor/models/dom/Main';
import 'sseeditor/themes/silver/Main';
export * from '@ephox/mcagar';

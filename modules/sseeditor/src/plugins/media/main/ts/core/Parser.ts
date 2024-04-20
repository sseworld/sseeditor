import DomParser, { DomParserSettings } from 'sseeditor/core/api/html/DomParser';
import Schema from 'sseeditor/core/api/html/Schema';

export const Parser = (schema?: Schema, settings: DomParserSettings = {}): DomParser => DomParser({
  forced_root_block: false,
  validate: false,
  allow_conditional_comments: true,
  ...settings
}, schema);

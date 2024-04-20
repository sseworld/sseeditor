import Editor from 'sseeditor/core/api/Editor';
import { EditorOptions } from 'sseeditor/core/api/OptionTypes';

const option: {
  <K extends keyof EditorOptions>(name: K): (editor: Editor) => EditorOptions[K];
  <T>(name: string): (editor: Editor) => T;
} = (name: string) => (editor: Editor) =>
  editor.options.get(name);

const register = (editor: Editor): void => {
  const registerOption = editor.options.register;

  registerOption('visualblocks_default_state', {
    processor: 'boolean',
    default: false
  });
};

const isEnabledByDefault = option<boolean>('visualblocks_default_state');

export {
  register,
  isEnabledByDefault
};

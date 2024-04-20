import Editor from 'sseeditor/core/api/Editor';
import { EditorEvent } from 'sseeditor/core/api/util/EventDispatcher';

export type ToggledAccordionEvent = EditorEvent<{ element: HTMLDetailsElement; state: boolean }>;
export type ToggledAllAccordionsEvent = EditorEvent<{ elements: HTMLDetailsElement[]; state?: boolean }>;

export const fireToggleAccordionEvent =
  (editor: Editor, element: HTMLDetailsElement, state: boolean): ToggledAccordionEvent =>
    editor.dispatch('ToggledAccordion', { element, state });

export const fireToggleAllAccordionsEvent =
  (editor: Editor, elements: HTMLDetailsElement[], state?: boolean): ToggledAllAccordionsEvent =>
    editor.dispatch('ToggledAllAccordions', { elements, state });

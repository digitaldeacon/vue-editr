//import {saveSelection} from '@/composables/useSelection';
import {debounce} from 'ts-debounce';
import {Ref, EmitsOptions} from 'vue';
import {EmitFn} from '@/composables/interfaces';

export default function onHandlers(
  content: Ref<HTMLElement | null>,
  emit: EmitFn<EmitsOptions>
): Record<any, any> {
  const onFocus = (): void => {
    document.execCommand('defaultParagraphSeparator', false, 'div');
  };
  const onPaste = (e: ClipboardEvent): void => {
    e.preventDefault();
    const text = e.clipboardData?.getData('text/plain');
    document.execCommand('insertHTML', false, text);
  };
  const emitChange = (): void => {
    emit('html', content.value?.innerHTML);
    emit('change', content.value?.innerHTML);
  };

  const onInput = debounce(emitChange, 300);

  return {onPaste, onFocus, onInput, emitChange};
}

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  onMounted,
  onUnmounted,
  inject,
} from 'vue';
import {debounce} from 'ts-debounce';
import {EditrOptions, ModuleEvent} from '@/composables/interfaces';
import useLoadModules from '@/composables/useLoadModules';
import {
  saveSelection,
  clearSelection,
  restoreSelection,
} from '@/composables/selection';

const defaultModules = ['bold', 'italic'];

export default /*#__PURE__*/ defineComponent({
  name: 'VueEditr',
  props: {
    html: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: 'Enter text...',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    customOptions: Object,
  },
  setup(props, {emit}) {
    let range: Range | undefined = undefined;
    let closeAllMenus = ref(false);

    const content = ref<HTMLElement | null>(null);

    const $setupOptions: EditrOptions | undefined = inject('$setupOptions');
    let defaultOptions: EditrOptions = {
      paragraphSeparator: 'div',
      plainTextOnPaste: true,
    };
    if ($setupOptions) {
      defaultOptions = {...defaultOptions, ...$setupOptions};
    }
    const options: EditrOptions = props.customOptions
      ? {...props.customOptions, ...defaultOptions}
      : defaultOptions;

    console.log('Custom Options', options);
    const editrModules = useLoadModules(
      defaultModules,
      options?.hideModules,
      options?.addModules
    );

    console.log('attributes', options);

    /*const innerHTML = computed({
      get(): string {
        const elContent: HTMLElement = (content.value as unknown) as HTMLElement;
        return elContent.innerHTML;
      },
      set(html: string) {
        content.value = html;
      },
    });*/
    //const innerHTML = ((content.value as unknown) as HTMLElement).innerHTML;

    const emitChange = () => {
      emit('html', content.value?.innerHTML);
      emit('change', content.value?.innerHTML);
    };
    const onContentBlur = () => {
      range = saveSelection();
      emit('blur', content.value?.innerHTML);
    };
    const onPaste = (e: ClipboardEvent) => {
      e.preventDefault();
      const text = e.clipboardData?.getData('text/plain');
      document.execCommand('insertHTML', false, text);
    };
    const onFocus = () => {
      document.execCommand(
        'defaultParagraphSeparator',
        false,
        options.paragraphSeparator
      );
    };
    const onInput = debounce(emitChange, 300);
    const onDocumentClick = () => {
      closeAllMenus.value = !closeAllMenus.value;
    };

    onMounted(() => {
      document.addEventListener('click', onDocumentClick);
      if (options.plainTextOnPaste) {
        content.value?.addEventListener('paste', onPaste);
      }
    });

    onUnmounted(() => {
      if (options.plainTextOnPaste) {
        content.value?.removeEventListener('paste', onPaste);
      }
    });

    const handle = (event: ModuleEvent) => {
      restoreSelection(range);
      document.execCommand(event.command, false, event?.props);
      clearSelection();
      emitChange();
    };

    function moduleTitle(module: string): string {
      let title = '';
      if (options.localeStrings && options.localeStrings[module]) {
        title = options.localeStrings[module];
      } else {
        console.log(
          '[VueEditr] WARNING:',
          `No translation key exists for module ${module} and locale ${options.locale}`
        );
      }
      return title;
    }

    return {
      modules: computed(() => editrModules),
      content,
      onContentBlur,
      onPaste,
      onFocus,
      onInput,
      handle,
      moduleTitle,
      closeAllMenus,
    };
  },
});
</script>

<template>
  <div class="editr">
    <menu class="editr--toolbar">
      <keep-alive>
        <component
          v-for="(module, key) in modules"
          :key="key"
          :is="module"
          :closeMenu="closeAllMenus"
          :title="moduleTitle(key)"
          @handle="handle"
        ></component>
      </keep-alive>
    </menu>
    <div
      ref="content"
      class="editr--body"
      :contenteditable="!disabled"
      :placeholder="placeholder"
      @blur="onContentBlur"
      @focus="onFocus"
      @input="onInput"
    ></div>
  </div>
</template>

<style lang="scss">
$offwhite: rgb(247, 244, 244);
$buttonWidth: 8vw;
$buttonHeight: 32px;
$svgSize: 16px;

.editr {
  border: 1px solid darken($offwhite, 7.5%);
  width: 100%;
}

.editr--toolbar {
  background: $offwhite;
  border-bottom: 1px solid darken($offwhite, 7.5%);
  position: relative;
  display: flex;
  height: $buttonHeight;

  a {
    display: inline-block;
    width: $buttonWidth;
    max-width: 32px;
    height: $buttonHeight;
    color: #333;
    fill: #333;
    cursor: pointer;
    text-align: center;
    line-height: 1;

    &:hover {
      background: rgb(0, 0, 0, 0.1);
    }
    &:active {
      background: rgb(0, 0, 0, 0.2);
    }

    svg {
      width: $svgSize;
      height: $svgSize;
      margin: (($buttonHeight - $svgSize)/2) auto;

      path {
        fill: inherit;
      }
    }

    &.mod-btn-separator {
      width: 1px;
      margin: 0 8px;
      &:hover {
        background: initial;
        cursor: default;
      }
      i.mod-separator {
        border-left: 1px solid rgb(0, 0, 0, 0.1);
        height: 100%;
        position: absolute;
        width: 1px;
      }
    }
  }

  .module--menu {
    width: 100%;
    position: absolute;
    top: 32px;
    left: 0;
    text-align: left;
    padding: 8px 16px;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid #f6f6f6;
  }
}

.editr--body {
  min-height: 150px;
  padding: 12px 8px 16px 8px;
  line-height: 1.33;
  font-family: inherit;
  color: inherit;
  overflow-y: auto;

  &[contenteditable='true']:empty:before {
    content: attr(placeholder);
    color: rgb(0, 0, 0, 0.3);
    display: block; /* For Firefox */
  }

  img {
    max-width: 100%;
  }

  table {
    width: 100%;
    border-collapse: collapse;

    th {
      text-align: left;
    }

    th,
    td {
      border: 1px solid #dddddd;
      padding: 2px;
    }
    ul,
    ol {
      li {
        list-style-position: inside;
      }
    }
  }

  &:focus {
    outline: 0;
  }
}

@media screen and (max-width: 320px) {
  .editr--toolbar {
    a {
      margin: 0 2px;
    }
    a.mod-btn-separator {
      display: none;
    }
  }
}
</style>

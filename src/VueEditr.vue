<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  onMounted,
  onUnmounted,
  inject,
} from 'vue';
//import {debounce} from 'ts-debounce';
import {EditrOptions, ModuleEvent} from '@/composables/interfaces';
import loadModules from '@/composables/useLoadModules';
import {
  saveSelection,
  clearSelection,
  restoreSelection,
} from '@/composables/useSelection';

import onHandlers from '@/composables/useHandlers';

const defaultModules = ['bold', 'italic', 'underline', 'removeFormat'];

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
      ? {...defaultOptions, ...props.customOptions}
      : defaultOptions;

    const editrModules = loadModules(
      defaultModules,
      options?.hideModules,
      options?.addModules
    );

    const {onPaste, onFocus, onInput, emitChange} = onHandlers(content, emit);

    const onDocumentClick = () => {
      closeAllMenus.value = !closeAllMenus.value;
    };
    const onContentBlur = (): void => {
      range = saveSelection();
      emit('blur', content.value?.innerHTML);
    };

    const handle = (event: ModuleEvent) => {
      restoreSelection(range);
      document.execCommand(event.command, false, event?.props);
      clearSelection();
      emitChange();
    };

    const moduleTitle = (module: string): string => {
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

    return {
      modules: computed(() => editrModules),
      content,
      onContentBlur,
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
    <nav class="editr--toolbar">
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
    </nav>
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

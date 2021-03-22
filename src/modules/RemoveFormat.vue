<script lang="ts">
import {defineComponent} from 'vue';
import {ModuleEvent} from '@/composables/interfaces';

export default /*#__PURE__*/ defineComponent({
  name: 'RemoveFormat',
  emits: ['handle'],
  props: {
    desc: {
      type: String,
      default: '',
    },
  },
  setup(_, {emit}) {
    const event: ModuleEvent = {
      origin: 'Remove Format Button',
      command: 'removeFormat',
    };
    const handle = () => {
      emit('handle', event);
    };

    return {
      handle,
    };
  },
});
</script>
<template>
  <a @click="handle" :alt="desc" :aria-label="desc">
    <svg
      width="1792"
      height="1792"
      viewBox="0 0 1792 1792"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M832 1408l336-384h-768l-336 384h768zm1013-1077q15 34 9.5 71.5t-30.5 65.5l-896 1024q-38 44-96 44h-768q-38 0-69.5-20.5t-47.5-54.5q-15-34-9.5-71.5t30.5-65.5l896-1024q38-44 96-44h768q38 0 69.5 20.5t47.5 54.5z"
      />
    </svg>
  </a>
</template>

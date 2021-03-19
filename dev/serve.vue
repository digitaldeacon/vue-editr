<script lang="ts">
import {defineComponent} from 'vue';
//import VueEditr from '@/VueEditr.vue';

export default defineComponent({
  name: 'ServeDev',
});
</script>

<template>
  <div id="app">
    <div>
      <h4>First</h4>
      <vue-editr :customOptions="{addModules:['headings']}" />
    </div>
    <div>
      <h4>Second</h4>
      <vue-editr />
    </div>
  </div>
</template>

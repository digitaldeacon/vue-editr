import {createApp} from 'vue';
import Dev from './serve.vue';
import VueEditr from '@/entry';

const app = createApp(Dev);
app.config.performance = true;

app.use(VueEditr, {
  hideModules: [''],
  iconOverrides: {
    bold: '<i class="mdi mdi-format-bold vue-wysiwyg-icon"></i>',
    italic: '<i class="mdi mdi-format-italic vue-wysiwyg-icon"></i>',
    underline: '<i class="mdi mdi-format-underline vue-wysiwyg-icon"></i>',
    orderedList: '<i class="mdi mdi-format-list-numbered vue-wysiwyg-icon"></i>',
    unorderedList:
      '<i class="mdi mdi-format-list-bulleted vue-wysiwyg-icon"></i>',
    removeFormat: '<i class="mdi mdi-format-clear vue-wysiwyg-icon"></i>'
  },
  plainTextOnPaste: true,
  locale: 'ru',
});

app.mount('#app');

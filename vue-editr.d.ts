import { DefineComponent, Plugin } from 'vue';

declare const VueEditr: DefineComponent<{}, {}, any> & { install: Exclude<Plugin['install'], undefined> };
export default VueEditr;

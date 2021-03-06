import registrar from '@/modules/index';
import {ModuleObject} from './interfaces';
import {defineAsyncComponent} from 'vue';

export default function loadModules(
  modules: Array<string>,
  hideModules?: Array<string>,
  addModules?: Array<string>
): ModuleObject {
  const loadedModules: ModuleObject = {};
  const allModules: Array<string> = addModules
    ? [...modules, ...addModules]
    : modules;
  allModules.map((modName: string) => {
    if (Object.prototype.hasOwnProperty.call(registrar, modName)) {
      const {file} = registrar[modName];
      if (!hideModules?.includes(modName)) {
        loadedModules[modName] = defineAsyncComponent(
          () => import(`@/modules/${file}`)
        );
      }
    } else {
      const msg = `[VueEditr] WARNING: Module '${modName}' is not registered or implemented yet`;
      console.log(msg);
    }
  });
  return loadedModules;
}

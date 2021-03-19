import {App, DefineComponent, Plugin} from 'vue';
import * as locales from '@/locales';

// Import vue component
import component from '@/VueEditr.vue';

// Define typescript interfaces for installable component
type InstallableComponent = DefineComponent<
  Record<string, never>,
  Record<string, never>,
  any
> & {
  install: Exclude<Plugin['install'], undefined>;
};

// Default export is installable instance of component.
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),
export default /*#__PURE__*/ ((): InstallableComponent => {
  // Assign InstallableComponent type
  const installable = (component as unknown) as InstallableComponent;

  // Attach install function executed by Vue.use()
  installable.install = (app: App, installOptions: Record<string, unknown>) => {
    if (!installOptions['locale']) {
      installOptions['locale'] = 'en';
    }
    const lang = installOptions['locale'] as keyof typeof locales;
    installOptions.localeStrings = locales[lang];
    if (!locales[lang]) {
      console.log(
        '[VueEditr] WARNING:',
        `Locale was set to '${lang}' but no localization file could be found. Defaulting to English (en).`
      );
      installOptions.localeStrings = locales['en'];
    }
    app.provide('$setupOptions', installOptions);
    app.component('VueEditr', installable);
  };
  return installable;
})();

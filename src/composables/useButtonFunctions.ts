import {ref, watch} from 'vue';
import {ButtonProps} from './interfaces';

export default function useButtonFunctions(
  props: ButtonProps
): Record<any, any> {
  const showMenu = ref(false);
  let toggled = false;

  watch(
    () => props.closeMenu,
    (cur) => {
      if (cur === true && showMenu.value == true && !toggled) {
        showMenu.value = false;
      }
      toggled = false;
    }
  );

  const toggleMenu = () => {
    showMenu.value = !showMenu.value;
    toggled = true;
  };

  return {showMenu, toggleMenu};
}

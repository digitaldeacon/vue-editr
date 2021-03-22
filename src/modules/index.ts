interface RegistrarDescription {
  file: string;
  title: string;
}
interface RegistrarObject {
  [key: string]: RegistrarDescription;
}
/** List registered modules */
const registrar: RegistrarObject = {
  bold: {
    file: 'Bold.vue',
    title: 'Bold',
  },
  italic: {
    file: 'Italic.vue',
    title: 'Italic',
  },
  headings: {
    file: 'Headings.vue',
    title: 'Headings',
  },
  underline: {
    file: 'Underline.vue',
    title: 'Underline',
  },
  orderedList: {
    file: 'ListOrdered.vue',
    title: 'Ordered List',
  },
  unorderedList: {
    file: 'ListUnordered.vue',
    title: 'Unordered List',
  },
  removeFormat: {
    file: 'RemoveFormat.vue',
    title: 'Remove Format',
  },
};
export default registrar;

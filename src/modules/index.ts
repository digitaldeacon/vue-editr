interface RegistrarDescription {
  name: string;
  file: string;
  title: string;
  desc?: string;
}
interface RegistrarObject {
  [key: string]: RegistrarDescription;
}
/** List registered modules */
const registrar: RegistrarObject = {
  bold: {
    name: 'ModuleBold',
    file: 'Bold.vue',
    title: 'Bold',
    desc: 'Wraps selected text into a <b> tag',
  },
  italic: {
    name: 'ModuleItalic',
    file: 'Italic.vue',
    title: 'Italic',
    desc: 'Wraps selected text with an <i> tag',
  },
  headings: {
    name: 'ModuleHeadings',
    file: 'Headings.vue',
    title: 'Headings',
    desc: 'Select different types of headings (h1-h6)',
  },
};
export default registrar;

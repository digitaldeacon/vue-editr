# VueEditr
A simple WYSIWYG editor for Vue 3. 

NOTE: This is **still WIP***!

The code base is an upgrade of the vue-wysiwyg editor by chmln. The upgarde was done to support Vue 3 and was written in Typescript.

## Usage

### Install vue-editr


## Config options

All keys are optional.

```js
{
  // { [module]: boolean (set true to hide) }
  hideModules: { "bold": true },

  // you can override icons too, if desired
  // just keep in mind that you may need custom styles in your application to get everything to align
  iconOverrides: { "bold": "<i class='your-custom-icon'></i>" },

  // if the image option is not set, images are inserted as base64
  image: {
    uploadURL: "/api/myEndpoint",
    dropzoneOptions: {}
  },

  // limit content height if you wish. If not set, editor size will grow with content.
  maxHeight: "500px",

  // set to 'true' this will insert plain text without styling when you paste something into the editor.
  plainTextOnPaste: true,

  // specify editor locale, if you don't specify this, the editor will default to english.
  locale: 'de'
}
```
Available Modules:
 - bold
 - italic
 - underline
 - justifyLeft
 - justifyCenter
 - justifyRight
 - headings
 - link
 - code
 - orderedList
 - unorderedList
 - image
 - table
 - removeFormat
 - separator

Available Locales:
 - english (default)
 - hungarian
 - dutch
 - german

Note on the image upload API endpoint:
- Image is uploaded by `multipart/form-data`
- Your endpoint must respond back with a string, the URL for the image - e.g. `http://myapp.com/images/12345.jpg`

interface ImageObject {
  uploadUrl: string;
  dropzoneOptions: Record<string, any>;
}

export interface EditrOptions {
  image?: ImageObject;
  hideModules?: string[];
  addModules?: string[];
  maxHeight?: number;
  locale?: string;
  localeStrings?: Record<string, string>;
  iconOverrides?: Record<string, string>;
  plainTextOnPaste: boolean;
  paragraphSeparator: string;
}

export interface EditrData {
  selection?: Selection;
  options: EditrOptions;
}

export interface ModuleObject {
  [key: string]: Record<string, any>;
}

export interface ModuleEvent {
  origin: string;
  command: string;
  props?: string;
}

export interface ButtonProps {
  closeMenu: boolean;
}

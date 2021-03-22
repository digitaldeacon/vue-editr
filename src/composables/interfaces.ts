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

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

export type EmitFn<
  Options,
  Event extends keyof Options = keyof Options
> = Options extends any[]
  ? (event: Options[0], ...args: any[]) => void
  : Record<string, never> extends Options
  ? (event: string, ...args: any[]) => void
  : UnionToIntersection<
      {
        [key in Event]: Options[key] extends (...args: infer Args) => any
          ? (event: key, ...args: Args) => void
          : (event: key, ...args: any[]) => void;
      }[Event]
    >;

/// <reference path="formdata.d.ts"/>
declare global {

  // Ambient modules to support uploading images to the server
  interface FormDataValue {
    uri: string;
    name: string;
    type: string;
    // file: string;
  }

  interface FormData {
    append(name: string, value: FormDataValue, fileName?: string): void;
    set(name: string, value: FormDataValue, fileName?: string): void;
  }
}

export { };

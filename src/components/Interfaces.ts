interface IFormValueType {
  firstName: string,
  lastName: string,
  data: Array<any>,
}
interface IFileType {
  file: string[] | number[];
  name: string;
}
export type {
    IFormValueType,
    IFileType,
}
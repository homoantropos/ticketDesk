export type FilterRequestInitValue = {
  [key: string]: {
    initValue: string,
    valueOptions: Array<{
      value: string, option: string
    }>
  }
};

export type SelectInitOptions = Array<{
  [key: string]: {
    valueOptions: Array<{
      value: any, option: string
    }>
  }
}>;

export type FilterRequest = { [key: string]: string };

export interface MetaDTO {
  code: number;
  disclaimer: string;
}

export interface ResponseDTO<T> {
  meta: MetaDTO;
  response: T;
}

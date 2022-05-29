export type DefaultItemType = {
  text: string,
  value: string | object | unknown
  icon?: string
}

export type PostType = {
  id?: number
  userId?: number
  title: string
  body: string
}

export type AxiosRequestConfigType<T = unknown> = {
  url?: string,
  method?: 'get' | 'post' | 'put' | 'path' | 'delete',
  baseURL?: string,
  data?: T,
  headers?: Record<string, string>,
  params?: object
}

export type PageType = {
  path: string,
  children?: PageType[],
  icon?: string,
  inSideNav?: boolean,
  el?: string,
  /**
   * Props spread to the Link component
   */
  subheader?: string;
  /**
   * Overrides the default page title.
   */
  title?: string,
}
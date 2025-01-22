export interface InitializationParams {
  token: string;
  user_id?: string;
  Application: 'sputnik-monitor' | 'site';
  currentUserChat?: { id: number };
}
export interface sizeWindowParams {
  width: number;
  height: number;
}
export type Response<T = string> = {
  payload: T;
  error?: string;
  success: boolean;
  rows_count: number;
  rows_total: number;
  latency: string;
};
export type InstanceOf<T> = { [K in keyof T]?: T[K] };

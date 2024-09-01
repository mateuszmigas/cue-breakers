/* tslint:disable */
/* eslint-disable */
/**
*/
export class Vector4f {
  free(): void;
/**
* @param {number} x
* @param {number} y
* @param {number} z
* @param {number} w
*/
  constructor(x: number, y: number, z: number, w: number);
/**
*/
  w: number;
/**
*/
  x: number;
/**
*/
  y: number;
/**
*/
  z: number;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_vector4f_free: (a: number) => void;
  readonly __wbg_get_vector4f_x: (a: number) => number;
  readonly __wbg_set_vector4f_x: (a: number, b: number) => void;
  readonly __wbg_get_vector4f_y: (a: number) => number;
  readonly __wbg_set_vector4f_y: (a: number, b: number) => void;
  readonly __wbg_get_vector4f_z: (a: number) => number;
  readonly __wbg_set_vector4f_z: (a: number, b: number) => void;
  readonly __wbg_get_vector4f_w: (a: number) => number;
  readonly __wbg_set_vector4f_w: (a: number, b: number) => void;
  readonly vector4f_new: (a: number, b: number, c: number, d: number) => number;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;

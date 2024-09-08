/* tslint:disable */
/* eslint-disable */
/**
* @param {number} x
* @param {number} y
* @returns {number}
*/
export function run_game(x: number, y: number): number;
/**
* @param {number} x
* @param {number} y
* @returns {number}
*/
export function add_floats(x: number, y: number): number;
/**
* @param {(Sphere)[]} spheres
* @param {TableConfig} table_config
* @param {number} delta_time
* @returns {(Sphere)[]}
*/
export function run_table_simulation(spheres: (Sphere)[], table_config: TableConfig, delta_time: number): (Sphere)[];
/**
*/
export class Sphere {
  free(): void;
/**
* @param {number} id
* @param {Vector4f} position
* @param {Vector4f} rotation
* @param {number} radius
*/
  constructor(id: number, position: Vector4f, rotation: Vector4f, radius: number);
/**
*/
  id: number;
/**
*/
  position: Vector4f;
/**
*/
  radius: number;
/**
*/
  rotation: Vector4f;
}
/**
*/
export class TableConfig {
  free(): void;
/**
* @param {number} height
*/
  constructor(height: number);
}
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
  readonly run_game: (a: number, b: number) => number;
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
  readonly add_floats: (a: number, b: number) => number;
  readonly __wbg_sphere_free: (a: number) => void;
  readonly __wbg_get_sphere_id: (a: number) => number;
  readonly __wbg_set_sphere_id: (a: number, b: number) => void;
  readonly __wbg_get_sphere_position: (a: number) => number;
  readonly __wbg_set_sphere_position: (a: number, b: number) => void;
  readonly __wbg_get_sphere_rotation: (a: number) => number;
  readonly __wbg_set_sphere_rotation: (a: number, b: number) => void;
  readonly __wbg_get_sphere_radius: (a: number) => number;
  readonly __wbg_set_sphere_radius: (a: number, b: number) => void;
  readonly sphere_new: (a: number, b: number, c: number, d: number) => number;
  readonly __wbg_tableconfig_free: (a: number) => void;
  readonly tableconfig_new: (a: number) => number;
  readonly run_table_simulation: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
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

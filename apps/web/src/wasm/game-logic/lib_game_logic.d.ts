/* tslint:disable */
/* eslint-disable */
/**
*/
export enum GameObjectType {
  Ball = 0,
  Cue = 1,
  Table = 2,
}
/**
*/
export class EightBallGameSession {
  free(): void;
/**
* @returns {EightBallGameSession}
*/
  static new(): EightBallGameSession;
/**
* @param {number} delta_time
*/
  update(delta_time: number): void;
/**
* @param {number} count
*/
  add_balls(count: number): void;
/**
*/
  clear_balls(): void;
/**
* @returns {Uint32Array}
*/
  get_objects_ids(): Uint32Array;
/**
* @returns {number}
*/
  get_objects_ptr(): number;
/**
* @returns {number}
*/
  get_objects_count(): number;
}
/**
*/
export class GameObject {
  free(): void;
/**
* @param {number} instance_id
* @param {GameObjectType} type_id
* @returns {GameObject}
*/
  static new(instance_id: number, type_id: GameObjectType): GameObject;
/**
*/
  instance_id: number;
/**
*/
  rigid_body: RigidBody;
/**
*/
  type_id: GameObjectType;
}
/**
*/
export class NineBallGameSession {
  free(): void;
/**
* @returns {NineBallGameSession}
*/
  static new(): NineBallGameSession;
/**
* @param {number} delta_time
*/
  update(delta_time: number): void;
/**
* @returns {number}
*/
  get_objects_ptr(): number;
/**
* @returns {number}
*/
  get_objects_count(): number;
}
/**
*/
export class RigidBody {
  free(): void;
/**
* @returns {RigidBody}
*/
  static default(): RigidBody;
/**
*/
  position: Vector4f;
/**
*/
  rotation: Vector4f;
/**
*/
  scale: number;
/**
*/
  velocity: Vector4f;
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
  readonly __wbg_eightballgamesession_free: (a: number, b: number) => void;
  readonly eightballgamesession_new: () => number;
  readonly eightballgamesession_update: (a: number, b: number) => void;
  readonly eightballgamesession_add_balls: (a: number, b: number) => void;
  readonly eightballgamesession_clear_balls: (a: number) => void;
  readonly eightballgamesession_get_objects_ids: (a: number, b: number) => void;
  readonly eightballgamesession_get_objects_ptr: (a: number) => number;
  readonly eightballgamesession_get_objects_count: (a: number) => number;
  readonly __wbg_gameobject_free: (a: number, b: number) => void;
  readonly __wbg_get_gameobject_instance_id: (a: number) => number;
  readonly __wbg_set_gameobject_instance_id: (a: number, b: number) => void;
  readonly __wbg_get_gameobject_type_id: (a: number) => number;
  readonly __wbg_set_gameobject_type_id: (a: number, b: number) => void;
  readonly __wbg_get_gameobject_rigid_body: (a: number) => number;
  readonly __wbg_set_gameobject_rigid_body: (a: number, b: number) => void;
  readonly gameobject_new: (a: number, b: number) => number;
  readonly __wbg_nineballgamesession_free: (a: number, b: number) => void;
  readonly nineballgamesession_new: () => number;
  readonly nineballgamesession_update: (a: number, b: number) => void;
  readonly nineballgamesession_get_objects_ptr: (a: number) => number;
  readonly nineballgamesession_get_objects_count: (a: number) => number;
  readonly __wbg_rigidbody_free: (a: number, b: number) => void;
  readonly __wbg_get_rigidbody_position: (a: number) => number;
  readonly __wbg_set_rigidbody_position: (a: number, b: number) => void;
  readonly __wbg_get_rigidbody_rotation: (a: number) => number;
  readonly __wbg_set_rigidbody_rotation: (a: number, b: number) => void;
  readonly __wbg_get_rigidbody_velocity: (a: number) => number;
  readonly __wbg_set_rigidbody_velocity: (a: number, b: number) => void;
  readonly __wbg_get_rigidbody_scale: (a: number) => number;
  readonly __wbg_set_rigidbody_scale: (a: number, b: number) => void;
  readonly rigidbody_default: () => number;
  readonly __wbg_vector4f_free: (a: number, b: number) => void;
  readonly __wbg_get_vector4f_x: (a: number) => number;
  readonly __wbg_set_vector4f_x: (a: number, b: number) => void;
  readonly __wbg_get_vector4f_y: (a: number) => number;
  readonly __wbg_set_vector4f_y: (a: number, b: number) => void;
  readonly __wbg_get_vector4f_z: (a: number) => number;
  readonly __wbg_set_vector4f_z: (a: number, b: number) => void;
  readonly __wbg_get_vector4f_w: (a: number) => number;
  readonly __wbg_set_vector4f_w: (a: number, b: number) => void;
  readonly vector4f_new: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;

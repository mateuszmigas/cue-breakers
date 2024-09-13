let wasm;

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}

let cachedDataViewMemory0 = null;

function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

let cachedUint32ArrayMemory0 = null;

function getUint32ArrayMemory0() {
    if (cachedUint32ArrayMemory0 === null || cachedUint32ArrayMemory0.byteLength === 0) {
        cachedUint32ArrayMemory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32ArrayMemory0;
}

function getArrayU32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

function notDefined(what) { return () => { throw new Error(`${what} is not defined`); }; }

const EightBallGameSessionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_eightballgamesession_free(ptr >>> 0, 1));
/**
*/
export class EightBallGameSession {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(EightBallGameSession.prototype);
        obj.__wbg_ptr = ptr;
        EightBallGameSessionFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        EightBallGameSessionFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_eightballgamesession_free(ptr, 0);
    }
    /**
    * @returns {EightBallGameSession}
    */
    static new() {
        const ret = wasm.eightballgamesession_new();
        return EightBallGameSession.__wrap(ret);
    }
    /**
    * @param {number} delta_time
    */
    update(delta_time) {
        wasm.eightballgamesession_update(this.__wbg_ptr, delta_time);
    }
    /**
    * @param {number} count
    */
    add_balls(count) {
        wasm.eightballgamesession_add_balls(this.__wbg_ptr, count);
    }
    /**
    */
    clear_balls() {
        wasm.eightballgamesession_clear_balls(this.__wbg_ptr);
    }
    /**
    * @returns {Uint32Array}
    */
    get_objects_ids() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.eightballgamesession_get_objects_ids(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getArrayU32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {number}
    */
    get_objects_ptr() {
        const ret = wasm.eightballgamesession_get_objects_ptr(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */
    get_objects_count() {
        const ret = wasm.eightballgamesession_get_objects_count(this.__wbg_ptr);
        return ret >>> 0;
    }
}

const GameObjectFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_gameobject_free(ptr >>> 0, 1));
/**
*/
export class GameObject {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GameObjectFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_gameobject_free(ptr, 0);
    }
    /**
    * @returns {number}
    */
    get instance_id() {
        const ret = wasm.__wbg_get_gameobject_instance_id(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} arg0
    */
    set instance_id(arg0) {
        wasm.__wbg_set_gameobject_instance_id(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get type_id() {
        const ret = wasm.__wbg_get_gameobject_type_id(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} arg0
    */
    set type_id(arg0) {
        wasm.__wbg_set_gameobject_type_id(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {Vector4f}
    */
    get position() {
        const ret = wasm.__wbg_get_gameobject_position(this.__wbg_ptr);
        return Vector4f.__wrap(ret);
    }
    /**
    * @param {Vector4f} arg0
    */
    set position(arg0) {
        _assertClass(arg0, Vector4f);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_gameobject_position(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {Vector4f}
    */
    get rotation() {
        const ret = wasm.__wbg_get_gameobject_rotation(this.__wbg_ptr);
        return Vector4f.__wrap(ret);
    }
    /**
    * @param {Vector4f} arg0
    */
    set rotation(arg0) {
        _assertClass(arg0, Vector4f);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_gameobject_rotation(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {number}
    */
    get scale() {
        const ret = wasm.__wbg_get_gameobject_scale(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set scale(arg0) {
        wasm.__wbg_set_gameobject_scale(this.__wbg_ptr, arg0);
    }
}

const NineBallGameSessionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_nineballgamesession_free(ptr >>> 0, 1));
/**
*/
export class NineBallGameSession {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(NineBallGameSession.prototype);
        obj.__wbg_ptr = ptr;
        NineBallGameSessionFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        NineBallGameSessionFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_nineballgamesession_free(ptr, 0);
    }
    /**
    * @returns {NineBallGameSession}
    */
    static new() {
        const ret = wasm.nineballgamesession_new();
        return NineBallGameSession.__wrap(ret);
    }
    /**
    * @param {number} delta_time
    */
    update(delta_time) {
        wasm.nineballgamesession_update(this.__wbg_ptr, delta_time);
    }
    /**
    * @returns {number}
    */
    get_objects_ptr() {
        const ret = wasm.nineballgamesession_get_objects_ptr(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */
    get_objects_count() {
        const ret = wasm.nineballgamesession_get_objects_count(this.__wbg_ptr);
        return ret >>> 0;
    }
}

const Vector4fFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_vector4f_free(ptr >>> 0, 1));
/**
*/
export class Vector4f {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Vector4f.prototype);
        obj.__wbg_ptr = ptr;
        Vector4fFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        Vector4fFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_vector4f_free(ptr, 0);
    }
    /**
    * @returns {number}
    */
    get x() {
        const ret = wasm.__wbg_get_vector4f_x(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set x(arg0) {
        wasm.__wbg_set_vector4f_x(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get y() {
        const ret = wasm.__wbg_get_vector4f_y(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set y(arg0) {
        wasm.__wbg_set_vector4f_y(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get z() {
        const ret = wasm.__wbg_get_vector4f_z(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set z(arg0) {
        wasm.__wbg_set_vector4f_z(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get w() {
        const ret = wasm.__wbg_get_vector4f_w(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set w(arg0) {
        wasm.__wbg_set_vector4f_w(this.__wbg_ptr, arg0);
    }
    /**
    * @param {number} x
    * @param {number} y
    * @param {number} z
    * @param {number} w
    */
    constructor(x, y, z, w) {
        const ret = wasm.vector4f_new(x, y, z, w);
        this.__wbg_ptr = ret >>> 0;
        Vector4fFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_random_4a6f48b07d1eab14 = typeof Math.random == 'function' ? Math.random : notDefined('Math.random');
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };

    return imports;
}

function __wbg_init_memory(imports, memory) {

}

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedDataViewMemory0 = null;
    cachedUint32ArrayMemory0 = null;
    cachedUint8ArrayMemory0 = null;



    return wasm;
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (typeof module !== 'undefined' && Object.getPrototypeOf(module) === Object.prototype)
    ({module} = module)
    else
    console.warn('using deprecated parameters for `initSync()`; pass a single object instead')

    const imports = __wbg_get_imports();

    __wbg_init_memory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (typeof module_or_path !== 'undefined' && Object.getPrototypeOf(module_or_path) === Object.prototype)
    ({module_or_path} = module_or_path)
    else
    console.warn('using deprecated parameters for the initialization function; pass a single object instead')

    if (typeof module_or_path === 'undefined') {
        module_or_path = new URL('lib_game_logic_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    __wbg_init_memory(imports);

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync };
export default __wbg_init;

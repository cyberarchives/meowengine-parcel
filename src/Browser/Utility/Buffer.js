// Browser-compatible Buffer class mimicking Node.js Buffer
// Constants similar to Node.js Buffer
const INSPECT_MAX_BYTES = 50;
const K_MAX_LENGTH = 0x7fffffff; // Maximum ArrayBuffer size in browsers (~2GB)
const ENCODINGS = [
  "utf8",
  "utf-8",
  "hex",
  "base64",
  "ascii",
  "latin1",
  "binary",
  "ucs2",
  "ucs-2",
  "utf16le",
  "utf-16le",
];

// Helper function to check if a value is a valid encoding
function isValidEncoding(encoding) {
  return (
    typeof encoding === "string" && ENCODINGS.includes(encoding.toLowerCase())
  );
}

// Helper function to assert valid size
function assertSize(size) {
  if (
    typeof size !== "number" ||
    size < 0 ||
    size > K_MAX_LENGTH ||
    !Number.isInteger(size)
  ) {
    throw new RangeError("Invalid buffer size");
  }
}

// Helper function to normalize encoding
function normalizeEncoding(encoding) {
  if (!encoding) return "utf8";
  const enc = encoding.toLowerCase();
  if (!isValidEncoding(enc)) {
    throw new TypeError(`Unknown encoding: ${encoding}`);
  }
  if (enc === "latin1" || enc === "binary") return "latin1";
  if (enc === "ucs2" || enc === "ucs-2" || enc === "utf16le") return "utf16le";
  return enc;
}

// Buffer class
export class Buffer extends Uint8Array {
  constructor(arg, encodingOrOffset, length) {
    let buffer;
    let offset = 0;

    if (typeof arg === "number") {
      // Buffer.alloc(size) or new Buffer(size)
      assertSize(arg);
      buffer = new Uint8Array(arg);
    } else if (arg instanceof ArrayBuffer) {
      // Buffer.from(arrayBuffer[, byteOffset[, length]])
      buffer = new Uint8Array(
        arg,
        encodingOrOffset || 0,
        length || arg.byteLength
      );
    } else if (ArrayBuffer.isView(arg)) {
      // Buffer.from(typedArray)
      buffer = new Uint8Array(arg.buffer, arg.byteOffset, arg.byteLength);
    } else if (typeof arg === "string") {
      // Buffer.from(string[, encoding])
      encodingOrOffset = normalizeEncoding(encodingOrOffset || "utf8");
      buffer = Buffer.fromString(arg, encodingOrOffset);
    } else if (Array.isArray(arg)) {
      // Buffer.from(array)
      buffer = new Uint8Array(arg);
    } else if (arg && typeof arg === "object" && "type" in arg && arg.data) {
      // Buffer.from({ type: 'Buffer', data: [...] })
      buffer = new Uint8Array(arg.data);
    } else {
      throw new TypeError(
        "First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object"
      );
    }

    // Inherit from Uint8Array
    super(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  }

  // Static methods

  // Create a new Buffer from a string with specified encoding
  static fromString(str, encoding) {
    if (typeof str !== "string") {
      throw new TypeError("Argument must be a string");
    }
    encoding = normalizeEncoding(encoding);
    let arr;

    switch (encoding) {
      case "utf8":
        const encoder = new TextEncoder();
        return new Uint8Array(encoder.encode(str));
      case "ascii":
      case "latin1":
        arr = new Uint8Array(str.length);
        for (let i = 0; i < str.length; i++) {
          arr[i] = str.charCodeAt(i) & 0xff;
        }
        return arr;
      case "hex":
        str = str.replace(/[^0-9a-fA-F]/g, "");
        if (str.length % 2 !== 0) {
          throw new TypeError("Invalid hex string");
        }
        arr = new Uint8Array(str.length / 2);
        for (let i = 0; i < arr.length; i++) {
          arr[i] = parseInt(str.slice(i * 2, i * 2 + 2), 16);
        }
        return arr;
      case "base64":
        const binary = atob(str);
        arr = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          arr[i] = binary.charCodeAt(i);
        }
        return arr;
      case "utf16le":
        arr = new Uint8Array(str.length * 2);
        for (let i = 0; i < str.length; i++) {
          const code = str.charCodeAt(i);
          arr[i * 2] = code & 0xff;
          arr[i * 2 + 1] = (code >> 8) & 0xff;
        }
        return arr;
      default:
        throw new Error(`Unsupported encoding: ${encoding}`);
    }
  }

  // Buffer.from(...args)
  static from(...args) {
    return new Buffer(...args);
  }

  // Buffer.alloc(size[, fill[, encoding]])
  static alloc(size, fill, encoding) {
    assertSize(size);
    const buf = new Buffer(size);
    if (fill !== undefined) {
      if (typeof fill === "string") {
        buf.fill(fill, encoding);
      } else if (typeof fill === "number") {
        buf.fill(fill);
      } else if (Buffer.isBuffer(fill)) {
        buf.fill(fill);
      }
    }
    return buf;
  }

  // Buffer.allocUnsafe(size)
  static allocUnsafe(size) {
    assertSize(size);
    return new Buffer(size);
  }

  // Buffer.isBuffer(obj)
  static isBuffer(obj) {
    return obj instanceof Buffer;
  }

  // Buffer.isEncoding(encoding)
  static isEncoding(encoding) {
    return isValidEncoding(encoding);
  }

  // Buffer.byteLength(string[, encoding])
  static byteLength(string, encoding) {
    if (typeof string !== "string" && !(string instanceof Buffer)) {
      throw new TypeError("Argument must be a string or Buffer");
    }
    encoding = normalizeEncoding(encoding || "utf8");
    if (Buffer.isBuffer(string)) {
      return string.length;
    }
    switch (encoding) {
      case "utf8":
        return new TextEncoder().encode(string).length;
      case "ascii":
      case "latin1":
        return string.length;
      case "hex":
        return Math.ceil(string.replace(/[^0-9a-fA-F]/g, "").length / 2);
      case "base64":
        return Math.ceil((string.length * 3) / 4);
      case "utf16le":
        return string.length * 2;
      default:
        throw new Error(`Unsupported encoding: ${encoding}`);
    }
  }

  // Buffer.concat(list[, totalLength])
  static concat(list, totalLength) {
    if (!Array.isArray(list)) {
      throw new TypeError("list argument must be an Array");
    }
    if (list.length === 0) {
      return new Buffer(0);
    }
    if (totalLength === undefined) {
      totalLength = list.reduce((sum, buf) => sum + buf.length, 0);
    } else {
      assertSize(totalLength);
    }
    const result = new Buffer(totalLength);
    let offset = 0;
    for (const buf of list) {
      if (!Buffer.isBuffer(buf)) {
        throw new TypeError("All items must be Buffers");
      }
      result.set(buf, offset);
      offset += buf.length;
    }
    return result;
  }

  // Instance methods

  // buf.toString([encoding[, start[, end]]])
  toString(encoding, start = 0, end = this.length) {
    encoding = normalizeEncoding(encoding || "utf8");
    start = Math.max(0, start);
    end = Math.min(this.length, end);
    const slice = this.subarray(start, end);

    switch (encoding) {
      case "utf8":
        return new TextDecoder().decode(slice);
      case "ascii":
      case "latin1":
        let ascii = "";
        for (let i = 0; i < slice.length; i++) {
          ascii += String.fromCharCode(slice[i]);
        }
        return ascii;
      case "hex":
        let hex = "";
        for (let i = 0; i < slice.length; i++) {
          hex += slice[i].toString(16).padStart(2, "0");
        }
        return hex;
      case "base64":
        let binary = "";
        for (let i = 0; i < slice.length; i++) {
          binary += String.fromCharCode(slice[i]);
        }
        return btoa(binary);
      case "utf16le":
        let utf16 = "";
        for (let i = 0; i < slice.length; i += 2) {
          if (i + 1 < slice.length) {
            const code = slice[i] | (slice[i + 1] << 8);
            utf16 += String.fromCharCode(code);
          }
        }
        return utf16;
      default:
        throw new Error(`Unsupported encoding: ${encoding}`);
    }
  }

  // buf.write(string[, offset[, length]][, encoding])
  write(string, offset = 0, length = this.length - offset, encoding) {
    encoding = normalizeEncoding(encoding || "utf8");
    const buf = Buffer.fromString(string, encoding);
    length = Math.min(length, buf.length, this.length - offset);
    this.set(buf.subarray(0, length), offset);
    return length;
  }

  // buf.fill(value[, offset[, end]][, encoding])
  fill(value, offset = 0, end = this.length, encoding) {
    offset = Math.max(0, offset);
    end = Math.min(this.length, end);

    if (typeof value === "string") {
      if (encoding) {
        value = Buffer.from(value, encoding);
      } else {
        value = value.charCodeAt(0);
      }
    }

    if (typeof value === "number") {
      for (let i = offset; i < end; i++) {
        this[i] = value & 0xff;
      }
    } else if (Buffer.isBuffer(value)) {
      for (let i = offset; i < end; i++) {
        this[i] = value[i % value.length];
      }
    } else {
      throw new TypeError("value must be a number, string, or Buffer");
    }
    return this;
  }

  // buf.slice([start[, end]])
  slice(start = 0, end = this.length) {
    return new Buffer(this.subarray(start, end));
  }

  // buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])
  copy(target, targetStart = 0, sourceStart = 0, sourceEnd = this.length) {
    if (!Buffer.isBuffer(target)) {
      throw new TypeError("target must be a Buffer");
    }
    targetStart = Math.max(0, targetStart);
    sourceStart = Math.max(0, sourceStart);
    sourceEnd = Math.min(this.length, sourceEnd);
    const length = Math.min(
      sourceEnd - sourceStart,
      target.length - targetStart
    );
    target.set(this.subarray(sourceStart, sourceStart + length), targetStart);
    return length;
  }

  // buf.equals(otherBuffer)
  equals(otherBuffer) {
    if (!Buffer.isBuffer(otherBuffer)) {
      return false;
    }
    if (this.length !== otherBuffer.length) {
      return false;
    }
    for (let i = 0; i < this.length; i++) {
      if (this[i] !== otherBuffer[i]) {
        return false;
      }
    }
    return true;
  }

  // buf.compare(otherBuffer)
  compare(otherBuffer) {
    if (!Buffer.isBuffer(otherBuffer)) {
      throw new TypeError("Argument must be a Buffer");
    }
    const len = Math.min(this.length, otherBuffer.length);
    for (let i = 0; i < len; i++) {
      if (this[i] < otherBuffer[i]) return -1;
      if (this[i] > otherBuffer[i]) return 1;
    }
    return this.length - otherBuffer.length;
  }

  // buf.indexOf(value[, byteOffset][, encoding])
  indexOf(value, byteOffset = 0, encoding) {
    if (typeof value === "string") {
      value = Buffer.from(value, encoding);
    } else if (typeof value === "number") {
      value = [value & 0xff];
    } else if (!Buffer.isBuffer(value)) {
      throw new TypeError("value must be a string, number, or Buffer");
    }

    byteOffset = Math.max(0, byteOffset);
    for (let i = byteOffset; i <= this.length - value.length; i++) {
      let found = true;
      for (let j = 0; j < value.length; j++) {
        if (this[i + j] !== value[j]) {
          found = false;
          break;
        }
      }
      if (found) return i;
    }
    return -1;
  }

  // buf.toJSON()
  toJSON() {
    return {
      type: "Buffer",
      data: Array.from(this),
    };
  }

  // buf.inspect()
  inspect() {
    let str = "";
    const max = INSPECT_MAX_BYTES;
    str = this.toString("hex", 0, max)
      .replace(/(.{2})/g, "$1 ")
      .trim();
    if (this.length > max) str += " ... ";
    return `<Buffer ${str}>`;
  }

  readUInt8(offset = 0) {
    if (offset < 0 || offset >= this.length) {
      throw new RangeError("Offset is out of bounds");
    }
    return this[offset];
  }

  // Read an unsigned 16-bit integer (little-endian)
  readUInt16LE(offset = 0) {
    if (offset < 0 || offset + 1 >= this.length) {
      throw new RangeError("Offset is out of bounds");
    }
    return this[offset] | (this[offset + 1] << 8);
  }

  // Read an unsigned 16-bit integer (big-endian)
  readUInt16BE(offset = 0) {
    if (offset < 0 || offset + 1 >= this.length) {
      throw new RangeError("Offset is out of bounds");
    }
    return (this[offset] << 8) | this[offset + 1];
  }

  // Read an unsigned 32-bit integer (little-endian)
  readUInt32LE(offset = 0) {
    if (offset < 0 || offset + 3 >= this.length) {
      throw new RangeError("Offset is out of bounds");
    }
    return (
      (this[offset] |
        (this[offset + 1] << 8) |
        (this[offset + 2] << 16) |
        (this[offset + 3] * 0x1000000)) >>>
      0
    ); // Ensure unsigned
  }

  // Read an unsigned 32-bit integer (big-endian)
  readUInt32BE(offset = 0) {
    if (offset < 0 || offset + 3 >= this.length) {
      throw new RangeError("Offset is out of bounds");
    }
    return (
      (this[offset] * 0x1000000 +
        (this[offset + 1] << 16) +
        (this[offset + 2] << 8) +
        this[offset + 3]) >>>
      0
    ); // Ensure unsigned
  }

  // Read a signed 8-bit integer
  readInt8(offset = 0) {
    if (offset < 0 || offset >= this.length) {
      throw new RangeError("Offset is out of bounds");
    }
    return (this[offset] << 24) >> 24; // Sign-extend
  }

  // Read a signed 16-bit integer (little-endian)
  readInt16LE(offset = 0) {
    if (offset < 0 || offset + 1 >= this.length) {
      throw new RangeError("Offset is out of bounds");
    }
    return ((this[offset] | (this[offset + 1] << 8)) << 16) >> 16; // Sign-extend
  }

  // Read a signed 16-bit integer (big-endian)
  readInt16BE(offset = 0) {
    if (offset < 0 || offset + 1 >= this.length) {
      throw new RangeError("Offset is out of bounds");
    }
    return (((this[offset] << 8) | this[offset + 1]) << 16) >> 16; // Sign-extend
  }

  // Read a signed 32-bit integer (little-endian)
  readInt32LE(offset = 0) {
    if (offset < 0 || offset + 3 >= this.length) {
      throw new RangeError("Offset is out of bounds");
    }
    return (
      (this[offset] |
        (this[offset + 1] << 8) |
        (this[offset + 2] << 16) |
        (this[offset + 3] << 24)) >>
      0
    ); // Sign-extend
  }

  // Read a signed 32-bit integer (big-endian)
  readInt32BE(offset = 0) {
    if (offset < 0 || offset + 3 >= this.length) {
      throw new RangeError("Offset is out of bounds");
    }
    return (
      ((this[offset] << 24) |
        (this[offset + 1] << 16) |
        (this[offset + 2] << 8) |
        this[offset + 3]) >>
      0
    ); // Sign-extend
  }

  // Instance methods for writing numeric values

  // Write an unsigned 8-bit integer
  writeUInt8(value, offset = 0) {
    if (offset < 0 || offset >= this.length) {
      throw new RangeError("Offset is out of bounds");
    }
    if (value < 0 || value > 0xff) {
      throw new RangeError("Value out of range");
    }
    this[offset] = value & 0xff;
    return offset + 1;
  }

  // Write an unsigned 16-bit integer (little-endian)
  writeUInt16LE(value, offset = 0) {
    if (offset < 0 || offset + 1 >= this.length) {
      throw new RangeError("Offset is out of bounds");
    }
    if (value < 0 || value > 0xffff) {
      throw new RangeError("Value out of range");
    }
    this[offset] = value & 0xff;
    this[offset + 1] = (value >> 8) & 0xff;
    return offset + 2;
  }

  // Write an unsigned 16-bit integer (big-endian)
  writeUInt16BE(value, offset = 0) {
    if (offset < 0 || offset + 1 >= this.length) {
      throw new RangeError("Offset is out of bounds");
    }
    if (value < 0 || value > 0xffff) {
      throw new RangeError("Value out of range");
    }
    this[offset] = (value >> 8) & 0xff;
    this[offset + 1] = value & 0xff;
    return offset + 2;
  }

  // Write an unsigned 32-bit integer (little-endian)
  writeUInt32LE(value, offset = 0) {
    if (offset < 0 || offset + 3 >= this.length) {
      throw new RangeError("Offset is out of bounds");
    }
    if (value < 0 || value > 0xffffffff) {
      throw new RangeError("Value out of range");
    }
    this[offset] = value & 0xff;
    this[offset + 1] = (value >> 8) & 0xff;
    this[offset + 2] = (value >> 16) & 0xff;
    this[offset + 3] = (value >> 24) & 0xff;
    return offset + 4;
  }

  // Write an unsigned 32-bit integer (big-endian)
  writeUInt32BE(value, offset = 0) {
    if (offset < 0 || offset + 3 >= this.length) {
      throw new RangeError("Offset is out of bounds");
    }
    if (value < 0 || value > 0xffffffff) {
      throw new RangeError("Value out of range");
    }
    this[offset] = (value >> 24) & 0xff;
    this[offset + 1] = (value >> 16) & 0xff;
    this[offset + 2] = (value >> 8) & 0xff;
    this[offset + 3] = value & 0xff;
    return offset + 4;
  }

  // Write a signed 8-bit integer
  writeInt8(value, offset = 0) {
    if (offset < 0 || offset >= this.length) {
      throw new RangeError("Offset is out of bounds");
    }
    if (value < -0x80 || value > 0x7f) {
      throw new RangeError("Value out of range");
    }
    this[offset] = value & 0xff;
    return offset + 1;
  }

  // Write a signed 16-bit integer (little-endian)
  writeInt16LE(value, offset = 0) {
    if (offset < 0 || offset + 1 >= this.length) {
      throw new RangeError("Offset is out of bounds");
    }
    if (value < -0x8000 || value > 0x7fff) {
      throw new RangeError("Value out of range");
    }
    this[offset] = value & 0xff;
    this[offset + 1] = (value >> 8) & 0xff;
    return offset + 2;
  }

  // Write a signed 16-bit integer (big-endian)
  writeInt16BE(value, offset = 0) {
    if (offset < 0 || offset + 1 >= this.length) {
      throw new RangeError("Offset is out of bounds");
    }
    if (value < -0x8000 || value > 0x7fff) {
      throw new RangeError("Value out of range");
    }
    this[offset] = (value >> 8) & 0xff;
    this[offset + 1] = value & 0xff;
    return offset + 2;
  }

  // Write a signed 32-bit integer (little-endian)
  writeInt32LE(value, offset = 0) {
    if (offset < 0 || offset + 3 >= this.length) {
      throw new RangeError("Offset is out of bounds");
    }
    if (value < -0x80000000 || value > 0x7fffffff) {
      throw new RangeError("Value out of range");
    }
    this[offset] = value & 0xff;
    this[offset + 1] = (value >> 8) & 0xff;
    this[offset + 2] = (value >> 16) & 0xff;
    this[offset + 3] = (value >> 24) & 0xff;
    return offset + 4;
  }

  // Write a signed 32-bit integer (big-endian)
  writeInt32BE(value, offset = 0) {
    if (offset < 0 || offset + 3 >= this.length) {
      throw new RangeError("Offset is out of bounds");
    }
    if (value < -0x80000000 || value > 0x7fffffff) {
      throw new RangeError("Value out of range");
    }
    this[offset] = (value >> 24) & 0xff;
    this[offset + 1] = (value >> 16) & 0xff;
    this[offset + 2] = (value >> 8) & 0xff;
    this[offset + 3] = value & 0xff;
    return offset + 4;
  }

  // Add to the existing Buffer class
  readFloatBE(offset = 0) {
    if (offset < 0 || offset + 3 >= this.length) {
      throw new RangeError("Offset is out of bounds");
    }
    const view = new DataView(this.buffer, this.byteOffset + offset, 4);
    return view.getFloat32(0, false); // false for big-endian
  }

  readFloatLE(offset = 0) {
    if (offset < 0 || offset + 3 >= this.length) {
      throw new RangeError("Offset is out of bounds");
    }
    const view = new DataView(this.buffer, this.byteOffset + offset, 4);
    return view.getFloat32(0, true); // true for little-endian
  }

  writeFloatBE(value, offset = 0) {
    if (offset < 0 || offset + 3 >= this.length) {
      throw new RangeError("Offset is out of bounds");
    }
    if (typeof value !== "number") {
      throw new TypeError("Value must be a number");
    }
    const view = new DataView(this.buffer, this.byteOffset + offset, 4);
    view.setFloat32(0, value, false); // false for big-endian
    return offset + 4;
  }

  writeFloatLE(value, offset = 0) {
    if (offset < 0 || offset + 3 >= this.length) {
      throw new RangeError("Offset is out of bounds");
    }
    if (typeof value !== "number") {
      throw new TypeError("Value must be a number");
    }
    const view = new DataView(this.buffer, this.byteOffset + offset, 4);
    view.setFloat32(0, value, true); // true for little-endian
    return offset + 4;
  }
}

export default Buffer;

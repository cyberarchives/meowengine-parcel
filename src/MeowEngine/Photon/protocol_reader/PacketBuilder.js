import { DataType, PacketType } from './constants';
import { ProtocolWriter } from './ProtocolWriter';
import { Buffer } from "../../../Browser/Utility/Buffer";

/**
 * PacketBuilder - A utility class for building protocol packets
 * 
 * This class provides a fluent interface for constructing various types of packets
 * based on the protocol defined in ProtocolReader and ProtocolWriter.
 */
export class PacketBuilder {
  /**
   * Create a new PacketBuilder instance
   */
  constructor() {
    this.writer = new ProtocolWriter();
    this.packetType = null;
    this.operationCode = null;
    this.parameters = {};
  }

  /**
   * Start building an OperationRequest packet
   * @param {number} operationCode - The operation code for the request
   * @returns {PacketBuilder} - Returns this for chaining
   */
  operation(operationCode) {
    this.packetType = PacketType.Operation;
    this.operationCode = operationCode;
    return this;
  }

  /**
   * Start building an InternalOperationRequest packet
   * @param {number} operationCode - The operation code for the request
   * @returns {PacketBuilder} - Returns this for chaining
   */
  internalOperation(operationCode) {
    this.packetType = PacketType.InternalOperationRequest;
    this.operationCode = operationCode;
    return this;
  }

  /**
   * Start building an Event packet
   * @param {number} eventCode - The event code
   * @returns {PacketBuilder} - Returns this for chaining
   */
  event(eventCode) {
    this.packetType = PacketType.Event;
    this.operationCode = eventCode; // reusing operationCode field for eventCode
    return this;
  }

  /**
   * Start building an InitResponse packet
   * @returns {PacketBuilder} - Returns this for chaining
   */
  initResponse() {
    this.packetType = PacketType.InitResponse;
    return this;
  }

  /**
   * Add a string parameter to the packet
   * @param {number} key - The parameter key
   * @param {string} value - The string value
   * @returns {PacketBuilder} - Returns this for chaining
   */
  withString(key, value) {
    this.parameters[key] = value;
    return this;
  }

  /**
   * Add a byte array parameter to the packet
   * @param {number} key - The parameter key
   * @param {Buffer|Uint8Array} value - The byte array value
   * @returns {PacketBuilder} - Returns this for chaining
   */
  withBytes(key, value) {
    this.parameters[key] = Buffer.from(value);
    return this;
  }

  /**
   * Add an integer parameter to the packet
   * @param {number} key - The parameter key
   * @param {number} value - The integer value
   * @returns {PacketBuilder} - Returns this for chaining
   */
  withInteger(key, value) {
    this.parameters[key] = { 
      writeType: (writer) => writer.writeUint8(DataType.Integer),
      writeValue: (writer) => writer.writeInt32(value)
    };
    return this;
  }

  /**
   * Add a short parameter to the packet
   * @param {number} key - The parameter key
   * @param {number} value - The short value
   * @returns {PacketBuilder} - Returns this for chaining
   */
  withShort(key, value) {
    this.parameters[key] = { 
      writeType: (writer) => writer.writeUint8(DataType.Short),
      writeValue: (writer) => writer.writeInt16(value)
    };
    return this;
  }

  /**
   * Add a boolean parameter to the packet
   * @param {number} key - The parameter key
   * @param {boolean} value - The boolean value
   * @returns {PacketBuilder} - Returns this for chaining
   */
  withBoolean(key, value) {
    this.parameters[key] = value;
    return this;
  }

  /**
   * Add a float parameter to the packet
   * @param {number} key - The parameter key
   * @param {number} value - The float value
   * @returns {PacketBuilder} - Returns this for chaining
   */
  withFloat(key, value) {
    this.parameters[key] = { 
      writeType: (writer) => writer.writeUint8(DataType.Float),
      writeValue: (writer) => writer.writeFloat32(value)
    };
    return this;
  }

  /**
   * Add a double parameter to the packet
   * @param {number} key - The parameter key
   * @param {number} value - The double value
   * @returns {PacketBuilder} - Returns this for chaining
   */
  withDouble(key, value) {
    this.parameters[key] = { 
      writeType: (writer) => writer.writeUint8(DataType.Double),
      writeValue: (writer) => writer.writeFloat64(value)
    };
    return this;
  }

  /**
   * Add a string array parameter to the packet
   * @param {number} key - The parameter key
   * @param {string[]} value - The string array value
   * @returns {PacketBuilder} - Returns this for chaining
   */
  withStringArray(key, value) {
    this.parameters[key] = value;
    return this;
  }

  /**
   * Add an integer array parameter to the packet
   * @param {number} key - The parameter key
   * @param {number[]} value - The integer array value
   * @returns {PacketBuilder} - Returns this for chaining
   */
  withIntArray(key, value) {
    this.parameters[key] = new Int32Array(value);
    return this;
  }

  /**
   * Add a hashtable parameter to the packet
   * @param {number} key - The parameter key
   * @param {Object} value - The hashtable value
   * @returns {PacketBuilder} - Returns this for chaining
   */
  withHashtable(key, value) {
    this.parameters[key] = value;
    return this;
  }

  /**
   * Add a generic object array parameter to the packet
   * @param {number} key - The parameter key
   * @param {Array} value - The object array value
   * @returns {PacketBuilder} - Returns this for chaining
   */
  withObjectArray(key, value) {
    this.parameters[key] = value;
    return this;
  }

  /**
   * Add a null parameter to the packet
   * @param {number} key - The parameter key
   * @returns {PacketBuilder} - Returns this for chaining
   */
  withNull(key) {
    this.parameters[key] = null;
    return this;
  }

  /**
   * Add a custom parameter to the packet
   * @param {number} key - The parameter key
   * @param {any} value - The parameter value
   * @returns {PacketBuilder} - Returns this for chaining
   */
  withParam(key, value) {
    this.parameters[key] = value;
    return this;
  }

  /**
   * Build the packet and return it as a Buffer
   * @returns {Buffer} - The constructed packet as a Buffer
   * @throws {Error} - If packet type is not set
   */
  build() {
    if (this.packetType === null) {
      throw new Error('Packet type not set');
    }

    const writer = new ProtocolWriter();
    writer.writeUint8(0xF3); // Magic byte
    writer.writeUint8(this.packetType);

    switch (this.packetType) {
      case PacketType.Operation:
      case PacketType.InternalOperationRequest:
        writer.writeUint8(this.operationCode);
        writer.writeParameterTable(this.parameters);
        break;
      case PacketType.Event:
        writer.writeUint8(this.operationCode); // Event code
        writer.writeParameterTable(this.parameters);
        break;
      case PacketType.InitResponse:
        // Implement InitResponse packet structure
        // This might need customization based on the specifics
        writer.writeParameterTable(this.parameters);
        break;
      default:
        throw new Error(`Unsupported packet type: ${this.packetType}`);
    }

    return writer.toBytes();
  }
}

/**
 * Convenience function to create a new PacketBuilder
 * @returns {PacketBuilder} - A new PacketBuilder instance
 */
export function createPacket() {
  return new PacketBuilder();
}

export default PacketBuilder;
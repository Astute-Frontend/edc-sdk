import * as ref from "ref-napi";
import struct from "ref-struct-di";

export interface IAstuteStuctType {
  messageType: number;
  bufferBody: Buffer;
}

export class AstuteStructTypeHeader {
  type: ref.Type<number> = ref.types.uint;
  len: ref.Type<number> = ref.types.uint;
  state: ref.Type<number> = ref.types.int;
}

export default class AstuteStuctType implements IAstuteStuctType {
  constructor(option: IAstuteStuctType) {
    this.messageType = option.messageType;
    this.bufferBody = option.bufferBody;

    this.initHead();
  }

  messageType: number;
  bufferBody: Buffer;
  
  private headStructObject!: struct.StructObject<any>;

  initHead () {
    const StructType = struct(ref);

    const Head = StructType<any>(new AstuteStructTypeHeader());

    const bufferHead = new Buffer(Head.size);

    this.headStructObject = new Head(bufferHead);
  }

  getBufferMessage () {
    this.headStructObject.type = this.messageType;
    this.headStructObject.len = this.bufferBody.toString("ascii").length;
    this.headStructObject.state = 0;

    return Buffer.concat([this.headStructObject, this.bufferBody])
  }
}
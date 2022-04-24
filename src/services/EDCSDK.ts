import { ChildProcess, SpawnOptions } from "child_process";
import BaseService from "../core/service/base";
import { Api, ApiRequest, ApiResponse, Service } from "../core/service/decorator";
import Desktop from "../models/Desktop";
import AstuteStuctType from "../models/AstuteStuctType";
import { Socket } from "net";

export interface IEDCSDK {
  init: Function;
  refresh: Function;
  destroyed: Function;
}

@Service("EDCSDK")
export default class EDCSDK extends BaseService<IEDCSDK> {
  // 初始化

  @Api({
    namespace: "init",
    type: "CMD",
    option: {
      command: "/usr/local/edc/edc"
    }
  })
  init(@ApiRequest() requestParams?: SpawnOptions, @ApiResponse() responseParams?: ChildProcess) {
    responseParams?.stdout?.on("data", (chunk: string) => {
      console.log("init methods", chunk);
    });
  }

  // 刷新桌面列表
  @Api({
    namespace: "refresh",
    type: "PIPE",
    option: {
      path: "\\\\.\\pipe\\pipe_atusbserver_atdesktopclient"
    },
    before: (requestParam) => new Promise((resolve, reject) => {
      const desktopList: Desktop[] = (requestParam as Desktop[]).map((item) => new Desktop(item as Desktop));

      const bufferBody = Buffer.from(JSON.stringify(desktopList));
      
      resolve(new AstuteStuctType({
        messageType: 5,
        bufferBody
      }).getBufferMessage());
    })
  })
  refresh(@ApiRequest() desktopList: Desktop[], @ApiResponse() responseParams?: Socket) {
    console.log("refresh methods");
    responseParams?.on("data", (chunk: Buffer) => {
      console.log(chunk.toString());
    });
    // todo
  }

  // 销毁

  destroyed() {
    console.log("destroyed methods")
  }
}
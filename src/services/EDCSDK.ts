import { ChildProcess, SpawnOptions , spawn, exec, Serializable} from "child_process";
import BaseService from "../core/service/base";
import { Api, ApiRequest, ApiResponse, Service } from "../core/service/decorator";
import Desktop from "../models/Desktop";
import AstuteStuctType from "../models/AstuteStuctType";
import { Socket } from "net";
import fs from "fs";
import path from "path";
import { createConnection, NetConnectOpts } from "net";

export interface IEDCSDK {
  init: Function;
  refresh: Function;
  destroyed: Function;
}

export default class EDCSDK{
  constructor(option: {
    sdkPath: string;
    sockPath: string;
  }) {
    this.sdkPath = option.sdkPath;
    this.sockPath = option.sockPath;
  }

  private sdkPath: string;
  private sockPath: string;
  private socket?: Socket;

  // 初始化
  init() {
    return new Promise((resolve, reject) => {
      const runCMD = `sudo ${ this.sdkPath }`;
      const searchChildProcess = exec(`ps -ef | grep '${ this.sdkPath }' | grep -v grep | awk '{print $2}'`, (error, stdout) => {
        if (error) {
          console.log("log", error);
        }
        console.log("stdout", stdout);
        if (!stdout) {
          const runChildProcess = exec(runCMD, (error, stdout) => {
            if(error) {
              console.log("error", error);
            }
            console.log("stdout", stdout);
          });

          runChildProcess.stdout?.on("data", (chunk: Buffer) => {
            console.log("data", chunk);
            if (chunk.indexOf("success") != -1) {
              this.setSocket().then((socket) => {
                resolve(socket);
              })
            }
          });
        } else {
          this.setSocket().then((socket) => {
            resolve(socket);
          })
        }
      });
    });

    // const runChildPeocess = spawn(runCMD);
  }

  setSocket() {
    return new Promise((resolve, reject) => {
      this.socket = createConnection({
        path: this.sockPath,
        allowHalfOpen: true
      });
      this.socket?.once("connect", () => {
        console.log("connected");
        resolve(this.socket);
      });
      this.socket.on("error", (error) => {
        console.log("error", error);
      })
    });
  }

  // 刷新桌面列表
  refresh(desktopList: Desktop[]) {
    const _desktopList: Desktop[] = (desktopList as Desktop[]).map((item) => new Desktop(item as Desktop));

      const bufferBody = Buffer.from(JSON.stringify(desktopList));
      
      const message = new AstuteStuctType({
        messageType: 5,
        bufferBody
      }).getBufferMessage()

      this.socket?.write(message);
    // todo
  }

  // // 销毁

  // destroyed() {
  //   console.log("destroyed methods")
  // }
}
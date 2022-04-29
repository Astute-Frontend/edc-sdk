import EDCSDK from "../services/EDCSDK";
import http from "http";
import net from "net";

const edcsdk = new EDCSDK({
  sdkPath: "/usr/local/edc/EDC",
  sockPath: "/usr/local/edc/atusbd_client.sock"
});

edcsdk.init().then(() => {
    edcsdk.refresh([
    {
      "name": "desktop1",
      "ip": "192.168.2.222",
      "port": "6666",
      "gwip": "192.168.2.1",
      "gwport": "4232",
      "username": "user",
      "pwd": "password",
      "usbrule": {
        "listtype": "0",
        "rulelist": [
          {
            "type": "0",
            "vendor": "1455",
            "product": "96",
          },
          {
            "type": "1",
            "ifcls": "3",
            "ifsubcls": "1",
            "ifpro": "1"
          },
          {
            "type": "2",
            "devcls": "9",
            "devsubcls": "1",
            "devpro": "1"
          }
  
        ],
        "exceptionlist": [
          {
            "type": "0",
            "vendor": "1455",
            "product": "96",
            "enable": "1"
          },
          {
            "type": "1",
            "ifcls": "3",
            "ifsubcls": "1",
            "ifpro": "1",
            "enable": "0",
          },
          {
            "type": "2",
            "devcls": "9",
            "devsubcls": "1",
            "devpro": "1",
            "enable": "1"
          }
        ]
      }
    }
  ]);
});
// // edcsdk.destroyed();

const server = new http.Server();

server.listen(10234, () => {
  console.log("listening");
});

// server.on("request", () => {
//   edcsdk.refresh([
//     {
//       "name": "desktop1",
//       "ip": "192.168.2.222",
//       "port": "6666",
//       "gwip": "192.168.2.1",
//       "gwport": "4232",
//       "username": "user",
//       "pwd": "password",
//       "usbrule": {
//         "listtype": "0",
//         "rulelist": [
//           {
//             "type": "0",
//             "vendor": "1455",
//             "product": "96",
//           },
//           {
//             "type": "1",
//             "ifcls": "3",
//             "ifsubcls": "1",
//             "ifpro": "1"
//           },
//           {
//             "type": "2",
//             "devcls": "9",
//             "devsubcls": "1",
//             "devpro": "1"
//           }
  
//         ],
//         "exceptionlist": [
//           {
//             "type": "0",
//             "vendor": "1455",
//             "product": "96",
//             "enable": "1"
//           },
//           {
//             "type": "1",
//             "ifcls": "3",
//             "ifsubcls": "1",
//             "ifpro": "1",
//             "enable": "0",
//           },
//           {
//             "type": "2",
//             "devcls": "9",
//             "devsubcls": "1",
//             "devpro": "1",
//             "enable": "1"
//           }
//         ]
//       }
//     }
//   ]);
// });
// try {
//   const socket = net.createConnection({
//     path: "/home/astute/桌面/edc/atusbd_client.sock",
//     allowHalfOpen: true
//   });

//   socket?.once("connect", () => {
//     console.log("socket is connected");
//   });
// } catch (error) {
//   console.log("socket has error", error);
// }
// server.on("request", () => {
  
// });
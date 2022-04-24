import EDCSDK from "../services/EDCSDK";

const edcsdk = new EDCSDK();

edcsdk.init();
edcsdk.refresh([
  {
    "name": "desktop1",
    "ip": "192.168.2.222",
    "port": 6666,
    "gwip": "192.168.2.1",
    "gwport": 4232,
    "username": "user",
    "pwd": "password",
    "usbrule": {
      "listtype": 0,
      "rulelist": [
        {
          "type": 0,
          "vendor": 1455,
          "product": 96,
        },
        {
          "type": 1,
          "ifcls": 3,
          "ifsubcls": 1,
          "ifpro": 1
        },
        {
          "type": 2,
          "devcls": 9,
          "devsubcls": 1,
          "devpro": 1
        }

      ],
      "exceptionlist": [
        {
          "type": 0,
          "vendor": 1455,
          "product": 96,
          "enable": 1
        },
        {
          "type": 1,
          "ifcls": 3,
          "ifsubcls": 1,
          "ifpro": 1,
          "enable": 0,
        },
        {
          "type": 2,
          "devcls": 9,
          "devsubcls": 1,
          "devpro": 1,
          "enable": 1
        }
      ]
    }
  }
]);
edcsdk.destroyed();
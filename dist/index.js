"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const web_js_1 = require("./application/web.js");
const PORT = 3000;
const HOST = '0.0.0.0';
web_js_1.web.listen(PORT, HOST, () => {
    const ipAddress = '127.0.0.1';
    console.info(`App Starting on IP: ${ipAddress} and Port: ${PORT}`);
});

import { web } from "./application/web.js";
import { logger } from "./application/logging.js";

const PORT = 3000;
const HOST = '0.0.0.0';

web.listen(PORT, HOST, () => {
    const ipAddress = '127.0.0.1';
    console.info(`App Starting on IP: ${ipAddress} and Port: ${PORT}`);
});
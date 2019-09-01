import * as RpiMfrc522 from "rpi-mfrc522";
import { config } from "./config";

const settings = {
    resetGPIO: config.PIN_RESET,
    resetTime: config.RESET_TIME,
    spiBus: config.BUS,
    spiDevice: config.DEVICE,
};

const mfrc522 = new RpiMfrc522(settings);
const blockNumber = parseInt(process.argv[2]);

if (process.argv.length > 3 || !blockNumber) {
    console.error("========== You must specify only one numeric argument! ==========");
    process.exit(1);
}

console.info("\n\n----------Starting utility--------------");
console.info("Using KEY:\t", config.KEY_A);
console.info("Reading BLOCK:\t", blockNumber);
console.info("Write DATA:\t", config.NEW_DATA_BLOCK);
console.info("----------Finished----------\n\n");

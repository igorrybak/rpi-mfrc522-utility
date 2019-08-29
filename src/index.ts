import * as RpiMfrc522 from "rpi-mfrc522";
import { config } from "./config";

export default class MFRC {
    protected settings = {
        resetGPIO: config.PIN_RESET,
        resetTime: config.RESET_TIME,
        spiBus: config.BUS,
        spiDevice: config.DEVICE,
    };

    mfrc522 = new RpiMfrc522(this.settings);
}

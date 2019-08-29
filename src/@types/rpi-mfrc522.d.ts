/// <reference types="node" />

declare module "rpi-mfrc522" {
    class Mfrc522 {
        constructor(settings: Mfrc522.MfrcSettings);
        init(): Promise<this>;
        destroy(): Promise<this>;
        cardPresent(): Promise<boolean>;
        antiCollision(): Promise<number[] | false>;
        selectCard(uid: number[]): Promise<boolean>;
        auth1A(sector: number, key: number[], uid: number[]): Promise<boolean>;
        stopCrypto1(): Promise<void>;
        readSector(sector: number): Promise<number[]>;
        writeSector(sector: number, data: number[]): Promise<void>;
        calculateCRC(data: number[]): Promise<number[]>;
        idlePCD(): Promise<void>;
        resetPCD(): Promise<void>;
        toCard(command: number, data: number[]): Promise<Mfrc522.CardResponses>;
        hardwareReset(): Promise<void>;
    }

    namespace Mfrc522 {
        export interface MfrcSettings {
            resetGPIO: number;
            resetTime: number;
            spiBus: number;
            spiDevice: number;
        }

        export interface CardResponses {
            status: number;
            backData?: number[];
            backLen?: number;
        }
    }

    export = Mfrc522;
}

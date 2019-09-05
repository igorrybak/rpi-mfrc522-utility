import * as RpiMfrc522 from "rpi-mfrc522";
import { mfrcSettings, config } from "./config";
import { sleep } from "./tools";

(async function() {
    try {
        await main();
    } catch (err) {
        console.error("ERROR:", err.message);
    }
})();

async function main() {
    const mfrc522 = new RpiMfrc522(mfrcSettings);
    const blockNumber = parseInt(process.argv[2]);

    if (process.argv.length > 3 || !blockNumber || typeof blockNumber != "number") {
        console.error(
            "Usage:\n\x1b[32mnpm run read [SECTOR_NUMBER]",
            "\x1b[0m",
            "\nFor example the command 'npm run read 7' will read data from block number 7.\n",
        );
        process.exit(0);
    }

    console.info("\n----------Starting READ utility--------------");
    console.info("Using KEY:\t", config.KEY_A);
    console.info("Reading BLOCK:\t", blockNumber);

    await mfrc522.init();
    await loop();

    async function loop() {
        console.log("..............Card searching..............");
        await cardTest();
    }

    function reLoop() {
        setTimeout(loop, config.READ_SLEEP_TIME);
    }

    async function cardTest() {
        await mfrc522.stopCrypto1();
        if (!(await mfrc522.cardPresent())) {
            console.log("No card");
            return reLoop();
        }
        let uid = await mfrc522.antiCollision();
        if (!uid) {
            console.log("Collision");
            return reLoop();
        } else {
            console.log("Card UID: ", uid);
        }
        let select = await mfrc522.selectCard(uid);
        if (!select) {
            console.log("Select card failed");
            return reLoop();
        }
        let auth = await mfrc522.auth1A(blockNumber, config.KEY_A, uid);
        if (!auth) {
            console.log("Auth failed");
            console.log("You could change KEY in config.ts");
            return reLoop();
        }
        let data = await mfrc522.readSector(blockNumber);
        if (!data) {
            console.log("Read block failed");
            return reLoop();
        }

        console.log(`Data from block № ${blockNumber}: `, data);
        await sleep(config.SUCCESS_SLEEP_TIME);

        await mfrc522.resetPCD();
        reLoop();
    }
}

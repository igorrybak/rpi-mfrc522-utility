# rpi-mfrc522
Command line utility for reading and writing RFID cards with Raspberry PI, based on [rpi-mfrc522](https://www.npmjs.com/package/rpi-mfrc522) with typings.

# Usage
1. `git clone https://github.com/zathershtein/rpi-mfrc522-utility.git`
2. `cd rpi-mfrc522-utility`
3. `npm i`
4. `npm run read [SECTOR_NUMBER]` or `npm run write [SECTOR_NUMBER]`

Data will be writing is located in "config.ts" file in "NEW_DATA_BLOCK" property.
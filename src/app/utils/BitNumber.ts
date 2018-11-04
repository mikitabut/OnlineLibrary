export class BitNumber {
    private bytes: (0 | 1)[];

    constructor(
        countOfBits = 64,
        optionalParams: { initBit?: 0 | 1; initValue?: BitNumber } = { initBit: 0 },
    ) {
        this.bytes = [];
        if (optionalParams.initValue == null) {
            for (let i = 0; i < countOfBits; i++) {
                this.bytes.push(optionalParams.initBit);
            }
        } else {
            const newBitLength = optionalParams.initValue.getBitLength();
            if (newBitLength > countOfBits) {
                this.setBitPart(
                    newBitLength - optionalParams.initValue.getBitLength(),
                    optionalParams.initValue.toSimpleBitArray(),
                );
            } else {
                this.bytes = optionalParams.initValue.toSimpleBitArray();
            }
        }
    }

    setBit(position: number, newBit: 0 | 1) {
        this.bytes[position] = newBit;
    }

    setBitPart(fromPos: number, newBits: (0 | 1)[]) {
        for (let i = 0; i < Math.min(newBits.length, this.bytes.length - fromPos); i++) {
            this.bytes[i + fromPos] = newBits[i];
        }
    }

    appendNumber(appendBytes: (0 | 1)[]) {
        const resultBytesArr = new BitNumber(this.bytes.length);
        const numberOfBits = Math.min(this.bytes.length, appendBytes.length);

        let carry = 0;
        for (let i = this.bytes.length - 1; i > this.bytes.length - 1 - numberOfBits; i--) {
            const bit = appendBytes[i] + this.bytes[i] + carry;
            if (bit / 2 === 1) {
                carry = 1;
            }
            resultBytesArr[i] = bit % 2;
        }
        if (carry !== 0) {
            const oldValue = this.bytes.length;
            this.bytes = new BitNumber(this.bytes.length * 2, {
                initValue: resultBytesArr,
            }).toSimpleBitArray();
            this.setBit(oldValue - 1, 1);
        }
    }

    toSimpleBitArray() {
        return this.bytes.slice();
    }

    toString() {
        return this.bytes.join('');
    }

    getBitLength() {
        return this.bytes.length;
    }
}

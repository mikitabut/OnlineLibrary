import { Injectable } from '@angular/core';
import { BitNumber } from '../utils/BitNumber';
import { Decimal } from 'decimal.js';

@Injectable()
export class SimpleNumberService {
    simpleNumbers = [
        2,
        3,
        5,
        7,
        11,
        13,
        17,
        19,
        23,
        29,
        31,
        37,
        41,
        43,
        47,
        53,
        59,
        61,
        67,
        71,
        73,
        79,
        83,
        89,
        97,
        101,
        103,
        107,
        109,
        113,
        127,
        131,
        137,
        139,
        149,
        151,
        157,
        163,
        167,
        173,
        179,
        181,
        191,
        193,
        197,
        199,
        211,
        223,
        227,
        229,
        233,
        239,
        241,
        251,
        257,
    ];

    // Generate
    generate(countOfBits: number) {
        Decimal.set({ precision: 20000 });
        const bytes = new BitNumber(countOfBits, { initBit: 0 });

        // Simple number creating
        // First step
        for (let i = 1; i < countOfBits; i++) {
            bytes.setBit(i, Math.round(Math.random()) as 0 | 1);
        }
        bytes.setBit(0, 1);
        // Second step
        let dec = new Decimal('0b' + bytes.toString());
        if (dec.mod(2).equals(0)) {
            dec = dec.plus(1);
        }
        while (true) {
            dec = dec.plus(2);
            const simpleCheck = this.simpleNumbers.some(value => dec.mod(value).equals(0));
            if (!simpleCheck && this.testMillerRabin(dec, bytes.getBitLength())) {
                return dec;
            }
        }
    }

    // Alghoritm Millera mat ego Rabina
    private testMillerRabin(testedNumber: Decimal, bits: number): boolean {
        if (testedNumber.eq(1) || testedNumber.eq(2)) {
            return true;
        }

        const { s, t } = this.get2STProperties(testedNumber.minus(1));

        // Cycle A
        for (let i = 0; i < bits; i++) {
            const a = Decimal.round(
                Decimal.random()
                    .times(testedNumber.minus(2))
                    .mod(testedNumber.minus(1))
                    .plus(2),
            );

            let x = this.expMod(a, t, testedNumber);

            if (x.equals(1) || x.equals(testedNumber.minus(1))) {
                continue;
            }

            // Cycle B
            let j;
            for (j = 0; j < s - 1; j++) {
                x = this.expMod(x, new Decimal(2), testedNumber);
                if (x.equals(1)) {
                    return false;
                }
                if (x.equals(testedNumber.minus(1))) {
                    break;
                }
            }
            if (j === s - 1) {
                return false;
            }
        }
        return true;
    }

    public get2STProperties(n: Decimal) {
        let s = 0;
        while (n.mod(2).equals(0)) {
            n = n.divToInt(2);
            s++;
        }

        return { s, t: n };
    }

    // A vot eto vichislenie vozvedeniya v stepen mat ego po modulu
    expMod(a: Decimal, z: Decimal, n: Decimal) {
        let xVal = new Decimal(1);
        let zVal = z;
        let aVal = a;

        while (!zVal.equals(0)) {
            while (zVal.mod(2).equals(0)) {
                zVal = zVal.divToInt(2);
                aVal = aVal.times(aVal).mod(n);
            }
            zVal = zVal.minus(1);
            xVal = xVal.times(aVal).mod(n);
        }

        return xVal;
    }

    // A vot eto vichislenie vozvedeniya v stepen mat ego po modulu rekursiei
    expModRecursive(base: Decimal, exp: Decimal, mod) {
        if (exp.equals(0)) {
            return new Decimal(1);
        }
        if (exp.mod(2).equals(0)) {
            return this.expModRecursive(base, exp.divToInt(2), mod)
                .pow(2)
                .mod(mod);
        } else {
            return base.times(this.expModRecursive(base, exp.minus(1), mod)).mod(mod);
        }
    }
}

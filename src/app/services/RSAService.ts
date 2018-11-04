import { Injectable } from '@angular/core';
import { SimpleNumberService } from './SimpleNumberGenerator';
import Decimal from 'decimal.js';

@Injectable()
export class RSAService {
    private e;
    private n;
    private d;
    private phi;

    constructor(private numberGenerator: SimpleNumberService) {}

    generateKey() {
        const p = this.numberGenerator.generate(128);
        const q = this.numberGenerator.generate(128);
        const n = p.times(q);
        const phi = p.minus(1).times(q.minus(1));
        let e = new Decimal(65537);
        if (phi.mod(e).equals(0)) {
            e = new Decimal(257);
        }
        let d = this.biggerEvklid(e, phi).x1;
        if (d.isNegative()) {
            d = d.plus(phi);
        }

        // Open and closed key
        const openKey = { e, n };
        const closedKey = { d, phi };
    }

    private biggerEvklid(a: Decimal, b: Decimal): { d: Decimal; x1: Decimal; y1: Decimal } {
        let x: Decimal;
        let y: Decimal;
        if (a.equals(0)) {
            x = new Decimal(0);
            y = new Decimal(1);
            return { d: b, x1: x, y1: y };
        }
        const { d, x1, y1 } = this.biggerEvklid(b.mod(a), a);
        x = y1.minus(b.divToInt(a).times(x1));
        y = x1;
        return { d, x1: x, y1: y };
    }
}

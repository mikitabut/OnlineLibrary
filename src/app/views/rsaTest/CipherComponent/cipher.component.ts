import { Component } from '@angular/core';
import { RSAService } from '../../../services/RSAService';
import Decimal from 'decimal.js';
import { CipherService } from '../services/cipherService';

@Component({
    selector: 'app-cipher',
    templateUrl: './cipher.component.html',
})
export class CipherComponent {
    chifratedText;
    deshifratedText;

    constructor(private rsaService: RSAService, private cipherService: CipherService) {
        this.chifratedText = this.cipherService.setConnection();
    }
}

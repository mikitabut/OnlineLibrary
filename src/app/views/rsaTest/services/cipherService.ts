import { Injectable } from '@angular/core';
import Decimal from 'decimal.js';
import { Http } from '@angular/http';
import { environment } from '../../../../environments/environment';

@Injectable()
export class CipherService {
    API_URL = environment.apiUrl;

    constructor(private http: Http) {}

    // setConnection(publicKey: { e: Decimal; n: Decimal }) {
    //     const sendedPublicKey = { e: publicKey.e.toBinary(20000), n: publicKey.n.toBinary(20000) };
    //     return this.http
    //         .post(this.API_URL + '/cipher/public-key', { sendedPublicKey })
    //         .map((response) => 'PublicKey sended successfully!')
    //         .catch(() => 'Something went wrong for public key');
    // }

    setConnection() {
        return this.http
            .get(this.API_URL + '/cipher/public-key')
            .map(response => 'PublicKey sended successfully!')
            .catch(() => 'Something went wrong for public key');
    }

    getSomeInfo(text: string) {
        return this.http
            .post(this.API_URL + '/cipher/text', { text })
            .map(
                response =>
                    'Text has been succesfully shifrated: ' +
                    response.json().cipherText +
                    ' || ' +
                    response.json().cipheredSessionKey,
            )
            .catch(() => 'Something went wrong for ciphered text or ciphered session key');
    }
}

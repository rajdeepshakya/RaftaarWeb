import { Injectable } from '@angular/core';
import { CryptoProvider } from './crypto.service'
/**
 * This file is responsible for manages localstorage information
 *
 * @class LocalStorageProvider
 * @author TA
 */
@Injectable({
    providedIn: 'root'
})
export class LocalStorageProvider {
    /**
	 * This is constructor method automatically invoked at the time of class intialization
	 */
    constructor(
        private crypto: CryptoProvider
    ) { }

    /**
	 * This method set information into localstorage. Encrypted.
     * @param key the name of the local storage key
	 * @param value the value of the proposed key
	 */
    setItem(key: string, value: any) {
        console.log(key,value);
        const encStoreInfo = this.crypto.encryptObj(value);
        localStorage.setItem(key, encStoreInfo);
        console.log(key,value);
        
        
    }

    /**
	 * This method retuns the information from localstorage. Decrypted.
     * @param key the name of the local storage key
	 * @return the information JSON object or undefined if data not avilabe into localstorage
	 */
    getItem(key: string): any {
        try {
            let localStorageInfo;
            const encStoreInfo = localStorage.getItem(key)
;
            if (encStoreInfo) {
                localStorageInfo = this.crypto.decryptObj(localStorage.getItem(key));
            }
            return localStorageInfo;
        } catch (err) {
            localStorage.clear();
            
        }
    }

    /**
	 * This method remove the particular key information from localstorage.
     * @param key the name of the local storage key
	 */
    clearItem(key: string) {
        localStorage.removeItem(key)
;
    }

    /**
	 * This method remove all the information from localstorage.
	 */
    clearAll() {
        localStorage.clear();
    }

}



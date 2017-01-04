/// <reference path="../../../typings/globals/service_worker_api/index.d.ts" />
import {Injectable} from '@angular/core';

@Injectable()
export class ServiceWorkerService {

    constructor() {
    }

    register() {
        if ('serviceWorker' in navigator) {
            this.initCacheWorker();
        }
    }

    private initCacheWorker() {
        navigator.serviceWorker.register('/cacheWorker.js').then((reg) => {
            if (reg.installing) {
                console.log('Service worker installing');
            } else if (reg.waiting) {
                console.log('Service worker installed');
            } else if (reg.active) {
                console.log('Service worker active');
            }
        }).catch((error) => {
            console.error('Registration failed with ' + error);
        });
    }
}

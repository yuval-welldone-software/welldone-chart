import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class NotificationService {
    private notification: BehaviorSubject<string> = new BehaviorSubject(null);
    readonly notification$: Observable<string> = this.notification.asObservable().pipe( );

    constructor() {}
    notify(message: string) {
        this.notification.next(message);
    }
}

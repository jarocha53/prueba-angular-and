import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { AlertModel, AlertTypeModel } from 'src/app/models/alert.model';

@Injectable({ providedIn: 'root' })
export class AlertService {
    private subject = new Subject<AlertModel>();
    private defaultId = 'default-alert';

    // enable subscribing to alerts observable
    onAlert(id = this.defaultId): Observable<AlertModel> {
        return this.subject.asObservable().pipe(filter(x => x && x.id === id));
    }

    // convenience methods
    success(message: string, options?: any) {
        this.alert(new AlertModel({ ...options, type: AlertTypeModel.Success, message }));
    }

    error(message: string, options?: any) {
        this.alert(new AlertModel({ ...options, type: AlertTypeModel.Error, message }));
    }

    info(message: string, options?: any) {
        this.alert(new AlertModel({ ...options, type: AlertTypeModel.Info, message }));
    }

    warn(message: string, options?: any) {
        this.alert(new AlertModel({ ...options, type: AlertTypeModel.Warning, message }));
    }

    // main alert method
    alert(alert: AlertModel) {
        alert.id = alert.id || this.defaultId;
        this.subject.next(alert);
    }

    // clear alerts
    clear(id = this.defaultId) {
        this.subject.next(new AlertModel({ id }));
    }
}

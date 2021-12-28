export class AlertModel {
  id: string = '';
  type: AlertTypeModel = AlertTypeModel.Warning;
  message: string = '';
  autoClose: boolean = false;
  keepAfterRouteChange: boolean = false;
  fade: boolean = false;

  constructor(init?: Partial<AlertModel>) {
    Object.assign(this, init);
  }
}

export enum AlertTypeModel {
  Success,
  Error,
  Info,
  Warning,
}

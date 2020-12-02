export class ActionStatus {
  constructor(public success: boolean, public errorCategory?: ErrorCategory, public error?: string) {}
}

export enum ErrorCategory {
  Validation,
  NotFound,
}

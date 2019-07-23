export enum TypeNotifcation {
  "success",
  "info",
  "danger",
  "warning"
}

export interface NotificationUI {
  msg?: string,
  type?: TypeNotifcation,
  isPresent: boolean
}

import { NotificationTypeEnum } from "./notification-type.enum";

export interface Notification {
  type: NotificationTypeEnum;
  text: string;
}
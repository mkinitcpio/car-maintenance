import { FeedbackTypeEnum } from "./feedback-type.enum";

export interface Feedback {
  type: FeedbackTypeEnum,
  text: string;
  email?: string,
}

export interface FeedbackDialogData {
  type?: FeedbackTypeEnum,
}

export interface FeedbackTypeOption {
  key: FeedbackTypeEnum,
  value: string,
}

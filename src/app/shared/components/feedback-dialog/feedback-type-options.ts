import { FeedbackTypeEnum } from './feedback-type.enum';
import { FeedbackTypeOption } from './interfaces';

export const feedbackTypeOptions: FeedbackTypeOption[] = [{
  key: FeedbackTypeEnum.Feature,
  value: 'DIALOG.FEEDBACK.OPTIONS.FEATURE',
}, {
  key: FeedbackTypeEnum.Bug,
  value: 'DIALOG.FEEDBACK.OPTIONS.BUG',
}];

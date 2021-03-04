
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsService } from '../../../core/constants.service';
import { FeedbackTypeEnum } from './feedback-type.enum';

@Injectable({
  providedIn: 'root'
})
export class FeedbackRepository {

  constructor(
    private http: HttpClient,
    private constants: ConstantsService,
  ) {}

  public postFeedback(data: { type: FeedbackTypeEnum, text: string }): Observable<any> {
    return this.http.post(
      this.constants.feedbackApiUrl,
      data, {
        headers: {
          'App-token': this.constants.secureToken,
        }
      });
  }

}

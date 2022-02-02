
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeedbackTypeEnum } from './feedback-type.enum';

@Injectable({
  providedIn: 'root'
})
export class FeedbackRepository {

  constructor(
    private http: HttpClient,
  ) {}

  public postFeedback(data: { type: FeedbackTypeEnum, text: string }): Observable<any> {
    return this.http.post(
      null,
      data, {
        headers: {
          'App-token': null,
        }
      });
  }

}

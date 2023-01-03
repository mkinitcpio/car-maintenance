import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AppConfig } from '../../../environments/environment';

import { Feedback } from "../../shared/components/feedback-dialog/interfaces";

@Injectable({
  providedIn: 'root'
})
export class FeedbackRepository {

  constructor(private http: HttpClient) {}

  public sendFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(`${AppConfig.api.url}/feedback`, feedback)
      .pipe(catchError(() => throwError("123")));
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../../../environments/environment';
import { Feedback } from "../../shared/components/feedback-dialog/interfaces";

@Injectable({
  providedIn: 'root'
})
export class FeedbackRepository {

  constructor(private http: HttpClient) {}

  public sendFeedback(feedback: Feedback): Observable<void> {
    return this.http.post<void>(`${AppConfig.api.url}/feedback`, feedback);
  }
}

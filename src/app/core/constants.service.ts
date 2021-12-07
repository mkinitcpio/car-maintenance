import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConstantsService {
  public readonly secureToken = 'JcteT?[:m|mM#/vAXtPW)iSAy5dr.(';
  public readonly feedbackApiUrl = 'http://car-maintenance.online:3000/api/feedback';
}

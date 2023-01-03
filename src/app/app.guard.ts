import { Injectable } from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {Observable} from "rxjs";
import { tap } from "rxjs/operators";
import { DataBaseService } from './core/database';

@Injectable({
  providedIn: 'root',
})
export class AppGuard implements CanActivate {

  constructor(
    private dataBaseService: DataBaseService,
    private router: Router,
  ) {}

  public canActivate(): Observable<boolean> | boolean {
    return this.dataBaseService.dbExist$
      .pipe(
        tap((exist) => {
          !exist && this.router.navigate(['welcome']);
        })
      );
  }
}
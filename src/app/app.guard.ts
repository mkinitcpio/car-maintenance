import { Injectable } from "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import { tap } from "rxjs/operators";
import { DataBaseService } from './core/database';


@Injectable()
export class AppGuard implements CanActivate{

  constructor(private dataBaseService: DataBaseService, private router: Router)
  {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean{
    return this.dataBaseService.dbExist$
      .pipe(
        tap(exist => {
          !exist && this.router.navigate(['welcome']);
        })
      );
  }
}
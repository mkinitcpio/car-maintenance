import { Component } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import {DataBaseService} from "./core/database";
import {AutoCloseable} from "./core/auto-closeable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends AutoCloseable {

  public dbExist: boolean;

  constructor(
    private electronService: ElectronService,
    private translate: TranslateService,
    private dataBaseService: DataBaseService,
  ) {
    super();
    this.translate.setDefaultLang('en');
    this.dataBaseService.dbExist$.subscribe((exist) => {
      this.dbExist = exist;
    });

    this.dataBaseService.initDataBase();
  }
}

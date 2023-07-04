import { Component, OnInit } from '@angular/core';
import {ElectronService} from "../core/services";
import {DataBaseService} from "../core/database";
import { SettingsService } from '../shared/components/settings/settings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-database-select',
  templateUrl: './database-select.component.html',
  styleUrls: ['./database-select.component.scss']
})
export class DatabaseSelectComponent implements OnInit {

  constructor(
    private electronService: ElectronService,
    private dataBaseService: DataBaseService,
    private settingsService: SettingsService,
    private router: Router,
  ) { }

  ngOnInit(): void {}

  public onCreate(): void {
    this.electronService.dialog
      .showSaveDialog({})
      .then((data) => {
        if(data.filePath.length) {
          const filePath = data.filePath;

          this.dataBaseService.createDatabaseFile(filePath);
          this.settingsService.setDataBasePath(filePath);
          this.dataBaseService.initDataBase();
          this.router.navigate(['']);
        }
      });
  }

  public onOpen(): void {
    this.electronService.dialog
      .showOpenDialog({properties: ['openFile']})
      .then((data) => {
        if(data.filePaths.length) {
          const filePath = data.filePaths[0];

          this.settingsService.setDataBasePath(filePath);
          this.dataBaseService.initDataBase();
          this.router.navigate(['']);
        }
      });
  }
}

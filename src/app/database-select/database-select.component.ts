import { Component, OnInit } from '@angular/core';
import {ElectronService} from "../core/services";
import {DataBaseService} from "../core/database";
import { SettingsService } from '../shared/components/settings/settings.service';

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
  ) { }

  ngOnInit(): void {}

  public onCreate(): void {
    this.electronService.dialog
      .showSaveDialog({})
      .then((data) => {
        if(data.filePath.length) {
          const filePath = data.filePath;

          this.settingsService.setDataBasePath(filePath);
          this.settingsService.saveSettings();
          this.dataBaseService.initDataBase();
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
          this.settingsService.saveSettings();
          this.dataBaseService.initDataBase();
        }
      });
  }
}

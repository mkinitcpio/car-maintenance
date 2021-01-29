import { Component, OnInit } from '@angular/core';
import {ElectronService} from "../core/services";
import {DataBaseService} from "../core/database";

@Component({
  selector: 'app-database-select',
  templateUrl: './database-select.component.html',
  styleUrls: ['./database-select.component.scss']
})
export class DatabaseSelectComponent implements OnInit {

  constructor(
    private electronService: ElectronService,
    private dataBaseService: DataBaseService,
  ) { }

  ngOnInit(): void {}

  public onCreate(): void {
    this.electronService.dialog
      .showSaveDialog()
      .then((data) => {
        if(data.filePath.length) {
          const filePath = data.filePath;

          this.electronService.fs.writeFileSync(
            this.dataBaseService.confPath,
            filePath,
            { encoding: 'utf8'});

          this.electronService.fs.writeFileSync(
            filePath,
            JSON.stringify(this.dataBaseService.initialDataBase),
            { encoding: 'utf8'});
          this.dataBaseService.initDataBase();
        }
        console.log(data);
      });
  }

  public onOpen(): void {
    this.electronService.dialog
      .showOpenDialog({properties: ['openFile']})
      .then((data) => {
        if(data.filePaths.length) {
          const filePath = data.filePaths[0];
          this.electronService.fs.writeFileSync(
            this.dataBaseService.confPath,
            filePath,
            { encoding: 'utf8'});
          this.dataBaseService.initDataBase();
        }
      });
  }
}

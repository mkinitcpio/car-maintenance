import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  public selectedtab = 0;
  public tabWidth = 133.5;

  constructor() { }

  ngOnInit(): void {
  }

}

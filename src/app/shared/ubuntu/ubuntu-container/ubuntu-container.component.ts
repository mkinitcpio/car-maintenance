import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'ubuntu-container',
    templateUrl: './ubuntu-container.component.html',
    styleUrls: ['./ubuntu-container.component.scss'],
    standalone: false
})
export class UbuntuContainerComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  hasBordersStyle = true;

  @Input()
  info: string;

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ubuntu-close-button',
  templateUrl: './ubuntu-close-button.component.html',
  styleUrls: ['./ubuntu-close-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UbuntuCloseButtonComponent implements OnInit {


  @Output()
  close = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}

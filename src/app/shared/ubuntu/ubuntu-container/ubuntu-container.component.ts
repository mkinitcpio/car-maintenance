import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ubuntu-container',
  templateUrl: './ubuntu-container.component.html',
  styleUrls: ['./ubuntu-container.component.scss']
})
export class UbuntuContainerComponent implements OnInit {

  @Input()
  title: string;

  constructor() { }

  ngOnInit(): void {
  }

}

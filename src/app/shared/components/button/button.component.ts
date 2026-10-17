import { Component, Input, OnInit } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    imports: [CommonModule, MatRippleModule]
})
export class ButtonComponent implements OnInit {

  @Input()
  active: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}

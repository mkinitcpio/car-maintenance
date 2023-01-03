import { Component, Input } from '@angular/core';

@Component({
  selector: 'content-container',
  templateUrl: './content-container.component.html',
  styleUrls: ['./content-container.component.scss']
})
export class ContentContainerComponent {

  @Input()
  title: string;
}

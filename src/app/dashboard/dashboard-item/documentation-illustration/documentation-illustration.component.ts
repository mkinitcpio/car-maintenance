import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-documentation-illustration',
    templateUrl: './documentation-illustration.component.html',
    styleUrls: ['./documentation-illustration.component.scss']
})
export class DocumentationIllustrationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

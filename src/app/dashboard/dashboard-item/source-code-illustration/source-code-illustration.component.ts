import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-source-code-illustration',
    templateUrl: './source-code-illustration.component.html',
    styleUrls: ['./source-code-illustration.component.scss']
})
export class SourceCodeIllustrationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

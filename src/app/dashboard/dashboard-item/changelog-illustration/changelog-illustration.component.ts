import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-changelog-illustration',
    templateUrl: './changelog-illustration.component.html',
    styleUrls: ['./changelog-illustration.component.scss']
})
export class ChangelogIllustrationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
  animations: [
    trigger('title', [
      state('in', style({
        transform: "scale(1)",
        opacity: 1
      })),
      transition(':enter', [
        style({
          transform: "scale(0.9)",
          opacity: 0
        }),
        animate("1500ms ease-in")
      ]),
    ]),
    trigger('buttons', [
      state('false', style({
        opacity: 0,
        visibility: 'hidden'
      })),
      state('true', style({
        opacity: 1,
        visibility: 'visible'
      })),
      transition('false => true', animate("512ms ease-in")),
      transition('true => false', animate(200)),
    ]),
    trigger('selectDatabase', [
      state('false', style({
        opacity: 0,
        height: 0,
        visibility: 'hidden'
      })),
      state('true', style({
        opacity: 1,
        height: "*",
        visibility: 'visible'
      })),
      transition('false => true', animate("512ms ease-out")),
    ]),
    trigger('rotateGear', [
      state('false', style({
        transform: "rotate(0);"
      })),
      state('true', style({
        transform: "rotate(-45deg)"
      })),
      transition('false => true', animate("512ms ease-out")),
    ]),
  ]

})
export class WelcomePageComponent implements OnInit {

  private subTitleText = '';
  private symbolIndex = 0;
  private typingSpeed = 100;

  public typableSubtitleText = "";
  public showButtons = false;
  public showSelectDatabaseButtons = false;

  constructor(private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.translate
      .get('PAGES.WELCOME.SUBTITLE')
      .subscribe((subtitle) => this.subTitleText = subtitle);
  }

  public typeWriter(): void {
    if (this.symbolIndex < this.subTitleText.length) {
      this.typableSubtitleText += this.subTitleText.charAt(this.symbolIndex);
      this.symbolIndex++;
      setTimeout(() => {
        this.typeWriter();
      }, this.typingSpeed);
    }
    else {
      this.showButtons = true;
    }
  }

  public onGetStartedButtonClick(): void {
    this.showSelectDatabaseButtons = true;
    this.showButtons = false;
  }
}

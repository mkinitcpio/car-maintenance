import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

export enum ColorEnum {
  Default = "Default",
  Blue = "#506EA7",
  Orange = "#E95420",
  Green = "#0D7F1E",
  Red = "#C7162B",
}

interface Color {
  name: string;
  color: ColorEnum;
}

@Component({
  selector: "app-color-selector",
  templateUrl: "./color-selector.component.html",
  styleUrls: ["./color-selector.component.scss"],

  animations: [
    trigger("flyInOut", [
      transition(
        ":enter",
        animate("1s", style({ transform: "translateX(300%)", opacity: "0" }))
      ),
    ]),
  ],
})
export class ColorSelectorComponent implements OnInit, AfterViewInit {
  @Input()
  selected: string;

  @Input()
  colors: Color[];

  @Output()
  select: EventEmitter<string> = new EventEmitter();

  @Output()
  setDefault: EventEmitter<string> = new EventEmitter();

  @ViewChild("tabCoverRef", { static: true }) tabCoverRef: ElementRef;
  @ViewChild("tabsRef", { static: true }) tabsRef: ElementRef;

  public selectedtab = 0;
  public tabWidth = 0;
  public index: number;
  shouldShow: boolean;
  constructor() {}

  ngOnInit(): void {
    //swich color panel
    //remove subject
    //class
    //

    this.index = this.colors.findIndex(
      (element) => element.color === this.selected
    );

    this.selectedtab = this.index;

    if ( this.index === -1) {
      this.shouldShow = true;
    } else {
      this.shouldShow = false;
    }
  }

  onSelected(colors): void {
    //trigger anim
    this.select.emit(colors);
  }

  onSetDefault(): void {
    this.setDefault.emit();
  }

  ngAfterViewInit(): void {
    this.setTabWidth(this.tabsRef, this.colors.length);
    this.tabCoverRef.nativeElement.style.width = `${this.tabWidth}px`;

    this.updateTabCoverPosition(this.index);

    const tabs = this.tabsRef.nativeElement.querySelectorAll(".tabs__tab");
    console.log(tabs);
    tabs.forEach((tab) => {
      tab.style.width = `${this.tabWidth}px`;
    });
  }

  public onTabSelect(index: number): void {
    if (index === -1) {
      this.shouldShow = true;
    } else {
      this.shouldShow = false;
    }
    console.log(index);
    this.selectedtab = index;
    this.updateTabCoverPosition(index);
  }

  private setTabWidth(tabsRef: ElementRef, tabsCount: number): void {
    this.tabWidth =
      (tabsRef.nativeElement.clientWidth - (tabsCount - 1) * 4) / tabsCount;
  }

  private updateTabCoverPosition(offset: number): void {
    this.tabCoverRef.nativeElement.style.left = `${
      this.tabWidth * offset + offset * 4
    }px`;
  }
}

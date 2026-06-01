import { Component, ElementRef, input, Input, ViewEncapsulation } from "@angular/core";
import { ButtonBase } from "./button.base";
import { MatRippleModule } from "@angular/material/core";

@Component({
    selector: `
        button[cm-button]
    `,
    templateUrl: './button.html',
    styleUrls: [
        './button.scss'
    ],
    host: {
        '[class]': '"cm-button--" + variant',
        '[class.cm-button--default]': 'shape() === "default"',
        '[class.cm-button--rounded]': 'shape() === "rounded"',
    },
    encapsulation: ViewEncapsulation.None,
    imports: [
        MatRippleModule,
    ]
})
export class CmButton extends ButtonBase {

    @Input()
    variant: string = 'primary';

    shape = input<'rounded' | 'default'>('default');

    constructor(elementRef: ElementRef) {
        super(elementRef);
    }
}
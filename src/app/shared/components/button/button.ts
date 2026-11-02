import { Component, ElementRef, ViewEncapsulation, input } from "@angular/core";
import { ButtonBase } from "./button.base";
import { MatRipple, MatRippleModule } from "@angular/material/core";
import { CmTextBody } from "../typography/text-body/text-body";

@Component({
    selector: `
        button[cm-button]
    `,
    templateUrl: './button.html',
    styleUrls: [
        './button.scss'
    ],
    host: {
        '[class]': '"cm-button--" + variant()',
        '[class.cm-button--default]': 'shape() === "default"',
        '[class.cm-button--rounded]': 'shape() === "rounded"',
        '[class.cm-button--medium]': 'size() === "default"',
        '[class.cm-button--small]': 'size() === "small"',
        '[class.cm-button--active]': 'active()',
    },
    hostDirectives: [MatRipple],
    encapsulation: ViewEncapsulation.None,
    imports: [
    CmTextBody
]
})
export class CmButton extends ButtonBase {

    variant = input<string>('primary');

    shape = input<'rounded' | 'default'>('default');

    size = input<'default' | 'small'>('default');

    active = input<boolean>();

    constructor(elementRef: ElementRef) {
        super(elementRef);
    }
}
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'cm-about-settings-page',
    templateUrl: './about-settings-page.component.html',
    styleUrl: './about-settings-page.component.scss',
    imports: []
})
export class AboutSettingsPageComponent {

}

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-category-tree-displacer',
    templateUrl: './category-tree-displacer.component.html',
    styleUrls: ['./category-tree-displacer.component.scss'],
    standalone: true,
})
export class CategoryTreeDisplacerComponent {

}

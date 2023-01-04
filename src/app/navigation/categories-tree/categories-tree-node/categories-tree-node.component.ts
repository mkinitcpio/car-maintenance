import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { filter } from 'rxjs/operators';
import { IconTypeEnum } from '../../../shared/components/settings/icon-type.enum';
import { SettingsTypeEnum } from '../../../shared/components/settings/settings-type.enum';
import { SettingsService } from '../../../shared/components/settings/settings.service';
import { Category, CategoryTree } from '../../state/interface';

@Component({
  selector: 'app-categories-tree-node',
  templateUrl: './categories-tree-node.component.html',
  styleUrls: ['./categories-tree-node.component.scss']
})
export class CategoriesTreeNodeComponent implements OnInit {

  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;

  @Input()
  child: CategoryTree;

  @Input()
  isSubGroup: boolean;
  
  @Input()
  selected: string;

  @Output()
  add: EventEmitter<Category> = new EventEmitter();

  @Output()
  edit: EventEmitter<Category> = new EventEmitter();

  @Output()
  delete: EventEmitter<Category> = new EventEmitter();

  @Output()
  select: EventEmitter<Category> = new EventEmitter();

  public iconsPath = `assets/category-icons/${this.settingsService.settings.appearance.iconPack}/${this.settingsService.settings.appearance.type}/`;
  public IconTypeEnum = IconTypeEnum;

  public expand = false;

  contextMenuPosition = { x: '0px', y: '0px' };

  constructor(public settingsService: SettingsService) { }

  ngOnInit(): void {
    this.settingsService.settingsChanged$
      .pipe(filter((node) => node.type === SettingsTypeEnum.Appearance || node.type === SettingsTypeEnum.All || node.type === SettingsTypeEnum.Database))
      .subscribe(() => {
        this.iconsPath = `assets/category-icons/${this.settingsService.settings.appearance.iconPack}/${this.settingsService.settings.appearance.type}/`;
      });
  }

  onContextMenu(event: MouseEvent) {
    event.preventDefault();
    this.contextMenuPosition.x = `${event.clientX}px`;
    this.contextMenuPosition.y = `${event.clientY}px`;
    this.contextMenu.openMenu();
  }

  public onAdd(): void {
    this.add.emit(this.child as Category);
  }

  public onEdit(category?: Category): void {
    this.edit.emit(category || this.child as Category);
  }

  public onDelete(category?: Category): void {
    this.delete.emit(category || this.child as Category);
  }

  public onSelect(category?: Category): void {
    this.select.emit(category || this.child as Category);
  }
}

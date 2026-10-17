import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { DetailsModule } from '@shared/components/details/details.module';

@Component({
    selector: 'storage',
    templateUrl: './storage.component.html',
    styleUrls: ['./storage.component.scss'],
    standalone: true,
    imports: [
        DetailsModule,
        TranslateModule,
        MatIconModule,
    ],
})
export class StorageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

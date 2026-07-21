import { CommonModule } from "@angular/common";
import { MatRippleModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { TranslateModule } from "@ngx-translate/core";
import { CmTextBody } from "../typography/text-body/text-body";

export const imports = [
  CommonModule,
  MatTooltipModule,
  MatIconModule,
  TranslateModule,
  MatRippleModule,
  CmTextBody,
];

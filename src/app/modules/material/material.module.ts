import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatSidenavModule, MatButtonModule, LayoutModule],
  exports: [CommonModule, MatSidenavModule, MatButtonModule, LayoutModule],
})
export class MaterialModule {}

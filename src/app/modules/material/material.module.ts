import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    LayoutModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    LayoutModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class MaterialModule {}

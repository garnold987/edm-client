import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatCardModule, MatSelectModule, MatRadioModule, MatDialogModule, MatInputModule, MatToolbarModule, MatTableModule, MatProgressSpinnerModule, MatPaginatorModule, MatSortModule} from '@angular/material';

@NgModule({
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatCardModule, MatSelectModule, MatRadioModule, MatInputModule, MatDialogModule, MatTableModule, MatProgressSpinnerModule, MatPaginatorModule, MatSortModule],
  exports: [CommonModule, MatToolbarModule, MatButtonModule, MatCardModule, MatSelectModule, MatRadioModule, MatInputModule, MatDialogModule, MatTableModule, MatProgressSpinnerModule, MatPaginatorModule, MatSortModule],
 })
export class CustomMaterialModule { }

import { NgModule } from '@angular/core';

import { CUSTOM_DATE_FORMAT } from '../core/models/date-format';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';



import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const modules = [
  MatTabsModule,
  MatSortModule,
  MatIconModule,
  MatCardModule,
  MatBadgeModule,
  MatTableModule,
  MatInputModule,
  MatRadioModule,
  MatDialogModule,
  MatButtonModule,
  MatSelectModule,
  MatDividerModule,
  MatTooltipModule,
  MatToolbarModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatMomentDateModule,
  MatDatepickerModule,
  MatBottomSheetModule,
  MatProgressBarModule,
  MatAutocompleteModule,
  MatButtonToggleModule,
  MatProgressSpinnerModule
];

@NgModule({
  imports: [modules],
  exports: [modules],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMAT }
  ],
})
export class MaterialModule { }
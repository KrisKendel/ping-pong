import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    imports: [],
    exports: [
        MatButtonModule,
        MatToolbarModule,
        MatCardModule,
        MatInputModule,
        MatSidenavModule,
        MatTableModule,
        MatIconModule,
        MatPaginatorModule,
        MatCardModule,
        MatDialogModule,
        MatSnackBarModule,
        FormsModule,
        ReactiveFormsModule,
        MatSortModule,
        MatSelectModule
    ]
})

export class SharedModule { }
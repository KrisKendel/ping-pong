import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';

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
        MatPaginatorModule
    ]
})

export class SharedModule { }
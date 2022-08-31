import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';

@NgModule({
    declarations: [MainComponent, HeaderComponent],
    imports: [SharedModule, CommonModule, MainRoutingModule]
})

export class MainModule { }
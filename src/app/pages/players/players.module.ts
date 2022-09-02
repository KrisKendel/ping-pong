import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlayersComponent } from './players.component';
import { PlayersRoutingModule } from './players-routing.module';
import { ViewPlayerComponent } from './view-player/view-player.component';
import { AddPlayerComponent } from './add-player/add-player.component';


@NgModule({
    declarations: [PlayersComponent, ViewPlayerComponent, AddPlayerComponent],
    imports: [CommonModule, PlayersRoutingModule, SharedModule]
})
export class PlayersModule { }
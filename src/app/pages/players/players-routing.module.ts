import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPlayerComponent } from './add-player/add-player.component';
import { PlayersComponent } from './players.component';
import { ViewPlayerComponent } from './view-player/view-player.component';

const routes: Routes = [
    {
        path: '',
        component: PlayersComponent,
    },
    {
        path: ':id',
        component: ViewPlayerComponent,
    },
    {
        path: 'create/new',
        component: AddPlayerComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlayersRoutingModule { }

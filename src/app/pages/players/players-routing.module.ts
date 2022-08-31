import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditPlayerComponent } from './add-edit-player/add-edit-player.component';
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
        component: AddEditPlayerComponent,
    },
    {
        path: 'update/:id',
        component: AddEditPlayerComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlayersRoutingModule { }

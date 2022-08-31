import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'matches',
                loadChildren: () => import('../matches/matches.module').then(m => m.MatchesModule),
            },
            {
                path: 'players',
                loadChildren: () => import('../players/players.module').then(m => m.PlayersModule),
            },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMatchComponent } from './add-match/add-match.component';
import { MatchesComponent } from './matches.component';
import { ViewMatchComponent } from './view-match/view-match.component';

const routes: Routes = [
  {
    path: '',
    component: MatchesComponent
  },
  {
    path: ':id',
    component: ViewMatchComponent,
  },
  {
    path: 'create/new',
    component: AddMatchComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchesRoutingModule { }

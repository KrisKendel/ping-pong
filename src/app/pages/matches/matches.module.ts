import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatchesRoutingModule } from './matches-routing.module';
import { MatchesComponent } from './matches.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewMatchComponent } from './view-match/view-match.component';
import { AddEditMatchComponent } from './add-edit-match/add-edit-match.component';


@NgModule({
  declarations: [MatchesComponent, ViewMatchComponent, AddEditMatchComponent],
  imports: [CommonModule, MatchesRoutingModule, SharedModule]
})
export class MatchesModule { }

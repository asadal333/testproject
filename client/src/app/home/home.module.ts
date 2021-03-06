import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';

import { SearchComponent } from './search/search.component';
import { WorldTypesComponent } from './world-types/world-types.component';
import { WorldPreviewsComponent } from './world-previews/world-previews.component';

const routes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'categories' },
  { path: 'search', component: SearchComponent },
  { path: 'categories',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'all' },
      { path: ':category', component: WorldTypesComponent },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    MatGridListModule,
    MatTabsModule
  ],
  declarations: [
    SearchComponent,
    WorldTypesComponent,
    WorldPreviewsComponent
  ]
})
export class HomeModule {}

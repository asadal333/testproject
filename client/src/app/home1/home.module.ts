import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { HomeComponent } from './home.component';
import { WorldPreviewComponent } from './world-preview/world-preview.component';
// import { CategoriesComponent } from './categories/categories.component';
// import { ProductGridComponent } from './product-grid/product-grid.component';
// import { SearchComponent } from './search/search.component';

// const routes: Route[] = [
//   { path: '', pathMatch: 'full', redirectTo: 'categories' },
//   { path: 'search', component: SearchComponent },
//   { path: 'categories',
//     children: [
//       { path: '', pathMatch: 'full', redirectTo: 'all' },
//       { path: ':category', component: CategoriesComponent },
//     ]
//   }
// ];

@NgModule({
  imports: [
    CommonModule,
    // RouterModule.forChild(routes),
    RouterModule.forChild([
      { path: '', component: HomeComponent }
    ]),
    FlexLayoutModule,
    MatGridListModule,
    MatTabsModule
  ],
  declarations: [
    HomeComponent,
    WorldPreviewComponent
    // CategoriesComponent,
    // ProductGridComponent,
    // SearchComponent
  ]
})
export class HomeModule {}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map, switchMap } from 'rxjs/operators';

import { Product, ProductService } from '../../shared/services';
//import { World, WorldService } from '../../shared/services';

@Component({
  selector: 'tproj-world-types',
  styleUrls: [ './world-types.component.scss' ],
  templateUrl: './world-types.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorldTypesComponent {
  readonly categories$: Observable<string[]>;
  readonly products$: Observable<Product[]>;
  //readonly worlds$: Observable<World[]>;

  constructor(
    private productService: ProductService,
    //private worldService: WorldService,
    private route: ActivatedRoute
  ) {
    this.categories$ = this.productService.getAllCategories().pipe(
      map(categories => ['all', ...categories]));

    this.products$ = this.route.params.pipe(
      switchMap(({ category }) => this.getCategory(category)));
  }

  private getCategory(category: string): Observable<Product[]> {
    return category.toLowerCase() === 'all'
      ? this.productService.getAll()
      : this.productService.getByCategory(category.toLowerCase());
  }
}

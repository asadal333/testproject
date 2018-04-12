import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { World, WorldService } from '../shared/services';

@Component({
  selector: 'tproj-home',
  styleUrls: [ './home.component.scss' ],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  readonly worldTypes = [
    'all',
    'public',
    'private',
    'others'
  ];

  worlds$: Observable<World[]>;
  constructor(private worldService: WorldService) {
    this.worlds$ = this.worldService.getAll();
  }

  onTabChange(tabIndex: number) {
    const worldType = this.worldTypes[tabIndex];
    console.log(`Selected category: ${worldType}`);
    this.worlds$ = this.worldService.getByWorldType(worldType);
  }
}

import { Component, Input, Inject, OnInit } from '@angular/core';
import { World } from '../../shared/services';
import { API_BASE_URL } from '../../app.tokens';
@Component({
  selector: 'tproj-world-preview',
  templateUrl: './world-preview.component.html',
  styleUrls: ['./world-preview.component.scss']
})

export class WorldPreviewComponent implements OnInit {
  @Input() world: World;
  constructor(
    @Inject(API_BASE_URL) private readonly baseUrl: string
  ) { }

  ngOnInit() {
  }
  urlFor(world: World): string {
    return `${this.baseUrl}/${world.imageUrl}`;
  }
}
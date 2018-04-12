import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { API_BASE_URL } from '../../app.tokens';

export interface World {
  id: number;
  title: string;
  stars: number;
  imageUrl: string;
  description: string;
  worldTypes: string[];
}

export interface WorldSearchParams {
  [key: string]: any; // To make compatible with HttpParams type.
  title?: string;
  minStars?: number;
  maxStars?: number;
}

export abstract class WorldService {
  abstract getAll(): Observable<World[]>;
  abstract getById(WorldId: number): Observable<World>;
  abstract getByWorldType(worldType: string): Observable<World[]>;
  abstract getAllWorldTypes(): Observable<string[]>;
  abstract search(params: WorldSearchParams): Observable<World[]>;
}

@Injectable()
export class HttpWorldService implements WorldService {
  constructor(
    @Inject(API_BASE_URL) private baseUrl: string,
    private http: HttpClient
  ) {}

  getAll(): Observable<World[]> {
    return this.http.get<World[]>(`${this.baseUrl}/api/worlds`);
  }

  getById(WorldId: number): Observable<World> {
    return this.http.get<World>(`${this.baseUrl}/api/worlds/${WorldId}`);
  }

  getByWorldType(worldType: string): Observable<World[]> {
    return this.http.get<World[]>(`${this.baseUrl}/api/worldTypes/${worldType}`);
  }

  getAllWorldTypes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/api/worldTypes`);
  }

  search(params: WorldSearchParams): Observable<World[]> {
    return this.http.get<World[]>(`${this.baseUrl}/api/worlds`, { params });
  }
}

@Injectable()
export class _StaticWorldService implements WorldService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<World[]> {
    return this.http.get<World[]>('/data/worlds.json');
  }

  getById(worldId: number): Observable<World> {
    return this.http.get<World[]>('/data/worlds.json').pipe(
      map(worlds => <World>worlds.find(p => p.id === worldId)));
  }

  getByWorldType(worldType: string): Observable<World[]> {
    return this.http.get<World[]>('/data/worlds.json').pipe(
      map(worlds => worlds.filter(p => p.worldTypes.includes(worldType))));
  }

  getAllWorldTypes(): Observable<string[]> {
    return this.http.get<World[]>('/data/worlds.json')
      .pipe(
        map(this.reduceWorldTypes),
        map(worldTypes => Array.from(new Set(worldTypes)))
      );
  }

  search(params: WorldSearchParams): Observable<World[]> {
    return this.http.get<World[]>('/data/worlds.json').pipe(
      map(worlds => this.filterWorlds(worlds, params))
    );
  }

  private reduceWorldTypes(worlds: World[]): string[] {
    return worlds.reduce((all, world) => all.concat(world.worldTypes), new Array<string>());
  }

  private filterWorlds(worlds: World[], params: WorldSearchParams): World[] {
    return worlds.filter(p => {
      if (params.title && !p.title.toLowerCase().includes(params.title.toLowerCase())) {
        return false;
      }
      if (params.minStars && p.stars < params.minStars) {
        return false;
      }
      if (params.maxStars && p.stars > params.maxStars) {
        return false;
      }
      return true;
    });
  }
}

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';

// @Injectable()
// export class WorldService {

//   constructor(private http: HttpClient) {}

//   getAll(): Observable<World[]> {
//     return this.http.get<World[]>('/data/Worlds/all.json');
//   }
// }

// export interface World {
//   description: string;
//   featured: boolean;
//   imageUrl: string;
//   userNumber: number;
//   worldTitle: string;
//   id: string;
// }
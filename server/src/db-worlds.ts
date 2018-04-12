import * as fs from 'fs';
import * as util from 'util';

type DB = World[];

export interface World {
  id: number;
  title: string;
  description: string;
  worldTypes: string[];
  imageUrl: string;
  stars: number;
}

export interface WorldSearchParams {
  title?: string;
  minStars?: string;
  maxStars?: string;
}

const readFile = util.promisify(fs.readFile);
const db$: Promise<DB> = readFile('./data/worlds.json', 'utf8')
  .then(JSON.parse, console.error);

export async function getDistinctWorldTypes(): Promise<string[]> {
  const distinctWorldTypes = (await db$)
    .map(p => p.worldTypes)
    .reduce((all, current) => all.concat(current), []);

  return [...new Set(distinctWorldTypes)];
}

export async function getWorlds(params: WorldSearchParams = {}): Promise<World[]> {
  return filterWorlds(await db$, params);
}

export async function getWorldById(worldId: number): Promise<any> {
   return (await db$).find(p => p.id === worldId);
}

export async function getWorldsByType(type: string): Promise<any[]> {
  return (await db$).filter(p => p.worldTypes.includes(type));
}

export async function updateWorldBidAmount(worldId: number, stars: number): Promise<any> {
  const worlds = await db$;
  const world = worlds.find(p => p.id === worldId);
  if (world) {
    world.stars = stars;
  }
}

function filterWorlds(worlds: World[], params: WorldSearchParams): World[] {
  return worlds.filter(p => {
    if (params.title && !p.title.toLowerCase().includes(params.title.toLowerCase())) {
      return false;
    }
    if (params.minStars && p.stars < parseInt(params.minStars)) {
      return false;
    }
    if (params.maxStars && p.stars > parseInt(params.maxStars)) {
      return false;
    }
    return true;
  });
}

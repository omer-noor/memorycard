import { env } from "process";
import { Cover, Game, Genre, Platform, Screenshot } from "../_interfaces/interfaces";
import apicalypse from "apicalypse";

export async function getGamesBySearch(searchTerm: string): Promise<Game[] | null> {
  try {
    const response = await apicalypse({
      queryMethod: 'body',
      method: 'POST',
      headers: {
        'Client-ID': process.env.IGDB_CLIENT_ID,
        'Authorization': process.env.IGDB_AUTHORIZATION,
        'Accept': 'application/json',
      }
    })
      .fields('*') // Fetches all fields. You might want to specify only the fields you need.
      .search(`${searchTerm}`)
      .limit(10)// Use the search term
      .request('https://api.igdb.com/v4/games'); // Execute the query and return a response object
    return await response.data as Promise<Array<Game> | null>;
  } catch (error) {
    console.error('Error fetching game data:', error);
    throw error; // or return null, depending on how you want to handle errors
  }
}

export async function getGameById(id: string): Promise<Game | null> {
  try {
    const response = await apicalypse({
      queryMethod: 'body',
      method: 'POST',
      headers: {
        'Client-ID': process.env.IGDB_CLIENT_ID,
        'Authorization': process.env.IGDB_AUTHORIZATION,
        'Accept': 'application/json',
      }
    })
      .fields('*') // Fetches all fields. You might want to specify only the fields you need.
      .where(`id = ${id}`)      
      .request('https://api.igdb.com/v4/games'); // Execute the query and return a response object
    return response.data[0] as Promise<Game | null>;
  } catch (error) {
    console.error('Error fetching game data:', error);
    throw error; // or return null, depending on how you want to handle errors
  }
}

export async function getGenresByIDs(ids: number[]): Promise<Genre[] | []> {
  try {
    const idsString = ids.join(',');
    const response = await apicalypse({
      queryMethod: 'body',
      method: 'POST',
      headers: {
        'Client-ID': process.env.IGDB_CLIENT_ID,
        'Authorization': process.env.IGDB_AUTHORIZATION,
        'Accept': 'application/json',
      }
    })
      .fields('*') // Fetches all fields. You might want to specify only the fields you need.
      .where(`id = (${idsString})`)      
      .request('https://api.igdb.com/v4/genres'); // Execute the query and return a response object
    return response.data as Promise<Genre[] | []>;
  } catch (error) {
    console.error('Error fetching game data:', error);
    throw error; // or return null, depending on how you want to handle errors
  }
}

export async function getCoverArtByGameID(ID: number): Promise<Cover | undefined> { 
  try {
    const response = await apicalypse({
      queryMethod: 'body',
      method: 'POST',
      headers: {
        'Client-ID': process.env.IGDB_CLIENT_ID,
        'Authorization': process.env.IGDB_AUTHORIZATION,
        'Accept': 'application/json',
      }
    })
      .fields('*') // Fetches all fields. You might want to specify only the fields you need.
      .where(`game=${ID}`) // Use the dynamic gameId
      .request('https://api.igdb.com/v4/covers'); // Execute the query and return a response object
    const covers = await response.data;    
    return covers[0]; // Return the URL of the cover
    
  } catch (error) {
    console.error('Error fetching game data:', error);
    throw error; // or return null, depending on how you want to handle errors
  }
}

export async function getBackgroundImageByGameId(ID: number): Promise<Screenshot | undefined> { 
  try {
    const response = await apicalypse({
      queryMethod: 'body',
      method: 'POST',
      headers: {
        'Client-ID': process.env.IGDB_CLIENT_ID,
        'Authorization': process.env.IGDB_AUTHORIZATION,
        'Accept': 'application/json',
      }
    })
      .fields('*') // Fetches all fields. You might want to specify only the fields you need.
      .where(`game=${ID}`) // Use the dynamic gameId
      .request('https://api.igdb.com/v4/screenshots'); // Execute the query and return a response object
    const covers = await response.data;    
    return covers[0]; // Return the URL of the cover
    
  } catch (error) {
    console.error('Error fetching game data:', error);
    throw error; // or return null, depending on how you want to handle errors
  }
}

export async function getPlatformsByIDs(ids: number[]): Promise<string[] | undefined> { 
  try {
    const idsString = ids.join(',');
    const response = await apicalypse({
      queryMethod: 'body',
      method: 'POST',
      headers: {
        'Client-ID': process.env.IGDB_CLIENT_ID,
        'Authorization': process.env.IGDB_AUTHORIZATION,
        'Accept': 'application/json',
      }
    })
      .fields('*') // Fetches all fields. You might want to specify only the fields you need.
      .where(`id = (${idsString})`) // Use the dynamic gameId
      .request('https://api.igdb.com/v4/platforms'); // Execute the query and return a response object
    const platforms = await response.data;   
    const res:string[] = []
    platforms.forEach((platform: Platform) => {
      res.push(platform.name); // Return the URL of the cover
    });
    return res    
  } catch (error) {
    console.error('Error fetching game data:', error);
    throw error; // or return null, depending on how you want to handle errors
  }
}
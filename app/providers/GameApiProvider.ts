import { Cover, Game } from "../interfaces/interfaces";
import apicalypse from "apicalypse";

export async function getGamesBySearch(searchTerm: string): Promise<Game[] | null> {
  try {
    const response = await apicalypse({
      queryMethod: 'body',
      method: 'POST',
      headers: {
        'Client-ID': 'a20m92r9tk7dnwapky9i2sq4n0dh7d',
        'Authorization': 'Bearer f11ukhz1requ4j037hq5k37xlexeug',
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

export async function getCoverArtByGameID(ID: number): Promise<Cover | undefined> { 
  try {
    const response = await apicalypse({
      queryMethod: 'body',
      method: 'POST',
      headers: {
        'Client-ID': 'a20m92r9tk7dnwapky9i2sq4n0dh7d',
        'Authorization': 'Bearer f11ukhz1requ4j037hq5k37xlexeug',
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
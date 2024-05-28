// getGamesBySearch.test.ts
import { it, describe, expect, vi } from 'vitest';
import apicalypse from 'apicalypse';
import { getGamesBySearch } from '../app/_services/GameApiService'; // Adjust the import path
import { Game } from '@/app/_interfaces/interfaces';

//Setting up mocks
const mocks = vi.hoisted(() => ({
  fields: vi.fn().mockReturnThis(),
  search: vi.fn().mockReturnThis(),
  limit: vi.fn().mockReturnThis(),
  request: vi.fn(),
}));

// Mocking Apicalypse Module
vi.mock('apicalypse', async (importActual) => {
  const actual = await importActual<typeof import('apicalypse')>();

  return {
    ...actual,
    default: vi.fn(() => ({
      fields: mocks.fields,
      search: mocks.search,
      limit: mocks.limit,
      request: mocks.request,
    })),
  };
});

//Tests for the external game information API
describe('External game API tests', () => {
  it('should fetch games by search term successfully', async () => {
    const mockResponse = { data: [{ id: 1, name: 'Game 1' }] as Game[] };
    mocks.request.mockResolvedValueOnce(mockResponse);

    const result = await getGamesBySearch('test');
    expect(result).toEqual(mockResponse.data);
    expect(mocks.fields).toHaveBeenCalledWith('*');
    expect(mocks.search).toHaveBeenCalledWith('test');
    expect(mocks.limit).toHaveBeenCalledWith(10);
    expect(mocks.request).toHaveBeenCalledWith('https://api.igdb.com/v4/games');
    
  });

  it('should handle API errors gracefully', async () => {
    const mockError = new Error('API error');
    mocks.request.mockRejectedValueOnce(mockError);

    await expect(getGamesBySearch('test')).rejects.toThrow('API error');
    expect(mocks.fields).toHaveBeenCalledWith('*');
    expect(mocks.search).toHaveBeenCalledWith('test');
    expect(mocks.limit).toHaveBeenCalledWith(10);
    expect(mocks.request).toHaveBeenCalledWith('https://api.igdb.com/v4/games');
  });
});

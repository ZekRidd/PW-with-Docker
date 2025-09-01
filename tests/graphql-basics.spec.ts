import { test, expect } from '@playwright/test';

test.describe('Pokemon GraphQL API Test', ()=> {
  const GRAPHQL_ENDPOINT = 'https://graphql-pokemon2.vercel.app/';

  test('should fetch first 5 pokemons', async ({ request }) => {
    const query = `
      query {
        pokemons(first: 5) {
          id
          name
          image
          types
        }
      }
    `; 

    const response = await request.post(GRAPHQL_ENDPOINT, {
      data : {
        query: query
      }
    });

    expect(response.ok()).toBeTruthy();
    
    const data = await response.json();
    expect(data.data).toBeDefined();
    expect(data.data.pokemons).toBeDefined();
    expect(Array.isArray(data.data.pokemons)).toBeTruthy();
    expect(data.data.pokemons.length).toBe(5);
  }); 
});
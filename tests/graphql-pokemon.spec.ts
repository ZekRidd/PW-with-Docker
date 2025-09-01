import { test, expect } from '@playwright/test';

test.describe('GraphQL Pokemon API Tests', () => {
  const GRAPHQL_URL = 'https://graphql-pokemon2.vercel.app/';

  test('should fetch pokemons', async ({ request }) => {
    const query = `
      query {
        pokemons(first: 5) {
          id
          name
          types
        }
      }
    `;

    const response = await request.post(GRAPHQL_URL, {
      data: { query }
    });

    expect(response.ok()).toBeTruthy();
    
    const data = await response.json();
    expect(data.data).toBeDefined();
    expect(data.data.pokemons).toBeDefined();
    expect(Array.isArray(data.data.pokemons)).toBeTruthy();
    expect(data.data.pokemons.length).toBe(5);
  });

  test('should fetch single pokemon by name', async ({ request }) => {
    const query = `
      query {
        pokemon(name: "Pikachu") {
          id
          name
          types
          weight {
            minimum
            maximum
          }
          height {
            minimum
            maximum
          }
        }
      }
    `;

    const response = await request.post(GRAPHQL_URL, {
      data: { query }
    });

    expect(response.ok()).toBeTruthy();
    
    const data = await response.json();
    expect(data.data.pokemon).toBeDefined();
    expect(data.data.pokemon.name).toBe('Pikachu');
    expect(data.data.pokemon.types).toBeDefined();
  });

  test('should handle errors gracefully', async ({ request }) => {
    const invalidQuery = `
      query {
        nonExistentField {
          id
        }
      }
    `;

    const response = await request.post(GRAPHQL_URL, {
      data: { query: invalidQuery }
    });

    expect(response.ok()).toBeTruthy(); // GraphQL errors return 200
    
    const data = await response.json();
    expect(data.errors).toBeDefined();
    expect(Array.isArray(data.errors)).toBeTruthy();
  });
}); 
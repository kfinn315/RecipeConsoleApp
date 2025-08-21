import { http, HttpResponse } from 'msw'
import { baseUrl } from '../src/Configuration';

export const handlers = [
  //   // Mock GET /recipes
  http.get(baseUrl + "/recipes", () => {
    return HttpResponse.json([
      { id: 1, title: "Recipe1", categories: [0], ingredients: ["ingredient1"], instructions: "instructions" },
      { id: 2, title: "Recipe2", categories: [1], ingredients: ["ingredient2"], instructions: "instructions" },
    ]
    );
  }),
  // Mock POST /recipes
  http.post(baseUrl + "/recipes", async ({ request }) => {


    const newRecipe = await request.json();
    console.log('Handler', newRecipe, typeof (newRecipe));

    return HttpResponse.json({ ...(newRecipe as Record<string, unknown>), id: 3 });
  }),

  // Mock PUT /recipes/:id
  http.put(baseUrl + "/recipes/:id", async ({ params, request: req }) => {
    const { id } = params;
    const updatedRecipe = await req.json();
    return HttpResponse.json(updatedRecipe);
  }),

  // Mock DELETE /recipes/:id
  http.delete(baseUrl + "/recipes/:id", () => {
    return new Response(null, { status: 204 })
  }),
];
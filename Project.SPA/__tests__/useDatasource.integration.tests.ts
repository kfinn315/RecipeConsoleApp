import { renderHook, act, waitFor } from "@testing-library/react";
import { useDatasource } from "../src/Hooks";
import type { DisplayRecipe, Recipe } from "../src/Types";

import { type OptionalID } from '../src/Types/OptionalID';

describe("useDatasource integration tests", () => {
    it("loads recipes from the API", async () => {
        const { result } = renderHook(() => useDatasource());

        // Wait for the recipes to load
        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        // Assert that recipes are loaded
        expect(result.current.recipes.recipes).toEqual([
            { id: 1, title: "Recipe1", categories: [0], ingredients: ["ingredient1"], instructions: "instructions" },
            { id: 2, title: "Recipe2", categories: [1], ingredients: ["ingredient2"], instructions: "instructions" },
        ]);
    });

    it("adds a new recipe via the API", async () => {
        const newRecipe: OptionalID<Recipe> = {
            title: "New Recipe",
            categories: [2],
            ingredients: ["ingredient3"],
            instructions: "new instructions",
        };

        const { result } = renderHook(() => useDatasource());

        // Wait for initial recipes to load
        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        // Add a new recipe
        await act(async () => {
            await result.current.recipes.addRecipe(newRecipe);
        });

        // Assert that the new recipe is added
        expect(result.current.recipes.recipes).toContainEqual({
            id: 3,
            title: "New Recipe",
            categories: [2],
            ingredients: ["ingredient3"],
            instructions: "new instructions",
        });
    });

    it("updates an existing recipe via the API", async () => {
        const updatedRecipe: Recipe = {
            id: 1,
            title: "Updated Recipe",
            categories: [0],
            ingredients: ["updated ingredient"],
            instructions: "updated instructions",
        };
        const expectedRecipe: DisplayRecipe = {
            id: 1,
            title: "Updated Recipe",
            categories: [{ id: 0, name: "" }],
            ingredients: ["updated ingredient"],
            instructions: "updated instructions",
        };
        const { result } = renderHook(() => useDatasource());

        // Wait for initial recipes to load
        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        // Update a recipe
        await act(async () => {
            await result.current.recipes.editRecipe(updatedRecipe);
        });

        // Assert that the recipe is updated
        expect(result.current.recipes.recipes).toContainEqual(expectedRecipe);
    });

    // it("handles API errors gracefully", async () => {
    //     // Mock an error response for GET /recipes
    //     const { server } = setupTests()

    //     server.use(
    //         rest.get("/recipes", (req, res, ctx) => {
    //             return res(ctx.status(500), ctx.json({ message: "Internal Server Error" }));
    //         })
    //     );

    //     const { result } = renderHook(() => useRecipes());

    //     // Wait for the error to be handled
    //     await waitFor(() => {
    //         expect(result.current.isLoading).toBe(false);
    //     });

    //     // Assert that the error message is set
    //     expect(result.current.errorMessage).toBe("Internal Server Error");
    // });
});
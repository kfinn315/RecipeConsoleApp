import { renderHook, act, waitFor } from "@testing-library/react";
import { useDatasource } from "../src/Hooks";
import type { Category, DisplayRecipe, Recipe } from "../src/Types";

import { type OptionalID } from '../src/Types/OptionalID';
import { server } from "../mocks/node";
import { recipePost404, recipeGet404, recipePut404 } from "../mocks/overrideHandlers";

describe("useDatasource", () => {
    beforeEach(() => {
        server.resetHandlers();
    });
    describe("clearErrorMessage", () => {
        it("sets errorMessage to undefined when called", async () => {
            const errorMessage = "This is a mock error message";
            const { result } = renderHook(() => useDatasource(undefined, undefined, { errorMessage }));

            await waitFor(() => {
                expect(result.current.errorMessage).not.toBeUndefined();
            });
            await act(async () => {
                result.current.clearErrorMessage();
            });
            await waitFor(() => {
                expect(result.current.errorMessage).toBeUndefined();
            });
        });
    });
    describe("recipes", () => {
        describe("initially", () => {
            it("loads recipes from the API", async () => {
                const { result } = renderHook(() => useDatasource());

                // Wait for the recipes to load
                await waitFor(() => {
                    expect(result.current.isLoading).toBe(false);
                });

                expect(result.current.recipes.recipes).toEqual(expect.arrayOf(
                    expect.objectContaining({
                        id: expect.any(Number),
                        title: expect.any(String)
                    })
                ));
            });
            it("shows error message when receiving API 404 response from get recipes", async () => {
                server.use(recipeGet404)

                const { result } = renderHook(() => useDatasource());

                // Wait for initial recipes to load
                await waitFor(() => {
                    expect(result.current.isLoading).toBe(false);
                });

                // Assert that the errorMessage has been set
                expect(result.current.errorMessage).not.toBeUndefined();
                expect(result.current.errorMessage).toBe("Not Found");
            });
        });
        describe("add", () => {
            it("shows error message when receiving API 404 response from add recipe", async () => {
                const newRecipe: OptionalID<Recipe> = {
                    title: "New Recipe",
                    categories: [2],
                    ingredients: ["ingredient3"],
                    instructions: "new instructions",
                };

                server.use(recipePost404)

                const { result } = renderHook(() => useDatasource());

                // Wait for initial recipes to load
                await waitFor(() => {
                    expect(result.current.isLoading).toBe(false);
                });

                // Add a new recipe
                await act(async () => {
                    await result.current.recipes.addRecipe(newRecipe);
                });

                await waitFor(() => {
                    expect(result.current.isLoading).toBe(false);
                });

                // Assert that the errorMessage has been set
                expect(result.current.errorMessage).not.toBeUndefined();
                expect(result.current.errorMessage).toBe("Not Found");
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

                await waitFor(() => {
                    expect(result.current.isLoading).toBe(false);
                });

                // Assert that the new recipe is added
                expect(result.current.recipes.recipes).toContainEqual({
                    ...newRecipe,
                    id: expect.any(Number),
                    categories: expect.arrayContaining([expect.objectContaining({ id: 2 })]),
                });
            });
        });
        describe("update", () => {
            it("displays error message when the API responds with 404 error", async () => {
                const updatedRecipe: Recipe = {
                    id: 1,
                    title: "Updated Recipe",
                    categories: [0],
                    ingredients: ["updated ingredient"],
                    instructions: "updated instructions",
                };

                server.use(recipePut404)
                const { result } = renderHook(() => useDatasource());

                // Wait for initial recipes to load
                await waitFor(() => {
                    expect(result.current.isLoading).toBe(false);
                });

                // Update a recipe
                await act(async () => {
                    await result.current.recipes.editRecipe(updatedRecipe);
                });

                // Assert that the errorMessage has been set
                expect(result.current.errorMessage).not.toBeUndefined();
                expect(result.current.errorMessage).toBe("Not Found");
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
                    categories: [{ id: 0, name: "?" }],
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
                // expect(result.current.recipes.recipes).toContainEqual(expectedRecipe);
                expect(result.current.recipes.recipes).toContainEqual({
                    ...expectedRecipe,
                    categories: expect.arrayContaining([expect.objectContaining({ id: 0 })]),
                });
            });
        });
    });

    describe("categories", () => {
        it("loads categories from the API", async () => {
            const { result } = renderHook(() => useDatasource());

            // Wait for the recipes to load
            await waitFor(() => {
                expect(result.current.isLoading).toBe(false);
            });

            expect(result.current.categories.categories).toEqual(expect.arrayOf(
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String)
                })
            ));
        });

        it("adds a new category via the API", async () => {
            const newItem: OptionalID<Category> = {
                name: "New Category"
            };

            const { result } = renderHook(() => useDatasource());

            // Wait for initial recipes to load
            await waitFor(() => {
                expect(result.current.isLoading).toBe(false);
            });

            // Add a new recipe
            await act(async () => {
                await result.current.categories.addCategory(newItem);
            });

            // Assert that the new category is added
            expect(result.current.categories.categories).toContainEqual({
                ...newItem,
                id: expect.any(Number)
            });
        });

        // it("updates an existing recipe via the API", async () => {
        //     const updatedRecipe: Recipe = {
        //         id: 1,
        //         title: "Updated Recipe",
        //         categories: [0],
        //         ingredients: ["updated ingredient"],
        //         instructions: "updated instructions",
        //     };
        //     const expectedRecipe: DisplayRecipe = {
        //         id: 1,
        //         title: "Updated Recipe",
        //         categories: [{ id: 0, name: "" }],
        //         ingredients: ["updated ingredient"],
        //         instructions: "updated instructions",
        //     };
        //     const { result } = renderHook(() => useDatasource());

        //     // Wait for initial recipes to load
        //     await waitFor(() => {
        //         expect(result.current.isLoading).toBe(false);
        //     });

        //     // Update a recipe
        //     await act(async () => {
        //         await result.current.recipes.editRecipe(updatedRecipe);
        //     });

        //     // Assert that the recipe is updated
        //     expect(result.current.recipes.recipes).toContainEqual(expectedRecipe);
        // });
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
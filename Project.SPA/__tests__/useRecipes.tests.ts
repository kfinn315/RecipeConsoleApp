/**
 * test:
 * methods addRecipe, editRecipe to send add, edit API requests
 * isLoading is true when request for recipes is pending
 * recipes is undefined when get request is pending
 * recipes holds the list of recipes from API
 */

import { useRecipes } from "../src/Components/Hooks/useRecipes";
import type { Recipe } from "../src/Types";

import { act, renderHook, waitFor } from "@testing-library/react"

describe("useRecipes", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("initially loads recipes from fetch", async () => {
        const mockData: Recipe[] = [{ id: 0, title: 'Recipe1', categories: [0, 1], ingredients: ["ingredient1"], instructions: "instructions" }];
        (fetch as jest.Mock).mockResolvedValueOnce({
            status: 200,
            ok: true,
            json: async () => mockData
        });

        const { result } = renderHook(() => useRecipes());
        await waitFor(() => { expect(result.current.isLoading).toBe(false) })
        expect(result.current.recipes).toBe(mockData);
    });

    describe("addRecipe", () => {
        it("sends new recipe to API as json using POST", async () => {
            const mockData: Recipe = { id: 0, title: 'Recipe1', categories: [0, 1], ingredients: ["ingredient1"], instructions: "instructions" };
            const mockData2: Recipe[] = [{ id: 0, title: 'Recipe1', categories: [0, 1], ingredients: ["ingredient1"], instructions: "instructions" }];

            (fetch as jest.Mock).mockImplementation((url: string, requestInfo) => {
                if (requestInfo.method === "POST" && url.endsWith("recipes")) {
                    return Promise.resolve({
                        status: 200,
                        ok: true,
                        json: async () => mockData
                    })
                } else {
                    return Promise.resolve({
                        status: 200,
                        ok: true,
                        json: async () => mockData2
                    })
                }
            });

            const { result } = renderHook(() => useRecipes());
            await waitFor(() => { expect(result.current.isLoading).toBe(false) })
            act(() => {
                result.current.addRecipe(mockData);
            })

            expect((fetch as jest.Mock).mock.calls[1][1]).toHaveProperty("body", JSON.stringify(mockData));
        });
    });

    describe("editRecipe", () => {
        it("sends edited recipe to API as json using PUT", async () => {
            const mockEditedRecipe: Recipe = { id: 1, title: 'Edited Recipe', categories: [0], ingredients: ["ingredient2"], instructions: "new instructions" };
            const initialRecipes: Recipe[] = [{ id: 0, title: 'Recipe1', categories: [0, 1], ingredients: ["ingredient1"], instructions: "instructions" }];
            const updatedRecipes: Recipe[] = [...initialRecipes, mockEditedRecipe];

            const fetchMock = jest.fn()
                // Initial GET request to load recipes
                .mockResolvedValueOnce({
                    status: 200,
                    ok: true,
                    json: async () => initialRecipes
                })
                // PUT request to edit the recipe
                .mockResolvedValueOnce({
                    status: 200,
                    ok: true,
                    json: async () => mockEditedRecipe
                })
                // Subsequent GET request to fetch updated recipes
                .mockResolvedValueOnce({
                    status: 200,
                    ok: true,
                    json: async () => updatedRecipes
                });

            global.fetch = fetchMock;

            const { result } = renderHook(() => useRecipes());

            // Wait for initial state to settle
            await waitFor(() => {
                expect(result.current.isLoading).toBe(false);
            });

            // Perform editRecipe action
            await act(() => {
                result.current.editRecipe(mockEditedRecipe);
            });

            // Verify the PUT request was sent with the correct data
            expect(fetchMock).toHaveBeenCalledWith(
                expect.stringMatching(/recipes$/), // URL should end with "recipes"
                expect.objectContaining({
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(mockEditedRecipe)
                })
            );
        });

        it("requests list after editRecipe response ", async () => {
            const mockEditedRecipe: Recipe = { id: 1, title: 'Edited Recipe', categories: [0], ingredients: ["ingredient2"], instructions: "new instructions" };
            const initialRecipes: Recipe[] = [{ id: 0, title: 'Recipe1', categories: [0, 1], ingredients: ["ingredient1"], instructions: "instructions" }];
            const updatedRecipes: Recipe[] = [...initialRecipes, mockEditedRecipe];

            const fetchMock = jest.fn()
                // Initial GET request to load recipes
                .mockResolvedValueOnce({
                    status: 200,
                    ok: true,
                    json: async () => initialRecipes
                })
                // PUT request to edit the recipe
                .mockResolvedValueOnce({
                    status: 200,
                    ok: true,
                    json: async () => mockEditedRecipe
                })
                // Subsequent GET request to fetch updated recipes
                .mockResolvedValueOnce({
                    status: 200,
                    ok: true,
                    json: async () => updatedRecipes
                });

            global.fetch = fetchMock;

            const { result } = renderHook(() => useRecipes());

            // Wait for initial recipes to load
            await waitFor(() => {
                expect(result.current.isLoading).toBe(false);
            });
            expect(result.current.recipes).toEqual(initialRecipes);

            // Perform editRecipe action
            await act(() => {
                result.current.editRecipe(mockEditedRecipe);
            });

            // Wait for updated recipes to load
            await waitFor(() => {
                expect(result.current.isLoading).toBe(false);
            });
            expect(result.current.recipes).toEqual(updatedRecipes);

            // Verify fetch calls
            expect(fetchMock).toHaveBeenCalledTimes(3);
            expect(fetchMock).toHaveBeenNthCalledWith(1, expect.stringMatching(/recipes$/), expect.objectContaining({ method: "GET" }));
            expect(fetchMock).toHaveBeenNthCalledWith(2, expect.stringMatching(/recipes$/), expect.objectContaining({ method: "PUT" }));
            expect(fetchMock).toHaveBeenNthCalledWith(3, expect.stringMatching(/recipes$/), expect.objectContaining({ method: "GET" }));
        });
    });
});
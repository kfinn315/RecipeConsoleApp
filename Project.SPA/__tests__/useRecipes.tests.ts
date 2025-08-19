/**
 * test:
 * methods addRecipe, editRecipe to send add, edit API requests
 * isLoading is true when request for recipes is pending
 * recipes is undefined when get request is pending
 * recipes holds the list of recipes from API
 * catches errors from Client.ts and sets errorMessage with response.message
 * sets isLoading to false after request from Client.ts is resolved
 */

import { Client } from "../src/Client/Client";
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
    it("sets errorMessage for initial getRecipes error", async () => {
        const mockErrorMessage = "this is the mock error message";
        jest.spyOn(clientInstance, "getRecipes").mockRejectedValueOnce(new Error(mockErrorMessage));


        const { result } = renderHook(() => useRecipes(clientInstance));
        // Wait for the recipes to load
        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.errorMessage).toBe(mockErrorMessage);
    });
    describe("addRecipe", () => {
        let clientInstance: Client;

        beforeEach(() => {
            // Reset all mocks before each test
            jest.clearAllMocks();

            clientInstance = new Client(""); // Create a real instance of the Client class
        });

        it("sets errorMessage for addRecipe error", async () => {
            const mockErrorMessage = "this is the mock error message";
            const mockNewRecipe: Recipe = { id: undefined, title: "title0", categories: [], ingredients: [], instructions: "" }
            const mockExistingRecipes: Recipe[] = [{ id: 0, title: 'Recipe1', categories: [0, 1], ingredients: ["ingredient1"], instructions: "instructions" }];
            jest.spyOn(clientInstance, "getRecipes").mockResolvedValueOnce(mockExistingRecipes);
            jest.spyOn(clientInstance, "addRecipe").mockRejectedValueOnce(new Error(mockErrorMessage));

            const { result } = renderHook(() => useRecipes(clientInstance));
            // Wait for the recipes to load
            await waitFor(() => {
                expect(result.current.isLoading).toBe(false);
            });

            // Perform addRecipe action
            await act(() => {
                result.current.addRecipe(mockNewRecipe);
            });
            await waitFor(() => {
                expect(result.current.isLoading).toBe(false);
            });

            expect(result.current.errorMessage).toBe(mockErrorMessage);
        });

        it("adds the new recipe in recipes list", async () => {
            const mockNewRecipe: Recipe = { id: undefined, title: "title0", categories: [], ingredients: [], instructions: "" }
            const mockExistingRecipes: Recipe[] = [{ id: 0, title: 'Recipe1', categories: [0, 1], ingredients: ["ingredient1"], instructions: "instructions" }];
            jest.spyOn(clientInstance, "getRecipes").mockResolvedValueOnce(mockExistingRecipes);
            jest.spyOn(clientInstance, "addRecipe").mockResolvedValueOnce(mockNewRecipe);

            const { result } = renderHook(() => useRecipes(clientInstance));
            // Wait for the recipes to load
            await waitFor(() => {
                expect(result.current.isLoading).toBe(false);
            });

            // Perform addRecipe action
            await act(() => {
                result.current.addRecipe(mockNewRecipe);
            });

            expect(result.current.recipes).toContain(mockNewRecipe);
        });
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
        let clientInstance: Client;

        beforeEach(() => {
            // Reset all mocks before each test
            jest.clearAllMocks();

            clientInstance = new Client(""); // Create a real instance of the Client class
        });
        it("sets errorMessage for editRecipe error", async () => {
            const mockErrorMessage = "this is the mock error message";
            const mockUpdateRecipe: Recipe = { id: 0, title: "title0", categories: [], ingredients: [], instructions: "" }
            const mockExistingRecipes: Recipe[] = [{ id: 0, title: 'Recipe1', categories: [0, 1], ingredients: ["ingredient1"], instructions: "instructions" }];
            jest.spyOn(clientInstance, "getRecipes").mockResolvedValueOnce(mockExistingRecipes);
            jest.spyOn(clientInstance, "updateRecipe").mockRejectedValueOnce(new Error(mockErrorMessage));

            const { result } = renderHook(() => useRecipes(clientInstance));
            // Wait for the recipes to load
            await waitFor(() => {
                expect(result.current.isLoading).toBe(false);
            });

            // Perform addRecipe action
            await act(() => {
                result.current.editRecipe(mockUpdateRecipe);
            });
            await waitFor(() => {
                expect(result.current.isLoading).toBe(false);
            });

            expect(result.current.errorMessage).toBe(mockErrorMessage);
        });
        it("updates the edited recipe in recipes list", async () => {
            const mockEditedRecipe: Recipe = { id: 0, title: "title0", categories: [], ingredients: [], instructions: "" }
            const mockExistingRecipes: Recipe[] = [{ id: 0, title: 'Recipe1', categories: [0, 1], ingredients: ["ingredient1"], instructions: "instructions" }];
            jest.spyOn(clientInstance, "getRecipes").mockResolvedValueOnce(mockExistingRecipes);
            jest.spyOn(clientInstance, "updateRecipe").mockResolvedValueOnce(mockEditedRecipe);

            const { result } = renderHook(() => useRecipes(clientInstance));
            // Wait for the recipes to load
            await waitFor(() => {
                expect(result.current.isLoading).toBe(false);
            });

            // Perform editRecipe action
            await act(() => {
                result.current.editRecipe(mockEditedRecipe);
            });

            expect(result.current.recipes).toContain(mockEditedRecipe);
        });

        it("sends edited recipe to fetch() as json, method PUT", async () => {
            const mockEditedRecipe: Recipe = { id: 1, title: 'Edited Recipe', categories: [0], ingredients: ["ingredient2"], instructions: "new instructions" };
            const initialRecipes: Recipe[] = [{ id: 0, title: 'Recipe1', categories: [0, 1], ingredients: ["ingredient1"], instructions: "instructions" }];

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
    });
});
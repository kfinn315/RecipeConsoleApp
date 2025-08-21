import { RecipeClient } from '../src/Client';
import type { Recipe } from '../src/Types';

/**
 * Communicates with API to get/add/edit categories/recipes
 * baseUrl is url of API
 * get methods return Promise<[]> when response.ok, rethrow exceptions, throw for !response.ok
 * add/edit methods return Promise<void> when response.ok, rethrow exceptions, throw for !response.ok
 */
describe("Recipes", () => {

    beforeEach(() => {
        jest.clearAllMocks();
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe("get", () => {
        it("returns recipes", async () => {
            const baseUrl = "http://localhost:5023";
            const mockData: Recipe[] = [{ id: 0, title: 'Recipe1', categories: [0, 1], ingredients: ["ingredient1"], instructions: "instructions" }, { id: 1, title: 'Recipe2', categories: [0, 33], ingredients: ["ingredient2"], instructions: "instructions1" }];

            (fetch as jest.Mock).mockResolvedValueOnce({
                status: 200,
                ok: true,
                json: async () => mockData,
            });

            const client = new RecipeClient(baseUrl);

            const recipes = await client.get();

            expect(recipes).toEqual(mockData);
        });
        it("rethrows errors", async () => {
            const baseUrl = "http://localhost:5023";
            (fetch as jest.Mock).mockRejectedValueOnce(Error("error message"));

            const client = new RecipeClient(baseUrl);

            expect(client.get()).rejects.toThrow(Error("error message"));
        });
        it("throws statusText error when fetchResponse.ok is false", async () => {
            const baseUrl = "http://localhost:5023";
            const statusText = "this request was not 'ok'";
            (fetch as jest.Mock).mockResolvedValueOnce({
                status: 200,
                ok: false,
                statusText
            });

            const client = new RecipeClient(baseUrl);

            expect(client.get()).rejects.toThrow(Error(statusText));
        });
    });
    describe("add", () => {
        it("sends recipe data to api in JSON format", async () => {
            const baseUrl = "http://localhost:5023";
            const mockData: Recipe = { id: 0, title: 'Recipe1', categories: [0, 1], ingredients: ["ingredient1"], instructions: "instructions" };

            (fetch as jest.Mock).mockResolvedValueOnce({
                status: 200,
                ok: true,
                json: async () => { }
            });

            const client = new RecipeClient(baseUrl);

            expect(client.add(mockData)).resolves.toBe(undefined);

            expect((fetch as jest.Mock).mock.lastCall[0]).toEqual(baseUrl + "/recipes")
            expect((fetch as jest.Mock).mock.lastCall[1]).toHaveProperty("body", JSON.stringify(mockData))
        })
        it("rethrows errors", async () => {
            const baseUrl = "http://localhost:5023";
            const mockData: Recipe = { id: 0, title: 'Recipe1', categories: [0, 1], ingredients: ["ingredient1"], instructions: "instructions" };
            (fetch as jest.Mock).mockRejectedValueOnce(Error("error message"));

            const client = new RecipeClient(baseUrl);

            expect(client.add(mockData)).rejects.toThrow(Error("error message"));
        });
        it("throws statusText error when fetchResponse.ok is false", async () => {
            const baseUrl = "http://localhost:5023";
            const mockData: Recipe = { id: 0, title: 'Recipe1', categories: [0, 1], ingredients: ["ingredient1"], instructions: "instructions" };
            const statusText = "this request was not 'ok'";
            (fetch as jest.Mock).mockResolvedValueOnce({
                status: 200,
                ok: false,
                statusText
            });

            const client = new RecipeClient(baseUrl);

            expect(client.add(mockData)).rejects.toThrow(Error(statusText));
        });
    })
    describe("editRecipe", () => {
        it("sends recipe data to api in JSON format", async () => {
            const baseUrl = "http://localhost:5023";
            const mockData: Recipe = { id: 0, title: 'Recipe1', categories: [0, 1], ingredients: ["ingredient1"], instructions: "instructions" };

            (fetch as jest.Mock).mockResolvedValueOnce({
                status: 200,
                ok: true,
                json: async () => { }
            });

            const client = new RecipeClient(baseUrl);

            expect(client.update(mockData)).resolves.toBe(undefined);
            expect((fetch as jest.Mock).mock.lastCall[0]).toEqual(baseUrl + "/recipes/" + mockData.id)
            expect((fetch as jest.Mock).mock.lastCall[1]).toHaveProperty("body", JSON.stringify(mockData))
        })
        it("rethrows errors", async () => {
            const baseUrl = "http://localhost:5023";
            const mockData: Recipe = { id: 0, title: 'Recipe1', categories: [0, 1], ingredients: ["ingredient1"], instructions: "instructions" };
            (fetch as jest.Mock).mockRejectedValueOnce(Error("error message"));

            const client = new RecipeClient(baseUrl);

            expect(client.update(mockData)).rejects.toThrow(Error("error message"));
        });
        it("throws statusText error when fetchResponse.ok is false", async () => {
            const baseUrl = "http://localhost:5023";
            const mockData: Recipe = { id: 0, title: 'Recipe1', categories: [0, 1], ingredients: ["ingredient1"], instructions: "instructions" };
            const statusText = "this request was not 'ok'";
            (fetch as jest.Mock).mockResolvedValueOnce({
                status: 200,
                ok: false,
                statusText
            });

            const client = new RecipeClient(baseUrl);

            expect(client.update(mockData)).rejects.toThrow(Error(statusText));
        });
    })
});
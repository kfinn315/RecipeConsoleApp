import { CategoryClient } from '../src/Client';
import type { Category } from '../src/Types';

/**
 * Communicates with API to get/add/edit categories/recipes
 * baseUrl is url of API
 * get methods return Promise<[]> when response.ok, rethrow exceptions, throw for !response.ok
 * add/edit methods return Promise<void> when response.ok, rethrow exceptions, throw for !response.ok
 */

describe("CategoryClient", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });
    describe("get", () => {
        it("returns categories", async () => {
            const baseUrl = "http://localhost:5023";
            const mockData: Category[] = [{ id: 0, name: 'Category1' }, { id: 1, name: 'Category2' }];

            (fetch as jest.Mock).mockResolvedValueOnce({
                status: 200,
                ok: true,
                json: async () => mockData,
            });

            const client = new CategoryClient(baseUrl);

            const categories = await client.get();

            expect(categories).toEqual(mockData);
        });
        it("rethrows errors", async () => {
            const baseUrl = "http://localhost:5023";

            (fetch as jest.Mock).mockRejectedValueOnce(Error("error message"));

            const client = new CategoryClient(baseUrl);

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

            const client = new CategoryClient(baseUrl);

            expect(client.get()).rejects.toThrow(Error(statusText));
        });
    });
    describe("add", () => {
        it("sends category data to api in JSON format", async () => {
            const baseUrl = "http://localhost:5023";
            const mockData: Category = { id: 0, name: 'Category1' };

            (fetch as jest.Mock).mockResolvedValueOnce({
                status: 200,
                ok: true,
                json: async () => { }
            });

            const client = new CategoryClient(baseUrl);

            expect(client.add(mockData)).resolves.toBe(undefined);
            expect((fetch as jest.Mock).mock.lastCall[0]).toEqual(baseUrl + "/categories")
            expect((fetch as jest.Mock).mock.lastCall[1]).toHaveProperty("body", JSON.stringify(mockData))
        })
        it("rethrows errors", async () => {
            const baseUrl = "http://localhost:5023";
            const mockData: Category = { id: 0, name: 'Category1' };
            (fetch as jest.Mock).mockRejectedValueOnce(Error("error message"));

            const client = new CategoryClient(baseUrl);

            expect(client.add(mockData)).rejects.toThrow(Error("error message"));
        });
        it("throws statusText error when fetchResponse.ok is false", async () => {
            const baseUrl = "http://localhost:5023";
            const mockData: Category = { id: 0, name: 'Category1' };
            const statusText = "this request was not 'ok'";
            (fetch as jest.Mock).mockResolvedValueOnce({
                status: 200,
                ok: false,
                statusText
            });

            const client = new CategoryClient(baseUrl);

            expect(client.add(mockData)).rejects.toThrow(Error(statusText));
        });
    })
    describe("updateCategory", () => {
        it("sends category data to api in JSON format", async () => {
            const baseUrl = "http://localhost:5023";
            const mockData: Category = { id: 0, name: 'Category1' };

            (fetch as jest.Mock).mockResolvedValueOnce({
                status: 200,
                ok: true,
                json: async () => { }
            });

            const client = new CategoryClient(baseUrl);

            expect(client.update(mockData)).resolves.toBe(undefined);
            expect((fetch as jest.Mock).mock.lastCall[0]).toEqual(baseUrl + "/categories/" + mockData.id)
            expect((fetch as jest.Mock).mock.lastCall[1]).toHaveProperty("body", JSON.stringify(mockData))
        })
        it("rethrows errors", async () => {
            const baseUrl = "http://localhost:5023";
            const mockData: Category = { id: 0, name: 'Category1' };
            (fetch as jest.Mock).mockRejectedValueOnce(Error("error message"));

            const client = new CategoryClient(baseUrl);

            expect(client.update(mockData)).rejects.toThrow(Error("error message"));
        });
        it("throws statusText error when fetchResponse.ok is false", async () => {
            const baseUrl = "http://localhost:5023";
            const mockData: Category = { id: 0, name: 'Category1' };
            const statusText = "this request was not 'ok'";
            (fetch as jest.Mock).mockResolvedValueOnce({
                status: 200,
                ok: false,
                statusText
            });

            const client = new CategoryClient(baseUrl);

            expect(client.update(mockData)).rejects.toThrow(Error(statusText));
        });
    })
});

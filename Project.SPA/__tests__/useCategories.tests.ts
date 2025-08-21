import { CategoryClient } from "../src/Client";
import { act, renderHook, waitFor } from "@testing-library/react"
import type { Category } from "../src/Types";
import { useCategories } from "../src/Hooks";

describe("useCategories", () => {
    let clientInstance: CategoryClient;

    beforeEach(() => {
        jest.clearAllMocks();
        global.fetch = jest.fn();
        clientInstance = new CategoryClient(""); // Create a real instance of the Client class
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('intializing', () => {
        it("initially loads categories from fetch", async () => {
            const mockData: Category[] = [{ id: 0, name: 'Category1' }];
            (fetch as jest.Mock).mockResolvedValueOnce({
                status: 200,
                ok: true,
                json: async () => mockData
            });

            const { result } = renderHook(() => useCategories());
            await waitFor(() => { expect(result.current.isLoading).toBe(false) })
            expect(result.current.categories).toBe(mockData);
        });
        it("sets errorMessage for initial getCategories error", async () => {
            const mockErrorMessage = "this is the mock error message";
            jest.spyOn(clientInstance, "get").mockRejectedValueOnce(new Error(mockErrorMessage));


            const { result } = renderHook(() => useCategories(clientInstance));
            // Wait for the categories to load
            await waitFor(() => {
                expect(result.current.isLoading).toBe(false);
            });

            expect(result.current.errorMessage).toBe(mockErrorMessage);
        });
    });
    describe("addCategory", () => {
        it("sets errorMessage for addCategory error", async () => {
            const mockErrorMessage = "this is the mock error message";
            const mockNewCategory: Category = { id: undefined, name: "title0" }
            const mockExistingCategories: Category[] = [{ id: 0, name: 'Category1' }];
            jest.spyOn(clientInstance, "get").mockResolvedValueOnce(mockExistingCategories);
            jest.spyOn(clientInstance, "add").mockRejectedValueOnce(new Error(mockErrorMessage));

            const { result } = renderHook(() => useCategories(clientInstance));
            // Wait for the categories to load
            await waitFor(() => {
                expect(result.current.isLoading).toBe(false);
            });

            // Perform addCategory action
            await act(() => {
                result.current.addCategory(mockNewCategory);
            });
            await waitFor(() => {
                expect(result.current.isLoading).toBe(false);
            });

            expect(result.current.errorMessage).toBe(mockErrorMessage);
        });

        it("adds the new recipe in categories list", async () => {
            const mockNewCategory: Category = { id: undefined, name: "title0" }
            const mockExistingCategories: Category[] = [{ id: 0, name: 'Category1' }];
            jest.spyOn(clientInstance, "get").mockResolvedValueOnce(mockExistingCategories);
            jest.spyOn(clientInstance, "add").mockResolvedValueOnce(mockNewCategory);

            const { result } = renderHook(() => useCategories(clientInstance));
            // Wait for the categories to load
            await waitFor(() => {
                expect(result.current.isLoading).toBe(false);
            });

            // Perform addCategory action
            await act(() => {
                result.current.addCategory(mockNewCategory);
            });

            expect(result.current.categories).toContain(mockNewCategory);
        });
        it("sends new recipe to API as json using POST", async () => {
            const mockData: Category = { id: 0, name: 'Category1' };
            const mockData2: Category[] = [{ id: 0, name: 'Category1' }];

            (fetch as jest.Mock).mockImplementation((url: string, requestInfo) => {
                if (requestInfo.method === "POST" && url.endsWith("categories")) {
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

            const { result } = renderHook(() => useCategories());
            await waitFor(() => { expect(result.current.isLoading).toBe(false) })
            act(() => {
                result.current.addCategory(mockData);
            })

            expect((fetch as jest.Mock).mock.calls[1][1]).toHaveProperty("body", JSON.stringify(mockData));
        });
    });


    describe("editCategory", () => {
        it("sets errorMessage for editCategory error", async () => {
            const mockErrorMessage = "this is the mock error message";
            const mockUpdateCategory: Category = { id: 0, name: "title0" }
            const mockExistingCategories: Category[] = [{ id: 0, name: 'Category1' }];
            jest.spyOn(clientInstance, "get").mockResolvedValueOnce(mockExistingCategories);
            jest.spyOn(clientInstance, "update").mockRejectedValueOnce(new Error(mockErrorMessage));

            const { result } = renderHook(() => useCategories(clientInstance));
            // Wait for the categories to load
            await waitFor(() => {
                expect(result.current.isLoading).toBe(false);
            });

            // Perform addCategory action
            await act(() => {
                result.current.editCategory(mockUpdateCategory);
            });
            await waitFor(() => {
                expect(result.current.isLoading).toBe(false);
            });

            expect(result.current.errorMessage).toBe(mockErrorMessage);
        });
        it("updates the edited recipe in categories list", async () => {
            const mockEditedCategory: Category = { id: 0, name: "title0" }
            const mockExistingCategories: Category[] = [{ id: 0, name: 'Category1' }];
            jest.spyOn(clientInstance, "get").mockResolvedValueOnce(mockExistingCategories);
            jest.spyOn(clientInstance, "update").mockResolvedValueOnce(mockEditedCategory);

            const { result } = renderHook(() => useCategories(clientInstance));
            // Wait for the categories to load
            await waitFor(() => {
                expect(result.current.isLoading).toBe(false);
            });

            // Perform editCategory action
            await act(() => {
                result.current.editCategory(mockEditedCategory);
            });

            expect(result.current.categories).toContain(mockEditedCategory);
        });

        it("sends edited recipe to fetch() as json, method PUT", async () => {
            const mockEditedCategory: Category = { id: 1, name: 'Edited Category' };
            const initialCategories: Category[] = [{ id: 0, name: 'Category1' }];

            const fetchMock = jest.fn()
                // Initial GET request to load categories
                .mockResolvedValueOnce({
                    status: 200,
                    ok: true,
                    json: async () => initialCategories
                })
                // PUT request to edit the recipe
                .mockResolvedValueOnce({
                    status: 200,
                    ok: true,
                    json: async () => mockEditedCategory
                })

            global.fetch = fetchMock;

            const { result } = renderHook(() => useCategories());

            // Wait for initial state to settle
            await waitFor(() => {
                expect(result.current.isLoading).toBe(false);
            });

            // Perform editCategory action
            await act(() => {
                result.current.editCategory(mockEditedCategory);
            });

            // Verify the PUT request was sent with the correct data
            expect(fetchMock).toHaveBeenCalledWith(
                expect.stringMatching(/categories\/\d+$/), // URL should end with "categories/{id}"
                expect.objectContaining({
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(mockEditedCategory)
                })
            );
        });
    });
});
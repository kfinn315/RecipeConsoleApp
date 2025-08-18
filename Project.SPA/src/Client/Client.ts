import type { Category, Recipe } from "../Types";
import { BaseClient } from "./BaseClient";

export class Client {
    private recipeEndpoint: string;
    private categoryEndpoint: string;
    private baseClient: BaseClient;
    constructor(baseUrl: string) {
        this.baseClient = new BaseClient();
        this.recipeEndpoint = `${baseUrl}/recipes`;
        this.categoryEndpoint = `${baseUrl}/categories`;
    }

    getCategories(): Promise<Category[]> {
        console.log('get categories')
        return this.baseClient.get<Category[]>(this.categoryEndpoint);
    }
    getRecipes(): Promise<Recipe[]> {
        console.log('get recipes')
        return this.baseClient.get<Recipe[]>(this.recipeEndpoint);
    }

    addCategory(item: Category): Promise<Category> {
        console.log('add category')
        return this.baseClient.add<Category>(this.categoryEndpoint, item);
    }
    updateCategory(item: Category): Promise<Category> {
        console.log('edit category')
        return this.baseClient.update<Category>(this.categoryEndpoint, item);
    }
    addRecipe(item: Recipe): Promise<Recipe> {
        console.log('add rec')
        return this.baseClient.add<Recipe>(this.recipeEndpoint, item);
    }
    updateRecipe(item: Recipe): Promise<Recipe> {
        console.log('edit rec')
        return this.baseClient.update<Recipe>(this.recipeEndpoint, item);
    }
}
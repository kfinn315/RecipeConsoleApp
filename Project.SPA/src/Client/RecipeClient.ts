import type { Recipe } from "../Types";
import { BaseClient } from "./BaseClient";
import type { Client } from "./Client";

export class RecipeClient implements Client<Recipe> {
    private recipeEndpoint: string;
    private baseClient: BaseClient;
    constructor(baseUrl: string) {
        this.baseClient = new BaseClient();
        this.recipeEndpoint = `${baseUrl}/recipes`;
    }

    get(): Promise<Recipe[]> {
        console.log('get recipes');
        return this.baseClient.get<Recipe[]>(this.recipeEndpoint);
    }

    add(item: Recipe): Promise<Recipe> {
        console.log('add rec');
        return this.baseClient.add<Recipe>(this.recipeEndpoint, item);
    }
    update(item: Recipe): Promise<Recipe> {
        console.log('edit rec');
        return this.baseClient.update<Recipe>(`${this.recipeEndpoint}/${item.id}`, item);
    }

    delete(item: Recipe): Promise<void> {
        //TODO
        return Promise.resolve();
    }
}

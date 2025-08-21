import type { Category } from "../Types";
import { BaseClient } from "./BaseClient";
import type { Client } from "./Client";

export class CategoryClient implements Client<Category> {
    private categoryEndpoint: string;
    private baseClient: BaseClient;
    constructor(baseUrl: string) {
        this.baseClient = new BaseClient();
        this.categoryEndpoint = `${baseUrl}/categories`;
    }

    get(): Promise<Category[]> {
        console.log('get categories');
        return this.baseClient.get<Category[]>(this.categoryEndpoint);
    }
    add(item: Category): Promise<Category> {
        console.log('add category');
        return this.baseClient.add<Category>(this.categoryEndpoint, item);
    }
    update(item: Category): Promise<Category> {
        console.log('edit category');
        return this.baseClient.update<Category>(`${this.categoryEndpoint}/${item.id}`, item);
    }

    delete(item: Category): Promise<void> {
        //TOOD
        return Promise.resolve();
    }
}

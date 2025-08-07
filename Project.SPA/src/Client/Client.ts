import type { Category } from "../Types/Category";
import type { Recipe } from "../Types/Recipe";


export class Client {
    private recipeEndpoint: string;
    private categoryEndpoint: string;
    constructor(baseUrl: string) {
        this.recipeEndpoint = `${baseUrl}/recipes`;
        this.categoryEndpoint = `${baseUrl}/categories`;
    }

    getCategories(): Promise<Category[]> {
        console.log('get categories')
        return fetch(this.categoryEndpoint, { method: "GET", headers: { 'Content-Type': 'application/json' } })
            .then(response => {
                return response.json()
            }).catch(reason => console.error(reason));
        // return Promise.resolve([{ Id: 0, Name: "DummyCategory0" }]);
    }
    getRecipes(): Promise<Recipe[]> {
        console.log('get recipes')
        return fetch(this.recipeEndpoint, { method: "GET" }).then(response => {
            return response.json()
        });
        // return Promise.resolve([{ Id: 0, Name: "DummyRecipe0", Categories: [0], Ingredients: ["i1", "i2"], Instructions: "instructionshere" }]);
    }

    addCategory(item: Category): Promise<void> {
        console.log('add category')
        return fetch(this.categoryEndpoint, {
            method: "POST",
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => {
            return response.json()
        });
    }
    editCategory(item: Category): Promise<void> {
        console.log('edit category')
        return fetch(this.categoryEndpoint, {
            method: "PUT",
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => {
            return response.json()
        });
        // return Promise.resolve();
    }
    addRecipe(item: Recipe): Promise<void> {
        console.log('add rec')
        return fetch(this.recipeEndpoint, {
            method: "POST",
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error(response.statusText)
        }).catch((reason) => {
            throw reason;
        });
        // return Promise.resolve();
    }
    editRecipe(item: Recipe): Promise<void> {
        console.log('edit rec')
        return fetch(
            this.recipeEndpoint,
            {
                method: "PUT",
                body: JSON.stringify(item),
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(response => {
                return response.json()
            });
        // return Promise.resolve();
    }
}
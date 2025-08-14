import type { Category, Recipe } from "../Types";

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
                if (response.ok) {
                    return response.json()
                }
                throw new Error(response.statusText)
            }).catch((reason) => {
                throw reason;
            });
    }
    getRecipes(): Promise<Recipe[]> {
        console.log('get recipes')
        return fetch(this.recipeEndpoint, { method: "GET" }).then(response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error(response.statusText)
        }).catch((reason) => {
            throw reason;
        });
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
            if (response.ok) {
                return response.json()
            }
            throw new Error(response.statusText)
        }).catch((reason) => {
            throw reason;
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
            if (response.ok) {
                return response.json()
            }
            throw new Error(response.statusText)
        }).catch((reason) => {
            throw reason;
        });
    }
    addRecipe(item: Recipe): Promise<Recipe[]> {
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
    }
    editRecipe(item: Recipe): Promise<Recipe[]> {
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
                if (response.ok) {
                    return response.json()
                }
                throw new Error(response.statusText)
            }).catch((reason) => {
                throw reason;
            });
    }
}
import { type Category } from "./Category";

export interface Recipe {
    id: number;
    title: string;
    categories: number[];
    ingredients: string[];
    instructions: string;
}

export type DisplayRecipe = Omit<Recipe, "categories"> & { categories: Category[]; };

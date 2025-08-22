import type { Recipe, Category } from "../Types";


export type DisplayRecipe = Recipe & { categories: Category[]; };

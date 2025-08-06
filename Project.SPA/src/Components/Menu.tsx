import React from 'react';
import { EditCategory } from './Pages/Categories/EditCategory';
import { ListRecipes } from './Pages/Recipes/ListRecipes';
import { AddRecipe } from './Pages/Recipes/AddRecipe';
import { EditRecipe } from './Pages/Recipes/EditRecipe';
import { ListCategories } from './Pages/Categories/ListCategories';
import { AddCategory } from './Pages/Categories/AddCategory';

export default function Menu({ show }: { show: (page: Element) => void }) {

    const options = [
        { name: "List Categories", page: <ListCategories /> },
        { name: "Add Category", page: <AddCategory /> },
        { name: "Edit Category", page: <EditCategory /> },
        { name: "List Recipes", page: <ListRecipes /> },
        { name: "Add Recipe", page: <AddRecipe /> },
        { name: "Edit Recipe", page: <EditRecipe /> }
    ]

    return <div>
        <h3>Menu</h3>
        <ul className='menu-items'>
            {options.map((option, ix) => (
                <li key={ix} className={"menu-item"}>
                    <a href="#" onClick={() => { show(option.page) }}>{option.name}</a>
                </li>
            )
            )}
        </ul>
    </div>
}
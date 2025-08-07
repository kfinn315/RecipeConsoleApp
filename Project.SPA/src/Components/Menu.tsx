import React from 'react';
import { EditCategoryPage } from './Pages/Categories/EditCategoryPage';
import { ListRecipesPage } from './Pages/Recipes/ListRecipesPage';
import { AddRecipePage } from './Pages/Recipes/AddRecipePage';
import { EditRecipePage } from './Pages/Recipes/EditRecipePage';
import { ListCategoriesPage } from './Pages/Categories/ListCategoriesPage';
import { AddCategoryPage } from './Pages/Categories/AddCategoryPage';

export default function Menu({ show }: { show: (page: Element) => void }) {

    const options = [
        { name: "List Categories", page: <ListCategoriesPage /> },
        { name: "Add Category", page: <AddCategoryPage /> },
        { name: "Edit Category", page: <EditCategoryPage /> },
        { name: "List Recipes", page: <ListRecipesPage /> },
        { name: "Add Recipe", page: <AddRecipePage /> },
        { name: "Edit Recipe", page: <EditRecipePage /> }
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
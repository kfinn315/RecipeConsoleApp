import React from 'react';
import { RecipesPage } from './Pages/Recipes/RecipesPage';
import { CategoriesPage } from './Pages/Categories/CategoriesPage';


export default function Menu({ show }: { show: (page: Element) => void }) {

    const options = [
        { name: "Categories", page: <CategoriesPage /> },
        { name: "Recipes", page: <RecipesPage /> },
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
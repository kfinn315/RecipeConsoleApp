import type React from 'react';
import type { Recipe } from '../../../Types/Recipe';


export function RecipeItem({ item, onClick }: { item: Recipe; onClick: (item: Recipe) => void | undefined; }) {
    function handleClick() {
        onClick?.(item);
    }
    function toString(item: Recipe) {
        return `${item.id} - ${item.title} - ${item.ingredients.join(',')} - ${item.instructions}`
    }
    return <li className='list-item'>
        {toString(item)} {onClick && <a onClick={handleClick} href="#">Edit</a>}
    </li>
}

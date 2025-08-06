import type React from 'react';
import type { Recipe } from '../../../Types/Recipe';


export function RecipeItem({ item, onClick }: { item: Recipe; onClick: (item: Recipe) => void | undefined; }) {
    function handleClick() {
        onClick(item);
    }
    return <a onClick={handleClick} href="#">{item.Id} - {item.Name}</a>;
}

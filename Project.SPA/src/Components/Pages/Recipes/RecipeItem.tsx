import type React from 'react';
import type { Recipe } from '../../../Types/Recipe';
import { TableCell, TableRow } from '@mui/material';


export function RecipeItem({ item, onClick }: { item: Recipe; onClick: (item: Recipe) => void | undefined; }) {
    function handleClick() {
        onClick?.(item);
    }
    // function toString(item: Recipe) {
    //     return `${item.id} - ${item.title} - ${item.ingredients.join(',')} - ${item.instructions}`
    // }
    return <TableRow className='list-item'>
        <TableCell>{item.id}</TableCell>
        <TableCell>{item.title}</TableCell>
        <TableCell>{item.ingredients}</TableCell>
        <TableCell>{item.instructions}</TableCell>
        <TableCell>{item.categories}</TableCell>
        <TableCell>
            {onClick && <a onClick={handleClick} href="#">Edit</a>}
        </TableCell>
    </TableRow>
}

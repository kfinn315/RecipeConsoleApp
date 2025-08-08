import type React from 'react';
import type { Recipe } from '../../../Types/Recipe';
import { TableCell, TableRow } from '@mui/material';

/**
 * prop.item values fill the TableCell tags
 * when Edit anchor is clicked, prop.onClick is called, passing prop.item
 */
export function RecipeRow({ item, onClick }: { item: Recipe; onClick: (item: Recipe) => void | undefined; }) {
    function handleClick() {
        onClick?.(item);
    }
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

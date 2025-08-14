import type React from 'react';
import type { Recipe } from '../../../Types/Recipe';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

/**
 * If isLoading is true, show loading message
 * display props.recipes in the table
 * props.onClick is called when Edit anchor is clicked, passing the Recipe of the row clicked
 */
export function RecipeTable({ isLoading, recipes = [], onClick }: { isLoading: boolean, recipes: Recipe[]; onClick: (item: Recipe) => void | undefined; }) {
    return <>
        {isLoading ? "Loading!" :
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {/* <TableCell>
                                ID
                            </TableCell> */}
                            <TableCell>
                                Title
                            </TableCell>
                            <TableCell>
                                Ingredients
                            </TableCell>
                            <TableCell>
                                Instructions
                            </TableCell>
                            <TableCell>
                                Categories
                            </TableCell>
                            <TableCell>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {recipes.map(x => (<RecipeRow key={x.id} item={x} onClick={onClick} />))}
                    </TableBody>
                </Table>
            </TableContainer>
        }
    </>
}


/**
 * prop.item values fill the TableCell tags
 * when Edit anchor is clicked, prop.onClick is called, passing prop.item
 */
function RecipeRow({ item, onClick }: { item: Recipe; onClick: (item: Recipe) => void | undefined; }) {
    function handleClick() {
        onClick?.(item);
    }
    return <TableRow className='list-item'>
        {/* <TableCell>{item.id}</TableCell> */}
        <TableCell>{item.title}</TableCell>
        <TableCell>{item.ingredients}</TableCell>
        <TableCell>{item.instructions}</TableCell>
        <TableCell>{item.categories}</TableCell>
        <TableCell>
            {onClick && <a onClick={handleClick} href="#">Edit</a>}
        </TableCell>
    </TableRow>
}

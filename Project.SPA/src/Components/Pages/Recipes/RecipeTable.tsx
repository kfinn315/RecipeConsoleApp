import type React from 'react';
import type { Recipe } from '../../../Types/Recipe';
import { RecipeRow } from './RecipeRow';
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
                            <TableCell>
                                ID
                            </TableCell>
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

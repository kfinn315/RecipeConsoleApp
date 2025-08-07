import type React from 'react';
import type { Recipe } from '../../../Types/Recipe';
import { RecipeItem } from './RecipeItem';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export function RecipeTable({ isLoading, recipes = [], onClick }: { isLoading: boolean, recipes: Recipe[]; onClick: (item: Recipe) => void | undefined; }) {
    return <div class="list-wrapper">
        {/* <h3>Recipes</h3> */}
        <div class="list">
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
                            {recipes.map(x => (<RecipeItem key={x.id} item={x} onClick={onClick} />))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </div>
    </div>
}

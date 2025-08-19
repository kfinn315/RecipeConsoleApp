import type React from 'react';
import type { Recipe } from '../../../Types';
import { Button, Dialog, DialogActions } from '@mui/material';
import { RecipeCardContent } from './Card/RecipeCardContent';

export const RecipeDialog = ({ onClose, onEdit, open, item }: { onClose, open: boolean, item: Recipe, onEdit }) => {
    return item && <Dialog maxWidth='sm' fullWidth='true' className="recipe-dialog recipe-dialog-detail" open={open} onClose={onClose}>
        <RecipeCardContent item={item} />
        <DialogActions>
            <Button onClick={onClose}>Close</Button>
            <Button onClick={onEdit}>Edit</Button>
        </DialogActions>
    </Dialog>

}

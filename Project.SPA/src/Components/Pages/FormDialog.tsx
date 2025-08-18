import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"

export const FormDialog = ({ className, open, title, children, onClose, onSubmit, formId }: { className?: string, onSubmit, onClose, open: boolean, title: string, children, formId: string }) => {
    function handleClose() {
        onClose();
    }
    return <Dialog className={className} open={open} onClose={onClose} maxWidth='sm' fullWidth='true'>
        <DialogTitle>
            {title}
        </DialogTitle>
        <DialogContent>
            {children}
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type='submit' onClick={onSubmit} form={formId}>
                Submit
            </Button>
        </DialogActions>
    </Dialog>
}
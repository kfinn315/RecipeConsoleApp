import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"

export const FormDialog = ({ open, title, children, onClose, onSubmit, formId }: { onSubmit, onClose, open: boolean, title: string, children, formId: string }) => {
    function handleClose() {
        onClose();
    }
    return <Dialog open={open}>
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
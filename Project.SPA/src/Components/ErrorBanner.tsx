import { Button } from "@mui/material";

export function ErrorBanner({ message, onClose }: { message?: string, onClose: () => void }) {
    return message && <div className="error-banner"><span>{message}</span><Button onClick={onClose}>Close</Button></div>;
}
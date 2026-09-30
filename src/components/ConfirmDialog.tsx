"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, Loader2Icon } from "lucide-react";
import { useState, useTransition } from "react";
import type { ReactElement } from "react";

interface ConfirmDialogProps {
    title: string;
    description: string;
    trigger: ReactElement;
    cancelLabel: string;
    confirmLabel: string;
    pendingLabel: string;
    onConfirm: () => Promise<{ error: string } | undefined>;
}

export function ConfirmDialog({
    title,
    description,
    trigger,
    cancelLabel,
    confirmLabel,
    pendingLabel,
    onConfirm
}: ConfirmDialogProps) {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    function handleOpenChange(nextOpen: boolean) {
        if (isPending) {
            return;
        }
        if (nextOpen) {
            setError(null);
        }
        setOpen(nextOpen);
    }

    function handleConfirm() {
        setError(null);
        startTransition(async () => {
            try {
                const result = await onConfirm();
                if (result?.error) {
                    setError(result.error);
                    return;
                }
                setOpen(false);
            } catch {
                setError("Something went wrong. Please try again.");
            }
        });
    }

    return (
        <AlertDialog open={open} onOpenChange={handleOpenChange}>
            <AlertDialogTrigger render={trigger} />
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                {error && (
                    <Alert variant="destructive">
                        <AlertCircleIcon />
                        <AlertTitle>{error}</AlertTitle>
                    </Alert>
                )}
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>{cancelLabel}</AlertDialogCancel>
                    <AlertDialogAction variant="destructive" disabled={isPending} onClick={handleConfirm}>
                        {isPending && <Loader2Icon className="animate-spin" />}
                        {isPending ? pendingLabel : confirmLabel}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

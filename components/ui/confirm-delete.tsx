"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ConfirmDelete({
  triggerLabel,
  confirmMessage,
  confirmLabel,
  cancelLabel,
  onConfirm,
}: {
  triggerLabel: string;
  confirmMessage: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
}) {
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <div className="flex flex-wrap items-center gap-3 rounded-xl bg-danger-bg p-3">
        <p className="text-sm text-danger">{confirmMessage}</p>
        <div className="flex gap-2">
          <Button type="button" variant="outline" size="sm" onClick={() => setConfirming(false)}>
            {cancelLabel}
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={onConfirm}
            className="bg-danger text-white shadow-none hover:bg-danger/90"
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      className="flex items-center gap-1.5 self-start text-sm font-semibold text-danger hover:underline"
    >
      <Trash2 className="size-4" />
      {triggerLabel}
    </button>
  );
}

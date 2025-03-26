"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

interface AddClassModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (classData: { classCode: string; className: string }) => void
}

export default function AddClassModal({ isOpen, onClose, onSubmit }: AddClassModalProps) {
    const [className, setClassName] = useState("")
    const [classCode, setClassCode] = useState("")

    const handleSubmit = () => {
        if (className && classCode) {
        onSubmit({ classCode, className })
        onClose()
        } else {
        alert("Please fill in all fields")
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
            <DialogTitle>Add a New Class</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
            <Input
                type="text"
                placeholder="Class Code (e.g., CS101)"
                value={classCode}
                onChange={(e) => setClassCode(e.target.value)}
            />
            <Input
                type="text"
                placeholder="Class Name (e.g., Introduction to Computer Science)"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
            />
            </div>
            <DialogFooter>
            <Button variant="outline" onClick={onClose}>
                Cancel
            </Button>
            <Button onClick={handleSubmit}>Add Class</Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    )
}

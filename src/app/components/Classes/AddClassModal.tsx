"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Description } from "@radix-ui/react-dialog"
import {Class} from "@/src/lib/types"

interface AddClassModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (classData: Class) => void
    majorName: string
}

export default function AddClassModal({ isOpen, onClose, onSubmit, majorName }: AddClassModalProps) {
    const [className, setClassName] = useState("")
    const [classCode, setClassCode] = useState("")
    const [description, setDescription] = useState("")
    const [isValid, setIsValid] = useState(true)
    const [credits, setCredits] = useState("Credit Count")
    const pattern = /^[A-Za-z]{2,4}\d{3}$/;

    const handleSubmit = () => {
        
        if (className && classCode && description && isValid && credits !== "Credit Count") {
            onSubmit({
                className, 
                classCode, 
                description, 
                credits: parseInt(credits),
                majorName: majorName.toLowerCase(),
                reviewCount: 0,
                rating: 0,
            })
        }
        handleOnClose()
        
    }

    const handleOnClose = () => {
        setClassName("")
        setClassCode("")
        setDescription("")
        setCredits("Credit Count")
        setIsValid(false)
        onClose()
    }


    return (
        <Dialog open={isOpen} onOpenChange={handleOnClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                <DialogTitle>Add a New Class</DialogTitle>
                </DialogHeader>
                <Description>
                    Please enter class information.
                </Description>
                <div className="space-y-4">
                    <Input
                        id="code"
                        type="text"
                        value={classCode}
                        onChange={(e) => {
                            setClassCode(e.target.value)
                            setIsValid(pattern.test(e.target.value))
                        }}
                        placeholder="Class Code (e.g., CS101)"
                        className={`border ${
                        isValid ? "border-gray-300 focus:border-blue-500" : "border-red-500"
                        } rounded-md p-2 focus:outline-none`}
                        required={true}
                    />
                    {!isValid && classCode && (
                        <p className="text-sm text-red-500">Invalid format. Use 2-4 letters followed by 3 digits.</p>
                    )}
            
                    <Input
                        type="text"
                        placeholder="Class Name (e.g., Introduction to Computer Science)"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        maxLength={50}
                        required={true}
                    />
                    
                    <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={credits}
                        onChange={(e) => setCredits(e.target.value)}>
                        <option value="Credit Count">Credit Count</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                    <Textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Provide a description of the class"
                        maxLength={350}
                    />
                </div>
                <DialogFooter>
                <Button variant="outline" onClick={handleOnClose}>
                    Cancel
                </Button>
                <Button onClick={handleSubmit}>Add Class</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

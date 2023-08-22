"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from "react"


export default function SidePanel({ isOpen, stateChanger }) {


    return (
        <div className="grid grid-cols-2 gap-2">
            <Sheet open={isOpen} key={"right"}>
                <SheetContent side={"right"}>
                    <div className="flex justify-end">
                        <button onClick={() => stateChanger(prevCheck => !prevCheck)}>
                            X
                        </button>
                    </div>

                    <SheetHeader>
                        <SheetTitle>Edit profile</SheetTitle>
                        <SheetDescription>
                            Make changes to your profile here. Click save when you're done.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input id="name" value="Pedro Duarte" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">

                        </div>
                    </div>


                    <SheetFooter>

                        <Button onClick={() => stateChanger(prevCheck => !prevCheck)} type="submit">Save changes</Button>

                    </SheetFooter>
                </SheetContent>
            </Sheet>

        </div>
    )
}






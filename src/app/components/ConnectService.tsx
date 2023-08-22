"use client"


import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"



const frameworks = [
    {
        value: "vsm-canopy",
        label: "vsm-canopy",
    },
    {
        value: "vsm-iris",
        label: "vsm-iris",
    },
    {
        value: "mtm",
        label: "MTM",
    }
    
]

export default function ConnectService() {

    const [open, setOpen] = React.useState(false)
    const [service, setValue] = React.useState("")

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                    
                >
                    {service
                        ? frameworks.find((framework) => framework.value === service)?.label
                        : "Connect a service..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search framework..." />
                    <CommandEmpty>
                        <Button> {`Add service`} </Button>
                    </CommandEmpty>
                    <CommandGroup>
                        {frameworks.map((framework) => (
                            <CommandItem
                                key={framework.value}
                                onSelect={(currentValue) => {
                                    setValue(currentValue === service ? "" : currentValue)
                                    setOpen(false)
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        service === framework.value ? "opacity-100" : "opacity-0"
                                    )}
                                    
                                    
                                />
                                {framework.label} 
                                
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )

}
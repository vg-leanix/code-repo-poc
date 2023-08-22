"use client"

import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { Repository } from '@schemas/data'

export const columns: ColumnDef<Repository>[] = [
  {
    accessorKey: "id",
    header: "Id",
    
    
  },
  {
    accessorKey: "email",
    header: "Email",

  },
  {
    accessorKey: "language",
    header: props => (
      <span>{`Programming Language (${props.table.getColumn("language")?.getFacetedUniqueValues().size})`}</span>
    ) ,
    cell: props => (
      <span className="rounded-full bg-teal-700 text-white px-2 py-1">{`${props.getValue()}`}</span>
    ),
    enableColumnFilter: true,
    filterFn: "arrIncludesSome",
    sortingFn: "text"
  },
  {
    accessorKey: "status",
    header: "Status",
    enableColumnFilter: true
  },
  {
    accessorKey: "organization",
    header: "GitHub Org",
    enableColumnFilter: true
  },
  {
    accessorKey: "targetMapping",
    header: "Connected Service",
    enableColumnFilter: false,
    enableSorting: false
  },
]
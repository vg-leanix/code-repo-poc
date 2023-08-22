"use client"

import React, { useState } from "react"
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import Select from 'react-select'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFacetedUniqueValues,
  getFacetedRowModel,
  useReactTable,
  getFilteredRowModel,
  ColumnFiltersState,
  getSortedRowModel,
  SortingState

} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,

} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import ConnectService from "./ConnectService"
import SidePanel from "./SidePanel"
import { TrendingUp } from "lucide-react"


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}


export function DataTable({
  columns,
  data,
  stateChanger,
  isOpen
}) {

  const [filtering, setFiltering] = useState('');

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [colFilter, setColumnFilters] = React.useState<ColumnFiltersState>(
    [

    ]
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFilteredRowModel: getFilteredRowModel(),
    enableSorting: true,
    enableColumnFilters: true,
    enableFilters: true,
    onGlobalFilterChange: setFiltering,
    onSortingChange: setSorting,
    state: {
      globalFilter: filtering,
      columnFilters: colFilter,
      sorting
    }



  })

  function switchTable(cell) {
    switch (cell.column.id) {
      case "targetMapping":
        return (
          <ConnectService />
        )
      case "organization":
        return (
          <div className="flex flex-row w-full">
            <span className="basis-3/4">{flexRender(cell.column.columnDef.cell, cell.getContext())}</span>
            <span className="basis-1/4"><a href="https://google.com" target="_blank" rel="noopener noreferrer"> <GitHubLogoIcon /></a></span>

          </div>


        )

      default:
        return (
          flexRender(cell.column.columnDef.cell, cell.getContext())
        );
    }

  }

  function getLangs(table: any, column: string) {
    const langs = table.getColumn(column)?._getFacetedUniqueValues()
    const vals = []

    for (let key of langs) {
      var item = { value: key[0], label: key[0] }
      vals.push(item)
    }

    return vals

  }

  function transformEvent(options, colId: string) {

    let update = options.map((item) => (item.value))

    update.length ? setColumnFilters([{ id: colId, value: update }]) : setColumnFilters([])


  }

  return (
    <div>

      <div className="flex flex-row align-baseline gap-4 mb-4">
        <span>Languages</span>
        <Select onChange={(e) => transformEvent(e, "language")} className="w-5/12" isMulti options={(getLangs(table, 'language'))}></Select>

      </div>
      <Button >{`Add filter`}</Button>
      <div className="rounded-md border overscroll-none">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead onClick={header.column.getToggleSortingHandler()} key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}{{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >

                  {row.getVisibleCells().map((cell) => (
                    

                    <TableCell key={cell.id}>
                      {switchTable(cell)}
                      

                    </TableCell> 
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

      </div>
      <div className="flex flex-row gap-3">
        <button className="mt-2 px-2 rounded-full bg-red-600 text-sm text-white" onClick={() => table.nextPage()}>Next</button>

        {table.getCanPreviousPage() ? (
          <button className="mt-2 px-2 rounded-full bg-sky-600 text-sm text-white" onClick={() => table.previousPage()}>Previous</button>
        ) : null}
        <button className="mt-2 px-2 rounded-full bg-sky-600 text-sm text-white" onClick={() => table.resetPageIndex()}>Reset</button>
      </div>
    </div>

  )
}
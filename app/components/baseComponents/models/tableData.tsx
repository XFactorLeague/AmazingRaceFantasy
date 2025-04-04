export interface TableFooterItem {
    footerValue: string,
    cellWidth: number

}

export interface TableFooter {
    rows: TableFooterItem[]
}

export interface TableData {
    caption?: string, 
    columnNames: Array<string>,
    rows: any[],
    tableFooter?: TableFooter[]
}
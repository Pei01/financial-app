import React, { useCallback, useMemo, useState } from 'react'
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Pagination, Chip } from '@heroui/react'

const InvestmentLogTable = ({ investments }) => {
    const columns = [
        { key: 'assetType', label: 'Asset Type' },
        { key: 'symbol', label: 'Symbol' },
        { key: 'tradeType', label: 'Trade Type' },
        { key: 'quantity', label: 'Quantity' },
        { key: 'price', label: 'Price' },
        { key: 'date', label: 'Date' },
    ]

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const totalPages = Math.ceil(investments.length / rowsPerPage) || 1;

    const items = useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return investments.slice(start, end);
    }, [currentPage, investments]);

    const renderCell = useCallback((item, columnKey) => {
        const cellValue = item[columnKey];

        switch (columnKey) {
            case 'assetType':
                return cellValue;
            case 'symbol':
                return cellValue;
            case 'tradeType':
                return (
                    <Chip 
                        color={cellValue === 'buy' ? 'success' : 'danger'}
                        variant='flat'
                        size='md'
                    >
                        {cellValue}
                    </Chip>
                );
            case 'quantity':
                return cellValue;
            case 'price':
                return cellValue;
            case 'date':
                return cellValue;
            default:
                return cellValue;
        }
    }, []);

    return (
            <Table 
                aria-label='Investment Logs'
                selectionMode='single'
                bottomContent={
                    <div className='flex justify-center'>
                        <Pagination 
                            isCompact
                            showControls
                            page={currentPage}
                            total={totalPages}
                            onChange={setCurrentPage}
                        />
                    </div>
                }
            >
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn 
                            key={column.key} 
                            className='text-center uppercase'
                            allowsSorting={column.sortable}
                        >
                            {column.label}
                        </TableColumn>
                    )}
                </TableHeader>

                <TableBody items={items} emptyContent='No Investment Logs'>
                    {(item) => (
                        <TableRow key={item._id}>
                            {(columnKey) => (
                                <TableCell className='text-white text-center'>{renderCell(item, columnKey)}</TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
    )
}

export default InvestmentLogTable
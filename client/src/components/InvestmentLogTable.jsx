import React, { useMemo, useState } from 'react'
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Pagination, getKeyValue } from '@heroui/react'

const InvestmentLogTable = () => {
    const columns = [
        { key: 'assetType', label: 'Asset Type' },
        { key: 'symbol', label: 'Symbol' },
        { key: 'tradeType', label: 'Trade Type' },
        { key: 'quantity', label: 'Quantity' },
        { key: 'price', label: 'Price' },
        { key: 'date', label: 'Date' },
    ]

    const rows = useMemo(() => [
        { key: "1", assetType: 'usStock', symbol: 'AAPL', tradeType: 'buy', quantity: 100, price: 150, date: '2021-09-01' },
        { key: "2", assetType: 'twStock', symbol: '2330', tradeType: 'sell', quantity: 1000, price: 600, date: '2021-09-02' },
        { key: "3", assetType: 'crypto', symbol: 'BTC', tradeType: 'buy', quantity: 1, price: 50000, date: '2021-09-03' },
        { key: "4", assetType: 'usStock', symbol: 'TSLA', tradeType: 'buy', quantity: 50, price: 700, date: '2021-09-04' },
        { key: "5", assetType: 'usStock', symbol: 'GOOGL', tradeType: 'sell', quantity: 20, price: 2800, date: '2021-09-05' },
        { key: "6", assetType: 'crypto', symbol: 'ETH', tradeType: 'buy', quantity: 10, price: 3500, date: '2021-09-06' },
        { key: "7", assetType: 'twStock', symbol: '2454', tradeType: 'buy', quantity: 500, price: 1000, date: '2021-09-07' },
        { key: "8", assetType: 'usStock', symbol: 'AMZN', tradeType: 'sell', quantity: 5, price: 3400, date: '2021-09-08' },
        { key: "9", assetType: 'crypto', symbol: 'DOGE', tradeType: 'buy', quantity: 10000, price: 0.25, date: '2021-09-09' },
        { key: "10", assetType: 'usStock', symbol: 'MSFT', tradeType: 'buy', quantity: 30, price: 300, date: '2021-09-10' },
    ], []);

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    const totalPages = Math.ceil(rows.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return rows.slice(start, end);
    }, [currentPage, rows]);

    return (
            <Table 
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
                        <TableColumn key={column.key} className='text-center uppercase'>{column.label}</TableColumn>
                    )}
                </TableHeader>

                <TableBody items={items} emptyContent='No Investment Logs'>
                    {(item) => (
                        <TableRow key={item.key}>
                            {(columnKey) => (
                                <TableCell className='text-white text-center'>{getKeyValue(item, columnKey)}</TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
    )
}

export default InvestmentLogTable
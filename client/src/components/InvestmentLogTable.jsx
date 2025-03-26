import React, { useCallback, useMemo, useState } from 'react';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Pagination, Chip, Alert, Spinner } from '@heroui/react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { deleteInvestment } from '../services/investmentService.js';


const InvestmentLogTable = ({ investments, setInvestmentChanged }) => {
    const [alert, setAlert] = useState({ message: '', color: 'default', isVisible: false });

    const columns = [
        { key: 'assetType', label: 'Asset Type' },
        { key: 'symbol', label: 'Symbol' },
        { key: 'tradeType', label: 'Trade Type' },
        { key: 'quantity', label: 'Quantity' },
        { key: 'price', label: 'Price' },
        { key: 'date', label: 'Date' },
        { key: 'actions', label: 'Actions' },
    ]

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const totalPages = Math.ceil(investments.length / rowsPerPage) || 1;

    const items = useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return investments.slice(start, end);
    }, [currentPage, investments]);

    const [isTableLoading, setTableLoading] = useState(false);

    const handleDeleteInvestment = async (investmentId) => {
        setTableLoading(true);
        const alertDisplayTime = 2000;
        const response = await deleteInvestment(investmentId);

        setTableLoading(false);

        if (response.success) {
            setInvestmentChanged(true);
            setAlert({ message: 'Investment deleted successfully', color: 'success', isVisible: true });

            setTimeout(() => {
                setAlert({ ...alert, isVisible: false });
            }, alertDisplayTime);
        } else {
            setAlert({ message: response.message, color: 'danger', isVisible: true });

            setTimeout(() => {
                setAlert({ ...alert, isVisible: false });
            }, alertDisplayTime);
        }
    }

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
            case 'actions':
                return (
                    <div className='flex justify-center'>
                        <button onClick={() => handleDeleteInvestment(item._id)}>
                            <RiDeleteBinLine className='size-4 text-danger cursor-pointer hover:text-red-800' />
                        </button>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
            <>
                <div className={`w-1/2 absolute top-6 z-[100] ${alert.isVisible ? 'alert-fade' : 'hidden'}`}>
                    <Alert 
                        description={alert.message} 
                        color={alert.color}
                    />
                </div>

                <div className='w-full h-[580px] flex justify-start'>
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

                        <TableBody 
                            items={items} 
                            emptyContent='No Investment Logs'
                            isLoading={isTableLoading}
                            loadingContent={<Spinner />}
                        >
                            {(item) => (
                                <TableRow key={item._id}>
                                    {(columnKey) => (
                                        <TableCell className='text-white text-center'>{renderCell(item, columnKey)}</TableCell>
                                    )}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </>
    )
}

export default InvestmentLogTable
import React, { useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Button, DatePicker, Input, Alert, Select, SelectItem, RadioGroup, Radio, Spinner } from '@heroui/react'
import { parseDate } from '@internationalized/date'
import { createInvestment } from '../services/investmentService.js'
import { ASSET_TYPES, TRADE_TYPES } from '../config/constants.js'


const AddInvestment = ({ setInvestmentChanged}) => {
    const [alert, setAlert] = useState({ message: '', color: 'default', isVisible: false});
    const [isLoading, setLoading] = useState(false);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const assetTypes = Object.values(ASSET_TYPES);
    const tradeTypes = Object.values(TRADE_TYPES);

    const [investment, setInvestment] = useState({
        assetType: '',
        symbol: '',
        quantity: 0,
        price: 0,
        tradeType: '',
        date: parseDate(new Date().toISOString().split('T')[0]),
    });

    const resetInvestment = () => {
        setInvestment({
            assetType: '',
            symbol: '',
            quantity: 0,
            price: 0,
            tradeType: '',
            date: parseDate(new Date().toISOString().split('T')[0]),
        });
    }

    const handleAddInvestment = async (onClose) => {
        setLoading(true);
        const alertDisplayTime = 2000;

        const date = investment.date;
        const formattedDate = new Date(date.year, date.month - 1, date.day).toISOString();
        const newInvestment = { ...investment, date: formattedDate };

        const data = await createInvestment(newInvestment);

        if (data.success) {
            setAlert({ message: 'Investment added successfully', color: 'success', isVisible: true });

            setInvestmentChanged(true);
            
            setTimeout(() => {
                setAlert({ ...alert, isVisible: false });
                setLoading(false);
                onClose();

                resetInvestment();
            }, alertDisplayTime);
        } else {
            setAlert({ message: data.message, color: 'danger', isVisible: true });

            setTimeout(() => {
                setLoading(false);
                setAlert({ ...alert, isVisible: false });
            }
            , alertDisplayTime);
        }

    }

    const handleCancelInvestment = (onClose) => {
        resetInvestment();
        onClose();
    }

    return (
        <>
            <div className={`w-1/2 absolute top-6 z-[100] ${alert.isVisible ? 'alert-fade' : 'hidden'}`}>
                <Alert 
                    description={alert.message} 
                    color={alert.color}
                />
            </div>

            <div className='relative w-full flex justify-end'>
                <Button 
                    color='primary'
                    onPress={onOpen}
                    endContent={<span className='text-white text-lg'>+</span>}
                    className=''
                >
                    Add Investment 
                </Button>

                <Modal 
                    isOpen={isOpen} 
                    onOpenChange={onOpenChange} 
                    hideCloseButton
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <div className='relative flex flex-col'>
                                    <Spinner className={`absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 ${isLoading ? '' : 'hidden'}`}/>

                                    <ModalHeader>Add Investment</ModalHeader>
                                    <ModalBody>
                                        <div className='grid grid-cols-2 gap-4'>
                                            <Select
                                                label='Asset Type'
                                                placeholder='Select asset type'
                                                selectedKeys={[investment.assetType]}
                                                onChange={(e) => setInvestment({ ...investment, assetType: e.target.value })}
                                            >
                                                {assetTypes.map((assetType) => (
                                                    <SelectItem key={assetType.key}>
                                                        {assetType.label}
                                                    </SelectItem>
                                                ))}
                                            </Select>

                                            <Input
                                                label='Symbol'
                                                placeholder='Enter symbol'
                                                value={investment.symbol}
                                                onValueChange={(value) => setInvestment({ ...investment, symbol: value })}
                                            />
                                        </div>

                                        <div className='grid grid-cols-2 gap-4'>
                                            <Input 
                                                label='Quantity'
                                                placeholder='0'
                                                type='number'
                                                value={investment.quantity}
                                                onValueChange={(value) => setInvestment({ ...investment, quantity: value })}
                                            />

                                            <Input
                                                label='Price'
                                                placeholder='0.00'
                                                type='number'
                                                value={investment.price}
                                                onValueChange={(value) => setInvestment({ ...investment, price: value })}
                                                startContent={
                                                    <div className='pointer-events-none flex items-center'>
                                                        <span className='text-default-500 text-small'>$</span>
                                                    </div>
                                                }
                                                endContent={
                                                    <div className='flex items-center'>
                                                        <label className='sr-only' htmlFor="currency">Currency</label>
                                                        <select
                                                            className='outline-none border-0 bg-transparent text-default-500 text-small'
                                                            id='currency'
                                                            name='currency'
                                                        >
                                                            <option value='usdt'>USDT</option>
                                                            <option value='usd'>USD</option>
                                                            <option value='twd'>TWD</option>
                                                        </select>
                                                    </div>
                                                }
                                            />
                                        </div>

                                        <RadioGroup 
                                            orientation='horizontal'
                                            value={investment.tradeType}
                                            onValueChange={(value) => setInvestment({ ...investment, tradeType: value })}
                                        >
                                            {tradeTypes.map((tradeType) => (
                                                <Radio key={tradeType.key} value={tradeType.key}>
                                                    {tradeType.label}
                                                </Radio>
                                            ))}
                                        </RadioGroup>

                                        <DatePicker 
                                            aria-label='Date'
                                            value={investment.date}
                                            onChange={(value) => setInvestment({ ...investment, date: value })}
                                        />
                                    </ModalBody>

                                    <ModalFooter>
                                        <Button 
                                            color='primary'
                                            onPress={() => handleAddInvestment(onClose)}
                                        >
                                            Add
                                        </Button>
                                        <Button 
                                            color='danger'
                                            onPress={() => handleCancelInvestment(onClose)}
                                        >
                                            Cancel
                                        </Button>
                                    </ModalFooter>
                                </div>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
        </>
    )
}

export default AddInvestment
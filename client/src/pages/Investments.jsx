import React, { useState, useEffect } from 'react'
import InvestmentLogTable from '../components/InvestmentLogTable'
import AddInvestment from '../components/AddInvestment'
import { fetchInvestments } from '../services/investmentService.js'

const Investments = () => {
    const [isAddedNewInvestment, setIsAddedNewInvestment] = useState(false);
    const [investments, setInvestments] = useState([]);

    useEffect(() => {
        const getInvestments = async () => {
            try {
                const response = await fetchInvestments();
                const data = response.data.map((item) => {
                    return {
                        ...item,
                        date: item.date.split('T')[0],
                    }
                });

                setInvestments(data);
            } catch (error) {
                console.error(error);
            }
        }

        getInvestments();
        setIsAddedNewInvestment(false);

    }, [isAddedNewInvestment]);

    return (
        <div className='relative w-full h-dvh flex flex-col justify-center items-center bg-neutral-950'>
            <div className='w-10/12 flex flex-col justify-center items-center gap-6'>
                <AddInvestment setIsAddedNewInvestment={setIsAddedNewInvestment} />

                <InvestmentLogTable investments={investments} />
            </div>
        </div>
    )
}

export default Investments
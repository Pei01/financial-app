import React from 'react'
import InvestmentLogTable from '../components/InvestmentLogTable'
import AddInvestment from '../components/AddInvestment'

const InvestmentLog = () => {
    return (
        <div className='relative w-screen h-dvh flex flex-col justify-center items-center bg-neutral-950'>
            <div className='w-10/12 flex flex-col justify-center items-center gap-6'>
                <AddInvestment />

                <InvestmentLogTable />
            </div>
        </div>
    )
}

export default InvestmentLog
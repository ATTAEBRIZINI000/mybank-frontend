import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


export default function ExpensesChart({ data }) {
    return (
        <ResponsiveContainer width="100%" maxHeight="100%">
            <p className='text-center pb-4'>Latest Expenses by amount</p>
            <AreaChart
                width={500}
                height={400}
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis dataKey="title" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="amount" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
        </ResponsiveContainer>
    );

}

import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default function CategoriesChart({ data }) {
    return (
        <>
            <ResponsiveContainer width="100%" maxHeight="100%">
                <p className='text-center pb-4'>Category presented by times</p>
                <BarChart
                    width={500}
                    height={300}
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
                    <Bar dataKey="times" fill="#6600CC" activeBar={<Rectangle fill="#9933FF" />} barSize={30} radius={3} />
                </BarChart>
            </ResponsiveContainer>
        </>
    );
}

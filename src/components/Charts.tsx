import {LineChart, CartesianGrid, XAxis,YAxis, Tooltip, Line} from "recharts";
export default function Charts({data}: {data: any}) {
    return (
        <>
            <LineChart
                width={600}
                height={400}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="data" stroke="#8884d8" />
            </LineChart>
        </>);
}
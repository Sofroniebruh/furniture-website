"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from "react";

const chartData = [
    { month: "January", profit: 186 },
    { month: "February", profit: 305 },
    { month: "March", profit: 237 },
    { month: "April", profit: 73 },
    { month: "May", profit: 209 },
    { month: "June", profit: 214 },
    { month: "July", profit: 214 },
    { month: "August", profit: 214 },
    { month: "September", profit: 214 },
    { month: "Oktober", profit: 214 },
    { month: "November", profit: 214 },
    { month: "December", profit: 214 },
]

const yAxisTicks = [50, 100, 150, 200, 250, 300, 350]

export function BarChartComponent() {
    const [showAxis, setShowAxis] = useState<boolean>()

    useEffect(() => {
        const updateChartAxes = () => {
            setShowAxis(window.innerWidth > 600);
        };

        updateChartAxes();
        window.addEventListener("resize", updateChartAxes);

        return () => {
            window.removeEventListener("resize", updateChartAxes);
        };
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Profit</CardTitle>
                <CardDescription>January - December 2025</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={chartData}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={12}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                            tick={{ fontSize: "14px", fontWeight: "bold" }}
                        />
                        {showAxis ? (<YAxis
                            ticks={yAxisTicks}
                            tickLine={false}
                            tickFormatter={(value) => `$${value}`}
                            tick={{ fontSize: "14px", fontWeight: "bold" }}
                            width={70}
                        />) : null}
                        <Tooltip
                            formatter={(value: number) => `$${value.toLocaleString()}`}
                            contentStyle={{ fontSize: "14px" }}
                        />
                        {showAxis ? (
                            <Bar
                                dataKey="profit"
                                fill="var(--color-desktop)"
                                radius={4}
                                barSize={20}
                            />
                        ) : (
                            <Bar
                                dataKey="profit"
                                fill="var(--color-desktop)"
                                radius={4}
                                barSize={10}
                            />
                        )}
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}

"use client";
import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {Card, CardTitle, CardDescription, CardHeader, CardFooter, CardContent} from "@/components/ui/card";

export default function TipCalculatorComponent() {
    //state hooks
    const [billAmount, setBillAmount] = useState<number | null>(null);
    const [tipPercentage, setTipPercentage] = useState<number | null>(null);
    const [tipAmount, setTipAmount] = useState<number>(0);
    const [totalAmount, setTotalAmount] = useState<number>(0);

    //event handlers
    const handleBillAmountChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setBillAmount(parseFloat(e.target.value));
    }

    const handleTipPercentageChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setTipPercentage(parseFloat(e.target.value));
    }

    //calculation of tip
    const calculateTip = (): void => {
        if (billAmount !== null && tipPercentage !== null) {
            const tip = billAmount * (tipPercentage / 100);
            setTipAmount(tip);
            setTotalAmount(billAmount + tip);
        };
    };

    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <Card className="w-full max-w-md p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                <CardHeader>
                    <CardTitle>
                        Tip Calculator
                    </CardTitle>
                    <CardDescription>
                        Enter the bill amount and tip percentage to calculate the tip and
                        total.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="bill-amount">
                            Bill Amount
                        </Label>
                        <Input
                            id="bill-amount"
                            type="number"
                            placeholder="Enter Bill Amount"
                            value={billAmount !== null ? billAmount : ""}
                            onChange={handleBillAmountChange}    
                        >
                        </Input>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="tip-percentage">
                            Tip Percentage
                        </Label>
                        <Input
                            id="tip-percentage"
                            type="number"
                            placeholder="Enter Tip Percentage"
                            value={tipPercentage !== null ? tipPercentage : ""}
                            onChange={handleTipPercentageChange}
                        >
                        </Input>
                    </div>
                    <Button onClick={calculateTip}>Calculate Tip</Button>
                </CardContent>
                <CardFooter className="grid gap=2">
                <div className="flex items-center justify-between text-sm text-blue-600 mb-2">
                        <span>Tip Amount:</span>
                        <span className="font-bold">Rs.{tipAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between ">
                        <span>Total Amount:</span>
                        <span className="font-bold">Rs.{totalAmount.toFixed(2)}</span>
                    </div>
                </CardFooter>
            </Card>

        </div>
    )
}
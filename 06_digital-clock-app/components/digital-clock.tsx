"use client";
import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function DigitalClockComponent() {
    
    const [time, setTime] = useState<Date>(new Date());
    const [is24Hour, setIs24Hour] = useState<boolean>(true);
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
        const interval = setInterval(() => {
            setTime(new Date()); //update time every second
        }, 1000);
        return () => clearInterval(interval); //cleanup the interval on component unmount
    }, [])
    
    return (
        <div></div>
    );
};
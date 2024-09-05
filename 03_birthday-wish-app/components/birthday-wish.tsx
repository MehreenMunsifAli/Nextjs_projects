"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import {motion, AnimatePresence} from "framer-motion";
import dynamic from "next/dynamic";
import { FaBirthdayCake, FaGift } from 'react-icons/fa';
import { GiBalloons } from 'react-icons/gi';

// Define type for Confetti component props
type ConfettiProps = {
    width: number,
    height: number
}

// Dynamically import Confetti component
const DynamicConfetti = dynamic(() => import('react-confetti'), {ssr: false});

// Define color arrays for candles, balloons, and confetti
const candleColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8']
const balloonColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8']
const confettiColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE']

export default function BirthdayWish(){
    const [candlesLit, setCandlesLit] = useState<number>(0);
    const [balloonsPopCount, setBalloonsPopCount] = useState<number>(0)
    const [showConfetti, setShowConfetti] = useState<boolean>(false);
    const [windowSize, setWindowSize] = useState<ConfettiProps>({width: 0, height: 0});
    const [celebrating, setCelebrating] = useState<boolean>(false);
    const [formattedDate, setFormattedDate] = useState('');

    const totalCandles: number = 5;
    const totalBalloons: number = 5;

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({width: window.innerWidth, height: window.innerHeight});
        }

        handleResize()

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (candlesLit === totalCandles && balloonsPopCount === totalBalloons){
            setShowConfetti(true);
        }
    }, [candlesLit, balloonsPopCount])
    

    const lightCandle = (ind: number) => {
        if(ind === candlesLit) {
            setCandlesLit(prev => prev + 1);
        }
    };

    useEffect(() => {
        const today = new Date();
        const formatted = today.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'});
        setFormattedDate(formatted);
    },[])

    const popBalloon = (ind: number) => {
        if(ind === balloonsPopCount){
            setBalloonsPopCount(prev => prev + 1);
        }
    };

    const celebrate = () => {
        setCelebrating(true);
        setShowConfetti(true);

        const interval = setInterval(() => {
            setCandlesLit(prev => {
                if (prev < totalCandles) return prev + 1
                clearInterval(interval)
                return prev
            });
            setBalloonsPopCount(prev => {
                if (prev < totalBalloons) return prev + 1
                clearInterval(interval)
                return prev
            })
        }, 500);
    }


    return(
        <div className="min-h-screen bg-white flex item-center justify-center p-4">
            <motion.div
                initial={{scale: 0.9, opacity: 0}}
                animate={{scale: 1, opacity: 1}}
                transition={{duration: 0.5}}
                className="w-full max-w-md"
            >
                <Card className="mx-auto overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl border-2 border-black">
                    <CardHeader className="text-center">
                        <CardTitle className="text-4xl font-bold text-purple-800">
                            Happy Birthday!
                        </CardTitle>
                        <CardDescription className="text-2xl font-semibold text-blue-400">
                            Mehreen Munsif Ali
                        </CardDescription>
                        <p className="text-lg text-purple-300">{formattedDate}</p>
                    </CardHeader>
                    <CardContent className="space-y-6 text-center">
                        <div>
                            <h3 className="text-lg font-semibold text-black mb-2">Light the candles:</h3>
                            <div className="flex justify-center space-x-2">
                                {/* Map through candles */}
                                {[...Array(totalCandles)].map((_, index) => (
                                <AnimatePresence key={index}>
                                    {/* Render lit or unlit candle based on state */}
                                    {(celebrating && index <= candlesLit) || (!celebrating && index < candlesLit) ? (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        transition={{ duration: 0.5, delay: celebrating ? index * 0.5 : 0 }}
                                    >
                                        {/* Lit candle */}
                                        <FaBirthdayCake
                                        className={`w-8 h-8 transition-colors duration-300 ease-in-out cursor-pointer hover:scale-110`}
                                        style={{ color: candleColors[index % candleColors.length] }}
                                        onClick={() => lightCandle(index)}
                                        />
                                    </motion.div>
                                    ) : (
                                    // Unlit candle
                                    <FaBirthdayCake
                                        className={`w-8 h-8 text-gray-300 transition-colors duration-300 ease-in-out cursor-pointer hover:scale-110`}
                                        onClick={() => lightCandle(index)}
                                    />
                                    )}
                                </AnimatePresence>
                                ))}
                            </div>
                        </div>
                        {/* Balloons section */}
                        <div>
                        <h3 className="text-lg font-semibold text-black mb-2">Pop the balloons:</h3>
                        <div className="flex justify-center space-x-2">
                            {/* Map through balloons */}
                            {[...Array(totalBalloons)].map((_, index) => (
                            <motion.div
                                key={index}
                                initial={{ scale: 1 }}
                                animate={{ scale: index < balloonsPopCount ? 0 : 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Balloon icon */}
                                <GiBalloons
                                className={`w-8 h-8 cursor-pointer hover:scale-110`}
                                style={{ color: index < balloonsPopCount ? '#D1D5DB' : balloonColors[index % balloonColors.length] }}
                                onClick={() => popBalloon(index)}
                                />
                            </motion.div>
                            ))}
                        </div>
                        </div>
                    </CardContent>
                    {/* Card footer with button */}
                    <CardFooter className="flex justify-center">
                        <Button
                        onClick={celebrate}
                        disabled={celebrating}
                        className="bg-black text-white hover:bg-gray-800 transition-all duration-300"
                        >
                            Celebrate! <FaGift className="ml-2 h-4 w-4" />
                        </Button>
                    </CardFooter>
                </Card>    
            </motion.div>
            {/* Confetti component */}
            {showConfetti
             && (
                <DynamicConfetti
                width={windowSize.width}
                height={windowSize.height}
                recycle={false}
                numberOfPieces={900}
                colors={confettiColors}
                />
             )}
        </div>
    );
}
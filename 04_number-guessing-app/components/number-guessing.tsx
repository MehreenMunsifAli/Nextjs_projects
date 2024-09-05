"use client";
import { useState, useEffect, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import {Input} from "@/components/ui/input";

interface NumberGuessingState {
    gameStarted: boolean;
    gameOver: boolean;
    paused: boolean;
    targetNumber: number;
    userGuess: number | string;
    attempts: number;
}

export default function NumberGuessing() {
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [paused, setPaused] = useState<boolean>(false);
    const [targetNumber, setTargetNumber] = useState<number>(0);
    const [userGuess, setUserGuess] = useState<number | string>("");
    const [attempts, setAttempts] = useState<number>(0);

    useEffect(() => {
        if(gameStarted && !paused){
            const randomNumber: number = Math.floor(Math.random() * 10) + 1;
            setTargetNumber(randomNumber);
        }
    }, [gameStarted, paused]);

    //start game function
    const handleStartGame = (): void => {
        setGameStarted(true);
        setGameOver(false);
        setAttempts(0);
        setPaused(false);
    };

    //pause and resume functions
    const handlePauseGame = (): void => {
        setPaused(true);
      };
      
      const handleResumeGame = (): void => {
          setPaused(false); 
      };

    
    //guess handling function
    const handleGuess = (): void => {
        if (typeof userGuess === "number" && userGuess === targetNumber) {
            setGameOver(true);
        } else {
        setAttempts(attempts + 1);
        }
    };

    //try again func
    const handleTryAgain = (): void => {
        setGameStarted(false);
        setGameOver(false);
        setUserGuess("");
        setAttempts(0);
    };

    return(
        <div>
        </div>
    )
}
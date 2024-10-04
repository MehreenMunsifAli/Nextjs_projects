"use client";

import { useEffect, useState } from "react";
import {Button} from "@/components/ui/button";

interface JokeRespose {
    setup: string;
    punchline: string;
}

export default function RandomJokeComponent() {
    const [joke, setJoke] = useState<string>("");

    useEffect(() => {
        fetchJoke();
    }, []); // Empty dependency array ensures this runs once on mount   


    async function fetchJoke(): Promise<void> {
        try {
            const respose = await fetch(
                "https://official-joke-api.appspot.com/random_joke"
            );
            const data: JokeRespose = await respose.json();
    
            setJoke(`${data.setup} - ${data.punchline}`);
        } catch(error) {
            console.error("Error fethcing joke: ", error);

            setJoke("Failed to fetch joke. Please try again!");
        }
    }

    // JSX return statement rendering the random joke UI
    return(
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#593b76] to-[#beaa6f] p-4">
            <div className="bg-white rounded-2xl shadow-lg w-full p-8 max-w-md">
                <h1 className="text-3xl text-center font-bold mb-4 text-[#333]">
                  😂 Random Joke  👈
                </h1>
                <div className="bg-[#f5f5f5] rounded-lg p-6 mb-6 text-[#555] text-lg">
                    {joke || "LOADING..."}
                </div>
                <Button
                    onClick={fetchJoke}
                    className="bg-[#2c8c8f] hover:bg-[#216f62] text-white font-bold px-4 py-2 rounded-full transition-colors duration-300"
                >
                    😂 Get New Joke 😂
                </Button>
            </div>
        </div>
    )

}

    
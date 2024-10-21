"use client";
import { useState, ChangeEvent } from "react";
import { Card } from "./ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox, CheckedState } from "@/components/ui/checkbox";

export default function PasswordGeneratorComponent() {
    const [length, setLength] = useState<number>(16);
    const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
    const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
    const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
    const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
    const [password, setPassword] = useState<string>("");

    const handleLengthChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setLength(Number(e.target.value));
    };

    const handleCheckboxChange = (setter: (value: boolean) => void) => (checked: CheckedState): void => {
        if (typeof checked === "boolean"){
            setter(checked);
        };
    };

    const generatePassword = (): void => {
        const uppercaseCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercaseCharacters = 'abcdefghijklmnopqrstuvwxyz';
        const numberCharacters = '0123456789';
        const symbolCharacters = '!@#$%^&*()_+[]{}|:;,.<>?';

        let allChars = '';
        if (includeUppercase) allChars += uppercaseCharacters;
        if (includeLowercase) allChars += lowercaseCharacters;
        if (includeNumbers) allChars += numberCharacters;
        if (includeSymbols) allChars += symbolCharacters;
        if (allChars === "") {
            alert ("Please select at least one character type!");
            return;
        }

        let generatedPassword = '';
        for (let i=0; i<length; i++){
            const randomIndex = Math.floor(Math.random() * allChars.length);
            generatedPassword += allChars[randomIndex];
        }

        setPassword(generatedPassword);
    };

    const copyToClipboard = (): void => {
        navigator.clipboard.writeText(password)
        .then(() => {
            alert("Password copied to clipboard!");
        })
        .catch((err) => {
          alert(`Failed to copy password to clipboard! ${err}`);
        })
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <Card className="w-full max-w-md p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                <div className="mx-auto max-w-md space-y-6">
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold">Password Generator</h1>
                        <p className="text-gray-500 dark:text-gray-400">
                            Create a secure password with just a few clicks!
                        </p>
                    </div>
                    <div className="space-y-8">
                        <div className="space-y-2">
                            <Label htmlFor="length">Password Length</Label>
                            <Input
                                id="length"
                                type="number"
                                min='8'
                                max={"32"}
                                value={length}
                                onChange={handleLengthChange}
                                className="w-full"
                            >
                            </Input>
                        </div>
                        <div className="space-y-2">
                            <Label>Include:</Label>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="uppercase"
                                    checked={includeUppercase}
                                    onCheckedChange={handleCheckboxChange(setIncludeUppercase)}
                                />
                                <Label htmlFor="uppercase">Uppercase Letters</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="lowercase"
                                    checked={includeLowercase}
                                    onCheckedChange={handleCheckboxChange(setIncludeLowercase)}
                                />
                                <Label htmlFor="lowercase">Lowercase Letter</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="numbers"
                                    checked={includeNumbers}
                                    onCheckedChange={handleCheckboxChange(setIncludeNumbers)}
                                />
                                <Label htmlFor="numbers">Numbers</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="symbols"
                                    checked={includeSymbols}
                                    onCheckedChange={handleCheckboxChange(setIncludeSymbols)}
                                />
                                <Label htmlFor="symbols">Symbols</Label>
                            </div>
                        </div>
                        <Button type="button" className="w-full" onClick={generatePassword}>
                            Generate Password
                        </Button>
                        <div className="space-y-2">
                            <Label htmlFor="password">Generated Password</Label>
                            <div className="flex items-center space-x-2">
                                <Input
                                    id="password"
                                    type="text"
                                    value={password}
                                    readOnly
                                    className="flex-1"
                                />
                                <Button type="button" onClick={copyToClipboard}>
                                    Copy to Clipboard
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

        </div>
    )
}
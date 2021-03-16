import {createContext, ReactNode, useContext, useEffect, useState } from "react";
import { challengeContext } from "./ChallengeContext";

interface CountContextData{
    minu: number;
    sec: number;
    hasFinished: boolean;
    isActive: boolean;
    Start: () => void;
    Stop: () => void;
}

interface CountProviderProps{
    children: ReactNode;
}

export const CountContext = createContext({} as CountContextData) 

let Timeout: NodeJS.Timeout;

export function CountProvider({children}: CountProviderProps) {

    const {startChallenge} = useContext(challengeContext);

    const [time, setTime] = useState(0.1 * 60);

    const [isActive, setIsActive] = useState(false);

    const [hasFinished, setFinished] = useState(false);

    const minu = Math.floor(time / 60);

    const sec = time % 60;

    function Start() {

        setIsActive(true);

    }

    function Stop() {

        clearTimeout(Timeout);

        setIsActive(false);
        setFinished(false);
        setTime(0.1 * 60);
    }

    useEffect(()=>{

        if(isActive && time > 0){

            Timeout = setTimeout(() =>{

                setTime(time - 1);

            }, 1000)
        
        }else if(isActive && time === 0){

            setFinished (true);

            setIsActive(false);

            startChallenge()
            
        }

    },[isActive, time])

    return(

        <CountContext.Provider value={{
            minu,
            sec,
            hasFinished,
            isActive,
            Start,
            Stop,
            
        }}>
            {children}
        </CountContext.Provider>
    )
}
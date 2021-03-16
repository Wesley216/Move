import { createContext, ReactNode, useEffect, useState } from "react";
import challenges from '../../challenges.json';
import cookie from "js-cookie";
import { LevelUp } from "../components/LevelUp";


interface Challenge{
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengeContextData{
    level: number,
    currentExperience: number,
    challengeCompleted: number,
    activeChallenge: Challenge,
    experienceToNextLevel: number,
    levelUp: () => void;
    startChallenge: () => void;
    resetChallenge:() => void;
    completeChallenge: () => void;
    closeLevelUp: () => void;
}

export const challengeContext = createContext({} as ChallengeContextData);

interface ChallengeProviderProps{
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengeCompleted: number;
}

export function ChallengeProvider({
    children, 
    ...rest
} : ChallengeProviderProps) {

    const [level, Setlevel] = useState(rest.level ?? 1)
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengeCompleted, setChallengesCompleted] = useState(rest.challengeCompleted ?? 0);

    const [activeChallenge, setActiveChallenge] = useState(null)
    const [isLevelUp, setIsLevelUp] = useState(false)
    
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

        /*NOTIFICAÇÃO DO DESAFIO NOVO COM API DO NAVEGADOR*/
    useEffect(()=>{

        Notification.requestPermission();

    }, [])

    useEffect(()=>{

        cookie.set('level', String(level));
        cookie.set('currentExperience', String(currentExperience));
        cookie.set('challengeCompleted', String(challengeCompleted));

    },[level, currentExperience, challengeCompleted])

    function levelUp() {

        Setlevel(level + 1);
        setIsLevelUp(true)


  }

  function closeLevelUp(){
    setIsLevelUp(false);
  }

  function startChallenge() {

      const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
      const challenge = challenges[randomChallengeIndex];

      setActiveChallenge(challenge)

      /*SOLTA UM AUDIO JUNTO COM A NOTIFICAÇÃO*/
      new Audio("/notification.mp3").play();

      if(Notification.permission === 'granted'){
        new Notification('Novo desafio!!', {
            body: `Valendo ${challenge.amount} xp!`
        })
    }
}

function resetChallenge(){
    setActiveChallenge(null);
}

function completeChallenge() {

    if(!activeChallenge){

        return;

    }

    const {amount} = activeChallenge;

    let finalExperience = currentExperience + amount;

    if(finalExperience > experienceToNextLevel){

        finalExperience = finalExperience - experienceToNextLevel;

        levelUp();
    }

    /*ACUMULADOR DE EXPERIENCIA E DE DESAFIOS COMPLETOS*/
    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengeCompleted + 1);
}
    return(
        <challengeContext.Provider value={{ 
        level, 
        currentExperience, 
        challengeCompleted, 
        levelUp,
        startChallenge,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel,
        completeChallenge,
        closeLevelUp,
    }}
        >

            {children}

            {isLevelUp && <LevelUp />}
        </challengeContext.Provider>
    )
}
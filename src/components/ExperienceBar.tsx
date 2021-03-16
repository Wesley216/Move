import { useContext } from 'react';
import { challengeContext } from '../contexts/ChallengeContext';
import style from '../style/components/ExperienceBar.module.css';

export function ExperienceBar(){

    const {currentExperience, experienceToNextLevel} = useContext(challengeContext);
    
    /*CALCULO DA BARRA DE EXPERIENCIA*/ 
    const percentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel

    return(

        <header className={style.experience}>
            <span>0 xp</span>
            <div>
                <div style={{width: `${percentToNextLevel}%`}}></div>
                <span className={style.currentexp} style={{left: `${percentToNextLevel}%`}}>{currentExperience} xp</span>
            </div>
            <span>{experienceToNextLevel} xp</span>
        </header>

    );
}
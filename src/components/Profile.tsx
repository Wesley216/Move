import { useContext } from 'react';
import { challengeContext } from '../contexts/ChallengeContext';
import style from '../style/components/Profile.module.css';

export function Profile(){
    const {level} = useContext(challengeContext);
    return(

        <div className={style.containerProfile}>
            <img src="https://github.com/Wesley216.png" alt="Eu"/>
        <div>
            <h1>Wesley batista</h1>
            <p>
                <img src="icons/level.svg" alt=""/>
                Level {level}
                </p>
            </div>
        </div>        
    );
}
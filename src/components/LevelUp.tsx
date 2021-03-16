import { useContext } from 'react';
import style from '../style/components/LevelUp.module.css';
import { challengeContext } from '../contexts/ChallengeContext';

export function LevelUp() {

    const { level, closeLevelUp } = useContext(challengeContext);

    return(
        <div className={style.overlay}>

            <div className={style.container}>

                <header>{level}</header>
            
                <h1>Parabéns</h1>

                <p>Você alcançou um novo level.</p>

                <button type="button" onClick={closeLevelUp}>

                    <img src="/icons/close.svg" alt="Fechar"/>
                </button>
            </div>
        </div>
    )
}
import { useContext } from 'react';
import { challengeContext } from '../contexts/ChallengeContext';
import style from '../style/components/Challenge.module.css';

export function Challenge() {
    
    /*NUMERO DE DESAFIOS CONCLUIDOS*/ 
    const {challengeCompleted} = useContext(challengeContext);

    return(

        <div className={style.challenge}>

            <span>Desafios completos</span>
            <span>{challengeCompleted}</span>
            
        </div>

    );
}
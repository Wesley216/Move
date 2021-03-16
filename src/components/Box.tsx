import { useContext } from "react";
import { challengeContext } from "../contexts/ChallengeContext";
import { CountContext } from "../contexts/CountContext";
import style from "../style/components/Box.module.css";


export function Box() {

    const {activeChallenge, resetChallenge, completeChallenge} = useContext(challengeContext);

    const {Stop} = useContext(CountContext);

    function handleChallengeComplete() {
        completeChallenge();
        Stop();
    }

    function handleFailChallenge() {
        resetChallenge();
        Stop();
    }

    return(

        <div className={style.boxContainer}>

            { activeChallenge ? (

                <div className={style.Active}>

                    <header>Ganhe {activeChallenge.amount} xp</header>

                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt=""/>

                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}.</p>
                    </main>

                    <footer>
                        <button type="button" onClick={handleFailChallenge} className={style.FailButton}>
                            Falhei
                        </button>

                        <button type="button" onClick={handleChallengeComplete} className={style.CompleteButton}>
                            Completei
                        </button>

                    </footer>

                </div>

            ):(

            <div className={style.noActive}>
                <strong>Finalize um cilco para receber um novo dasafio</strong>
                <p>
                    <img src="icons/level-up.svg" alt=""/>
                    Avance de level completando desafios.
                </p>
            </div>
            )}
        </div>
    )
}
import { useContext } from 'react';
import {CountContext} from '../contexts/CountContext'
import style from '../style/components/Count.module.css';



export function Count() {

    const {minu, sec, hasFinished, isActive, Start, Stop} = useContext(CountContext);
    
    const [minleft, minright] = String(minu).padStart(2, '0').split('');

    const [secleft, secright] = String(sec).padStart(2, '0').split('');

return(
    <div>
        <div className={style.count}>

            <div>
                <span>{minleft}</span>
                <span>{minright}</span>
            </div>

            <span>:</span>

            <div>
                <span>{secleft}</span>
                <span>{secright}</span>
            </div>
        </div>

        {hasFinished ? (

        <button disabled className={`${style.but} ${style.butActive}`}>
            
           Encerrado

       </button>

        ):
        
        <>
        {isActive ? (
            
            <button type="button" className={`${style.but} ${style.butActive}`} onClick={Stop}>
                
                Abandonar
    
            </button>
    
            ): (
    
            <button type="button" className={style.but} onClick={Start}>
                
                Iniciar
    
            </button>
            )}
        </>
        
        }

        
    </div>

    );
}
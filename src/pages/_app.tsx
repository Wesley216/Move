import { Header } from "../component/Header";
import { Player } from '../component/Player';

import '../styles/global.scss'
import styles from '../styles/app.module.scss'
import { PlayerContextProvider } from "../contexts/PlayerContexts";

function MyApp({ Component, pageProps }) {

  return(
    
    <PlayerContextProvider>
    <div className={styles.wrapper}>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
      <Player />
    </div>
    </PlayerContextProvider>
  )
}

export default MyApp

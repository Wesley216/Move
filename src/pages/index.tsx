import { GetStaticProps } from 'next';
import Link from 'next/link'
import Image from 'next/image'; //serve para otimizaar a imagem ou tratar e formatar os atributos passados e pro carregamento nao para dimensao
import Head from 'next/head';
import { format, parseISO} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { api } from '../services/api';
import { durationToTimeString } from '../utils/durationToTimeString';
import { usePlayer } from '../contexts/PlayerContexts';

import styles from './home.module.scss';

type Episode = {
  id: string;
  title: string;
  members: string;
  duration: number;
  durationAsString: string;
  url: string;
  publishedAt: string;
  thumbnail: string;
}

type HomeProps = {
  last: Episode[];
  all: Episode[];
}

export default function Home({ last, all }: HomeProps) {

  const { playList } = usePlayer();

  const episodeList = [...last, ...all];
  
  return (
    <div className={styles.container}>

      <Head>
        <title>Home | Podcastr </title>
      </Head>

      <section className={styles.lates}>
        <h2>Ultimos lançamentos</h2>

        <ul>
          {last.map((episode, index) => {

            return (
              
              <li key={episode.id}>
                <Image 
                width={200} 
                height={200} 
                objectFit='cover' 
                src={episode.thumbnail} 
                alt={episode.title} 
                />

                <div className={styles.details}>

                  <Link href={`/episodes/${episode.id}`}>
                    <a>{episode.title}</a>
                  </Link>

                  <p>{episode.members}</p>

                  <span>{episode.publishedAt}</span>

                  <span>{episode.durationAsString}</span>

                </div>

                <button type="button" onClick={()=>playList(episodeList, index)}>
                  <img src="/play-green.svg" alt="Play"/>
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      <section className={styles.all}>

        <h2>Todos os episodios</h2>

        <table cellSpacing={0}>

          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>

          <tbody>

            {all.map((episode, index) => {

              return(

                <tr key={episode.id}>

                  <td style={{ width: 72 }}>
                    <Image 
                    width={120} 
                    height={120} 
                    src={episode.thumbnail} 
                    alt={episode.title} 
                    objectFit="cover" />
                  </td>

                  <td>
                    <Link href={`/episodes/${episode.id}`}>
                      <a >{episode.title}</a>
                    </Link>
                  </td>

                  <td>{episode.members}</td>
                  <td style={{ width: 100 }}>{episode.publishedAt}</td>
                  <td>{episode.durationAsString}</td>

                  <td>
                    <button type="button" onClick={()=>playList(episodeList, index + last.length )}>
                      <img src="/play-green.svg" alt="Play ep"/>
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  
  const { data } = await api.get('episodes', {
     params:{
       _limit: 12,
       _sort: 'published_at',
       _order: 'desc',
     }
  })

  const episodes = data.map(episode => {
      return {
        id: episode.id,
        title: episode.title,
        thumbnail: episode.thumbnail,
        members: episode.members,
        publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }),
        duration: Number(episode.file.duration),
        durationAsString: durationToTimeString(Number(episode.file.duration)),
        url: episode.file.url,
      };
    })

    const last = episodes.slice(0, 2);
    const all = episodes.slice(2, episodes.length);


  return{
    props: {
      last,
      all,
    },
    revalidate: 60 * 60 * 8,
  } 
}
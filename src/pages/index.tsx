import { Challenge } from "../components/Challenges";
import { Count } from "../components/Count";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";

import { ChallengeProvider } from "../contexts/ChallengeContext";

import { GetServerSideProps } from "next";

import Head from 'next/head';

import style from '../style/pages/Home.module.css';
import { Box } from "../components/Box";
import { CountProvider } from "../contexts/CountContext";

interface HomeProps{
  level: number;
  currentExperience: number;
  challengeCompleted: number;
}

export default function Home(props : HomeProps) {

  return (
    <ChallengeProvider 
    level={props.level}
    currentExperience = {props.currentExperience}
    challengeCompleted = {props.challengeCompleted}
    >
      <div className={style.container}>
      
        <Head>
          <title>Move</title>
        </Head>

        <ExperienceBar />

        <CountProvider>
          <section>
            <div>
              <Profile />
              <Challenge />
              <Count />
            </div>

            <div>
              <Box />
            </div>
          </section>
        </CountProvider>
      </div>
    </ChallengeProvider>
  )
}

  /* MELHORA O SEO DO SITE JOGANDO OS DADOS PARA O BACK*/
export const getServerSideProps: GetServerSideProps = async(ctx) => {
  
  const {level, currentExperience, challengeCompleted} = ctx.req.cookies;
  
  
  return{
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengeCompleted: Number(challengeCompleted)
    }
  }
}

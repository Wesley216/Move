import { createContext, useState, ReactNode, useContext } from 'react';

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
};

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    play: (episode: Episode) => void;
    playList: (list: Episode[], index: number) => void;
    setPlayingState: (state: boolean) => void; 
    togglePlay: ( ) => void;
    playNext: () => void;
    playPrevious: () => void;
    hasNext: boolean;
    hasPrevious: boolean;
    isLooping: boolean;
    toggleLoop: () => void;
    toggleShuffle: () => void;
    isShuffling: boolean;
    clearPlayState: () => void;
};

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
    children: ReactNode;
}

export function PlayerContextProvider({ children }: PlayerContextProviderProps){
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  const hasPrevious = currentEpisodeIndex > 0;


  const hasNext = isShuffling || (currentEpisodeIndex + 1)< episodeList.length;
  function play(episode: Episode){
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list: Episode[], index: number){
      setEpisodeList(list);
      setCurrentEpisodeIndex(0);
      setIsPlaying(true);
  }

  function togglePlay(){
    setIsPlaying(!isPlaying);
  }

  function toggleLoop(){
    setIsLooping(!isLooping);
  }

  function toggleShuffle(){
    setIsShuffling(!isShuffling);
  }

  function setPlayingState(state: boolean){
    setIsPlaying(state);
  }

  function playNext() { 
    if (isShuffling) {

      const nextRandomEpisode = Math.floor(Math.random() * episodeList.length)
      setCurrentEpisodeIndex(nextRandomEpisode);
       
    }else if (hasNext) {
        setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }
  }

  function playPrevious() {
    if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  }

  function clearPlayState(){
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
  }
  return (

    <PlayerContext.Provider value={{
      currentEpisodeIndex, 
      clearPlayState,
      episodeList, 
      play,
      playList, 
      playPrevious,
      playNext,
      isPlaying, 
      isLooping,
      isShuffling,
      setPlayingState,
      hasNext,
      hasPrevious,
      togglePlay, 
      toggleLoop,
      toggleShuffle,
    }}
    >
        {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => {
    return useContext(PlayerContext);
}
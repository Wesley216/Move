export function durationToTimeString(duration: number){
    const hrs = Math.floor(duration / 3600)
    const min = Math.floor((duration % 3600) / 60)
    const sec = duration % 60;

    const time = [hrs, min, sec]
        .map(unit => String(unit).padStart(2 , '0'))
        .join(':')

        return time;
}
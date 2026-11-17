export default function PickBackground() : string
{
    const timeDateOptions : object = { hour: "2-digit", minute: "2-digit" };
    const time = new Intl.DateTimeFormat("en-US", timeDateOptions).format(Date.now());
    const timeData = new Date().getHours()

    return chooseBackground(timeData);
}

function chooseBackground(timeData: number) : string
{
    const isMorning = timeData >= 7 && timeData <= 12;
    const isEarlyAfternoon = timeData >= 13 && timeData <= 16;
    const isMidAfternoon = timeData == 17;
    const isLateAfternoon = timeData == 18 && timeData < 19;
    const isNight = timeData >= 19 || timeData <= 3;
    const isEarlyMorning = timeData >= 4 && timeData <= 6;

    if (isMorning) return "../backgrounds/Ocean_4/5.png"
    if (isEarlyAfternoon) return "../backgrounds/Ocean_7/6.png"
    if (isMidAfternoon) return "../backgrounds/Ocean_2/5.png"
    if (isLateAfternoon) return "../backgrounds/Ocean_5/5.png"
    if (isNight) return "../backgrounds/Ocean_6/5.png"
    else return "../backgrounds/Ocean_8/6.png"
}
export default function PickBackground() : string
{
    const timeDateOptions : object = { hour: "2-digit", minute: "2-digit" };
    var time = new Intl.DateTimeFormat("en-US", timeDateOptions).format(Date.now());
    var timeData = new Date().getHours()

    return chooseBackground(timeData);
}

function chooseBackground(timeData: number) : string
{
    var isMorning = timeData >= 7 && timeData <= 12;
    var isEarlyAfternoon = timeData >= 13 && timeData <= 16;
    var isMidAfternoon = timeData == 17;
    var isLateAfternoon = timeData >= 18;
    var isNight = timeData >= 19 || timeData <= 3;
    var isEarlyMorning = timeData >= 4 && timeData <= 6;

    if (isMorning) return "../backgrounds/Ocean_4/5.png"
    if (isEarlyAfternoon) return "../backgrounds/Ocean_7/6.png"
    if (isMidAfternoon) return "../backgrounds/Ocean_2/5.png"
    if (isLateAfternoon) return "../backgrounds/Ocean_5/5.png"
    if (isNight) return "../backgrounds/Ocean_6/5.png"
    else return "../backgrounds/Ocean_8/6.png"
}
import { Box, Typography } from "@mui/joy";
import { useEffect, useState } from "react";

export default function TimeDisplay() {
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");
    const timeDateOptions : object = { hour: "2-digit", minute: "2-digit" };
    useEffect(() => {
        setInterval(() => {
            const day = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(Date.now());
            const month = new Intl.DateTimeFormat("en-US", { month: "numeric" }).format(Date.now())
            const date = new Date().getDate().toLocaleString();
            const year = new Intl.DateTimeFormat("en-US", { year: "numeric" }).format(Date.now())
            const time = new Intl.DateTimeFormat("en-US", timeDateOptions).format(Date.now());
            setDate(`${month}/${date}/${year}`);
            setTime(time);
        }, 1000)
    }, []);

    return (
        <Box className='absolute right-5 top-2 z-10'>
            <Box className='flex flex-col gap-1 items-start'>
                <Typography sx={{ fontFamily: 'PixelFont', fontSize: 14, color: 'antiquewhite' }}>{date}</Typography>
                <Typography sx={{ fontFamily: 'PixelFont', fontSize: 14, color: 'antiquewhite' }}>{time}</Typography>
            </Box>
        </Box>
    )
}
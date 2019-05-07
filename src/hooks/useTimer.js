import { useState, useRef } from 'react';

export default function useTimer() {

    const [elapsedTime, setElapsedTime] = useState({seconds: 0, minutes: 0, hours: 0});
    const [isTimerStarted, setIsTimerStarted] = useState(false);
    const intervalRef = useRef(undefined);

    const addSecond = time => {
        const afterSecondAdded = {
            ...time,
            seconds: time.seconds === 59 ? 0 : time.seconds + 1,
        };
        return afterSecondAdded.seconds === 0 ? addMinute(afterSecondAdded) : afterSecondAdded;
    }

    const addMinute = time => {
        const afterMinuteAdded = {
            ...time,
            minutes: time.minutes === 59 ? 0 : time.minutes + 1,
        };
        return afterMinuteAdded.minutes === 0 ? addHour(afterMinuteAdded) : afterMinuteAdded;
    };

    const addHour = time => ({
        ...time,
        hours: time.hours + 1,
    });

    const startTimer = () => {
        intervalRef.current = setInterval(() => setElapsedTime(addSecond), 1000);
        setIsTimerStarted(true);
    };

    const stopTimer = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = undefined;
        setIsTimerStarted(false);
    };

    const toggleTimer = () => {
        if (!intervalRef.current) startTimer();
        else stopTimer();
    };
    
    const resetTimer = () => {
        if (intervalRef.current) stopTimer();
        setElapsedTime({seconds: 0, minutes: 0, hours: 0});
    };

    return { elapsedTime, isTimerStarted, toggleTimer, resetTimer };
}

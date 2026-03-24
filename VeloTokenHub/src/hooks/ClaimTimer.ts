import { useState, useEffect, useCallback } from "react";

export const useFaucetTimer = (lastRequestTimestamp: number) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const COOLDOWN = 24 * 60 * 60; // 86,400 seconds

  const calculateTime = useCallback(() => {
    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    const nextAvailable = Number(lastRequestTimestamp) + COOLDOWN;
    const diff = nextAvailable - now;

    setTimeLeft(diff > 0 ? diff : 0);
  }, [lastRequestTimestamp]);

  useEffect(() => {
    calculateTime();
    const interval = setInterval(calculateTime, 1000); // Update every second
    return () => clearInterval(interval);
  }, [calculateTime]);

  // Format seconds to HH:MM:SS
  const formatTime = () => {
    const h = Math.floor(timeLeft / 3600);
    const m = Math.floor((timeLeft % 3600) / 60);
    const s = timeLeft % 60;
    return `${h}h ${m}m ${s}s`;
  };

  return { 
    isLocked: timeLeft > 0, 
    countdown: formatTime(), 
    secondsLeft: timeLeft 
  };
};

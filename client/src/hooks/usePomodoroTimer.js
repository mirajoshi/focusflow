import { useState, useRef, useEffect, useCallback } from 'react';
import { startSessionRequest, endSessionRequest } from '../api/pomodoroApi.js';

const FOCUS_DURATION_MINUTES = 25;

export function usePomodoroTimer() {
  const [secondsLeft, setSecondsLeft] = useState(FOCUS_DURATION_MINUTES * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  const intervalRef = useRef(null);

  // Tick every second while running
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const start = useCallback(async () => {
    const result = await startSessionRequest({
      type: 'focus',
      plannedDuration: FOCUS_DURATION_MINUTES,
    });
    setSessionId(result.data._id);
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resume = useCallback(() => {
    setIsRunning(true);
  }, []);

  const reset = useCallback(async () => {
    if (sessionId) {
      await endSessionRequest(sessionId, false);
    }
    setIsRunning(false);
    setSecondsLeft(FOCUS_DURATION_MINUTES * 60);
    setSessionId(null);
  }, [sessionId]);

  // Auto-end the session on the backend once the timer hits zero
  useEffect(() => {
    if (secondsLeft === 0 && sessionId) {
      endSessionRequest(sessionId, true).then(() => {
        setSessionId(null);
      });
    }
  }, [secondsLeft, sessionId]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return { secondsLeft, isRunning, display, start, pause, resume, reset };
}
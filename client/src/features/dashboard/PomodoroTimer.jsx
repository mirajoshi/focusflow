import { usePomodoroTimer } from '../../hooks/usePomodoroTimer.js';

function PomodoroTimer() {
  const { display, isRunning, secondsLeft, start, pause, resume, reset } = usePomodoroTimer();

  const hasStarted = secondsLeft < 25 * 60;

  return (
    <div className="max-w-lg p-6 rounded bg-surface border border-border">
      <h2 className="font-display text-2xl text-paper mb-4">Focus Timer</h2>

      <div className="flex flex-col items-center gap-6">
        <span className="font-mono text-6xl text-paper">{display}</span>

        <div className="flex gap-3">
          {!hasStarted && (
            <button
              onClick={start}
              className="px-6 py-2 rounded bg-accent hover:bg-accent-hover text-paper font-medium transition-colors"
            >
              Start
            </button>
          )}

          {hasStarted && isRunning && (
            <button
              onClick={pause}
              className="px-6 py-2 rounded bg-ink border border-border hover:border-accent text-paper font-medium transition-colors"
            >
              Pause
            </button>
          )}

          {hasStarted && !isRunning && secondsLeft > 0 && (
            <button
              onClick={resume}
              className="px-6 py-2 rounded bg-accent hover:bg-accent-hover text-paper font-medium transition-colors"
            >
              Resume
            </button>
          )}

          {hasStarted && (
            <button
              onClick={reset}
              className="px-6 py-2 rounded bg-ink border border-border hover:border-accent text-paper font-medium transition-colors"
            >
              Reset
            </button>
          )}
        </div>

        {secondsLeft === 0 && (
          <p className="text-sage text-sm">Session complete! 🎉</p>
        )}
      </div>
    </div>
  );
}

export default PomodoroTimer;
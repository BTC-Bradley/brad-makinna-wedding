'use client';

interface ErrorStateProps {
  message: string;
}

export default function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="text-center text-red-600 dark:text-red-400">
      <p className="mb-4">{message}</p>
      <button
        onClick={() => window.location.href = '/rsvp'}
        className="text-sage hover:text-sage/90 dark:text-amber-400 dark:hover:text-amber-300 underline"
      >
        Try Again
      </button>
    </div>
  );
} 
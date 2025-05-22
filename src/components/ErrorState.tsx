'use client';

interface ErrorStateProps {
  message: string;
}

export default function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="text-center text-red-600">
      <p className="mb-4">{message}</p>
      <button
        onClick={() => window.location.href = '/rsvp'}
        className="text-sage hover:text-sage/90 underline"
      >
        Try Again
      </button>
    </div>
  );
} 
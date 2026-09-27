export default function ErrorState({ message, onRetry }) {
  return (
    <div className="state-block fade-in">
      <p style={{ color: 'var(--color-danger)', fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontStyle: 'italic' }}>
        {message || 'Something went wrong while fetching data.'}
      </p>
      {onRetry && (
        <button className="btn btn-outline" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}

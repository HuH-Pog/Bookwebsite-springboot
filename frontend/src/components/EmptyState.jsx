export default function EmptyState({ message = 'Nothing to show here yet.' }) {
  return (
    <div className="state-block fade-in">
      <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontStyle: 'italic' }}>{message}</p>
    </div>
  );
}

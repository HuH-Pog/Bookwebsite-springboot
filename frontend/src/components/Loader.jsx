export default function Loader({ label = 'Loading...' }) {
  return (
    <div className="state-block fade-in">
      <div className="spinner" />
      <p>{label}</p>
    </div>
  );
}

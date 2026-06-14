function RaceTrackPanel({ className, heading, imageSrc, t }) {
  return (
    <main className={className} dir={t.direction}>
      <div className="race-panel-heading">{heading}</div>
      <div className="race-track-visual">
        <img src={imageSrc} alt="" />
        <div className="race-track-overlay" />
      </div>
    </main>
  );
}

export default RaceTrackPanel;

function TrackPreviewPanel({ labels, t, trackPreviewImage }) {
  return (
    <section className="teacher-track-preview teacher-hud-panel" dir={t.direction}>
      <div className="hud-panel-heading">
        <span>{labels.trackPreview}</span>
      </div>
      <div className="track-viewport" aria-hidden="true">
        <img className="track-preview-image" src={trackPreviewImage} alt="" />
      </div>
      <div className="track-meta">
        <strong>{labels.trackName}</strong>
        <span>{labels.trackDescription}</span>
      </div>
    </section>
  );
}

export default TrackPreviewPanel;

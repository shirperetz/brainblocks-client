function StudentPlayerCard({ labels, player, roomStatus, t }) {
  return (
    <section className="student-player-card">
      <div className="player-card-content">
        <div className="player-card-name">{player.displayName}</div>
        <div className="player-card-status">
          <span>{labels.status}</span>
          <strong>{t.statuses?.[roomStatus] || roomStatus}</strong>
        </div>
        <div className="player-card-placeholder">
          <div className="placeholder-icon">{"\uD83D\uDE97"}</div>
        </div>
      </div>
    </section>
  );
}

export default StudentPlayerCard;

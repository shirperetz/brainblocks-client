function LobbyPanel({ t, lobby }) {
  if (!lobby) {
    return <p className="empty-state">{t.lobby.empty}</p>;
  }

  return (
    <section className="panel">
      <h2>{t.lobby.title}</h2>

      <div className="status-grid">
        <div className="stat">
          <span className="stat-label">{t.lobby.roomCode}</span>
          <span className="stat-value">{lobby.roomCode}</span>
        </div>
        <div className="stat">
          <span className="stat-label">{t.lobby.status}</span>
          <span className="stat-value">{t.statuses[lobby.status] || lobby.status}</span>
        </div>
        <div className="stat">
          <span className="stat-label">{t.lobby.players}</span>
          <span className="stat-value">
            {lobby.currentPlayers} / {lobby.maxPlayers}
          </span>
        </div>
      </div>

      <h3>{t.lobby.joinedStudents}</h3>
      {lobby.players.length > 0 ? (
        <ul className="player-list">
          {lobby.players.map((player, index) => (
            <li key={player.id}>
              <span>{player.displayName}</span>
              <strong>#{index + 1}</strong>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-state">{t.lobby.noStudents}</p>
      )}
    </section>
  );
}

export default LobbyPanel;

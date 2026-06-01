function LobbyPanel({ lobby }) {
  if (!lobby) {
    return <p className="empty-state">No lobby loaded yet.</p>;
  }

  return (
    <section className="panel">
      <h2>Lobby</h2>

      <div className="status-grid">
        <div className="stat">
          <span className="stat-label">Room code</span>
          <span className="stat-value">{lobby.roomCode}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Status</span>
          <span className="stat-value">{lobby.status}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Players</span>
          <span className="stat-value">
            {lobby.currentPlayers} / {lobby.maxPlayers}
          </span>
        </div>
      </div>

      <h3>Joined students</h3>
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
        <p className="empty-state">No students have joined yet.</p>
      )}
    </section>
  );
}

export default LobbyPanel;

function RacePlayerBoard({
  children,
  className,
  currentPlayerId,
  emptyMessage,
  heading,
  players,
  t,
  youLabel,
}) {
  return (
    <aside className={className} dir={t.direction}>
      <div className="race-panel-heading">{heading}</div>
      {players.length > 0 ? (
        <ul className={currentPlayerId ? "student-race-players-list" : undefined}>
          {players.map((player, index) => {
            const isCurrentPlayer = player.id === currentPlayerId;

            return (
              <li
                className={isCurrentPlayer ? "current-player" : undefined}
                key={player.id}
              >
                <span className={currentPlayerId ? "player-rank" : undefined}>
                  {index + 1}
                </span>
                {currentPlayerId ? (
                  <>
                    <span className="player-name">{player.displayName}</span>
                    {isCurrentPlayer && <span className="player-you">{youLabel}</span>}
                  </>
                ) : (
                  <strong>{player.displayName}</strong>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>{emptyMessage}</p>
      )}
      {children}
    </aside>
  );
}

export default RacePlayerBoard;

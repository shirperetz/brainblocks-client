function TeacherPlayersPanel({
  currentPlayers,
  labels,
  lobby,
  maxPlayers,
  roomStatus,
  students,
  t,
  visibleRoomCode,
}) {
  return (
    <aside className="teacher-hud-panel teacher-players-panel" dir={t.direction}>
      <div className="hud-panel-heading">
        <span>{labels.playersPanelTitle}</span>
      </div>

      <div className="room-code-display">
        <span>{labels.roomCode}</span>
        <strong>{visibleRoomCode}</strong>
      </div>

      <div className="room-stats">
        <div>
          <span>{labels.roomStatus}</span>
          <strong className="status-online">
            {roomStatus ? t.statuses[roomStatus] || roomStatus : labels.standbyStatus}
          </strong>
        </div>
        <div>
          <span>{labels.studentsJoined}</span>
          <strong>
            {currentPlayers} / {maxPlayers}
          </strong>
        </div>
      </div>

      <div className="students-heading">
        <span>{labels.students}</span>
        <strong>{currentPlayers}</strong>
      </div>

      {students.length > 0 ? (
        <ul className="teacher-student-list" aria-label={labels.students}>
          {students.map((student, index) => (
            <li className="teacher-student-card" key={student.id}>
              <span className="student-card-number">{index + 1}</span>
              <span className="student-card-avatar" aria-hidden="true" />
              <span className="student-card-copy">
                <strong>{student.displayName}</strong>
                <small>{t.statuses[lobby?.status] || lobby?.status || labels.standbyStatus}</small>
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="students-empty-state" aria-live="polite">
          <span className="empty-radar" aria-hidden="true" />
          <p>{labels.noStudentsJoined}</p>
        </div>
      )}
    </aside>
  );
}

export default TeacherPlayersPanel;

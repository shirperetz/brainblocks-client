function TeacherActionStrip({
  canStartRace,
  handleCreateRoom,
  handleStartRace,
  isCreatingRoom,
  isStartingRace,
  labels,
  room,
  t,
}) {
  return (
    <section className="teacher-action-strip" aria-label={labels.actions}>
      <button
        className="teacher-primary-action"
        type="button"
        onClick={handleCreateRoom}
        disabled={isCreatingRoom || isStartingRace || Boolean(room)}
      >
        <span className="action-icon" aria-hidden="true">
          {"\u05d2\u2013\u00b1"}
        </span>
        <span>
          <strong>
            {isCreatingRoom ? t.teacherCreate.creatingButton : t.teacherCreate.createButton}
          </strong>
          <small>{labels.createRoomHint}</small>
        </span>
      </button>

      <button
        className="teacher-secondary-action"
        type="button"
        onClick={handleStartRace}
        disabled={!canStartRace || isCreatingRoom || isStartingRace}
      >
        <span className="action-icon" aria-hidden="true">
          {"\u00bb"}
        </span>
        <span>
          <strong>
            {isStartingRace ? t.teacherLobby.startingRaceButton : t.teacherLobby.startRaceButton}
          </strong>
          <small>{labels.startRaceActionHint}</small>
        </span>
      </button>
    </section>
  );
}

export default TeacherActionStrip;

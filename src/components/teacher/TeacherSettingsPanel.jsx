import { DIFFICULTIES, MAX_PLAYERS, SUPPORTED_OPERATIONS } from "../../constants/raceSettings";

function TeacherSettingsPanel({
  labels,
  selectedDifficulty,
  selectedOperations,
  setSelectedDifficulty,
  t,
}) {
  return (
    <aside className="teacher-hud-panel teacher-settings-panel" dir={t.direction}>
      <div className="hud-panel-heading">
        <span>{labels.raceSettings}</span>
      </div>

      <div className="settings-row">
        <span>{labels.maxPlayers}</span>
        <strong>{MAX_PLAYERS}</strong>
      </div>
      <div className="settings-row">
        <span>{labels.questionTopic}</span>
        <strong>{labels.supportedTopics}</strong>
      </div>
      <div className="settings-row settings-row-stack">
        <span>{labels.difficulty}</span>
        <div className="difficulty-control" dir="ltr">
          {DIFFICULTIES.map((difficulty) => {
            const isSelected = selectedDifficulty === difficulty.id;
            const label = labels[difficulty.id.toLowerCase()];

            return (
              <button
                aria-pressed={isSelected}
                className={`difficulty-button ${isSelected ? "is-selected" : ""}`}
                disabled={!difficulty.isSupported}
                key={difficulty.id}
                onClick={() => setSelectedDifficulty(difficulty.id)}
                title={!difficulty.isSupported ? labels.notSupportedYet : undefined}
                type="button"
              >
                <span dir={t.direction}>{label}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="settings-row">
        <span>{labels.numberType}</span>
        <strong>{labels.wholeNumbers}</strong>
      </div>

      <div className="settings-divider" />

      <div className="hud-panel-heading">
        <span>{t.questionSettings.title}</span>
      </div>
      <div className="settings-pill-list">
        {SUPPORTED_OPERATIONS.map((operation) => {
          const isSelected = selectedOperations.includes(operation.id);

          return (
            <span
              className={`settings-pill ${isSelected ? "is-selected" : "is-unselected"}`}
              key={operation.id}
            >
              {t.questionSettings.operations[operation.id]}
            </span>
          );
        })}
      </div>
      <p className="settings-note">{labels.settingsNote}</p>
    </aside>
  );
}

export default TeacherSettingsPanel;

import { useEffect, useState } from "react";
import ErrorMessage from "../components/ErrorMessage";
import { createRaceRoom, getLobby, startRace, updateQuestionSettings } from "../services/raceRoomApi";
import teacherBackground from "../assets/space-race-lobby-background.png";
import trackPreviewImage from "../assets/images/track-preview-space-race.png";

const MAX_PLAYERS = 8;
const SUPPORTED_OPERATIONS = [
  { id: "ADDITION", symbol: "+" },
  { id: "SUBTRACTION", symbol: "-" },
  { id: "MULTIPLICATION", symbol: "x" },
  { id: "DIVISION", symbol: "/" },
];

const DIFFICULTIES = [
  { id: "EASY", isSupported: true },
  { id: "MEDIUM", isSupported: false },
  { id: "HARD", isSupported: false },
];

const DASHBOARD_LABELS = {
  he: {
    title: "חדר מורה",
    subtitle: "חדר בקרה למורה",
    playersPanelTitle: "פאנל תלמידים",
    roomCode: "קוד חדר",
    pendingRoomCode: "מוכן",
    roomStatus: "סטטוס חדר",
    standbyStatus: "בהמתנה",
    studentsJoined: "תלמידים שהצטרפו",
    students: "תלמידים",
    emptySlot: "מקום פנוי",
    waitingForPlayer: "ממתין לתלמיד...",
    trackPreview: "תצוגת מסלול",
    trackName: "כביש קוונטי",
    trackDescription: "2 נתיבים · נקודות בוסט מתמטיות",
    mathTopics: "נושאי מתמטיקה",
    wholeNumbers: "מספרים שלמים",
    actions: "פעולות מורה",
    createRoomHint: "יצירת קוד חדר לתלמידים",
    startRaceHint: "זמין אחרי יצירת החדר",
    raceSettings: "הגדרות מרוץ",
    maxPlayers: "מספר משתתפים",
    questionTopic: "נושא שאלות",
    supportedTopics: "מתמטיקה בסיסית",
    difficulty: "רמה",
    easy: "קל",
    medium: "בינוני",
    hard: "קשה",
    numberType: "סוג מספרים",
    fractions: "שברים",
    comingSoon: "לא פעיל כרגע",
    notSupportedYet: "עדיין לא נתמך",
    cannotStartWithoutPlayers: "אי אפשר להתחיל מרוץ בלי תלמידים",
    settingsNote: "ההגדרות משתמשות במנוע השאלות הנתמך כרגע.",
  },
  en: {},
};

function TeacherCreateRacePage({ t, onRaceStarted }) {
  const [room, setRoom] = useState(null);
  const [lobby, setLobby] = useState(null);
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [isStartingRace, setIsStartingRace] = useState(false);
  const [error, setError] = useState("");
  const [selectedOperations, setSelectedOperations] = useState([
    "ADDITION",
    "SUBTRACTION",
  ]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("EASY");
  const labels = {
    ...DASHBOARD_LABELS.he,
    ...DASHBOARD_LABELS[t.direction === "rtl" ? "he" : "en"],
    ...(t.teacherCreate.dashboard || {}),
  };
  labels.noStudentsJoined =
    labels.noStudentsJoined ||
    (t.direction === "rtl"
      ? "\u05e2\u05d3\u05d9\u05d9\u05df \u05d0\u05d9\u05df \u05ea\u05dc\u05de\u05d9\u05d3\u05d9\u05dd \u05d1\u05d7\u05d3\u05e8"
      : "No students have joined yet");
  labels.loadingRoomCode =
    labels.loadingRoomCode ||
    (t.direction === "rtl" ? "\u05d9\u05d5\u05e6\u05e8..." : "Creating...");
  labels.roomNotCreated =
    labels.roomNotCreated ||
    (t.direction === "rtl"
      ? "\u05e2\u05d3\u05d9\u05d9\u05df \u05dc\u05d0 \u05e0\u05d5\u05e6\u05e8 \u05d7\u05d3\u05e8"
      : "Room not created yet");
  labels.startRaceActionHint =
    labels.startRaceActionHint ||
    (t.direction === "rtl"
      ? "\u05e9\u05de\u05d9\u05e8\u05ea \u05d4\u05d2\u05d3\u05e8\u05d5\u05ea \u05d5\u05d4\u05ea\u05d7\u05dc\u05ea \u05d4\u05de\u05e8\u05d5\u05e5"
      : "Save settings and start the race");
  labels.cannotStartWithoutPlayers =
    labels.cannotStartWithoutPlayers ||
    (t.direction === "rtl"
      ? "\u05d0\u05d9 \u05d0\u05e4\u05e9\u05e8 \u05dc\u05d4\u05ea\u05d7\u05d9\u05dc \u05de\u05e8\u05d5\u05e5 \u05d1\u05dc\u05d9 \u05ea\u05dc\u05de\u05d9\u05d3\u05d9\u05dd"
      : "Cannot start race without students");
  const visibleRoomCode =
    room?.roomCode || (isCreatingRoom ? labels.loadingRoomCode : labels.roomNotCreated);
  const students = lobby?.players || [];
  const currentPlayers = lobby?.currentPlayers ?? students.length;
  const maxPlayers = lobby?.maxPlayers ?? room?.maxPlayers ?? MAX_PLAYERS;
  const roomStatus = lobby?.status || room?.status;
  const canStartRace = Boolean(room?.roomCode) && currentPlayers > 0;

  function toggleOperation(operation) {
    setSelectedOperations((currentOperations) => {
      if (currentOperations.includes(operation)) {
        return currentOperations.filter((currentOperation) => currentOperation !== operation);
      }

      return [...currentOperations, operation];
    });
  }

  async function handleCreateRoom() {
    setIsCreatingRoom(true);
    setError("");

    try {
      const createdRoom = await createRaceRoom();
      setRoom(createdRoom);

      await updateQuestionSettings(createdRoom.roomCode, {
        operations: selectedOperations,
        numberTypes: ["WHOLE_NUMBERS"],
        difficulty: selectedDifficulty,
      });
    } catch (currentError) {
      setError(currentError.message);
    } finally {
      setIsCreatingRoom(false);
    }
  }

  useEffect(() => {
    if (!room?.roomCode || isStartingRace) {
      return undefined;
    }

    let isActive = true;

    async function loadLobby() {
      try {
        const nextLobby = await getLobby(room.roomCode);

        if (isActive) {
          setLobby(nextLobby);
        }
      } catch (currentError) {
        if (isActive) {
          setError(currentError.message);
        }
      }
    }

    loadLobby();
    const intervalId = window.setInterval(loadLobby, 2500);

    return () => {
      isActive = false;
      window.clearInterval(intervalId);
    };
  }, [isStartingRace, room?.roomCode]);

  async function handleStartRace() {
    console.log("[TeacherCreateRacePage] Start Race clicked", {
      roomCode: room?.roomCode,
      currentPlayers,
    });

    if (!room) {
      console.error("[TeacherCreateRacePage] Start Race blocked: room does not exist yet");
      setError(labels.roomNotCreated);
      return;
    }

    if (currentPlayers < 1) {
      const noPlayersMessage = labels.cannotStartWithoutPlayers;
      console.error("[TeacherCreateRacePage] Start Race blocked:", noPlayersMessage);
      setError(noPlayersMessage);
      return;
    }

    setIsStartingRace(true);
    setError("");

    try {
      console.log("[TeacherCreateRacePage] Saving question settings before start", {
        roomCode: room.roomCode,
        selectedOperations,
        selectedDifficulty,
      });
      await updateQuestionSettings(room.roomCode, {
        operations: selectedOperations,
        numberTypes: ["WHOLE_NUMBERS"],
        difficulty: selectedDifficulty,
      });

      console.log("[TeacherCreateRacePage] Calling startRace()", room.roomCode);
      const startedRoom = await startRace(room.roomCode);
      console.log("[TeacherCreateRacePage] startRace() returned", startedRoom);
      if (startedRoom.status !== "IN_PROGRESS") {
        throw new Error("Race did not start. Please try again.");
      }
      setRoom(startedRoom);
      onRaceStarted(startedRoom, lobby);
    } catch (currentError) {
      console.error("[TeacherCreateRacePage] Start Race failed", currentError);
      setError(currentError.message);
    } finally {
      setIsStartingRace(false);
    }
  }

  return (
    <section
      className="page teacher-create-page"
      style={{ "--teacher-bg-image": `url(${teacherBackground})` }}
    >
      <div className="teacher-command-deck" dir="ltr">
        <header className="teacher-command-header" dir="ltr">
          <div className="teacher-emblem" aria-hidden="true">
            <span>▣</span>
          </div>
          <div className="teacher-command-title" dir={t.direction}>
            <p>{labels.subtitle}</p>
            <h1>{labels.title}</h1>
          </div>
        </header>

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
              <strong>{currentPlayers} / {maxPlayers}</strong>
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

        <main className="teacher-main-dashboard" dir={t.direction}>
          <section className="teacher-track-preview teacher-hud-panel">
            <div className="hud-panel-heading">
              <span>{labels.trackPreview}</span>
            </div>
            <div className="track-viewport" aria-hidden="true">
              <img
                className="track-preview-image"
                src={trackPreviewImage}
                alt=""
              />
            </div>
            <div className="track-meta">
              <strong>{labels.trackName}</strong>
              <span>{labels.trackDescription}</span>
            </div>
          </section>

          <section className="teacher-topics-panel teacher-hud-panel">
            <div className="hud-panel-heading topics-heading">
              <span>{labels.mathTopics}</span>
              <small>{t.questionSettings.description}</small>
            </div>

            <div className="topic-card-grid">
              {SUPPORTED_OPERATIONS.map((operation) => {
                const isSelected = selectedOperations.includes(operation.id);

                return (
                  <button
                    aria-pressed={isSelected}
                    className={`topic-card ${isSelected ? "is-selected" : "is-unselected"}`}
                    key={operation.id}
                    onClick={() => toggleOperation(operation.id)}
                    type="button"
                  >
                    <span className="topic-content" dir={t.direction}>
                      <span className="topic-symbol">{operation.symbol}</span>
                      <strong>
                        {t.questionSettings.operations[operation.id]}
                      </strong>
                    </span>
                    {isSelected && (
                      <span className="topic-check" aria-hidden="true">✓</span>
                    )}
                  </button>
                );
              })}
              <div className="topic-card is-disabled">
                <span className="topic-content" dir={t.direction}>
                  <span className="topic-symbol">123</span>
                  <strong>{labels.wholeNumbers}</strong>
                </span>
                <span className="topic-check" aria-hidden="true">✓</span>
              </div>
              <div className="topic-card is-disabled topic-card-disabled-feature">
                <span className="topic-content" dir={t.direction}>
                  <span className="topic-symbol">1/2</span>
                  <span className="topic-label-stack">
                    <strong>{labels.fractions}</strong>
                    <small>{labels.comingSoon}</small>
                  </span>
                </span>
              </div>
            </div>
          </section>

          <section className="teacher-action-strip" aria-label={labels.actions}>
            <button
              className="teacher-primary-action"
              type="button"
              onClick={handleCreateRoom}
              disabled={isCreatingRoom || isStartingRace || Boolean(room)}
            >
              <span className="action-icon" aria-hidden="true">▱</span>
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
              <span className="action-icon" aria-hidden="true">»</span>
              <span>
                <strong>
                  {isStartingRace ? t.teacherLobby.startingRaceButton : t.teacherLobby.startRaceButton}
                </strong>
                <small>{labels.startRaceActionHint}</small>
              </span>
            </button>
          </section>

          <ErrorMessage message={error} t={t} />
        </main>

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
      </div>
    </section>
  );
}

export default TeacherCreateRacePage;

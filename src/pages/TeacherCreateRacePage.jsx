import { useEffect, useState } from "react";
import ErrorMessage from "../components/ErrorMessage";
import MathTopicsPanel from "../components/teacher/MathTopicsPanel";
import TeacherActionStrip from "../components/teacher/TeacherActionStrip";
import TeacherPlayersPanel from "../components/teacher/TeacherPlayersPanel";
import TeacherSettingsPanel from "../components/teacher/TeacherSettingsPanel";
import TrackPreviewPanel from "../components/teacher/TrackPreviewPanel";
import { MAX_PLAYERS } from "../constants/raceSettings";
import { createRaceRoom, getLobby, startRace, updateQuestionSettings } from "../services/raceRoomApi";
import teacherBackground from "../assets/space-race-lobby-background.png";
import trackPreviewImage from "../assets/images/track-preview-space-race.png";

const DASHBOARD_LABEL_FALLBACKS = {
  he: {
    title: "חדר מורה",
    subtitle: "חדר בקרה למורה",
    playersPanelTitle: "פאנל תלמידים",
    roomCode: "קוד חדר",
    roomStatus: "סטטוס חדר",
    standbyStatus: "בהמתנה",
    studentsJoined: "תלמידים שהצטרפו",
    students: "תלמידים",
    trackPreview: "תצוגת מסלול",
    trackName: "כביש קוונטי",
    trackDescription: "2 נתיבים · נקודות בוסט מתמטיות",
    mathTopics: "נושאי מתמטיקה",
    wholeNumbers: "מספרים שלמים",
    actions: "פעולות מורה",
    createRoomHint: "יצירת קוד חדר לתלמידים",
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
    settingsNote: "ההגדרות משתמשות במנוע השאלות הנתמך כרגע.",
  },
  en: {
    title: "Teacher Lobby",
    subtitle: "Teacher Control Room",
    playersPanelTitle: "Students panel",
    roomCode: "Room code",
    roomStatus: "Room status",
    standbyStatus: "Waiting",
    studentsJoined: "Students joined",
    students: "Students",
    trackPreview: "Track preview",
    trackName: "Quantum Highway",
    trackDescription: "2 paths - math boost checkpoints",
    mathTopics: "Math topics",
    wholeNumbers: "Whole numbers",
    actions: "Teacher actions",
    createRoomHint: "Generate a room code for students",
    raceSettings: "Race settings",
    maxPlayers: "Max players",
    questionTopic: "Question topic",
    supportedTopics: "Basic math",
    difficulty: "Difficulty",
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
    numberType: "Number type",
    fractions: "Fractions",
    comingSoon: "Not active yet",
    notSupportedYet: "Not supported yet",
    settingsNote: "Settings use the question engine currently supported.",
  },
};

function getTeacherDashboardLabels(t) {
  const labels = {
    ...DASHBOARD_LABEL_FALLBACKS[t.direction === "rtl" ? "he" : "en"],
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

  return labels;
}

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
  const labels = getTeacherDashboardLabels(t);
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
            <span>{"\u05d2\u2013\u00a3"}</span>
          </div>
          <div className="teacher-command-title" dir={t.direction}>
            <p>{labels.subtitle}</p>
            <h1>{labels.title}</h1>
          </div>
        </header>

        <TeacherPlayersPanel
          currentPlayers={currentPlayers}
          labels={labels}
          lobby={lobby}
          maxPlayers={maxPlayers}
          roomStatus={roomStatus}
          students={students}
          t={t}
          visibleRoomCode={visibleRoomCode}
        />

        <main className="teacher-main-dashboard" dir={t.direction}>
          <TrackPreviewPanel
            labels={labels}
            t={t}
            trackPreviewImage={trackPreviewImage}
          />

          <MathTopicsPanel
            labels={labels}
            selectedOperations={selectedOperations}
            t={t}
            toggleOperation={toggleOperation}
          />

          <TeacherActionStrip
            canStartRace={canStartRace}
            handleCreateRoom={handleCreateRoom}
            handleStartRace={handleStartRace}
            isCreatingRoom={isCreatingRoom}
            isStartingRace={isStartingRace}
            labels={labels}
            room={room}
            t={t}
          />

          <ErrorMessage message={error} t={t} />
        </main>

        <TeacherSettingsPanel
          labels={labels}
          selectedDifficulty={selectedDifficulty}
          selectedOperations={selectedOperations}
          setSelectedDifficulty={setSelectedDifficulty}
          t={t}
        />
      </div>
    </section>
  );
}

export default TeacherCreateRacePage;

import { useEffect } from "react";
import { VIEWS } from "../constants/views";
import useAppFlow from "../hooks/useAppFlow";
import LanguageToggle from "./LanguageToggle";
import HomePage from "../pages/HomePage";
import TeacherCreateRacePage from "../pages/TeacherCreateRacePage";
import TeacherLobbyPage from "../pages/TeacherLobbyPage";
import RaceGamePage from "../pages/RaceGamePage";
import StudentJoinPage from "../pages/StudentJoinPage";
import StudentLobbyPage from "../pages/StudentLobbyPage";

function AppRouter() {
  const {
    language,
    t,
    view,
    teacherRoomCode,
    teacherRace,
    studentSession,
    goHome,
    goToTeacherCreate,
    goToStudentJoin,
    handleTeacherRaceStarted,
    handleStudentJoined,
    toggleLanguage,
  } = useAppFlow();

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = t.direction;
  }, [language, t.direction]);

  return (
    <main className="app-shell" dir={t.direction}>
      <LanguageToggle label={t.toggleLabel} onToggle={toggleLanguage} />

      {view !== VIEWS.HOME && (
        <button
          aria-label={t.backHome}
          className="link-button"
          title={t.backHome}
          type="button"
          onClick={goHome}
        >
          <span className="link-button-label">{t.backHome}</span>
        </button>
      )}

      {view === VIEWS.HOME && (
        <HomePage
          t={t}
          onTeacherStart={goToTeacherCreate}
          onStudentStart={goToStudentJoin}
        />
      )}

      {view === VIEWS.TEACHER_CREATE && (
        <TeacherCreateRacePage
          t={t}
          onRaceStarted={handleTeacherRaceStarted}
        />
      )}

      {view === VIEWS.TEACHER_LOBBY && (
        <TeacherLobbyPage t={t} roomCode={teacherRoomCode} />
      )}

      {view === VIEWS.RACE_GAME && teacherRace && (
        <RaceGamePage
          lobby={teacherRace.lobby}
          room={teacherRace.room}
          t={t}
        />
      )}

      {view === VIEWS.STUDENT_JOIN && (
        <StudentJoinPage t={t} onJoined={handleStudentJoined} />
      )}

      {view === VIEWS.STUDENT_LOBBY && studentSession && (
        <StudentLobbyPage
          t={t}
          roomCode={studentSession.roomCode}
          player={studentSession.player}
        />
      )}
    </main>
  );
}

export default AppRouter;

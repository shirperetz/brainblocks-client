import { useEffect } from "react";
import { VIEWS } from "../constants/views";
import useAppFlow from "../hooks/useAppFlow";
import LanguageToggle from "./LanguageToggle";
import HomePage from "../pages/HomePage";
import TeacherCreateRacePage from "../pages/TeacherCreateRacePage";
import TeacherLobbyPage from "../pages/TeacherLobbyPage";
import StudentJoinPage from "../pages/StudentJoinPage";
import StudentLobbyPage from "../pages/StudentLobbyPage";

function AppRouter() {
  const {
    language,
    t,
    view,
    teacherRoomCode,
    studentSession,
    goHome,
    goToTeacherCreate,
    goToStudentJoin,
    handleTeacherRoomCreated,
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
        <button className="link-button" type="button" onClick={goHome}>
          {t.backHome}
        </button>
      )}

      {view === VIEWS.HOME && (
        <HomePage
          language={language}
          t={t}
          onTeacherStart={goToTeacherCreate}
          onStudentStart={goToStudentJoin}
        />
      )}

      {view === VIEWS.TEACHER_CREATE && (
        <TeacherCreateRacePage t={t} onRoomCreated={handleTeacherRoomCreated} />
      )}

      {view === VIEWS.TEACHER_LOBBY && (
        <TeacherLobbyPage t={t} roomCode={teacherRoomCode} />
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

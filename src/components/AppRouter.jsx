import { VIEWS } from "../constants/views";
import useAppFlow from "../hooks/useAppFlow";
import HomePage from "../pages/HomePage";
import TeacherCreateRacePage from "../pages/TeacherCreateRacePage";
import TeacherLobbyPage from "../pages/TeacherLobbyPage";
import StudentJoinPage from "../pages/StudentJoinPage";
import StudentLobbyPage from "../pages/StudentLobbyPage";

function AppRouter() {
  const {
    view,
    teacherRoomCode,
    studentSession,
    goHome,
    goToTeacherCreate,
    goToStudentJoin,
    handleTeacherRoomCreated,
    handleStudentJoined,
  } = useAppFlow();

  return (
    <main className="app-shell">
      {view !== VIEWS.HOME && (
        <button className="link-button" type="button" onClick={goHome}>
          Back home
        </button>
      )}

      {view === VIEWS.HOME && (
        <HomePage
          onTeacherStart={goToTeacherCreate}
          onStudentStart={goToStudentJoin}
        />
      )}

      {view === VIEWS.TEACHER_CREATE && (
        <TeacherCreateRacePage onRoomCreated={handleTeacherRoomCreated} />
      )}

      {view === VIEWS.TEACHER_LOBBY && (
        <TeacherLobbyPage roomCode={teacherRoomCode} />
      )}

      {view === VIEWS.STUDENT_JOIN && (
        <StudentJoinPage onJoined={handleStudentJoined} />
      )}

      {view === VIEWS.STUDENT_LOBBY && studentSession && (
        <StudentLobbyPage
          roomCode={studentSession.roomCode}
          player={studentSession.player}
        />
      )}
    </main>
  );
}

export default AppRouter;

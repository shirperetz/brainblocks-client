import { useState } from "react";
import { VIEWS } from "../constants/views";
import { LANGUAGES, translations } from "../i18n/translations";

function useAppFlow() {
  const [language, setLanguage] = useState(LANGUAGES.HEBREW);
  const [view, setView] = useState(VIEWS.HOME);
  const [teacherRoomCode, setTeacherRoomCode] = useState("");
  const [studentSession, setStudentSession] = useState(null);

  function goHome() {
    setView(VIEWS.HOME);
    setTeacherRoomCode("");
    setStudentSession(null);
  }

  function goToTeacherCreate() {
    setView(VIEWS.TEACHER_CREATE);
  }

  function goToStudentJoin() {
    setView(VIEWS.STUDENT_JOIN);
  }

  function handleTeacherRoomCreated(room) {
    setTeacherRoomCode(room.roomCode);
    setView(VIEWS.TEACHER_LOBBY);
  }

  function handleStudentJoined(roomCode, player) {
    setStudentSession({
      roomCode,
      player,
    });
    setView(VIEWS.STUDENT_LOBBY);
  }

  function toggleLanguage() {
    setLanguage((currentLanguage) =>
      currentLanguage === LANGUAGES.HEBREW ? LANGUAGES.ENGLISH : LANGUAGES.HEBREW,
    );
  }

  return {
    language,
    t: translations[language],
    view,
    teacherRoomCode,
    studentSession,
    goHome,
    goToTeacherCreate,
    goToStudentJoin,
    handleTeacherRoomCreated,
    handleStudentJoined,
    toggleLanguage,
  };
}

export default useAppFlow;

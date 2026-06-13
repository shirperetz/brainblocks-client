import { useState } from "react";
import { VIEWS } from "../constants/views";
import { LANGUAGES, translations } from "../i18n/translations";

function useAppFlow() {
  const [language, setLanguage] = useState(LANGUAGES.HEBREW);
  const [view, setView] = useState(VIEWS.HOME);
  const [teacherRoomCode, setTeacherRoomCode] = useState("");
  const [teacherRace, setTeacherRace] = useState(null);
  const [studentSession, setStudentSession] = useState(null);
  const [studentRace, setStudentRace] = useState(null);

  function goHome() {
    setView(VIEWS.HOME);
    setTeacherRoomCode("");
    setTeacherRace(null);
    setStudentSession(null);
    setStudentRace(null);
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

  function handleTeacherRaceStarted(room, lobby) {
    setTeacherRoomCode(room.roomCode);
    setTeacherRace({
      room,
      lobby,
    });
    setView(VIEWS.RACE_GAME);
  }

  function handleStudentJoined(roomCode, player) {
    setStudentSession({
      roomCode,
      player,
    });
    setView(VIEWS.STUDENT_LOBBY);
  }

  function handleStudentRaceStarted(roomCode, lobby, player) {
    setStudentRace({
      roomCode,
      lobby,
      player,
    });
    setView(VIEWS.STUDENT_RACE);
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
    teacherRace,
    studentSession,
    studentRace,
    goHome,
    goToTeacherCreate,
    goToStudentJoin,
    handleTeacherRoomCreated,
    handleTeacherRaceStarted,
    handleStudentJoined,
    handleStudentRaceStarted,
    toggleLanguage,
  };
}

export default useAppFlow;

import { useState } from "react";
import { VIEWS } from "../constants/views";

function useAppFlow() {
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

  return {
    view,
    teacherRoomCode,
    studentSession,
    goHome,
    goToTeacherCreate,
    goToStudentJoin,
    handleTeacherRoomCreated,
    handleStudentJoined,
  };
}

export default useAppFlow;

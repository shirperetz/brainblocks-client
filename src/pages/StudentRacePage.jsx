import { useEffect, useState } from "react";
import RacePlayerBoard from "../components/race/RacePlayerBoard";
import RaceStatusGrid from "../components/race/RaceStatusGrid";
import RaceTrackPanel from "../components/race/RaceTrackPanel";
import StudentQuestionPanel from "../components/race/StudentQuestionPanel";
import StudentPlayerCard from "../components/race/StudentPlayerCard";
import { generateQuestion, submitQuestionAnswer } from "../services/raceRoomApi";
import raceBackground from "../assets/space-race-lobby-background.png";
import trackPreviewImage from "../assets/images/track-preview-space-race.png";

const STUDENT_RACE_LABELS = {
  he: {
    title: "\u05d4\u05de\u05e8\u05d5\u05e5 \u05d4\u05ea\u05d7\u05d9\u05dc",
    subtitle: "\u05de\u05e1\u05da \u05de\u05e8\u05d5\u05e5",
    message: "\u05d4\u05de\u05e8\u05d5\u05e5 \u05d4\u05ea\u05d7\u05d9\u05dc!",
    roomCode: "\u05e7\u05d5\u05d3 \u05d7\u05d3\u05e8",
    status: "\u05e1\u05d8\u05d8\u05d5\u05e1",
    players: "\u05e9\u05d7\u05e7\u05e0\u05d9\u05dd",
    yourPosition: "\u05de\u05d9\u05e7\u05d5\u05de\u05da",
    track: "\u05de\u05e1\u05dc\u05d5\u05dc \u05de\u05e8\u05d5\u05e5",
    livePanel: "\u05dc\u05d5\u05d7 \u05de\u05e8\u05d5\u05e5",
    questionTitle: "\u05e9\u05d0\u05dc\u05d4",
    loadingQuestion: "\u05d8\u05d5\u05e2\u05df \u05e9\u05d0\u05dc\u05d4...",
    noQuestion: "\u05d0\u05d9\u05df \u05e9\u05d0\u05dc\u05d4 \u05d6\u05de\u05d9\u05e0\u05d4 \u05e2\u05d3\u05d9\u05d9\u05df",
    answerLabel: "\u05ea\u05e9\u05d5\u05d1\u05d4",
    answerPlaceholder: "\u05d4\u05e7\u05dc\u05d3\u05ea \u05ea\u05e9\u05d5\u05d1\u05d4",
    submitAnswer: "\u05e9\u05dc\u05d9\u05d7\u05ea \u05ea\u05e9\u05d5\u05d1\u05d4",
    submittingAnswer: "\u05e9\u05d5\u05dc\u05d7...",
    correct: "\u05e0\u05db\u05d5\u05df",
    incorrect: "\u05dc\u05d0 \u05e0\u05db\u05d5\u05df",
  },
  en: {
    title: "Race Started",
    subtitle: "Race Screen",
    message: "Race started!",
    roomCode: "Room Code",
    status: "Status",
    players: "Players",
    yourPosition: "Your Position",
    track: "Race Track",
    livePanel: "Race Board",
    questionTitle: "Question",
    loadingQuestion: "Loading question...",
    noQuestion: "No question available yet",
    answerLabel: "Answer",
    answerPlaceholder: "Enter answer",
    submitAnswer: "Submit answer",
    submittingAnswer: "Submitting...",
    correct: "Correct",
    incorrect: "Incorrect",
  },
};

function StudentRacePage({ t, roomCode, lobby, player }) {
  const labels = STUDENT_RACE_LABELS[t.direction === "rtl" ? "he" : "en"];
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [answerResult, setAnswerResult] = useState(null);
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(false);
  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false);
  const [questionError, setQuestionError] = useState("");
  const players = lobby?.players || [];
  const roomStatus = lobby?.status || "IN_PROGRESS";
  const playerPosition = players.findIndex((p) => p.id === player.id) + 1 || "-";
  const statusItems = [
    {
      label: labels.roomCode,
      value: roomCode,
    },
    {
      label: labels.status,
      value: t.statuses?.[roomStatus] || roomStatus,
    },
    {
      label: labels.players,
      value: players.length,
    },
    {
      label: labels.yourPosition,
      value: playerPosition,
    },
  ];

  useEffect(() => {
    if (!roomCode) {
      return undefined;
    }

    let isActive = true;

    async function loadQuestion() {
      setIsLoadingQuestion(true);
      setQuestionError("");

      try {
        const nextQuestion = await generateQuestion(roomCode);

        if (isActive) {
          setQuestion(nextQuestion);
          setAnswer("");
          setAnswerResult(null);
        }
      } catch (currentError) {
        if (isActive) {
          setQuestionError(currentError.message);
        }
      } finally {
        if (isActive) {
          setIsLoadingQuestion(false);
        }
      }
    }

    loadQuestion();

    return () => {
      isActive = false;
    };
  }, [roomCode]);

  async function handleSubmitAnswer(event) {
    event.preventDefault();

    if (!question || answer.trim() === "") {
      return;
    }

    setIsSubmittingAnswer(true);
    setQuestionError("");
    setAnswerResult(null);

    try {
      const result = await submitQuestionAnswer(
        roomCode,
        question.id,
        player.id,
        Number(answer),
      );
      setAnswerResult(result);
    } catch (currentError) {
      setQuestionError(currentError.message);
    } finally {
      setIsSubmittingAnswer(false);
    }
  }

  return (
    <section
      className="page student-race-page"
      style={{ "--race-bg-image": `url(${raceBackground})` }}
    >
      <div className="student-race-shell" dir="ltr">
        <header className="student-race-header" dir={t.direction}>
          <p>{labels.subtitle}</p>
          <h1>{labels.title}</h1>
          <p className="student-race-message">{labels.message}</p>
        </header>

        <div className="student-race-content">
          <RaceStatusGrid
            className="student-race-status"
            items={statusItems}
            t={t}
          />

          <RaceTrackPanel
            className="student-race-track"
            heading={labels.track}
            imageSrc={trackPreviewImage}
            t={t}
          >
            <StudentQuestionPanel
              answer={answer}
              error={questionError}
              isLoadingQuestion={isLoadingQuestion}
              isSubmittingAnswer={isSubmittingAnswer}
              labels={labels}
              onAnswerChange={setAnswer}
              onSubmitAnswer={handleSubmitAnswer}
              question={question}
              result={answerResult}
              t={t}
            />
          </RaceTrackPanel>

          <RacePlayerBoard
            className="student-race-players"
            currentPlayerId={player.id}
            emptyMessage={t.lobby.noStudents}
            heading={labels.livePanel}
            players={players}
            t={t}
            youLabel={t.studentRace?.you || "(You)"}
          >
            <StudentPlayerCard
              labels={labels}
              player={player}
              roomStatus={roomStatus}
              t={t}
            />
          </RacePlayerBoard>
        </div>
      </div>
    </section>
  );
}

export default StudentRacePage;

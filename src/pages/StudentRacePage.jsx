import RacePlayerBoard from "../components/race/RacePlayerBoard";
import RaceStatusGrid from "../components/race/RaceStatusGrid";
import RaceTrackPanel from "../components/race/RaceTrackPanel";
import StudentPlayerCard from "../components/race/StudentPlayerCard";
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
  },
};

function StudentRacePage({ t, roomCode, lobby, player }) {
  const labels = STUDENT_RACE_LABELS[t.direction === "rtl" ? "he" : "en"];
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
          />

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

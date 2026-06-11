import frontBackground from "../assets/Front.png";

function TeacherIcon() {
  return (
    <svg className="role-card__svg" viewBox="0 0 48 48" aria-hidden="true">
      <path d="M8 18L24 10L40 18L24 26L8 18Z" />
      <path d="M15 23V31C15 34 19 37 24 37C29 37 33 34 33 31V23" />
      <path d="M40 18V29" />
      <path d="M37 32H43" />
    </svg>
  );
}

function StudentIcon() {
  return (
    <svg className="role-card__svg" viewBox="0 0 48 48" aria-hidden="true">
      <path d="M13 29C13 20 18 14 24 14C30 14 35 20 35 29" />
      <path d="M13 29H35L32 37H16L13 29Z" />
      <path d="M18 25H30" />
      <path d="M17 33H31" />
      <path d="M11 29H7" />
      <path d="M41 29H37" />
    </svg>
  );
}

function HomePage({ t, onTeacherStart, onStudentStart }) {
  return (
    <section
      className="home-page"
      style={{ "--home-bg-image": `url(${frontBackground})` }}
    >
      <div className="home-orbit home-orbit--cyan" />
      <div className="home-orbit home-orbit--purple" />
      <div className="home-station-frame" aria-hidden="true" />
      <div className="home-light-trail home-light-trail--cyan" aria-hidden="true" />
      <div className="home-light-trail home-light-trail--purple" aria-hidden="true" />

      <div className="home-hero-shell">
        <header className="home-hero-top">
          <h1>{t.home.title}</h1>
          <p className="home-hero-subtitle">{t.home.subtitle}</p>
        </header>

        <div className="home-dashboard-panel">
          <div className="home-dashboard-ridge" aria-hidden="true" />

          <div className="home-panel-title">
            <span>{t.home.panelTitle}</span>
          </div>

          <div className="home-role-cards">
            <button
              className="role-card role-card--teacher"
              type="button"
              onClick={onTeacherStart}
            >
              <div className="role-card__scene" aria-hidden="true">
                <span className="role-card__grid" />
                <span className="role-card__vehicle role-card__vehicle--teacher" />
                <span className="role-card__hud role-card__hud--wide" />
                <span className="role-card__hud role-card__hud--small" />
              </div>

              <div className="role-card__content">
                <div className="role-card__icon" aria-hidden="true">
                  <TeacherIcon />
                </div>
                <div>
                  <h2>{t.home.teacher.title}</h2>
                  <p>{t.home.teacher.description}</p>
                </div>
              </div>
            </button>

            <button
              className="role-card role-card--student"
              type="button"
              onClick={onStudentStart}
            >
              <div className="role-card__scene" aria-hidden="true">
                <span className="role-card__road" />
                <span className="role-card__vehicle role-card__vehicle--student" />
              </div>

              <div className="role-card__content">
                <div className="role-card__icon" aria-hidden="true">
                  <StudentIcon />
                </div>
                <div>
                  <h2>{t.home.student.title}</h2>
                  <p>{t.home.student.description}</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;

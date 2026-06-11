import frontBackground from "../assets/Front.png";

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
                  <span>[][]</span>
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
                <span className="role-card__speed">728</span>
              </div>

              <div className="role-card__content">
                <div className="role-card__icon" aria-hidden="true">
                  <span>//</span>
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

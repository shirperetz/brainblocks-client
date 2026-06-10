function HomePage({ t, onTeacherStart, onStudentStart }) {
  const formulas = ["7x(3^2)+2?", "a^2 + b^2 = c^2", "sqrt(64)", "12 / 3"];
  const features = [
    t.home.features.math,
    t.home.features.multiplayer,
    t.home.features.win,
  ];

  return (
    <section className="home-page">
      <div className="home-orbit home-orbit--cyan" />
      <div className="home-orbit home-orbit--purple" />
      <div className="home-station-frame" aria-hidden="true" />

      <div className="home-hero-shell">
        <header className="home-hero-top">
          <div className="home-formula-cloud" aria-hidden="true">
            {formulas.map((formula) => (
              <span key={formula}>{formula}</span>
            ))}
          </div>

          <p className="home-hero-kicker">{t.home.kicker}</p>
          <h1>{t.home.title}</h1>
          <p className="home-hero-subtitle">{t.home.subtitle}</p>
        </header>

        <div className="home-dashboard-panel">
          <div className="home-panel-title">
            <span>{t.home.panelTitle}</span>
          </div>

          <div className="home-role-cards">
            <article className="role-card role-card--teacher">
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
            </article>

            <article className="role-card role-card--student">
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
            </article>
          </div>

          <div className="home-form-grid">
            <label className="glass-input">
              <span>{t.home.playerNameLabel}</span>
              <input autoComplete="name" placeholder={t.home.playerNamePlaceholder} />
            </label>

            <label className="glass-input">
              <span>{t.home.roomCodeLabel}</span>
              <input autoComplete="off" placeholder={t.home.roomCodePlaceholder} />
            </label>
          </div>

          <div className="home-actions">
            <button
              className="neon-button neon-button--teacher"
              type="button"
              onClick={onTeacherStart}
            >
              <span aria-hidden="true">++</span>
              {t.home.teacherButton}
            </button>
            <button
              className="neon-button neon-button--student"
              type="button"
              onClick={onStudentStart}
            >
              <span aria-hidden="true">&gt;&gt;</span>
              {t.home.studentButton}
            </button>
          </div>
        </div>

        <div className="home-feature-strip">
          {features.map((feature) => (
            <article className="feature-badge" key={feature.title}>
              <span aria-hidden="true">{feature.icon}</span>
              <div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomePage;

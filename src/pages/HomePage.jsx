function HomePage({ t, onTeacherStart, onStudentStart }) {
  const formulas = ["7x(3²)+2?", "a² + b² = c²", "√64", "12 ÷ 3"];
  const features = [
    t.home.features.math,
    t.home.features.multiplayer,
    t.home.features.win,
  ];

  return (
    <section className="home-page">
      <div className="home-orbit home-orbit-one" />
      <div className="home-orbit home-orbit-two" />

      <div className="hero-shell">
        <header className="hero-top">
          <div className="formula-cloud" aria-hidden="true">
            {formulas.map((formula) => (
              <span key={formula}>{formula}</span>
            ))}
          </div>

          <p className="hero-kicker">{t.home.kicker}</p>
          <h1>{t.home.title}</h1>
          <p className="hero-subtitle">{t.home.subtitle}</p>
        </header>

        <div className="role-panel">
          <div className="panel-title">
            <span>{t.home.panelTitle}</span>
          </div>

          <div className="role-cards">
            <article className="role-card role-card-teacher">
              <div className="role-visual" aria-hidden="true">
                <span>▣</span>
              </div>
              <div>
                <h2>{t.home.teacher.title}</h2>
                <p>{t.home.teacher.description}</p>
              </div>
            </article>

            <article className="role-card role-card-student">
              <div className="role-visual" aria-hidden="true">
                <span>◈</span>
              </div>
              <div>
                <h2>{t.home.student.title}</h2>
                <p>{t.home.student.description}</p>
              </div>
            </article>
          </div>

          <div className="home-form-grid">
            <label className="home-field">
              <span>{t.home.playerNameLabel}</span>
              <input placeholder={t.home.playerNamePlaceholder} />
            </label>

            <label className="home-field">
              <span>{t.home.roomCodeLabel}</span>
              <input placeholder={t.home.roomCodePlaceholder} />
            </label>
          </div>

          <div className="home-actions">
            <button
              className="home-action-button home-action-teacher"
              type="button"
              onClick={onTeacherStart}
            >
              <span aria-hidden="true">⌁</span>
              {t.home.teacherButton}
            </button>
            <button
              className="home-action-button home-action-student"
              type="button"
              onClick={onStudentStart}
            >
              <span aria-hidden="true">»</span>
              {t.home.studentButton}
            </button>
          </div>
        </div>

        <div className="feature-strip">
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

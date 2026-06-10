function HomePage({ t, onTeacherStart, onStudentStart }) {
  return (
    <section className="hero-panel">
      <div>
        <h1>{t.home.title}</h1>
        <p>{t.home.subtitle}</p>
      </div>

      <div className="actions">
        <button className="primary-button" type="button" onClick={onTeacherStart}>
          {t.home.teacherButton}
        </button>
        <button className="secondary-button" type="button" onClick={onStudentStart}>
          {t.home.studentButton}
        </button>
      </div>
    </section>
  );
}

export default HomePage;

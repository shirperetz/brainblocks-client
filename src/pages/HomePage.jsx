function HomePage({ onTeacherStart, onStudentStart }) {
  return (
    <section className="hero-panel">
      <div>
        <h1>BrainBlocks</h1>
        <p>Basic race lobby setup for teachers and students.</p>
      </div>

      <div className="actions">
        <button className="primary-button" type="button" onClick={onTeacherStart}>
          Teacher
        </button>
        <button className="secondary-button" type="button" onClick={onStudentStart}>
          Student
        </button>
      </div>
    </section>
  );
}

export default HomePage;

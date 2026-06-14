import ErrorMessage from "../ErrorMessage";

function StudentQuestionPanel({
  answer,
  error,
  isLoadingQuestion,
  isSubmittingAnswer,
  labels,
  onAnswerChange,
  onSubmitAnswer,
  question,
  result,
  t,
}) {
  const resultLabel = result?.correct ? labels.correct : labels.incorrect;

  return (
    <section className="student-question-panel" dir={t.direction}>
      <div className="student-question-heading">
        <span>{labels.questionTitle}</span>
        {question?.operation && <small>{question.operation}</small>}
      </div>

      {isLoadingQuestion && (
        <p className="student-question-empty">{labels.loadingQuestion}</p>
      )}

      {!isLoadingQuestion && !question && !error && (
        <p className="student-question-empty">{labels.noQuestion}</p>
      )}

      {question && (
        <form className="student-answer-form" onSubmit={onSubmitAnswer}>
          <strong className="student-question-text">{question.questionText}</strong>
          <label className="student-answer-field">
            <span>{labels.answerLabel}</span>
            <input
              inputMode="numeric"
              onChange={(event) => onAnswerChange(event.target.value)}
              placeholder={labels.answerPlaceholder}
              type="number"
              value={answer}
            />
          </label>
          <button
            className="student-answer-button"
            disabled={isSubmittingAnswer || answer.trim() === ""}
            type="submit"
          >
            {isSubmittingAnswer ? labels.submittingAnswer : labels.submitAnswer}
          </button>
        </form>
      )}

      {result && (
        <p className={`student-answer-result ${result.correct ? "is-correct" : "is-incorrect"}`}>
          {resultLabel}
        </p>
      )}

      <ErrorMessage message={error} t={t} />
    </section>
  );
}

export default StudentQuestionPanel;

function MathTopicButton({
  isDisabled = false,
  isSelected = false,
  label,
  labelNote,
  onClick,
  symbol,
  t,
}) {
  const className = [
    "topic-card",
    isSelected ? "is-selected" : "is-unselected",
    isDisabled ? "is-disabled" : "",
    labelNote ? "topic-card-disabled-feature" : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (isDisabled) {
    return (
      <div className={className}>
        <span className="topic-content" dir={t.direction}>
          <span className="topic-symbol">{symbol}</span>
          {labelNote ? (
            <span className="topic-label-stack">
              <strong>{label}</strong>
              <small>{labelNote}</small>
            </span>
          ) : (
            <strong>{label}</strong>
          )}
        </span>
        {isSelected && (
          <span className="topic-check" aria-hidden="true">
            {"\u2713"}
          </span>
        )}
      </div>
    );
  }

  return (
    <button
      aria-pressed={isSelected}
      className={className}
      onClick={onClick}
      type="button"
    >
      <span className="topic-content" dir={t.direction}>
        <span className="topic-symbol">{symbol}</span>
        <strong>{label}</strong>
      </span>
      {isSelected && (
        <span className="topic-check" aria-hidden="true">
          {"\u2713"}
        </span>
      )}
    </button>
  );
}

export default MathTopicButton;

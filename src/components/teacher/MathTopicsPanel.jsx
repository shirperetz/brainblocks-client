import { SUPPORTED_OPERATIONS } from "../../constants/raceSettings";
import MathTopicButton from "./MathTopicButton";

function MathTopicsPanel({ labels, selectedOperations, t, toggleOperation }) {
  return (
    <section className="teacher-topics-panel teacher-hud-panel">
      <div className="hud-panel-heading topics-heading">
        <span>{labels.mathTopics}</span>
        <small>{t.questionSettings.description}</small>
      </div>

      <div className="topic-card-grid">
        {SUPPORTED_OPERATIONS.map((operation) => (
          <MathTopicButton
            isSelected={selectedOperations.includes(operation.id)}
            key={operation.id}
            label={t.questionSettings.operations[operation.id]}
            onClick={() => toggleOperation(operation.id)}
            symbol={operation.symbol}
            t={t}
          />
        ))}
        <MathTopicButton
          isDisabled
          isSelected
          label={labels.wholeNumbers}
          symbol="123"
          t={t}
        />
        <MathTopicButton
          isDisabled
          label={labels.fractions}
          labelNote={labels.comingSoon}
          symbol="1/2"
          t={t}
        />
      </div>
    </section>
  );
}

export default MathTopicsPanel;

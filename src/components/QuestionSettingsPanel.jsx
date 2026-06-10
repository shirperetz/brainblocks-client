import { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import { updateQuestionSettings } from "../services/raceRoomApi";

const OPERATIONS = [
  "ADDITION",
  "SUBTRACTION",
  "MULTIPLICATION",
  "DIVISION",
];

function QuestionSettingsPanel({ t, roomCode }) {
  const [selectedOperations, setSelectedOperations] = useState([
    "ADDITION",
    "SUBTRACTION",
  ]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  function toggleOperation(operation) {
    setSelectedOperations((currentOperations) => {
      if (currentOperations.includes(operation)) {
        return currentOperations.filter((currentOperation) => currentOperation !== operation);
      }

      return [...currentOperations, operation];
    });
    setIsSaved(false);
  }

  async function handleSaveSettings() {
    setIsSaving(true);
    setError("");
    setIsSaved(false);

    try {
      await updateQuestionSettings(roomCode, {
        operations: selectedOperations,
        numberTypes: ["WHOLE_NUMBERS"],
        difficulty: "EASY",
      });
      setIsSaved(true);
    } catch (currentError) {
      setError(currentError.message);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="panel">
      <h2>{t.questionSettings.title}</h2>
      <p>{t.questionSettings.description}</p>

      <div className="checkbox-list">
        {OPERATIONS.map((operation) => (
          <label className="checkbox-row" key={operation}>
            <input
              checked={selectedOperations.includes(operation)}
              onChange={() => toggleOperation(operation)}
              type="checkbox"
            />
            <span>{t.questionSettings.operations[operation]}</span>
          </label>
        ))}
      </div>

      <div className="actions">
        <button
          className="secondary-button"
          disabled={isSaving}
          onClick={handleSaveSettings}
          type="button"
        >
          {isSaving ? t.questionSettings.savingButton : t.questionSettings.saveButton}
        </button>
      </div>

      {isSaved && <p className="success-message">{t.questionSettings.savedMessage}</p>}
      <ErrorMessage message={error} t={t} />
    </section>
  );
}

export default QuestionSettingsPanel;

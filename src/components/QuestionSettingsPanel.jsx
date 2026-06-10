import { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import { updateQuestionSettings } from "../services/raceRoomApi";

const OPERATIONS = [
  { value: "ADDITION", label: "Addition" },
  { value: "SUBTRACTION", label: "Subtraction" },
  { value: "MULTIPLICATION", label: "Multiplication" },
  { value: "DIVISION", label: "Division" },
];

function QuestionSettingsPanel({ roomCode }) {
  const [selectedOperations, setSelectedOperations] = useState([
    "ADDITION",
    "SUBTRACTION",
  ]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function toggleOperation(operation) {
    setSelectedOperations((currentOperations) => {
      if (currentOperations.includes(operation)) {
        return currentOperations.filter((currentOperation) => currentOperation !== operation);
      }

      return [...currentOperations, operation];
    });
    setSuccessMessage("");
  }

  async function handleSaveSettings() {
    setIsSaving(true);
    setError("");
    setSuccessMessage("");

    try {
      await updateQuestionSettings(roomCode, {
        operations: selectedOperations,
        numberTypes: ["WHOLE_NUMBERS"],
        difficulty: "EASY",
      });
      setSuccessMessage("Question settings saved.");
    } catch (currentError) {
      setError(currentError.message);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="panel">
      <h2>Question settings</h2>
      <p>Choose which operations can appear in race questions.</p>

      <div className="checkbox-list">
        {OPERATIONS.map((operation) => (
          <label className="checkbox-row" key={operation.value}>
            <input
              checked={selectedOperations.includes(operation.value)}
              onChange={() => toggleOperation(operation.value)}
              type="checkbox"
            />
            <span>{operation.label}</span>
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
          {isSaving ? "Saving..." : "Save settings"}
        </button>
      </div>

      {successMessage && <p className="success-message">{successMessage}</p>}
      <ErrorMessage message={error} />
    </section>
  );
}

export default QuestionSettingsPanel;

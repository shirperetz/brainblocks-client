function ErrorMessage({ message, t }) {
  if (!message) {
    return null;
  }

  return <div className="error-message">{t?.errors?.[message] || message}</div>;
}

export default ErrorMessage;

function LanguageToggle({ label, onToggle }) {
  return (
    <button className="language-toggle" type="button" onClick={onToggle}>
      {label}
    </button>
  );
}

export default LanguageToggle;

function RaceStatusGrid({ className, items, t }) {
  return (
    <section className={className} dir={t.direction}>
      {items.map((item) => (
        <div key={item.label}>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </div>
      ))}
    </section>
  );
}

export default RaceStatusGrid;

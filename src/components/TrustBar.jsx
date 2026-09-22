export default function TrustBar() {
  const stats = [
    { value: "10 000+", label: "Clients satisfaits" },
    { value: "6 ans", label: "D'expérience" },
    { value: "5", label: "Produits phares" },
    { value: "4.9/5", label: "Note Google" },
  ];

  return (
    <section
      className="py-12 px-6"
      style={{ background: "var(--mei-green)" }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <p
              className="text-3xl md:text-4xl font-bold serif"
              style={{ color: "var(--mei-yellow)" }}
            >
              {s.value}
            </p>
            <p
              className="text-xs uppercase tracking-[0.2em] font-semibold mt-2"
              style={{ color: "rgba(250,246,237,0.7)" }}
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

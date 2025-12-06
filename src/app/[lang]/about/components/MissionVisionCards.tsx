interface MissionVisionCardsProps {
  dict: {
    mission: { title: string; content: string };
    vision: { title: string; content: string };
    values: { title: string; content: string };
  };
}

export default function MissionVisionCards({ dict }: MissionVisionCardsProps) {
  const cards: Array<{ key: keyof MissionVisionCardsProps['dict']; icon: string }> = [
    { key: "mission", icon: "🎯" },
    { key: "vision", icon: "🔭" },
    { key: "values", icon: "💎" }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card) => (
            <div 
              key={card.key}
              className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-5xl mb-6">{card.icon}</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                {dict[card.key].title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {dict[card.key].content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

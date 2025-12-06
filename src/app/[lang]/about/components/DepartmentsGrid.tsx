interface DepartmentsGridProps {
  dict: {
    title: string;
    list: Array<{
      title: string;
      description: string;
    }>;
  };
}

export default function DepartmentsGrid({ dict }: DepartmentsGridProps) {
  const icons = ["🌍", "💼", "🤝", "📱", "📝"];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-black text-slate-800 text-center mb-16">
          {dict.title}
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dict.list.map((dept: any, index: number) => (
            <div 
              key={index}
              className="group bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-5xl mb-6">{icons[index]}</div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                {dept.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {dept.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

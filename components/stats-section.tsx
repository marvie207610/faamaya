export default function StatsSection() {
  const stats = [
    { number: "2.2M", label: "Registered Volunteers" },
    { number: "100+", label: "Research Projects" },
    { number: "200+", label: "Publications" },
    { number: "15+", label: "Years of Citizen Science" },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <div className="text-slate-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

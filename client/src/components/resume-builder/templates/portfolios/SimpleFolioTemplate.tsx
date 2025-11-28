import { ResumeData } from "@/lib/types";

export function SimpleFolioTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="min-h-screen bg-[#fdfbf7] text-[#333] font-sans max-w-3xl mx-auto px-6 py-12 md:py-20">
      <header className="mb-16">
        <h1 className="text-3xl font-bold mb-4">{data.personal.fullName}</h1>
        <p className="text-lg text-gray-600 mb-6 max-w-xl">
          {data.personal.title} based in {data.personal.location}.
        </p>
        <div className="flex gap-4 text-sm underline decoration-gray-300 underline-offset-4">
          <a href={`mailto:${data.personal.email}`} className="hover:decoration-black">Email</a>
          {data.personal.linkedin && <a href={data.personal.linkedin} className="hover:decoration-black">LinkedIn</a>}
          {data.personal.github && <a href={data.personal.github} className="hover:decoration-black">GitHub</a>}
        </div>
      </header>

      <main className="space-y-16">
        {data.personal.summary && (
            <section>
                <h2 className="font-bold text-sm uppercase tracking-wider text-gray-400 mb-4">About</h2>
                <p className="text-gray-800 leading-relaxed text-lg">
                    {data.personal.summary}
                </p>
            </section>
        )}

        {data.projects.length > 0 && (
            <section>
                <h2 className="font-bold text-sm uppercase tracking-wider text-gray-400 mb-6">Projects</h2>
                <div className="space-y-10">
                    {data.projects.map(proj => (
                        <div key={proj.id} className="group">
                            <a href={proj.url || "#"} className="block group-hover:opacity-70 transition-opacity">
                                <h3 className="text-xl font-semibold mb-2">
                                    {proj.name} {proj.url && <span className="text-gray-400 text-sm font-normal">↗</span>}
                                </h3>
                                <p className="text-gray-600 mb-2">{proj.description}</p>
                                {proj.techStack && (
                                    <div className="text-xs text-gray-400 font-mono">
                                        {proj.techStack}
                                    </div>
                                )}
                            </a>
                        </div>
                    ))}
                </div>
            </section>
        )}

        {data.experience.length > 0 && (
            <section>
                <h2 className="font-bold text-sm uppercase tracking-wider text-gray-400 mb-6">Experience</h2>
                <div className="space-y-8">
                    {data.experience.map(exp => (
                        <div key={exp.id}>
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="font-semibold">{exp.company}</h3>
                                <span className="text-sm text-gray-500 tabular-nums">
                                    {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                                </span>
                            </div>
                            <div className="text-sm text-gray-600 mb-2">{exp.position}</div>
                            <p className="text-sm text-gray-500 leading-relaxed max-w-xl">
                                {exp.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        )}
      </main>
      
      <footer className="mt-20 pt-8 border-t border-gray-200 text-sm text-gray-400 flex justify-between">
        <span>{data.personal.fullName}</span>
        <span>Last updated {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}

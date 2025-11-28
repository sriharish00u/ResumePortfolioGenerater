import { ResumeData } from "@/lib/types";

export function DesignerFolioTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center mix-blend-difference z-50 text-white bg-transparent">
        <div className="text-xl font-bold tracking-tighter uppercase">{data.personal.fullName}</div>
        <div className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest">
          <a href="#work" className="hover:line-through decoration-2">Work</a>
          <a href="#about" className="hover:line-through decoration-2">About</a>
          <a href={`mailto:${data.personal.email}`} className="hover:line-through decoration-2">Contact</a>
        </div>
      </nav>

      {/* Hero */}
      <header className="h-screen flex flex-col justify-center px-6 md:px-10 pt-20">
        <h1 className="text-[12vw] leading-[0.8] font-black tracking-tighter mb-8">
          {data.personal.title ? data.personal.title.split(" ").slice(0,2).join(" ") : "VISUAL"}
          <br />
          <span className="text-gray-400">DESIGNER</span>
        </h1>
        <div className="max-w-xl text-lg md:text-xl leading-relaxed font-medium">
          {data.personal.summary}
        </div>
      </header>

      {/* Selected Work */}
      <section id="work" className="px-6 md:px-10 py-20">
        <div className="border-t border-black mb-10 pt-2 flex justify-between items-center">
           <h2 className="text-sm font-bold uppercase tracking-widest">Selected Work</h2>
           <span className="text-sm font-mono">({data.projects.length})</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-20">
          {data.projects.map((proj, i) => (
            <div key={proj.id} className={`group ${i % 2 !== 0 ? 'md:mt-20' : ''}`}>
              <div className="aspect-[4/3] bg-gray-100 mb-6 overflow-hidden relative">
                 {/* Placeholder for project image since we don't have one in schema */}
                 <div className="absolute inset-0 flex items-center justify-center text-9xl font-black text-gray-200 group-hover:scale-105 transition-transform duration-700">
                    {i + 1}
                 </div>
              </div>
              <h3 className="text-2xl font-bold mb-2 group-hover:underline decoration-2 underline-offset-4">
                {proj.name} {proj.url && <span className="text-base font-normal no-underline">↗</span>}
              </h3>
              <p className="text-gray-600 text-sm max-w-md">{proj.description}</p>
              {proj.techStack && <p className="text-xs font-mono mt-3 uppercase text-gray-400">{proj.techStack}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Experience List */}
      <section id="about" className="bg-black text-white px-6 md:px-10 py-20">
         <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center">Experience & Skills</h2>
            
            <div className="space-y-12">
                {data.experience.map(exp => (
                    <div key={exp.id} className="flex flex-col md:flex-row md:items-baseline border-b border-gray-800 pb-8">
                        <div className="md:w-1/3 mb-2 md:mb-0 text-gray-400 font-mono text-sm">
                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </div>
                        <div className="md:w-2/3">
                            <h3 className="text-2xl font-bold mb-1">{exp.position}</h3>
                            <div className="text-lg text-gray-400 mb-4">{exp.company}</div>
                            <p className="text-gray-500 leading-relaxed">{exp.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-20 pt-10 border-t border-gray-800">
                <div className="flex flex-wrap gap-4 justify-center">
                    {data.skills.map(skill => (
                        <span key={skill.id} className="text-xl md:text-2xl font-bold text-gray-600 hover:text-white transition-colors cursor-default">
                            {skill.name}
                        </span>
                    ))}
                </div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-10 py-10 flex justify-between items-end">
        <div>
            <div className="text-sm font-bold uppercase tracking-widest mb-4">Get in touch</div>
            <a href={`mailto:${data.personal.email}`} className="text-2xl md:text-4xl font-bold hover:underline decoration-2 underline-offset-4">
                {data.personal.email}
            </a>
        </div>
        <div className="text-sm text-gray-500 text-right">
            © {new Date().getFullYear()} {data.personal.fullName}
        </div>
      </footer>
    </div>
  );
}

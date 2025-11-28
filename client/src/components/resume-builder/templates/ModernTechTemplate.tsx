import { ResumeData } from "@/lib/types";

export function ModernTechTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="h-full w-full bg-slate-50 text-slate-900 p-[20mm] box-border font-sans">
      <div className="flex gap-8 h-full">
        {/* Sidebar */}
        <div className="w-1/3 border-r border-slate-200 pr-6 flex flex-col h-full">
            <div className="mb-8">
                <div className="w-24 h-24 bg-slate-900 text-white rounded-full flex items-center justify-center text-3xl font-bold mb-4 mx-auto">
                    {data.personal.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                </div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 text-center">Contact</h2>
                <ul className="text-sm space-y-3 text-center break-words">
                    {data.personal.email && <li>{data.personal.email}</li>}
                    {data.personal.phone && <li>{data.personal.phone}</li>}
                    {data.personal.location && <li>{data.personal.location}</li>}
                    {data.personal.website && <li className="text-blue-600">{data.personal.website}</li>}
                    {data.personal.linkedin && <li className="text-blue-600">LinkedIn</li>}
                    {data.personal.github && <li className="text-blue-600">GitHub</li>}
                </ul>
            </div>

            {data.skills.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 text-center">Skills</h2>
                    <div className="flex flex-wrap gap-2 justify-center">
                        {data.skills.map(skill => (
                            <span key={skill.id} className="bg-slate-200 text-slate-800 px-2 py-1 rounded text-xs font-semibold">
                                {skill.name}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>

        {/* Main Content */}
        <div className="w-2/3 flex-1">
            <header className="mb-8 border-b-4 border-slate-900 pb-4">
                <h1 className="text-4xl font-black uppercase tracking-tighter text-slate-900 mb-2">
                    {data.personal.fullName}
                </h1>
                <p className="text-xl text-slate-500 font-medium uppercase tracking-widest">
                    {data.personal.title}
                </p>
            </header>

            {data.personal.summary && (
                <section className="mb-8">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-3">Profile</h3>
                    <p className="text-sm leading-relaxed text-slate-700">{data.personal.summary}</p>
                </section>
            )}

            {data.experience.length > 0 && (
                <section className="mb-8">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">Experience</h3>
                    <div className="space-y-6">
                        {data.experience.map(exp => (
                            <div key={exp.id} className="relative pl-4 border-l-2 border-slate-200">
                                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-slate-900"></div>
                                <h4 className="font-bold text-slate-900">{exp.position}</h4>
                                <div className="text-xs font-semibold text-slate-500 mb-2 uppercase">
                                    {exp.company} • {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                </div>
                                <p className="text-sm text-slate-700">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

             {data.projects.length > 0 && (
                <section className="mb-8">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">Projects</h3>
                    <div className="grid grid-cols-1 gap-4">
                        {data.projects.map(proj => (
                            <div key={proj.id} className="bg-white p-3 rounded shadow-sm border border-slate-100">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-bold text-slate-900 text-sm">{proj.name}</h4>
                                    {proj.url && <span className="text-[10px] bg-slate-100 px-1 rounded text-slate-500">LINK</span>}
                                </div>
                                <p className="text-xs text-slate-600 mt-1">{proj.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
      </div>
    </div>
  );
}

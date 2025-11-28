import { ResumeData } from "@/lib/types";

export function MinimalistTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="h-full w-full bg-white text-neutral-800 p-[20mm] box-border font-sans">
      <header className="text-center mb-12">
        <h1 className="text-2xl font-light tracking-[0.2em] uppercase mb-4">
            {data.personal.fullName}
        </h1>
        <div className="text-xs tracking-widest text-neutral-500 uppercase space-x-2">
            <span>{data.personal.email}</span>
            {data.personal.phone && <span>• {data.personal.phone}</span>}
            {data.personal.location && <span>• {data.personal.location}</span>}
        </div>
      </header>

      <div className="max-w-2xl mx-auto space-y-10">
        {data.personal.summary && (
            <section className="text-center">
                <p className="text-sm leading-loose text-neutral-600 italic">
                    "{data.personal.summary}"
                </p>
            </section>
        )}

        {data.experience.length > 0 && (
            <section>
                <h2 className="text-xs font-bold uppercase tracking-widest text-center mb-6 border-b pb-2">Experience</h2>
                <div className="space-y-8">
                    {data.experience.map(exp => (
                        <div key={exp.id} className="grid grid-cols-[1fr_3fr] gap-4">
                            <div className="text-right">
                                <span className="block text-xs font-bold text-neutral-900">{exp.company}</span>
                                <span className="block text-[10px] text-neutral-400 uppercase tracking-wider">
                                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                </span>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium mb-1">{exp.position}</h3>
                                <p className="text-xs leading-relaxed text-neutral-500">{exp.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        )}

        {data.education.length > 0 && (
            <section>
                <h2 className="text-xs font-bold uppercase tracking-widest text-center mb-6 border-b pb-2">Education</h2>
                <div className="space-y-4">
                    {data.education.map(edu => (
                        <div key={edu.id} className="grid grid-cols-[1fr_3fr] gap-4">
                             <div className="text-right">
                                <span className="block text-xs font-bold text-neutral-900">{edu.institution}</span>
                                <span className="block text-[10px] text-neutral-400 uppercase tracking-wider">
                                    {edu.startDate} - {edu.endDate}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm text-neutral-600">{edu.degree}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        )}
        
        {data.skills.length > 0 && (
             <section className="text-center">
                <h2 className="text-xs font-bold uppercase tracking-widest mb-4 border-b pb-2 inline-block px-4">Skills</h2>
                <div className="text-xs leading-loose text-neutral-500">
                    {data.skills.map(s => s.name).join('  •  ')}
                </div>
             </section>
        )}
      </div>
    </div>
  );
}

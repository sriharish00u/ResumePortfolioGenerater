import { ResumeData } from "@/lib/types";

export function CorporateFolioTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Top Bar */}
      <div className="bg-slate-900 text-white py-3 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-sm">
            <div>{data.personal.email}</div>
            <div className="flex gap-4">
                {data.personal.linkedin && <a href={data.personal.linkedin} className="hover:text-blue-300">LinkedIn</a>}
                {data.personal.github && <a href={data.personal.github} className="hover:text-blue-300">GitHub</a>}
            </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b shadow-sm py-12 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 bg-slate-200 rounded-full flex items-center justify-center text-4xl font-bold text-slate-400">
                {data.personal.fullName.charAt(0)}
            </div>
            <div className="text-center md:text-left">
                <h1 className="text-4xl font-bold text-slate-900 mb-2">{data.personal.fullName}</h1>
                <p className="text-xl text-slate-600 mb-4">{data.personal.title}</p>
                <p className="max-w-2xl text-slate-500 leading-relaxed">
                    {data.personal.summary}
                </p>
            </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-12 px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-12">
            {data.experience.length > 0 && (
                <section className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 pb-2 border-b">Professional Experience</h2>
                    <div className="space-y-8">
                        {data.experience.map(exp => (
                            <div key={exp.id} className="relative pl-6 border-l-2 border-blue-600">
                                <h3 className="text-lg font-bold text-slate-800">{exp.position}</h3>
                                <div className="text-blue-600 font-semibold mb-1">{exp.company}</div>
                                <div className="text-sm text-slate-500 mb-3">
                                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate} | {exp.location}
                                </div>
                                <p className="text-slate-600 leading-relaxed">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {data.projects.length > 0 && (
                 <section className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 pb-2 border-b">Key Projects</h2>
                    <div className="grid grid-cols-1 gap-6">
                        {data.projects.map(proj => (
                            <div key={proj.id} className="border-b border-slate-100 last:border-0 pb-6 last:pb-0">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-bold text-slate-800 text-lg">{proj.name}</h3>
                                    {proj.url && (
                                        <a href={proj.url} className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100">
                                            View Project
                                        </a>
                                    )}
                                </div>
                                <p className="text-slate-600 mb-3">{proj.description}</p>
                                {proj.techStack && (
                                    <div className="flex gap-2 flex-wrap">
                                        {proj.techStack.split(',').map(t => (
                                            <span key={t} className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                                                {t.trim()}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                 </section>
            )}
        </div>

        {/* Right Column */}
        <div className="space-y-8">
            {data.skills.length > 0 && (
                 <section className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                    <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b">Core Competencies</h2>
                    <div className="flex flex-col gap-2">
                        {data.skills.map(skill => (
                            <div key={skill.id} className="flex justify-between items-center">
                                <span className="text-slate-700 font-medium">{skill.name}</span>
                                {skill.level && <span className="text-xs text-slate-400">{skill.level}</span>}
                            </div>
                        ))}
                    </div>
                 </section>
            )}

            {data.education.length > 0 && (
                 <section className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                    <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b">Education</h2>
                    <div className="space-y-4">
                        {data.education.map(edu => (
                            <div key={edu.id}>
                                <div className="font-bold text-slate-800">{edu.degree}</div>
                                <div className="text-sm text-slate-600">{edu.institution}</div>
                                <div className="text-xs text-slate-400 mt-1">
                                    {edu.startDate} - {edu.endDate}
                                </div>
                            </div>
                        ))}
                    </div>
                 </section>
            )}
            
            <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md text-center">
                <h3 className="font-bold text-lg mb-2">Ready to collaborate?</h3>
                <p className="text-blue-100 text-sm mb-4">I am currently open to new opportunities.</p>
                <a href={`mailto:${data.personal.email}`} className="inline-block bg-white text-blue-600 font-bold py-2 px-6 rounded shadow hover:bg-blue-50 transition-colors">
                    Contact Me
                </a>
            </div>
        </div>
      </main>
    </div>
  );
}

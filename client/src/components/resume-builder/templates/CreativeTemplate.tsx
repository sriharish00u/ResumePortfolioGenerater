import { ResumeData } from "@/lib/types";

export function CreativeTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="h-full w-full bg-white text-gray-800 p-[20mm] box-border font-sans relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 left-0 w-full h-32 bg-teal-600 transform -skew-y-2 origin-top-left -mt-10 z-0"></div>
      
      <div className="relative z-10">
        <header className="flex justify-between items-end mb-12 pt-8">
            <div>
                <h1 className="text-5xl font-black text-white tracking-tight mb-2 drop-shadow-md">
                    {data.personal.fullName}
                </h1>
                <p className="text-xl font-bold text-teal-100 uppercase tracking-wider">
                    {data.personal.title}
                </p>
            </div>
            <div className="text-right text-xs font-medium text-gray-500 bg-white/90 p-2 rounded backdrop-blur-sm">
                <p>{data.personal.email}</p>
                <p>{data.personal.phone}</p>
                <p>{data.personal.location}</p>
            </div>
        </header>

        <div className="grid grid-cols-12 gap-8">
            <div className="col-span-8 space-y-8">
                {data.personal.summary && (
                    <section>
                        <h2 className="text-2xl font-bold text-teal-800 mb-3">Hello.</h2>
                        <p className="text-sm text-gray-600 leading-relaxed border-l-4 border-teal-500 pl-4 italic">
                            {data.personal.summary}
                        </p>
                    </section>
                )}

                {data.experience.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold text-teal-800 mb-4 flex items-center gap-2">
                            <span className="w-8 h-1 bg-teal-500 block"></span> Experience
                        </h2>
                        <div className="space-y-6">
                            {data.experience.map(exp => (
                                <div key={exp.id} className="bg-gray-50 p-4 rounded-lg border-l-4 border-teal-500">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-lg text-gray-800">{exp.position}</h3>
                                        <span className="text-xs font-bold text-teal-600 bg-teal-100 px-2 py-1 rounded-full">
                                            {exp.startDate} — {exp.current ? 'Now' : exp.endDate}
                                        </span>
                                    </div>
                                    <div className="text-sm font-semibold text-gray-500 mb-2">{exp.company}</div>
                                    <p className="text-sm text-gray-600">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {data.projects.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold text-teal-800 mb-4 flex items-center gap-2">
                            <span className="w-8 h-1 bg-teal-500 block"></span> Projects
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            {data.projects.map(proj => (
                                <div key={proj.id} className="border border-gray-200 p-3 rounded hover:shadow-md transition-shadow">
                                    <h4 className="font-bold text-sm text-gray-900">{proj.name}</h4>
                                    <p className="text-xs text-gray-500 mt-1 line-clamp-3">{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            <div className="col-span-4 space-y-8">
                {data.education.length > 0 && (
                    <section className="bg-gray-900 text-white p-5 rounded-xl shadow-lg">
                        <h2 className="text-lg font-bold text-teal-400 mb-4 border-b border-gray-700 pb-2">Education</h2>
                        <div className="space-y-4">
                            {data.education.map(edu => (
                                <div key={edu.id}>
                                    <div className="font-bold text-sm">{edu.degree}</div>
                                    <div className="text-xs text-gray-400">{edu.institution}</div>
                                    <div className="text-[10px] text-gray-500 mt-1">{edu.startDate} - {edu.endDate}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {data.skills.length > 0 && (
                    <section>
                         <h2 className="text-lg font-bold text-teal-800 mb-4">My Stack</h2>
                         <div className="flex flex-wrap gap-2">
                            {data.skills.map(skill => (
                                <span key={skill.id} className="px-3 py-1.5 bg-white border-2 border-teal-100 text-teal-800 text-xs font-bold rounded-lg shadow-sm">
                                    {skill.name}
                                </span>
                            ))}
                         </div>
                    </section>
                )}
                
                <section className="text-center mt-12">
                    <div className="inline-block w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center border-4 border-white shadow-inner">
                         <span className="text-4xl">👋</span>
                    </div>
                </section>
            </div>
        </div>
      </div>
    </div>
  );
}

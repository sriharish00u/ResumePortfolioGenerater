import { ResumeData } from "@/lib/types";

export function SwissTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="h-full w-full bg-white text-black p-[20mm] box-border">
      {/* Header */}
      <header className="mb-8 border-b-2 border-black pb-4">
        <h1 className="text-4xl font-bold uppercase tracking-tight mb-2">
          {data.personal.fullName || "Your Name"}
        </h1>
        <p className="text-xl text-gray-600 font-medium mb-4">
          {data.personal.title || "Professional Title"}
        </p>
        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
          {data.personal.email && <span>{data.personal.email}</span>}
          {data.personal.phone && <span>• {data.personal.phone}</span>}
          {data.personal.location && <span>• {data.personal.location}</span>}
          {data.personal.website && <span>• {data.personal.website}</span>}
        </div>
        <div className="flex gap-4 mt-2 text-sm font-medium text-black">
            {data.personal.linkedin && (
                <a href={data.personal.linkedin} className="hover:underline">LinkedIn</a>
            )}
             {data.personal.github && (
                <a href={data.personal.github} className="hover:underline">GitHub</a>
            )}
        </div>
      </header>

      <div className="space-y-6">
        {/* Summary */}
        {data.personal.summary && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider mb-2 text-gray-500 border-b border-gray-200 pb-1">Summary</h2>
            <p className="text-sm leading-relaxed text-gray-800">
              {data.personal.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider mb-4 text-gray-500 border-b border-gray-200 pb-1">Experience</h2>
            <div className="space-y-5">
              {data.experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-base">{exp.position}</h3>
                    <span className="text-sm text-gray-500 font-mono">
                      {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-sm text-gray-700">{exp.company}</span>
                    <span className="text-xs text-gray-500 italic">{exp.location}</span>
                  </div>
                  <p className="text-sm text-gray-800 whitespace-pre-line leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider mb-4 text-gray-500 border-b border-gray-200 pb-1">Projects</h2>
            <div className="space-y-4">
              {data.projects.map(proj => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-base">
                        {proj.name}
                        {proj.url && <a href={proj.url} className="ml-2 text-xs font-normal text-blue-600 hover:underline no-print">Link ↗</a>}
                    </h3>
                  </div>
                  {proj.techStack && (
                    <p className="text-xs font-mono text-gray-500 mb-1">{proj.techStack}</p>
                  )}
                  <p className="text-sm text-gray-800 leading-relaxed">
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-8">
            {/* Education */}
            {data.education.length > 0 && (
            <section>
                <h2 className="text-sm font-bold uppercase tracking-wider mb-4 text-gray-500 border-b border-gray-200 pb-1">Education</h2>
                <div className="space-y-4">
                {data.education.map(edu => (
                    <div key={edu.id}>
                    <h3 className="font-bold text-sm">{edu.institution}</h3>
                    <p className="text-sm text-gray-800">{edu.degree}</p>
                    <span className="text-xs text-gray-500 font-mono">
                        {edu.startDate} – {edu.current ? "Present" : edu.endDate}
                    </span>
                    </div>
                ))}
                </div>
            </section>
            )}

            {/* Skills */}
            {data.skills.length > 0 && (
            <section>
                <h2 className="text-sm font-bold uppercase tracking-wider mb-4 text-gray-500 border-b border-gray-200 pb-1">Skills</h2>
                <div className="flex flex-wrap gap-2">
                {data.skills.map(skill => (
                    <span key={skill.id} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded border border-gray-200">
                    {skill.name}
                    </span>
                ))}
                </div>
            </section>
            )}
        </div>
      </div>
    </div>
  );
}

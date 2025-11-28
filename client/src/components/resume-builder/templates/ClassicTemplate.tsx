import { ResumeData } from "@/lib/types";

export function ClassicTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="h-full w-full bg-white text-black p-[20mm] box-border font-serif">
      {/* Header */}
      <header className="mb-6 text-center border-b pb-6">
        <h1 className="text-3xl font-bold mb-2 font-sans">
          {data.personal.fullName || "Your Name"}
        </h1>
        <div className="text-sm text-gray-600 flex justify-center gap-3 flex-wrap">
           {data.personal.email && <span>{data.personal.email}</span>}
           {data.personal.phone && <span>| {data.personal.phone}</span>}
           {data.personal.location && <span>| {data.personal.location}</span>}
        </div>
        <div className="mt-2 flex justify-center gap-4 text-sm text-blue-800">
             {data.personal.linkedin && <a href={data.personal.linkedin}>LinkedIn</a>}
             {data.personal.website && <a href={data.personal.website}>Portfolio</a>}
             {data.personal.github && <a href={data.personal.github}>GitHub</a>}
        </div>
      </header>

      {/* Summary */}
      {data.personal.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 mb-3 pb-1 font-sans text-blue-900">Professional Summary</h2>
          <p className="text-sm leading-relaxed">
            {data.personal.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 mb-3 pb-1 font-sans text-blue-900">Professional Experience</h2>
          <div className="space-y-4">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between mb-1">
                  <h3 className="font-bold text-base">{exp.company}</h3>
                  <span className="text-sm italic">
                    {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <div className="mb-1 text-sm font-semibold text-gray-700">{exp.position} | {exp.location}</div>
                <p className="text-sm whitespace-pre-line">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 mb-3 pb-1 font-sans text-blue-900">Education</h2>
          <div className="space-y-3">
            {data.education.map(edu => (
              <div key={edu.id}>
                <div className="flex justify-between">
                    <h3 className="font-bold">{edu.institution}</h3>
                    <span className="text-sm">{edu.startDate} – {edu.endDate}</span>
                </div>
                <p className="text-sm">{edu.degree}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 mb-3 pb-1 font-sans text-blue-900">Technical Skills</h2>
          <div className="text-sm">
            <span className="font-bold">Skills: </span>
            {data.skills.map(skill => skill.name).join(", ")}
          </div>
        </section>
      )}
      
      {/* Projects */}
      {data.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 mb-3 pb-1 font-sans text-blue-900">Projects</h2>
          <div className="space-y-3">
            {data.projects.map(proj => (
              <div key={proj.id}>
                <h3 className="font-bold text-sm">
                    {proj.name} {proj.url && <span className="font-normal text-gray-500">- {proj.url}</span>}
                </h3>
                <p className="text-sm">{proj.description}</p>
                {proj.techStack && <p className="text-xs text-gray-600 italic">Tech: {proj.techStack}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

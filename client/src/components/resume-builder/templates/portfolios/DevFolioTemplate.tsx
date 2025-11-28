import { ResumeData } from "@/lib/types";

export function DevFolioTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-mono p-8">
      <div className="max-w-4xl mx-auto border border-[#30363d] rounded-lg overflow-hidden bg-[#0d1117] shadow-xl">
        {/* Terminal Header */}
        <div className="bg-[#161b22] px-4 py-2 border-b border-[#30363d] flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          <div className="ml-4 text-xs text-[#8b949e] font-sans">user@{data.personal.github?.split('/').pop() || 'dev'}: ~/portfolio</div>
        </div>

        {/* Terminal Body */}
        <div className="p-6 space-y-8">
          {/* Command: whoami */}
          <div>
            <div className="flex items-center gap-2 text-[#8b949e] mb-2">
              <span className="text-[#58a6ff]">➜</span>
              <span className="text-[#7ee787]">~</span>
              <span>whoami</span>
            </div>
            <h1 className="text-4xl font-bold text-[#e6edf3] mb-2">{data.personal.fullName}</h1>
            <p className="text-[#8b949e] text-xl">
              {`> ${data.personal.title}`}
            </p>
            <div className="mt-4 flex gap-4 text-sm">
               {data.personal.github && <a href={data.personal.github} className="text-[#58a6ff] hover:underline">github</a>}
               {data.personal.linkedin && <a href={data.personal.linkedin} className="text-[#58a6ff] hover:underline">linkedin</a>}
               <a href={`mailto:${data.personal.email}`} className="text-[#58a6ff] hover:underline">{data.personal.email}</a>
            </div>
          </div>

          {/* Command: cat about.md */}
          {data.personal.summary && (
            <div>
               <div className="flex items-center gap-2 text-[#8b949e] mb-2">
                <span className="text-[#58a6ff]">➜</span>
                <span className="text-[#7ee787]">~</span>
                <span>cat about.md</span>
              </div>
              <div className="border-l-2 border-[#30363d] pl-4 py-1 text-[#c9d1d9] leading-relaxed">
                {data.personal.summary}
              </div>
            </div>
          )}

          {/* Command: ls ./projects */}
          {data.projects.length > 0 && (
            <div>
               <div className="flex items-center gap-2 text-[#8b949e] mb-4">
                <span className="text-[#58a6ff]">➜</span>
                <span className="text-[#7ee787]">~</span>
                <span>ls -la ./projects</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.projects.map(proj => (
                  <div key={proj.id} className="border border-[#30363d] bg-[#161b22] p-4 rounded hover:border-[#8b949e] transition-colors">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-[#7ee787]">{proj.name}</h3>
                        <span className="text-xs text-[#8b949e] border border-[#30363d] px-1 rounded">Public</span>
                    </div>
                    <p className="text-sm text-[#8b949e] mb-3 h-10 line-clamp-2">{proj.description}</p>
                    {proj.techStack && (
                        <div className="text-xs text-[#a5d6ff] font-mono mb-3">
                            {proj.techStack.split(',').map(t => t.trim()).join('  ')}
                        </div>
                    )}
                    {proj.url && <a href={proj.url} className="text-xs text-[#58a6ff] hover:underline">View Deployment →</a>}
                  </div>
                ))}
              </div>
            </div>
          )}

           {/* Command: neofetch skills */}
           {data.skills.length > 0 && (
            <div>
               <div className="flex items-center gap-2 text-[#8b949e] mb-4">
                <span className="text-[#58a6ff]">➜</span>
                <span className="text-[#7ee787]">~</span>
                <span>neofetch --skills</span>
              </div>
              <div className="flex flex-wrap gap-2">
                  {data.skills.map(skill => (
                      <span key={skill.id} className="px-3 py-1 bg-[#21262d] text-[#c9d1d9] text-sm rounded border border-[#30363d]">
                          {skill.name}
                      </span>
                  ))}
              </div>
            </div>
           )}

           {/* Cursor */}
           <div className="flex items-center gap-2 text-[#8b949e] mt-8">
              <span className="text-[#58a6ff]">➜</span>
              <span className="text-[#7ee787]">~</span>
              <span className="w-2.5 h-5 bg-[#c9d1d9] animate-pulse block"></span>
           </div>
        </div>
      </div>
    </div>
  );
}

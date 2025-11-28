import { ResumeData } from "@/lib/types";

export function ArtisticFolioTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="min-h-screen bg-[#e8e4d9] text-[#2a2a2a] font-serif overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
        
        {/* Hero / Sticky Info */}
        <div className="lg:col-span-4 p-8 lg:p-12 flex flex-col justify-between border-r border-[#2a2a2a]/10 lg:h-screen lg:sticky lg:top-0 bg-[#e8e4d9]">
            <div>
                <h1 className="text-6xl lg:text-7xl font-light leading-[0.8] mb-6 tracking-tighter italic">
                    {data.personal.fullName.split(' ')[0]}<br/>
                    <span className="not-italic font-bold">{data.personal.fullName.split(' ').slice(1).join(' ')}</span>
                </h1>
                <p className="text-xl font-sans uppercase tracking-widest text-[#555] mb-8">
                    {data.personal.title}
                </p>
                
                <div className="w-16 h-1 bg-[#ff4500] mb-8"></div>
                
                <p className="text-lg leading-relaxed max-w-sm">
                    {data.personal.summary}
                </p>
            </div>
            
            <div className="mt-12 lg:mt-0">
                <h3 className="font-sans font-bold text-sm uppercase tracking-widest mb-4">Contact</h3>
                <ul className="space-y-2 text-lg">
                    <li><a href={`mailto:${data.personal.email}`} className="hover:text-[#ff4500] transition-colors">{data.personal.email}</a></li>
                    {data.personal.linkedin && <li><a href={data.personal.linkedin} className="hover:text-[#ff4500] transition-colors">LinkedIn</a></li>}
                    {data.personal.github && <li><a href={data.personal.github} className="hover:text-[#ff4500] transition-colors">GitHub</a></li>}
                </ul>
            </div>
        </div>

        {/* Scrollable Content */}
        <div className="lg:col-span-8 p-8 lg:p-20">
            
            {/* Projects as a Gallery */}
            {data.projects.length > 0 && (
                <section className="mb-24">
                    <h2 className="text-[10rem] leading-none opacity-5 font-bold absolute right-0 -mt-20 pointer-events-none select-none">WORK</h2>
                    <div className="space-y-20 relative">
                        {data.projects.map((proj, i) => (
                            <div key={proj.id} className="flex flex-col gap-6">
                                <div className="aspect-video bg-neutral-200 w-full grayscale hover:grayscale-0 transition-all duration-500"></div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="md:col-span-1">
                                        <span className="text-4xl font-bold block mb-2">0{i+1}</span>
                                        <h3 className="text-2xl font-bold italic">{proj.name}</h3>
                                    </div>
                                    <div className="md:col-span-2 font-sans">
                                        <p className="text-lg text-[#555] mb-4">{proj.description}</p>
                                        {proj.url && (
                                            <a href={proj.url} className="inline-block border-b border-black pb-1 uppercase text-sm font-bold tracking-widest hover:border-[#ff4500] hover:text-[#ff4500]">
                                                Visit Site
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Experience Typographic List */}
            {data.experience.length > 0 && (
                <section className="mb-24">
                     <h2 className="font-sans font-bold text-sm uppercase tracking-widest mb-12 border-b border-black/10 pb-4">Career History</h2>
                     <div className="space-y-12">
                        {data.experience.map(exp => (
                            <div key={exp.id} className="group">
                                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                                    <h3 className="text-3xl font-bold group-hover:text-[#ff4500] transition-colors">{exp.company}</h3>
                                    <span className="font-sans text-sm text-[#666]">{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
                                </div>
                                <div className="text-xl italic mb-4 text-[#444]">{exp.position}</div>
                                <p className="font-sans text-[#555] max-w-2xl">{exp.description}</p>
                            </div>
                        ))}
                     </div>
                </section>
            )}
            
            {/* Skills Cloud */}
            {data.skills.length > 0 && (
                 <section>
                    <h2 className="font-sans font-bold text-sm uppercase tracking-widest mb-8 border-b border-black/10 pb-4">Expertise</h2>
                    <div className="flex flex-wrap gap-x-8 gap-y-4 text-2xl lg:text-3xl leading-relaxed">
                        {data.skills.map((skill, i) => (
                            <span key={skill.id} className={i % 2 === 0 ? 'italic font-light' : 'font-bold'}>
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

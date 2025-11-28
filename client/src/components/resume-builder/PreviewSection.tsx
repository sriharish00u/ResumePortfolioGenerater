import { useResume } from "@/lib/store";
import { exportToDOCX, exportToHTMLZIP, exportToPDF } from "@/lib/export";
import { Button } from "@/components/ui/button";
import { Download, FileText, FileCode, FileType, LayoutTemplate, Monitor, ScrollText } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { SwissTemplate } from "./templates/SwissTemplate";
import { ClassicTemplate } from "./templates/ClassicTemplate";
import { ModernTechTemplate } from "./templates/ModernTechTemplate";
import { MinimalistTemplate } from "./templates/MinimalistTemplate";
import { CreativeTemplate } from "./templates/CreativeTemplate";

import { DevFolioTemplate } from "./templates/portfolios/DevFolioTemplate";
import { DesignerFolioTemplate } from "./templates/portfolios/DesignerFolioTemplate";
import { SimpleFolioTemplate } from "./templates/portfolios/SimpleFolioTemplate";
import { CorporateFolioTemplate } from "./templates/portfolios/CorporateFolioTemplate";
import { ArtisticFolioTemplate } from "./templates/portfolios/ArtisticFolioTemplate";

export function PreviewSection() {
  const { resumeData } = useResume();
  const [mode, setMode] = useState<"resume" | "portfolio">("resume");
  
  const [resumeTemplate, setResumeTemplate] = useState("swiss");
  const [portfolioTemplate, setPortfolioTemplate] = useState("simple");
  
  const [scale, setScale] = useState(0.85);

  const handleDownload = (type: "pdf" | "docx" | "zip") => {
    const fileName = resumeData.personal.fullName.replace(/\s+/g, "_") || "Resume";
    
    if (type === "pdf") {
      // Only for resume currently
      exportToPDF("resume-preview", fileName);
    } else if (type === "docx") {
      exportToDOCX(resumeData, fileName);
    } else if (type === "zip") {
      exportToHTMLZIP(resumeData, fileName, portfolioTemplate);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 sticky top-0 bg-background/95 backdrop-blur z-10 py-3 px-4 border-b shadow-sm">
        
        <div className="flex items-center gap-4">
             <Tabs value={mode} onValueChange={(v) => setMode(v as "resume" | "portfolio")}>
                <TabsList>
                    <TabsTrigger value="resume" className="flex gap-2"><ScrollText className="h-4 w-4"/> Resume</TabsTrigger>
                    <TabsTrigger value="portfolio" className="flex gap-2"><Monitor className="h-4 w-4"/> Portfolio</TabsTrigger>
                </TabsList>
            </Tabs>

            <div className="h-6 w-px bg-border hidden md:block"></div>

            <div className="flex items-center gap-2">
                <LayoutTemplate className="h-4 w-4 text-muted-foreground hidden md:block" />
                <Select 
                    value={mode === "resume" ? resumeTemplate : portfolioTemplate} 
                    onValueChange={mode === "resume" ? setResumeTemplate : setPortfolioTemplate}
                >
                    <SelectTrigger className="w-[180px] h-9">
                        <SelectValue placeholder="Select Template" />
                    </SelectTrigger>
                    <SelectContent>
                        {mode === "resume" ? (
                            <>
                                <SelectItem value="swiss">Swiss Clean</SelectItem>
                                <SelectItem value="classic">Classic Serif</SelectItem>
                                <SelectItem value="modern">Modern Tech</SelectItem>
                                <SelectItem value="minimalist">Minimalist</SelectItem>
                                <SelectItem value="creative">Creative Bold</SelectItem>
                            </>
                        ) : (
                            <>
                                <SelectItem value="simple">Simple Clean</SelectItem>
                                <SelectItem value="dev">Dev Terminal</SelectItem>
                                <SelectItem value="designer">Visual Designer</SelectItem>
                                <SelectItem value="corporate">Corporate Pro</SelectItem>
                                <SelectItem value="artistic">Artistic Serif</SelectItem>
                            </>
                        )}
                    </SelectContent>
                </Select>
            </div>
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto">
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="sm" className="shadow-sm bg-primary text-primary-foreground hover:bg-primary/90">
                <Download className="mr-2 h-4 w-4" /> Export
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {mode === "resume" ? (
                    <>
                        <DropdownMenuItem onClick={() => handleDownload("pdf")}>
                        <FileType className="mr-2 h-4 w-4" /> PDF Document
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDownload("docx")}>
                        <FileText className="mr-2 h-4 w-4" /> Word Document
                        </DropdownMenuItem>
                    </>
                ) : (
                    <DropdownMenuItem onClick={() => handleDownload("zip")}>
                    <FileCode className="mr-2 h-4 w-4" /> Download Website (ZIP)
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-muted/30 p-4 md:p-8 flex justify-center custom-scrollbar relative">
        
        {mode === "resume" ? (
            <div 
            id="resume-preview"
            className="bg-white shadow-2xl origin-top transition-transform duration-300 ease-in-out"
            style={{ 
                width: '210mm', 
                minHeight: '297mm',
                transform: `scale(${scale})`,
                marginBottom: `-${(1 - scale) * 100}%` // compensate for scale space
            }}
            >
                {resumeTemplate === "swiss" && <SwissTemplate data={resumeData} />}
                {resumeTemplate === "classic" && <ClassicTemplate data={resumeData} />}
                {resumeTemplate === "modern" && <ModernTechTemplate data={resumeData} />}
                {resumeTemplate === "minimalist" && <MinimalistTemplate data={resumeData} />}
                {resumeTemplate === "creative" && <CreativeTemplate data={resumeData} />}
            </div>
        ) : (
            <div className="w-full h-full bg-white shadow-2xl overflow-y-auto rounded-lg border border-slate-200">
                 {portfolioTemplate === "simple" && <SimpleFolioTemplate data={resumeData} />}
                 {portfolioTemplate === "dev" && <DevFolioTemplate data={resumeData} />}
                 {portfolioTemplate === "designer" && <DesignerFolioTemplate data={resumeData} />}
                 {portfolioTemplate === "corporate" && <CorporateFolioTemplate data={resumeData} />}
                 {portfolioTemplate === "artistic" && <ArtisticFolioTemplate data={resumeData} />}
            </div>
        )}

      </div>
      
      {/* Zoom Controls (Only for Resume Mode) */}
      {mode === "resume" && (
        <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur border rounded-full shadow-sm p-1 flex gap-1 z-20">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setScale(Math.max(0.5, scale - 0.1))}>-</Button>
            <span className="flex items-center text-xs font-mono w-12 justify-center">{Math.round(scale * 100)}%</span>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setScale(Math.min(1.5, scale + 0.1))}>+</Button>
        </div>
      )}
    </div>
  );
}

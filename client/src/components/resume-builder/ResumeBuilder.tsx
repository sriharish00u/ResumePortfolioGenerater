import { ResumeProvider } from "@/lib/store";
import { FormSection } from "./FormSection";
import { PreviewSection } from "./PreviewSection";
import { Separator } from "@/components/ui/separator";
import { FileText } from "lucide-react";

export function ResumeBuilder() {
  return (
    <ResumeProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <header className="border-b bg-card px-6 py-3 flex items-center gap-2 sticky top-0 z-50">
          <div className="p-2 bg-primary rounded-md">
            <FileText className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="font-bold text-xl tracking-tight">Resume<span className="font-light text-muted-foreground">Builder</span></h1>
        </header>
        
        <main className="flex-1 container mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-8rem)]">
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col h-full overflow-y-auto pr-2 custom-scrollbar">
              <FormSection />
            </div>
            
            <div className="hidden lg:block lg:col-span-1">
                <Separator orientation="vertical" className="h-full mx-auto" />
            </div>

            <div className="lg:col-span-6 xl:col-span-7 h-full overflow-hidden bg-muted/10 rounded-xl border shadow-sm flex flex-col">
              <PreviewSection />
            </div>
          </div>
        </main>
      </div>
    </ResumeProvider>
  );
}

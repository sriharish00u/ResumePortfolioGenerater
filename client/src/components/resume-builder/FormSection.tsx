import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonalStep } from "./steps/PersonalStep";
import { EducationStep } from "./steps/EducationStep";
import { ExperienceStep } from "./steps/ExperienceStep";
import { SkillsStep } from "./steps/SkillsStep";
import { ProjectsStep } from "./steps/ProjectsStep";
import { User, GraduationCap, Briefcase, Code, FolderGit2, ArrowRight, ArrowLeft } from "lucide-react";

export function FormSection() {
  const [activeTab, setActiveTab] = useState("personal");

  const steps = [
    { id: "personal", label: "Personal", icon: User, component: PersonalStep },
    { id: "education", label: "Education", icon: GraduationCap, component: EducationStep },
    { id: "experience", label: "Experience", icon: Briefcase, component: ExperienceStep },
    { id: "projects", label: "Projects", icon: FolderGit2, component: ProjectsStep },
    { id: "skills", label: "Skills", icon: Code, component: SkillsStep },
  ];

  const currentIndex = steps.findIndex(s => s.id === activeTab);

  const nextStep = () => {
    if (currentIndex < steps.length - 1) {
      setActiveTab(steps[currentIndex + 1].id);
    }
  };

  const prevStep = () => {
    if (currentIndex > 0) {
      setActiveTab(steps[currentIndex - 1].id);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="overflow-x-auto pb-2">
            <TabsList className="inline-flex h-auto p-1 w-full justify-start md:justify-center min-w-max">
            {steps.map((step) => (
                <TabsTrigger 
                key={step.id} 
                value={step.id}
                className="flex flex-col items-center gap-1 px-4 py-2 h-auto data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                <step.icon className="h-4 w-4" />
                <span className="text-xs font-medium">{step.label}</span>
                </TabsTrigger>
            ))}
            </TabsList>
        </div>

        <div className="mt-6">
            <Card className="border-none shadow-none bg-transparent md:bg-card md:border md:shadow-sm">
            <CardHeader className="px-0 md:px-6">
                <CardTitle>{steps[currentIndex].label}</CardTitle>
                <CardDescription>Enter your {steps[currentIndex].label.toLowerCase()} details below.</CardDescription>
            </CardHeader>
            <CardContent className="px-0 md:px-6">
                {steps.map((step) => (
                <TabsContent key={step.id} value={step.id} className="mt-0">
                    <step.component />
                </TabsContent>
                ))}
            </CardContent>
            </Card>
        </div>
      </Tabs>
      
      <div className="flex justify-between pt-4 mt-auto sticky bottom-0 bg-background/80 backdrop-blur-sm py-4 border-t md:border-none md:static md:bg-transparent md:p-0">
        <Button 
            variant="outline" 
            onClick={prevStep} 
            disabled={currentIndex === 0}
        >
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <Button 
            onClick={nextStep} 
            disabled={currentIndex === steps.length - 1}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
            Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

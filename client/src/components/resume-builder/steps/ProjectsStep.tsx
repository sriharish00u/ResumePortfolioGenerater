import { useResume } from "@/lib/store";
import { Project } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function ProjectsStep() {
  const { resumeData, updateSection } = useResume();

  const addProject = () => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name: "",
      description: "",
      url: "",
      techStack: "",
    };
    updateSection("projects", [...resumeData.projects, newProject]);
  };

  const removeProject = (id: string) => {
    updateSection(
      "projects",
      resumeData.projects.filter((p) => p.id !== id)
    );
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    updateSection(
      "projects",
      resumeData.projects.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      )
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {resumeData.projects.map((project) => (
        <Card key={project.id} className="relative group">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => removeProject(project.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Project Name</Label>
                <Input
                  value={project.name}
                  onChange={(e) => updateProject(project.id, "name", e.target.value)}
                  placeholder="Project Title"
                />
              </div>
              <div className="space-y-2">
                <Label>Project URL</Label>
                <Input
                  value={project.url}
                  onChange={(e) => updateProject(project.id, "url", e.target.value)}
                  placeholder="https://..."
                />
              </div>
            </div>

             <div className="space-y-2">
                <Label>Tech Stack</Label>
                <Input
                  value={project.techStack}
                  onChange={(e) => updateProject(project.id, "techStack", e.target.value)}
                  placeholder="React, Node.js, PostgreSQL (comma separated)"
                />
              </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={project.description}
                onChange={(e) => updateProject(project.id, "description", e.target.value)}
                placeholder="Describe what you built and your role..."
                className="h-24"
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <Button onClick={addProject} variant="outline" className="w-full border-dashed">
        <Plus className="mr-2 h-4 w-4" /> Add Project
      </Button>
    </div>
  );
}

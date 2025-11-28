import { useResume } from "@/lib/store";
import { Experience } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export function ExperienceStep() {
  const { resumeData, updateSection } = useResume();

  const addExperience = () => {
    const newExp: Experience = {
      id: crypto.randomUUID(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      location: "",
    };
    updateSection("experience", [...resumeData.experience, newExp]);
  };

  const removeExperience = (id: string) => {
    updateSection(
      "experience",
      resumeData.experience.filter((exp) => exp.id !== id)
    );
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    updateSection(
      "experience",
      resumeData.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {resumeData.experience.map((exp) => (
        <Card key={exp.id} className="relative group">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => removeExperience(exp.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Company</Label>
                <Input
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                  placeholder="Company Name"
                />
              </div>
              <div className="space-y-2">
                <Label>Job Title</Label>
                <Input
                  value={exp.position}
                  onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                  placeholder="Software Engineer"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                  placeholder="MM/YYYY"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>End Date</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`current-${exp.id}`}
                      checked={exp.current}
                      onCheckedChange={(checked) => updateExperience(exp.id, "current", checked)}
                    />
                    <label
                      htmlFor={`current-${exp.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Present
                    </label>
                  </div>
                </div>
                <Input
                  value={exp.endDate}
                  onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                  placeholder="MM/YYYY"
                  disabled={exp.current}
                />
              </div>
            </div>

             <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  value={exp.location}
                  onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
                  placeholder="City, Country"
                />
              </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                placeholder="Describe your responsibilities and achievements..."
                className="h-32"
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <Button onClick={addExperience} variant="outline" className="w-full border-dashed">
        <Plus className="mr-2 h-4 w-4" /> Add Experience
      </Button>
    </div>
  );
}

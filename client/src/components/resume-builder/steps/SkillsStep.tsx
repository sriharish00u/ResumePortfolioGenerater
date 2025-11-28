import { useResume } from "@/lib/store";
import { Skill } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export function SkillsStep() {
  const { resumeData, updateSection } = useResume();

  const addSkill = () => {
    const newSkill: Skill = {
      id: crypto.randomUUID(),
      name: "",
      level: "Intermediate",
    };
    updateSection("skills", [...resumeData.skills, newSkill]);
  };

  const removeSkill = (id: string) => {
    updateSection(
      "skills",
      resumeData.skills.filter((skill) => skill.id !== id)
    );
  };

  const updateSkill = (id: string, field: keyof Skill, value: any) => {
    updateSection(
      "skills",
      resumeData.skills.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 gap-4">
        {resumeData.skills.map((skill) => (
          <div key={skill.id} className="flex items-end gap-2 p-4 border rounded-lg bg-card">
            <div className="flex-1 space-y-2">
              <Label>Skill Name</Label>
              <Input
                value={skill.name}
                onChange={(e) => updateSkill(skill.id, "name", e.target.value)}
                placeholder="e.g. React, Python, Project Management"
              />
            </div>
            <div className="w-[180px] space-y-2">
              <Label>Level</Label>
              <Select
                value={skill.level}
                onValueChange={(value) => updateSkill(skill.id, "level", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="Expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <Button
              variant="ghost"
              size="icon"
              className="mb-0.5 text-muted-foreground hover:text-destructive"
              onClick={() => removeSkill(skill.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <Button onClick={addSkill} variant="outline" className="w-full border-dashed">
        <Plus className="mr-2 h-4 w-4" /> Add Skill
      </Button>
      
      <div className="flex flex-wrap gap-2 mt-8">
        <Label className="w-full mb-2">Quick Preview:</Label>
        {resumeData.skills.map(skill => (
            skill.name && <Badge key={skill.id} variant="secondary">{skill.name}</Badge>
        ))}
      </div>
    </div>
  );
}

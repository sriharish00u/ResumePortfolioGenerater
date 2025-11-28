import { useResume } from "@/lib/store";
import { Education } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export function EducationStep() {
  const { resumeData, updateSection } = useResume();

  const addEducation = () => {
    const newEducation: Education = {
      id: crypto.randomUUID(),
      institution: "",
      degree: "",
      startDate: "",
      endDate: "",
      current: false,
    };
    updateSection("education", [...resumeData.education, newEducation]);
  };

  const removeEducation = (id: string) => {
    updateSection(
      "education",
      resumeData.education.filter((edu) => edu.id !== id)
    );
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    updateSection(
      "education",
      resumeData.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {resumeData.education.map((edu, index) => (
        <Card key={edu.id} className="relative group">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => removeEducation(edu.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Institution</Label>
                <Input
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                  placeholder="University name"
                />
              </div>
              <div className="space-y-2">
                <Label>Degree</Label>
                <Input
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                  placeholder="Bachelor of Science in..."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  value={edu.startDate}
                  onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                  placeholder="MM/YYYY"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>End Date</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`current-${edu.id}`}
                      checked={edu.current}
                      onCheckedChange={(checked) => updateEducation(edu.id, "current", checked)}
                    />
                    <label
                      htmlFor={`current-${edu.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Present
                    </label>
                  </div>
                </div>
                <Input
                  value={edu.endDate}
                  onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                  placeholder="MM/YYYY"
                  disabled={edu.current}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button onClick={addEducation} variant="outline" className="w-full border-dashed">
        <Plus className="mr-2 h-4 w-4" /> Add Education
      </Button>
    </div>
  );
}

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalSchema, ResumeData } from "@/lib/types";
import { useResume } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export function PersonalStep() {
  const { resumeData, updateSection } = useResume();
  const form = useForm<ResumeData["personal"]>({
    resolver: zodResolver(personalSchema),
    defaultValues: resumeData.personal,
    mode: "onChange",
  });

  // Watch for changes and update store
  useEffect(() => {
    const subscription = form.watch((value) => {
      updateSection("personal", value as ResumeData["personal"]);
    });
    return () => subscription.unsubscribe();
  }, [form, updateSection]);

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" {...form.register("fullName")} placeholder="John Doe" />
          {form.formState.errors.fullName && (
            <p className="text-sm text-destructive">{form.formState.errors.fullName.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="title">Job Title</Label>
          <Input id="title" {...form.register("title")} placeholder="Software Engineer" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...form.register("email")} placeholder="john@example.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" {...form.register("phone")} placeholder="+1 (555) 000-0000" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input id="location" {...form.register("location")} placeholder="New York, NY" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea 
          id="summary" 
          {...form.register("summary")} 
          placeholder="Brief overview of your career and goals..." 
          className="h-32 resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="website">Portfolio URL</Label>
          <Input id="website" {...form.register("website")} placeholder="https://johndoe.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn URL</Label>
          <Input id="linkedin" {...form.register("linkedin")} placeholder="https://linkedin.com/in/..." />
        </div>
        <div className="space-y-2">
          <Label htmlFor="github">GitHub URL</Label>
          <Input id="github" {...form.register("github")} placeholder="https://github.com/..." />
        </div>
      </div>
    </div>
  );
}

import { z } from "zod";

export const personalSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  location: z.string().optional(),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  linkedin: z.string().url("Invalid URL").optional().or(z.literal("")),
  github: z.string().url("Invalid URL").optional().or(z.literal("")),
  summary: z.string().optional(),
  title: z.string().optional(),
});

export const educationSchema = z.object({
  id: z.string(),
  institution: z.string().min(1, "Institution is required"),
  degree: z.string().min(1, "Degree is required"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  current: z.boolean().optional(),
  description: z.string().optional(),
});

export const experienceSchema = z.object({
  id: z.string(),
  company: z.string().min(1, "Company is required"),
  position: z.string().min(1, "Position is required"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  current: z.boolean().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
});

export const projectSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Project name is required"),
  description: z.string().optional(),
  url: z.string().url("Invalid URL").optional().or(z.literal("")),
  techStack: z.string().optional(), // Comma separated
});

export const skillSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Skill name is required"),
  level: z.enum(["Beginner", "Intermediate", "Advanced", "Expert"]).optional(),
});

export const resumeSchema = z.object({
  personal: personalSchema,
  education: z.array(educationSchema),
  experience: z.array(experienceSchema),
  projects: z.array(projectSchema),
  skills: z.array(skillSchema),
});

export type ResumeData = z.infer<typeof resumeSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Skill = z.infer<typeof skillSchema>;

export const defaultResumeData: ResumeData = {
  personal: {
    fullName: "",
    email: "",
    title: "",
    summary: "",
    location: "",
    phone: "",
    website: "",
    linkedin: "",
    github: "",
  },
  education: [],
  experience: [],
  projects: [],
  skills: [],
};

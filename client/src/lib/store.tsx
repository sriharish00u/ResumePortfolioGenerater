import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { ResumeData, defaultResumeData } from "./types";

interface ResumeContextType {
  resumeData: ResumeData;
  setResumeData: (data: ResumeData) => void;
  updateSection: <K extends keyof ResumeData>(section: K, data: ResumeData[K]) => void;
  resetResume: () => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [resumeData, setResumeDataState] = useState<ResumeData>(() => {
    try {
        const saved = localStorage.getItem("resume-builder-data");
        return saved ? JSON.parse(saved) : defaultResumeData;
    } catch (e) {
        console.error("Failed to load resume data", e);
        return defaultResumeData;
    }
  });

  useEffect(() => {
    try {
        localStorage.setItem("resume-builder-data", JSON.stringify(resumeData));
    } catch (e) {
        console.error("Failed to save resume data", e);
    }
  }, [resumeData]);

  const setResumeData = (data: ResumeData) => {
    setResumeDataState(data);
  };

  const updateSection = <K extends keyof ResumeData>(section: K, data: ResumeData[K]) => {
    setResumeDataState((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  const resetResume = () => {
    setResumeDataState(defaultResumeData);
    localStorage.removeItem("resume-builder-data");
  };

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData, updateSection, resetResume }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
}

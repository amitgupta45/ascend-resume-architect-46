
import { create } from "zustand";
import { nanoid } from "nanoid";

export type ResumeTemplate = "classic" | "modern" | "executive" | "minimal" | "creative";

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  title: string;
  summary: string;
  linkedin?: string;
  website?: string;
}

export interface WorkExperience {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Education {
  id: string;
  institution: string;
  location: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  gpa: string;
}

export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";

export interface Skill {
  id: string;
  name: string;
  level: SkillLevel;
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  bulletPoints: string[];
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomSectionItem[];
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  customSections: CustomSection[];
}

interface ResumeState {
  template: ResumeTemplate;
  currentStep: number;
  data: ResumeData;
  
  // Actions
  setTemplate: (template: ResumeTemplate) => void;
  setStep: (step: number) => void;
  
  // Personal Info
  updatePersonalInfo: (personalInfo: Partial<PersonalInfo>) => void;
  
  // Work Experience
  addWorkExperience: (experience: Omit<WorkExperience, "id">) => void;
  updateWorkExperience: (id: string, experience: Partial<WorkExperience>) => void;
  removeWorkExperience: (id: string) => void;
  
  // Education
  addEducation: (education: Omit<Education, "id">) => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  
  // Skills
  addSkill: (skill: Omit<Skill, "id">) => void;
  removeSkill: (id: string) => void;
  
  // Custom Sections
  addCustomSection: (title: string) => void;
  updateCustomSection: (id: string, title: string) => void;
  removeCustomSection: (id: string) => void;
  addCustomSectionItem: (sectionId: string, item: Omit<CustomSectionItem, "id">) => void;
  updateCustomSectionItem: (sectionId: string, itemId: string, item: Partial<Omit<CustomSectionItem, "id">>) => void;
  removeCustomSectionItem: (sectionId: string, itemId: string) => void;
  
  // Reset
  resetStore: () => void;
}

// Default state initial values
const defaultPersonalInfo: PersonalInfo = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  title: "",
  summary: "",
};

const initialState = {
  template: "classic" as ResumeTemplate,
  currentStep: 0,
  data: {
    personalInfo: defaultPersonalInfo,
    workExperience: [],
    education: [],
    skills: [],
    customSections: [],
  },
};

export const useResumeStore = create<ResumeState>((set) => ({
  ...initialState,
  
  setTemplate: (template) => set({ template }),
  
  setStep: (step) => set({ currentStep: step }),
  
  updatePersonalInfo: (personalInfo) => 
    set((state) => ({
      data: {
        ...state.data,
        personalInfo: {
          ...state.data.personalInfo,
          ...personalInfo,
        },
      },
    })),
  
  addWorkExperience: (experience) =>
    set((state) => ({
      data: {
        ...state.data,
        workExperience: [
          ...state.data.workExperience,
          { ...experience, id: nanoid() },
        ],
      },
    })),
  
  updateWorkExperience: (id, experience) =>
    set((state) => ({
      data: {
        ...state.data,
        workExperience: state.data.workExperience.map((item) =>
          item.id === id ? { ...item, ...experience } : item
        ),
      },
    })),
  
  removeWorkExperience: (id) =>
    set((state) => ({
      data: {
        ...state.data,
        workExperience: state.data.workExperience.filter((item) => item.id !== id),
      },
    })),
  
  addEducation: (education) =>
    set((state) => ({
      data: {
        ...state.data,
        education: [
          ...state.data.education, 
          { ...education, id: nanoid() },
        ],
      },
    })),
  
  updateEducation: (id, education) =>
    set((state) => ({
      data: {
        ...state.data,
        education: state.data.education.map((item) =>
          item.id === id ? { ...item, ...education } : item
        ),
      },
    })),
  
  removeEducation: (id) =>
    set((state) => ({
      data: {
        ...state.data,
        education: state.data.education.filter((item) => item.id !== id),
      },
    })),
  
  addSkill: (skill) =>
    set((state) => ({
      data: {
        ...state.data,
        skills: [...state.data.skills, { ...skill, id: nanoid() }],
      },
    })),
  
  removeSkill: (id) =>
    set((state) => ({
      data: {
        ...state.data,
        skills: state.data.skills.filter((skill) => skill.id !== id),
      },
    })),
  
  addCustomSection: (title) =>
    set((state) => ({
      data: {
        ...state.data,
        customSections: [
          ...state.data.customSections,
          { id: nanoid(), title, items: [] },
        ],
      },
    })),
  
  updateCustomSection: (id, title) =>
    set((state) => ({
      data: {
        ...state.data,
        customSections: state.data.customSections.map((section) =>
          section.id === id ? { ...section, title } : section
        ),
      },
    })),
  
  removeCustomSection: (id) =>
    set((state) => ({
      data: {
        ...state.data,
        customSections: state.data.customSections.filter(
          (section) => section.id !== id
        ),
      },
    })),
  
  addCustomSectionItem: (sectionId, item) =>
    set((state) => ({
      data: {
        ...state.data,
        customSections: state.data.customSections.map((section) => {
          if (section.id === sectionId) {
            return {
              ...section,
              items: [...section.items, { ...item, id: nanoid() }],
            };
          }
          return section;
        }),
      },
    })),
  
  updateCustomSectionItem: (sectionId, itemId, item) =>
    set((state) => ({
      data: {
        ...state.data,
        customSections: state.data.customSections.map((section) => {
          if (section.id === sectionId) {
            return {
              ...section,
              items: section.items.map((secItem) =>
                secItem.id === itemId
                  ? { ...secItem, ...item }
                  : secItem
              ),
            };
          }
          return section;
        }),
      },
    })),
  
  removeCustomSectionItem: (sectionId, itemId) =>
    set((state) => ({
      data: {
        ...state.data,
        customSections: state.data.customSections.map((section) => {
          if (section.id === sectionId) {
            return {
              ...section,
              items: section.items.filter((item) => item.id !== itemId),
            };
          }
          return section;
        }),
      },
    })),
  
  resetStore: () => set(initialState),
}));

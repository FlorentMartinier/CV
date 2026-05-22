export interface CV {
  labels: Labels;
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  languages: Language[];
  projects: Project[];
  skillCategories: SkillCategorie[];
}

export interface Labels {
  experience: string;
  education: string;
  projects: string;
  contact: string;
  website: string;
  github: string;
  languages: string;
  skills: string;
  seeProject: string;
}
export interface PersonalInfo {
  name: string;
  title: string;
  firstJobDate: string;
  email: string;
  phone: string;
  address: string;
  birthDate: string;
  nationality: string;
  website: string;
  github: string;
  summary: string;
  photo: string;
}
export interface SkillCategorie {
  title: string;
  skills: string[];
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  stack: string[];
  logo: string;
}

export interface Education {
  degree: string;
  school: string;
  location: string;
  period: string;
  logo: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface Project {
  name: string;
  description: string;
  link: string;
  logo: string;
}
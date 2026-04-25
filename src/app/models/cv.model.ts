export interface CV {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  languages: Language[];
  projects: Project[];
  skills: string[];
}

export interface PersonalInfo {
  name: string;
  title: string;
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
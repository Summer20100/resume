export interface ResumeData {
  resume: {
    docName: string,
    personalInfo: {
      fullName: string;
      birthDate: string;
      maritalStatus: string;
      location: string;
      profile: string;
      status: string;
      statusPhoto: string;
      contacts: Array<{
        type: string;
        value: string;
        action?: 'phone' | 'whatsapp' | 'telegram' | 'viber' | 'email';
      }>;
    };
    education: Array<{
      period: string;
      institution: string;
      details: {
        program?: string;
        specialty?: string;
        specialization?: string;
        qualification: string;
      };
    }>;
    workExperience: Array<{
      period: string;
      company: string;
      location: string;
      position: string;
      responsibilities: string[];
    }>;
    trainings: Array<{
      date: string;
      name: string;
      certificateUrl?: string;
      certificateText?: string
    }>;
    additionalInfo: {
      skills: string[];
      achievements: string[];
      languages: Array<{
        language: string;
        level: string;
      }>;
      personalQualities: string[];
    };
  };
}
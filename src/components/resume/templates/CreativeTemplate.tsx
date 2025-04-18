
import { ResumeData } from "@/store/resumeStore";
import { formatDate } from "@/utils/formatDate";
import { AtSign, MapPin, Phone, Link as LinkIcon, Award, Briefcase, GraduationCap, Star } from "lucide-react";

interface CreativeTemplateProps {
  data: ResumeData;
}

const CreativeTemplate = ({ data }: CreativeTemplateProps) => {
  const { personalInfo, workExperience, education, skills, customSections } = data;

  // Group skills by level
  const skillLevels = {
    expert: skills.filter((skill) => skill.level === "expert"),
    advanced: skills.filter((skill) => skill.level === "advanced"),
    intermediate: skills.filter((skill) => skill.level === "intermediate"),
    beginner: skills.filter((skill) => skill.level === "beginner")
  };

  return (
    <div className="creative-template flex flex-col md:flex-row bg-white dark:bg-gray-900 rounded shadow-sm mx-auto">
      {/* Sidebar */}
      <div className="w-full md:w-1/3 bg-amber-500 dark:bg-amber-600 text-white p-6">
        <div className="mb-8 text-center">
          <div className="w-32 h-32 mx-auto bg-amber-400 dark:bg-amber-500 rounded-full mb-4 flex items-center justify-center">
            <span className="text-4xl font-bold">
              {personalInfo.firstName[0]}{personalInfo.lastName[0]}
            </span>
          </div>
          <h2 className="text-xl font-bold">Contact</h2>
          <div className="mt-4 space-y-2">
            {personalInfo.email && (
              <div className="flex items-center gap-3">
                <AtSign className="h-4 w-4" />
                <span className="text-sm">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4" />
                <span className="text-sm">{personalInfo.phone}</span>
              </div>
            )}
            {(personalInfo.city || personalInfo.state) && (
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">
                  {personalInfo.city}
                  {personalInfo.city && personalInfo.state && ", "}
                  {personalInfo.state}
                </span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-3">
                <LinkIcon className="h-4 w-4" />
                <span className="text-sm">{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center gap-3">
                <LinkIcon className="h-4 w-4" />
                <span className="text-sm">{personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Skills</h2>
            <div className="space-y-4">
              {Object.entries(skillLevels).map(([level, levelSkills]) =>
                levelSkills.length > 0 ? (
                  <div key={level}>
                    <h3 className="font-medium capitalize text-sm mb-2">{level}</h3>
                    <div className="space-y-2">
                      {levelSkills.map((skill) => (
                        <div key={skill.id} className="flex items-center">
                          <div className="flex-1 text-sm">{skill.name}</div>
                          <div className="w-1/2 h-1.5 bg-white/30 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-white rounded-full" 
                              style={{ 
                                width: skill.level === 'beginner' ? '25%' : 
                                       skill.level === 'intermediate' ? '50%' : 
                                       skill.level === 'advanced' ? '75%' : '100%' 
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null
              )}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-full md:w-2/3 p-6 dark:text-white">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          {personalInfo.title && (
            <h2 className="text-xl text-amber-500 dark:text-amber-400 font-medium">{personalInfo.title}</h2>
          )}
        </div>

        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3 border-b border-amber-200 dark:border-amber-700 pb-1">Profile</h2>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 border-b border-amber-200 dark:border-amber-700 pb-1">Experience</h2>
            <div className="space-y-5">
              {workExperience.map((job) => (
                <div key={job.id} className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-3 before:h-3 before:bg-amber-500 dark:before:bg-amber-400 before:rounded-full">
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <h3 className="font-bold">{job.position}</h3>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(job.startDate)} - {job.current ? "Present" : formatDate(job.endDate)}
                    </span>
                  </div>
                  <p className="text-sm text-amber-600 dark:text-amber-400">
                    {job.company}
                    {job.location && `, ${job.location}`}
                  </p>
                  <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">{job.description}</p>
                  {job.achievements.length > 0 && (
                    <ul className="mt-2 ml-4 text-sm list-disc text-gray-700 dark:text-gray-300">
                      {job.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 border-b border-amber-200 dark:border-amber-700 pb-1">Education</h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-3 before:h-3 before:bg-amber-500 dark:before:bg-amber-400 before:rounded-full">
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <h3 className="font-bold">{edu.degree} in {edu.field}</h3>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate)}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <p className="text-sm text-amber-600 dark:text-amber-400">
                      {edu.institution}
                      {edu.location && `, ${edu.location}`}
                    </p>
                    {edu.gpa && <p className="text-sm text-gray-600 dark:text-gray-400">GPA: {edu.gpa}</p>}
                  </div>
                  {edu.description && (
                    <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Custom Sections */}
        {customSections.map((section) => (
          <div key={section.id} className="mb-8">
            <h2 className="text-xl font-bold mb-4 border-b border-amber-200 dark:border-amber-700 pb-1">{section.title}</h2>
            <div className="space-y-4">
              {section.items.map((item) => (
                <div key={item.id} className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-3 before:h-3 before:bg-amber-500 dark:before:bg-amber-400 before:rounded-full">
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <h3 className="font-bold">{item.title}</h3>
                    {(item.startDate || item.endDate) && (
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {item.startDate && formatDate(item.startDate)}
                        {item.startDate && item.endDate && " - "}
                        {item.endDate && formatDate(item.endDate)}
                      </span>
                    )}
                  </div>
                  {item.subtitle && <p className="text-sm text-amber-600 dark:text-amber-400">{item.subtitle}</p>}
                  {item.description && <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">{item.description}</p>}
                  {item.bulletPoints.length > 0 && (
                    <ul className="mt-2 ml-4 text-sm list-disc text-gray-700 dark:text-gray-300">
                      {item.bulletPoints.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreativeTemplate;

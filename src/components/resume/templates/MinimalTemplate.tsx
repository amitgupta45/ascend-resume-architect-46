
import { ResumeData } from "@/store/resumeStore";
import { formatDate } from "@/utils/formatDate";
import { AtSign, MapPin, Phone, Link as LinkIcon } from "lucide-react";

interface MinimalTemplateProps {
  data: ResumeData;
}

const MinimalTemplate = ({ data }: MinimalTemplateProps) => {
  const { personalInfo, workExperience, education, skills, customSections } = data;

  return (
    <div className="minimal-template bg-white dark:bg-gray-900 rounded shadow-sm p-8 mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        {personalInfo.title && (
          <p className="text-xl text-gray-600 dark:text-gray-300 mt-1">{personalInfo.title}</p>
        )}
      </div>

      {/* Contact Info - Horizontal layout */}
      <div className="border-t border-b py-4 mb-6 border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-4 text-sm">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <AtSign className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
              <span className="dark:text-gray-300">{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
              <span className="dark:text-gray-300">{personalInfo.phone}</span>
            </div>
          )}
          
          {(personalInfo.city || personalInfo.state) && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
              <span className="dark:text-gray-300">
                {personalInfo.city}
                {personalInfo.city && personalInfo.state && ", "}
                {personalInfo.state}
              </span>
            </div>
          )}
          
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <LinkIcon className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
              <span className="dark:text-gray-300">{personalInfo.linkedin}</span>
            </div>
          )}
          
          {personalInfo.website && (
            <div className="flex items-center gap-1">
              <LinkIcon className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
              <span className="dark:text-gray-300">{personalInfo.website}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-6">
          <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">{personalInfo.summary}</p>
        </div>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Experience</h2>
          <div className="space-y-4">
            {workExperience.map((job) => (
              <div key={job.id}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <h3 className="font-bold text-gray-800 dark:text-gray-200">{job.position}</h3>
                  <span className="text-sm text-gray-600 dark:text-gray-400 mt-1 sm:mt-0">
                    {formatDate(job.startDate)} - {job.current ? "Present" : formatDate(job.endDate)}
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {job.company}
                  {job.location && `, ${job.location}`}
                </p>
                <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">{job.description}</p>
                {job.achievements.length > 0 && (
                  <ul className="mt-2 ml-5 text-sm list-disc text-gray-700 dark:text-gray-300">
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
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Education</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <h3 className="font-bold text-gray-800 dark:text-gray-200">{edu.degree} in {edu.field}</h3>
                  <span className="text-sm text-gray-600 dark:text-gray-400 mt-1 sm:mt-0">
                    {formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate)}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
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

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span 
                key={skill.id} 
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Custom Sections */}
      {customSections.map((section) => (
        <div key={section.id} className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{section.title}</h2>
          <div className="space-y-4">
            {section.items.map((item) => (
              <div key={item.id}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <h3 className="font-bold text-gray-800 dark:text-gray-200">{item.title}</h3>
                  {(item.startDate || item.endDate) && (
                    <span className="text-sm text-gray-600 dark:text-gray-400 mt-1 sm:mt-0">
                      {item.startDate && formatDate(item.startDate)}
                      {item.startDate && item.endDate && " - "}
                      {item.endDate && formatDate(item.endDate)}
                    </span>
                  )}
                </div>
                {item.subtitle && <p className="text-sm text-gray-700 dark:text-gray-300">{item.subtitle}</p>}
                {item.description && <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">{item.description}</p>}
                {item.bulletPoints.length > 0 && (
                  <ul className="mt-2 ml-5 text-sm list-disc text-gray-700 dark:text-gray-300">
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
  );
};

export default MinimalTemplate;

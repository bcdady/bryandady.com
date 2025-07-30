import React from 'react';
import styles from './ResumeRenderer.module.css';

export interface ResumeData {
  $schema?: string;
  meta?: {
    version?: string;
    canonical?: string;
    theme?: string;
  };
  basics: {
    name: string;
    label: string;
    image?: string;
    url?: string;
    summary: string;
    location?: {
      countryCode?: string;
      address?: string;
      city?: string;
      region?: string;
      postalCode?: string;
    };
    profiles?: Array<{
      network: string;
      username: string;
      url: string;
    }>;
    phone?: string;
    email?: string;
  };
  work?: Array<{
    name: string;
    position: string;
    startDate: string;
    endDate?: string;
    highlights?: string[];
    summary?: string;
    url?: string;
    location?: string;
    description?: string;
  }>;
  education?: Array<{
    institution: string;
    area: string;
    studyType: string;
    startDate: string;
    endDate: string;
    score?: string;
    courses?: string[];
    gpa?: string;
  }>;
  skills?: Array<{
    name: string;
    level?: string;
    keywords?: string[];
  }>;
  interests?: Array<{
    name: string;
    keywords?: string[];
  }>;
  projects?: Array<{
    name: string;
    startDate?: string;
    endDate?: string;
    summary: string;
    url?: string;
    description?: string;
    highlights?: string[];
    keywords?: string[];
  }>;
  references?: Array<{
    name: string;
    reference: string;
  }>;
  volunteer?: Array<{
    organization: string;
    position: string;
    url?: string;
    startDate: string;
    endDate?: string;
    summary?: string;
    highlights?: string[];
  }>;
  awards?: Array<{
    title: string;
    date: string;
    awarder: string;
    summary?: string;
  }>;
  publications?: Array<{
    name: string;
    publisher: string;
    releaseDate: string;
    url?: string;
    summary?: string;
  }>;
  languages?: Array<{
    language: string;
    fluency: string;
  }>;
}

interface ResumeRendererProps {
  resumeData: ResumeData;
}

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short'
  });
};

const formatDateRange = (startDate: string, endDate?: string): string => {
  const start = formatDate(startDate);
  const end = endDate ? formatDate(endDate) : 'Present';
  return `${start} - ${end}`;
};

const ProfileLinks: React.FC<{ profiles: ResumeData['basics']['profiles'] }> = ({ profiles }) => {
  if (!profiles || profiles.length === 0) return null;

  return (
    <div className={styles.profileLinks}>
      {profiles.map((profile, index) => (
        <a
          key={index}
          href={profile.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.profileLink}
        >
          {profile.network}: @{profile.username}
        </a>
      ))}
    </div>
  );
};

const WorkExperience: React.FC<{ work: ResumeData['work'] }> = ({ work }) => {
  if (!work || work.length === 0) return null;

  return (
    <section className={styles.section}>
      <h2>Work Experience</h2>
      {work.map((job, index) => (
        <div key={index} className={styles.workItem}>
          <div className={styles.workHeader}>
            <div>
              <h3 className={styles.jobTitle}>{job.position}</h3>
              <h4 className={styles.companyName}>
                {job.url ? (
                  <a href={job.url} target="_blank" rel="noopener noreferrer">
                    {job.name}
                  </a>
                ) : (
                  job.name
                )}
              </h4>
              {job.location && <span className={styles.location}>{job.location}</span>}
            </div>
            <div className={styles.dateRange}>
              {formatDateRange(job.startDate, job.endDate)}
            </div>
          </div>

          {job.summary && (
            <div className={styles.jobSummary}>
              {job.summary.split('\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          )}

          {job.highlights && job.highlights.length > 0 && (
            <ul className={styles.highlights}>
              {job.highlights.map((highlight, idx) => (
                <li key={idx}>{highlight}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </section>
  );
};

const Education: React.FC<{ education: ResumeData['education'] }> = ({ education }) => {
  if (!education || education.length === 0) return null;

  return (
    <section className={styles.section}>
      <h2>Education</h2>
      {education.map((edu, index) => (
        <div key={index} className={styles.educationItem}>
          <div className={styles.educationHeader}>
            <div>
              <h3 className={styles.degree}>{edu.studyType} in {edu.area}</h3>
              <h4 className={styles.institution}>{edu.institution}</h4>
            </div>
            <div className={styles.dateRange}>
              {formatDateRange(edu.startDate, edu.endDate)}
            </div>
          </div>
          {edu.score && (
            <p className={styles.score}>Score: {edu.score}</p>
          )}
        </div>
      ))}
    </section>
  );
};

const Projects: React.FC<{ projects: ResumeData['projects'] }> = ({ projects }) => {
  if (!projects || projects.length === 0) return null;

  return (
    <section className={styles.section}>
      <h2>Projects</h2>
      {projects.map((project, index) => (
        <div key={index} className={styles.projectItem}>
          <div className={styles.projectHeader}>
            <h3 className={styles.projectName}>
              {project.url ? (
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  {project.name}
                </a>
              ) : (
                project.name
              )}
            </h3>
            {project.startDate && (
              <div className={styles.dateRange}>
                {formatDateRange(project.startDate, project.endDate)}
              </div>
            )}
          </div>
          <div className={styles.projectSummary}>
            {project.summary.split('\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

const Interests: React.FC<{ interests: ResumeData['interests'] }> = ({ interests }) => {
  if (!interests || interests.length === 0) return null;

  return (
    <section className={styles.section}>
      <h2>Interests</h2>
      <ul className={styles.interestsList}>
        {interests.map((interest, index) => (
          <li key={index}>{interest.name}</li>
        ))}
      </ul>
    </section>
  );
};

const References: React.FC<{ references: ResumeData['references'] }> = ({ references }) => {
  if (!references || references.length === 0) return null;

  return (
    <section className={styles.section}>
      <h2>References</h2>
      {references.map((ref, index) => (
        <div key={index} className={styles.referenceItem}>
          <h4 className={styles.referenceName}>{ref.name}</h4>
          <blockquote className={styles.referenceText}>
            "{ref.reference}"
          </blockquote>
        </div>
      ))}
    </section>
  );
};

const ResumeRenderer: React.FC<ResumeRendererProps> = ({ resumeData }) => {
  const { basics, work, education, projects, interests, references } = resumeData;

  return (
    <div className={styles.resume}>
      {/* Header Section */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          {basics.image && (
            <img
              src={basics.image}
              alt={`${basics.name} profile`}
              className={styles.profileImage}
            />
          )}
          <div className={styles.basicInfo}>
            <h1 className={styles.name}>{basics.name}</h1>
            <h2 className={styles.label}>{basics.label}</h2>
            {basics.location && (
              <p className={styles.location}>
                {basics.location.address}
              </p>
            )}
            {basics.url && (
              <a
                href={basics.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.websiteLink}
              >
                {basics.url}
              </a>
            )}
            <ProfileLinks profiles={basics.profiles} />
          </div>
        </div>

        {basics.summary && (
          <div className={styles.summary}>
            <h3>Professional Summary</h3>
            <p>{basics.summary}</p>
          </div>
        )}
      </header>

      {/* Main Content Sections */}
      <main>
        <WorkExperience work={work} />
        <Education education={education} />
        <Projects projects={projects} />
        <Interests interests={interests} />
        <References references={references} />
      </main>
    </div>
  );
};

export { ResumeRenderer };
export default ResumeRenderer;

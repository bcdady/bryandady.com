import React from 'react';
import styles from './ResumeMetadata.module.css';

interface ResumeMetadata {
  file: {
    path: string;
    lastModified: string;
    lastModifiedFormatted: string;
    lastModifiedRelative: string;
    size: number;
    sizeFormatted: string;
  };
  resume: {
    name: string;
    label: string;
    schemaVersion: string;
    workExperienceCount: number;
    educationCount: number;
    projectsCount: number;
    referencesCount: number;
  };
  generated: {
    timestamp: string;
    timestampFormatted: string;
    buildTime: string;
  };
}

interface ResumeMetadataProps {
  metadata: ResumeMetadata;
  showDetailed?: boolean;
  variant?: 'compact' | 'detailed' | 'inline';
}

const MetadataStat: React.FC<{ label: string; value: string | number; icon?: string }> = ({
  label,
  value,
  icon
}) => (
  <div className={styles.stat}>
    {icon && <span className={styles.statIcon}>{icon}</span>}
    <div className={styles.statContent}>
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  </div>
);

const CompactMetadata: React.FC<{ metadata: ResumeMetadata }> = ({ metadata }) => (
  <div className={styles.compactMetadata}>
    <span className={styles.lastUpdated}>
      Last updated: <strong>{metadata.file.lastModifiedFormatted}</strong>
      <span className={styles.relative}> ({metadata.file.lastModifiedRelative})</span>
    </span>
  </div>
);

const InlineMetadata: React.FC<{ metadata: ResumeMetadata }> = ({ metadata }) => (
  <span className={styles.inlineMetadata}>
    Last updated: <strong>{metadata.file.lastModifiedFormatted}</strong> ({metadata.file.lastModifiedRelative})
  </span>
);

const DetailedMetadata: React.FC<{ metadata: ResumeMetadata }> = ({ metadata }) => (
  <div className={styles.detailedMetadata}>
    <div className={styles.metadataHeader}>
      <h4 className={styles.metadataTitle}>Resume Statistics</h4>
      <div className={styles.schemaInfo}>
        JSON Resume Schema {metadata.resume.schemaVersion}
      </div>
    </div>

    <div className={styles.metadataGrid}>
      <div className={styles.metadataSection}>
        <h5 className={styles.sectionTitle}>File Information</h5>
        <div className={styles.statsGrid}>
          <MetadataStat
            label="Last Modified"
            value={metadata.file.lastModifiedFormatted}
            icon="📅"
          />
          <MetadataStat
            label="File Size"
            value={metadata.file.sizeFormatted}
            icon="📄"
          />
          <MetadataStat
            label="Updated"
            value={metadata.file.lastModifiedRelative}
            icon="⏱️"
          />
        </div>
      </div>

      <div className={styles.metadataSection}>
        <h5 className={styles.sectionTitle}>Content Summary</h5>
        <div className={styles.statsGrid}>
          <MetadataStat
            label="Work Experience"
            value={metadata.resume.workExperienceCount}
            icon="💼"
          />
          <MetadataStat
            label="Education"
            value={metadata.resume.educationCount}
            icon="🎓"
          />
          <MetadataStat
            label="Projects"
            value={metadata.resume.projectsCount}
            icon="🚀"
          />
          <MetadataStat
            label="References"
            value={metadata.resume.referencesCount}
            icon="✨"
          />
        </div>
      </div>
    </div>

    <div className={styles.technicalInfo}>
      <small className={styles.technicalText}>
        Built with React • Generated at {metadata.generated.timestampFormatted} •
        Environment: {metadata.generated.buildTime}
      </small>
    </div>
  </div>
);

export const ResumeMetadata: React.FC<ResumeMetadataProps> = ({
  metadata,
  variant = 'compact'
}) => {
  const renderVariant = () => {
    switch (variant) {
      case 'detailed':
        return <DetailedMetadata metadata={metadata} />;
      case 'inline':
        return <InlineMetadata metadata={metadata} />;
      case 'compact':
      default:
        return <CompactMetadata metadata={metadata} />;
    }
  };

  return (
    <div className={`${styles.resumeMetadata} ${styles[variant]}`}>
      {renderVariant()}
    </div>
  );
};

export default ResumeMetadata;

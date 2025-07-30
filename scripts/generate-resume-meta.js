#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Script to generate resume metadata at build time
 * This creates a metadata file with file modification dates and other info
 */

const RESUME_FILE_PATH = path.join(__dirname, '../docs/professional/Bryan_Dady.resume.json');
const OUTPUT_FILE_PATH = path.join(__dirname, '../src/data/resume-metadata.json');

function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function getRelativeTime(date) {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`;

  const years = Math.ceil(diffDays / 365);
  return years === 1 ? '1 year ago' : `${years} years ago`;
}

async function generateResumeMetadata() {
  try {
    console.log('Generating resume metadata...');

    // Check if resume file exists
    if (!fs.existsSync(RESUME_FILE_PATH)) {
      throw new Error(`Resume file not found: ${RESUME_FILE_PATH}`);
    }

    // Get file stats
    const stats = fs.statSync(RESUME_FILE_PATH);

    // Read resume content to get basic info
    const resumeContent = fs.readFileSync(RESUME_FILE_PATH, 'utf8');
    const resumeData = JSON.parse(resumeContent);

    // Generate metadata
    const metadata = {
      file: {
        path: 'docs/professional/Bryan_Dady.resume.json',
        lastModified: stats.mtime.toISOString(),
        lastModifiedFormatted: formatDate(stats.mtime),
        lastModifiedRelative: getRelativeTime(stats.mtime),
        size: stats.size,
        sizeFormatted: formatFileSize(stats.size)
      },
      resume: {
        name: resumeData.basics?.name || 'Unknown',
        label: resumeData.basics?.label || 'Unknown',
        schemaVersion: resumeData.meta?.version || resumeData.$schema ? 'v1.0.0' : 'Unknown',
        workExperienceCount: resumeData.work?.length || 0,
        educationCount: resumeData.education?.length || 0,
        projectsCount: resumeData.projects?.length || 0,
        referencesCount: resumeData.references?.length || 0
      },
      generated: {
        timestamp: new Date().toISOString(),
        timestampFormatted: formatDate(new Date()),
        buildTime: process.env.NODE_ENV || 'development'
      }
    };

    // Ensure output directory exists
    const outputDir = path.dirname(OUTPUT_FILE_PATH);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write metadata file
    fs.writeFileSync(OUTPUT_FILE_PATH, JSON.stringify(metadata, null, 2), 'utf8');

    console.log(`✅ Resume metadata generated successfully:`);
    console.log(`   File: ${path.relative(process.cwd(), OUTPUT_FILE_PATH)}`);
    console.log(`   Resume last modified: ${metadata.file.lastModifiedFormatted} (${metadata.file.lastModifiedRelative})`);
    console.log(`   File size: ${metadata.file.sizeFormatted}`);
    console.log(`   Work experience entries: ${metadata.resume.workExperienceCount}`);

  } catch (error) {
    console.error('❌ Error generating resume metadata:', error.message);
    process.exit(1);
  }
}

// Run the script if called directly
if (require.main === module) {
  generateResumeMetadata();
}

module.exports = { generateResumeMetadata };

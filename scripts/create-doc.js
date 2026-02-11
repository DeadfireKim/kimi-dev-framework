#!/usr/bin/env node
/**
 * KDF Document Creator v2.0
 * PRD, Architecture, Story, Review, Retro, ADR 문서를 생성합니다.
 * 
 * 사용법:
 *   node create-doc.js prd {feature} [--project={name}]
 *   node create-doc.js arch {system} [--tier={tier}]
 *   node create-doc.js story {title} [--epic={epic}] [--points={n}]
 *   node create-doc.js review {target} [--scope={scope}]
 *   node create-doc.js retro {sprint}
 *   node create-doc.js adr {title} [--number={n}]
 */

const fs = require('fs');
const path = require('path');

const TEMPLATES_DIR = path.join(__dirname, '..', 'templates');

function loadStatus() {
  const statusPath = '.kdf/status.json';
  if (fs.existsSync(statusPath)) {
    return JSON.parse(fs.readFileSync(statusPath, 'utf8'));
  }
  return null;
}

function loadTemplate(templateName) {
  const templatePath = path.join(TEMPLATES_DIR, `${templateName}-template.md`);
  if (!fs.existsSync(templatePath)) {
    console.error(`❌ Template not found: ${templatePath}`);
    process.exit(1);
  }
  return fs.readFileSync(templatePath, 'utf8');
}

function fillTemplate(template, variables) {
  let result = template;
  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
    result = result.replace(regex, value || '');
  }
  // Clean up remaining placeholders
  result = result.replace(/\{\{\w+\}\}/g, '');
  return result;
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function generateId(prefix) {
  return `${prefix}-${Date.now()}`;
}

function getToday() {
  return new Date().toISOString().split('T')[0];
}

function createPRD(featureName, options = {}) {
  const status = loadStatus();
  const template = loadTemplate('prd');
  
  const variables = {
    FEATURE_NAME: featureName,
    DATE: getToday(),
    PROJECT_NAME: options.project || status?.project?.name || 'Unknown',
    TIER: options.tier || status?.project?.tier || 'basic',
    STATUS: 'Draft'
  };
  
  const content = fillTemplate(template, variables);
  const outputDir = '.kdf/active';
  ensureDir(outputDir);
  const outputPath = path.join(outputDir, `prd-${featureName}.md`);
  
  fs.writeFileSync(outputPath, content);
  console.log(`✅ Created PRD: ${outputPath}`);
  console.log(`   Next: Edit the PRD with your requirements`);
  return outputPath;
}

function createArchitecture(systemName, options = {}) {
  const status = loadStatus();
  const template = loadTemplate('arch');
  
  const variables = {
    SYSTEM_NAME: systemName,
    DATE: getToday(),
    TIER: options.tier || status?.project?.tier || 'basic',
    STATUS: 'Draft'
  };
  
  const content = fillTemplate(template, variables);
  const outputDir = '.kdf/active';
  ensureDir(outputDir);
  const outputPath = path.join(outputDir, `arch-${systemName}.md`);
  
  fs.writeFileSync(outputPath, content);
  console.log(`✅ Created Architecture: ${outputPath}`);
  return outputPath;
}

function createStory(storyTitle, options = {}) {
  const status = loadStatus();
  const template = loadTemplate('story');
  const storyId = generateId('story');
  
  const variables = {
    STORY_ID: storyId,
    STORY_TITLE: storyTitle,
    EPIC: options.epic || 'General',
    DATE: getToday(),
    PRIORITY: options.priority || 'medium',
    POINTS: options.points || '3'
  };
  
  const content = fillTemplate(template, variables);
  const outputDir = '.kdf/backlog/stories';
  ensureDir(outputDir);
  const outputPath = path.join(outputDir, `${storyId}.md`);
  
  fs.writeFileSync(outputPath, content);
  
  // Update status if available
  if (status && status.pdca.current) {
    const feature = status.features.find(f => f.name === status.pdca.current);
    if (feature) {
      feature.stories.push(storyId);
      fs.writeFileSync('.kdf/status.json', JSON.stringify(status, null, 2));
    }
  }
  
  console.log(`✅ Created Story: ${outputPath}`);
  console.log(`   ID: ${storyId}`);
  console.log(`   Next: /agile task ${storyId} to break down into tasks`);
  return outputPath;
}

function createReview(target, options = {}) {
  const template = loadTemplate('review');
  const timestamp = Date.now();
  
  const variables = {
    REVIEW_TARGET: target,
    SCOPE: options.scope || 'feature',
    REVIEWER: 'KDF',
    DATE: getToday(),
    STATUS: 'In Progress',
    DECISION: 'PENDING',
    TOTAL_SCORE: 'TBD',
    P0_COUNT: '0',
    P1_COUNT: '0',
    P2_COUNT: '0',
    P3_COUNT: '0'
  };
  
  const content = fillTemplate(template, variables);
  const outputDir = '.kdf/active';
  ensureDir(outputDir);
  const outputPath = path.join(outputDir, `review-${target}-${timestamp}.md`);
  
  fs.writeFileSync(outputPath, content);
  console.log(`✅ Created Review Template: ${outputPath}`);
  console.log(`   Fill in the review results`);
  return outputPath;
}

function createRetro(sprintName, options = {}) {
  const template = loadTemplate('retro');
  const status = loadStatus();
  
  // Find sprint info
  const sprint = status?.sprints?.find(s => s.id === sprintName);
  
  const variables = {
    SPRINT_NAME: sprintName,
    START_DATE: sprint?.start_date ? sprint.start_date.split('T')[0] : getToday(),
    END_DATE: getToday(),
    ATTENDEES: 'Team',
    SPRINT_GOAL: options.goal || 'N/A',
    PLANNED_POINTS: options.plannedPoints || 'N/A',
    COMPLETED_POINTS: options.completedPoints || 'N/A',
    ACHIEVEMENT_RATE: options.achievementRate || 'N/A'
  };
  
  const content = fillTemplate(template, variables);
  const outputDir = '.kdf/active';
  ensureDir(outputDir);
  const outputPath = path.join(outputDir, `retro-${sprintName}.md`);
  
  fs.writeFileSync(outputPath, content);
  console.log(`✅ Created Retro Template: ${outputPath}`);
  console.log(`   Conduct the retrospective and fill in the results`);
  return outputPath;
}

function createADR(title, options = {}) {
  const template = loadTemplate('adr');
  const adrNumber = options.number || 'XXX';
  
  const variables = {
    NUMBER: adrNumber,
    TITLE: title,
    STATUS: 'Proposed',
    DATE: getToday(),
    DECISION_MAKERS: 'Team',
    AUTHOR: 'KDF',
    CONTEXT: 'Describe the context here',
    DECISION: 'Describe the decision here',
    POSITIVE_CONSEQUENCES: 'List positive outcomes',
    NEGATIVE_CONSEQUENCES: 'List negative outcomes'
  };
  
  const content = fillTemplate(template, variables);
  const outputDir = '.kdf/active';
  ensureDir(outputDir);
  const outputPath = path.join(outputDir, `adr-${adrNumber.toString().padStart(3, '0')}-${title.toLowerCase().replace(/\s+/g, '-')}.md`);
  
  fs.writeFileSync(outputPath, content);
  console.log(`✅ Created ADR: ${outputPath}`);
  console.log(`   Document your architecture decision`);
  return outputPath;
}

function parseOptions(args) {
  const options = {};
  for (let i = 2; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--')) {
      const equalIndex = arg.indexOf('=');
      if (equalIndex > 0) {
        const key = arg.substring(2, equalIndex);
        const value = arg.substring(equalIndex + 1);
        options[key] = value;
      } else {
        options[arg.substring(2)] = true;
      }
    }
  }
  return options;
}

function main() {
  const args = process.argv.slice(2);
  const type = args[0];
  const name = args[1];
  const options = parseOptions(args);
  
  if (!type || !name || args.includes('--help')) {
    console.log('KDF Document Creator v2.0\n');
    console.log('Usage:');
    console.log('  create-doc.js prd {feature} [--project={name}]');
    console.log('  create-doc.js arch {system} [--tier={tier}]');
    console.log('  create-doc.js story {title} [--epic={epic}] [--points={n}] [--priority={p}]');
    console.log('  create-doc.js review {target} [--scope={scope}]');
    console.log('  create-doc.js retro {sprint} [--goal={goal}]');
    console.log('  create-doc.js adr {title} [--number={n}]');
    process.exit(1);
  }
  
  switch (type) {
    case 'prd':
      createPRD(name, options);
      break;
    case 'arch':
    case 'architecture':
      createArchitecture(name, options);
      break;
    case 'story':
    case 'user-story':
      createStory(name, options);
      break;
    case 'review':
    case 'code-review':
      createReview(name, options);
      break;
    case 'retro':
    case 'retrospective':
      createRetro(name, options);
      break;
    case 'adr':
    case 'decision':
      createADR(name, options);
      break;
    default:
      console.error(`❌ Unknown document type: ${type}`);
      console.error('   Valid types: prd, arch, story, review, retro, adr');
      process.exit(1);
  }
}

main();

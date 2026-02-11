#!/usr/bin/env node
/**
 * KDF Status Manager v2.0
 * PDCA 및 개발 상태를 관리합니다.
 * 
 * 사용법: 
 *   node status-manager.js get                    - 상태 출력
 *   node status-manager.js pdca-start {feature}   - PDCA 시작
 *   node status-manager.js pdca-advance           - PDCA 다음 단계
 *   node status-manager.js pdca-set {stage}       - PDCA 단계 설정
 *   node status-manager.js feature-add {name}     - 기능 추가
 *   node status-manager.js feature-complete {name} - 기능 완료
 *   node status-manager.js quality {score}        - 품질 점수 설정
 *   node status-manager.js sprint-start {name}    - 스프린트 시작
 *   node status-manager.js sprint-end             - 스프린트 종료
 */

const fs = require('fs');
const path = require('path');

const STATUS_FILE = '.kdf/status.json';
const VALID_PDCA_STAGES = ['plan', 'do', 'check', 'act', 'complete'];
const VALID_PHASES = ['discover', 'define', 'design', 'plan', 'develop', 'review', 'test', 'deploy', 'iterate'];

function loadStatus() {
  if (!fs.existsSync(STATUS_FILE)) {
    console.error('❌ KDF not initialized. Run: node init-project.js {name}');
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(STATUS_FILE, 'utf8'));
}

function saveStatus(status) {
  status.last_updated = new Date().toISOString();
  fs.writeFileSync(STATUS_FILE, JSON.stringify(status, null, 2));
}

function formatDate(isoString) {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);
  return date.toLocaleDateString('ko-KR');
}

function getStatus() {
  const status = loadStatus();
  
  console.log('');
  console.log('╔═══════════════════════════════════════════════════╗');
  console.log('║           📊 KDF Project Status                    ║');
  console.log('╠═══════════════════════════════════════════════════╣');
  console.log(`║  Project: ${status.project.name.padEnd(37)} ║`);
  console.log(`║  Level:   ${status.project.level.toUpperCase().padEnd(37)} ║`);
  console.log(`║  Phase:   ${status.project.phase.padEnd(37)} ║`);
  console.log(`║  Created: ${formatDate(status.project.created_at).padEnd(37)} ║`);
  console.log('╠═══════════════════════════════════════════════════╣');
  
  // PDCA Status
  if (status.pdca.current) {
    console.log('║  🔄 Active PDCA Cycle                             ║');
    console.log(`║     Feature:    ${status.pdca.current.padEnd(29)} ║`);
    console.log(`║     Stage:      ${status.pdca.stage.padEnd(29)} ║`);
    console.log(`║     Iterations: ${String(status.pdca.iterations).padEnd(29)} ║`);
    console.log(`║     Quality:    ${String(status.pdca.quality_score + '%').padEnd(29)} ║`);
    console.log('╠═══════════════════════════════════════════════════╣');
  }
  
  // Current Sprint
  if (status.project.current_sprint) {
    const sprint = status.sprints.find(s => s.id === status.project.current_sprint);
    if (sprint) {
      console.log('║  📅 Active Sprint                                 ║');
      console.log(`║     ID:     ${sprint.id.padEnd(31)} ║`);
      console.log(`║     Status: ${sprint.status.padEnd(31)} ║`);
      console.log(`║     Stories: ${String(sprint.stories?.length || 0).padEnd(30)} ║`);
      console.log('╠═══════════════════════════════════════════════════╣');
    }
  }
  
  // Features Summary
  const totalFeatures = status.features.length;
  const inProgress = status.features.filter(f => f.status === 'in_progress').length;
  const completed = status.features.filter(f => f.status === 'completed').length;
  
  console.log('║  📋 Features                                      ║');
  console.log(`║     Total:      ${String(totalFeatures).padEnd(29)} ║`);
  console.log(`║     In Progress: ${String(inProgress).padEnd(28)} ║`);
  console.log(`║     Completed:   ${String(completed).padEnd(28)} ║`);
  console.log('╠═══════════════════════════════════════════════════╣');
  
  // Metrics
  console.log('║  📈 Metrics                                       ║');
  console.log(`║     Stories: ${String(status.metrics.completed_stories + '/' + status.metrics.total_stories).padEnd(31)} ║`);
  console.log(`║     Avg Quality: ${String(status.metrics.average_quality + '%').padEnd(27)} ║`);
  console.log('╚═══════════════════════════════════════════════════╝');
  console.log('');
  
  // In Progress Features Detail
  const activeFeatures = status.features.filter(f => f.status === 'in_progress');
  if (activeFeatures.length > 0) {
    console.log('📝 In Progress Features:');
    activeFeatures.forEach(f => {
      const quality = f.quality_score ? ` (Quality: ${f.quality_score}%)` : '';
      console.log(`   • ${f.name}: ${f.pdca_stage}${quality}`);
    });
    console.log('');
  }
  
  // Next Action
  suggestNextAction(status);
}

function suggestNextAction(status) {
  console.log('💡 Suggested Next Action:');
  
  if (!status.pdca.current) {
    console.log('   Run: /pdca plan {feature} to start a new PDCA cycle');
  } else {
    const stage = status.pdca.stage;
    const suggestions = {
      plan: '/pdca do ' + status.pdca.current,
      do: '/pdca check ' + status.pdca.current,
      check: status.pdca.quality_score >= 90 
        ? `/pdca next (Quality ${status.pdca.quality_score}% >= 90%, ready to complete)` 
        : `/pdca act ${status.pdca.current} (Quality ${status.pdca.quality_score}% < 90%)`,
      act: `/pdca check ${status.pdca.current} (re-evaluate after improvements)`,
      complete: `/pdca plan {new-feature}`
    };
    console.log(`   Current stage: ${stage}`);
    console.log(`   Run: ${suggestions[stage] || '/pdca status'}`);
  }
  console.log('');
}

function startPDCA(featureName) {
  const status = loadStatus();
  
  // Check if already exists
  const existingIndex = status.features.findIndex(f => f.name === featureName);
  
  if (existingIndex >= 0) {
    // Resume existing
    status.pdca.current = featureName;
    status.pdca.stage = status.features[existingIndex].pdca_stage || 'plan';
    status.pdca.iterations = status.features[existingIndex].iterations || 0;
    status.pdca.quality_score = status.features[existingIndex].quality_score || 0;
    console.log(`🔄 Resuming PDCA for: ${featureName}`);
    console.log(`   Current stage: ${status.pdca.stage}`);
  } else {
    // Create new
    const newFeature = {
      name: featureName,
      status: 'in_progress',
      pdca_stage: 'plan',
      stories: [],
      quality_score: 0,
      iterations: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    status.features.push(newFeature);
    status.pdca.current = featureName;
    status.pdca.stage = 'plan';
    status.pdca.iterations = 0;
    status.pdca.quality_score = 0;
    status.metrics.total_features++;
    console.log(`🆕 Started new PDCA for: ${featureName}`);
  }
  
  saveStatus(status);
  console.log(`   Next: Create PRD at .kdf/active/prd-${featureName}.md`);
}

function advancePDCA() {
  const status = loadStatus();
  
  if (!status.pdca.current) {
    console.error('❌ No active PDCA. Start with: /pdca plan {feature}');
    return;
  }
  
  const stages = ['plan', 'do', 'check', 'act'];
  const currentIdx = stages.indexOf(status.pdca.stage);
  
  if (currentIdx < stages.length - 1) {
    const newStage = stages[currentIdx + 1];
    status.pdca.stage = newStage;
    status.pdca.iterations++;
    
    const feature = status.features.find(f => f.name === status.pdca.current);
    if (feature) {
      feature.pdca_stage = newStage;
      feature.iterations = status.pdca.iterations;
      feature.updated_at = new Date().toISOString();
    }
    
    saveStatus(status);
    console.log(`➡️  Advanced to: ${newStage}`);
    
    // Suggest next action
    const suggestions = {
      plan: 'Create PRD: Work on .kdf/active/prd-*.md',
      do: 'Implement: /agile story {title}',
      check: 'Review: /dev review',
      act: 'Improve: Apply fixes from review'
    };
    console.log(`   Next: ${suggestions[newStage]}`);
  } else {
    // At 'act', check quality for completion
    if (status.pdca.quality_score >= 90) {
      completeFeature(status.pdca.current);
    } else {
      console.log('⚠️  Quality score below 90%. Run /pdca act to improve or force complete with /pdca-set complete');
    }
  }
}

function setPDCAStage(stage) {
  const status = loadStatus();
  
  if (!VALID_PDCA_STAGES.includes(stage)) {
    console.error(`❌ Invalid stage: ${stage}`);
    console.error(`   Valid stages: ${VALID_PDCA_STAGES.join(', ')}`);
    return;
  }
  
  if (!status.pdca.current) {
    console.error('❌ No active PDCA. Start with: /pdca plan {feature}');
    return;
  }
  
  status.pdca.stage = stage;
  
  const feature = status.features.find(f => f.name === status.pdca.current);
  if (feature) {
    feature.pdca_stage = stage;
    feature.updated_at = new Date().toISOString();
  }
  
  saveStatus(status);
  console.log(`✅ PDCA stage updated to: ${stage}`);
  
  if (stage === 'complete') {
    completeFeature(status.pdca.current);
  }
}

function completeFeature(featureName) {
  const status = loadStatus();
  
  const feature = status.features.find(f => f.name === featureName);
  if (feature) {
    feature.status = 'completed';
    feature.pdca_stage = 'complete';
    feature.completed_at = new Date().toISOString();
    status.metrics.completed_features++;
    
    // Move active docs to completed
    const activeDir = '.kdf/active';
    const completedDir = '.kdf/completed';
    
    ['prd', 'arch', 'design'].forEach(docType => {
      const src = path.join(activeDir, `${docType}-${featureName}.md`);
      if (fs.existsSync(src)) {
        const dst = path.join(completedDir, `${docType}-${featureName}-${Date.now()}.md`);
        fs.copyFileSync(src, dst);
        fs.unlinkSync(src);
      }
    });
  }
  
  // Reset PDCA
  status.pdca.current = null;
  status.pdca.stage = null;
  status.pdca.iterations = 0;
  status.pdca.quality_score = 0;
  
  saveStatus(status);
  console.log(`🎉 Feature "${featureName}" completed!`);
  console.log(`   Documents moved to .kdf/completed/`);
}

function addFeature(name) {
  const status = loadStatus();
  
  if (status.features.find(f => f.name === name)) {
    console.error(`❌ Feature "${name}" already exists`);
    return;
  }
  
  status.features.push({
    name: name,
    status: 'backlog',
    pdca_stage: null,
    stories: [],
    quality_score: 0,
    iterations: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  });
  
  status.metrics.total_features++;
  saveStatus(status);
  console.log(`✅ Feature "${name}" added to backlog`);
}

function setQuality(score) {
  const status = loadStatus();
  const qualityScore = parseInt(score, 10);
  
  if (isNaN(qualityScore) || qualityScore < 0 || qualityScore > 100) {
    console.error('❌ Quality score must be between 0 and 100');
    return;
  }
  
  status.pdca.quality_score = qualityScore;
  
  const feature = status.features.find(f => f.name === status.pdca.current);
  if (feature) {
    feature.quality_score = qualityScore;
    feature.updated_at = new Date().toISOString();
  }
  
  // Update average quality
  const completedFeatures = status.features.filter(f => f.quality_score > 0);
  if (completedFeatures.length > 0) {
    const totalQuality = completedFeatures.reduce((sum, f) => sum + f.quality_score, qualityScore);
    status.metrics.average_quality = Math.round(totalQuality / (completedFeatures.length + 1));
  }
  
  saveStatus(status);
  console.log(`✅ Quality score set to: ${qualityScore}%`);
  
  if (qualityScore >= 90) {
    console.log('   🎉 Quality threshold met! Ready to complete.');
  } else {
    console.log(`   ⚠️  Below threshold (90%). Run /pdca act to improve.`);
  }
}

function startSprint(name) {
  const status = loadStatus();
  
  // End current sprint if exists
  if (status.project.current_sprint) {
    const currentSprint = status.sprints.find(s => s.id === status.project.current_sprint);
    if (currentSprint) {
      currentSprint.status = 'completed';
      currentSprint.completed_at = new Date().toISOString();
    }
  }
  
  // Create new sprint
  const sprint = {
    id: name,
    status: 'active',
    stories: [],
    start_date: new Date().toISOString(),
    completed_at: null
  };
  
  status.sprints.push(sprint);
  status.project.current_sprint = name;
  status.project.phase = 'develop';
  
  saveStatus(status);
  console.log(`🚀 Sprint "${name}" started!`);
}

function endSprint() {
  const status = loadStatus();
  
  if (!status.project.current_sprint) {
    console.error('❌ No active sprint');
    return;
  }
  
  const sprint = status.sprints.find(s => s.id === status.project.current_sprint);
  if (sprint) {
    sprint.status = 'completed';
    sprint.completed_at = new Date().toISOString();
    
    // Count completed stories
    const completedStories = sprint.stories.filter(s => {
      // Check story file for completion status
      const storyPath = `.kdf/backlog/stories/${s}.md`;
      if (fs.existsSync(storyPath)) {
        const content = fs.readFileSync(storyPath, 'utf8');
        return content.includes('- [x] 코드 작성 완료') || content.includes('- [x] PO 승인');
      }
      return false;
    });
    
    console.log(`📊 Sprint "${sprint.id}" completed!`);
    console.log(`   Stories: ${completedStories.length}/${sprint.stories.length} completed`);
    
    // Move incomplete stories back to backlog
    const incompleteStories = sprint.stories.filter(s => !completedStories.includes(s));
    if (incompleteStories.length > 0) {
      console.log(`   ${incompleteStories.length} stories moved back to backlog`);
    }
  }
  
  status.project.current_sprint = null;
  saveStatus(status);
  
  console.log('\n💡 Next: Run /dev retro to conduct retrospective');
}

function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  switch (command) {
    case 'get':
    case 'status':
      getStatus();
      break;
    case 'pdca-start':
      startPDCA(args[1]);
      break;
    case 'pdca-advance':
      advancePDCA();
      break;
    case 'pdca-set':
      setPDCAStage(args[1]);
      break;
    case 'feature-add':
      addFeature(args[1]);
      break;
    case 'feature-complete':
      completeFeature(args[1]);
      break;
    case 'quality':
      setQuality(args[1]);
      break;
    case 'sprint-start':
      startSprint(args[1]);
      break;
    case 'sprint-end':
      endSprint();
      break;
    default:
      console.log('KDF Status Manager v2.0\n');
      console.log('Usage:');
      console.log('  status-manager.js get                    - Show status');
      console.log('  status-manager.js pdca-start {name}      - Start PDCA cycle');
      console.log('  status-manager.js pdca-advance           - Advance to next stage');
      console.log('  status-manager.js pdca-set {stage}       - Set PDCA stage');
      console.log('  status-manager.js feature-add {name}     - Add feature to backlog');
      console.log('  status-manager.js feature-complete {name} - Complete feature');
      console.log('  status-manager.js quality {0-100}        - Set quality score');
      console.log('  status-manager.js sprint-start {name}    - Start sprint');
      console.log('  status-manager.js sprint-end             - End sprint');
  }
}

main();

const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, 'specs', 'config', 'TechSpecsConfig.md');
const OUTPUT_PATH = path.join(__dirname, 'specs', 'config', 'tech-specs-config.js');

if (!fs.existsSync(CONFIG_PATH)) {
  console.error('Erro: TechSpecsConfig.md não encontrado em', CONFIG_PATH);
  process.exit(1);
}

const content = fs.readFileSync(CONFIG_PATH, 'utf-8');

const lines = content.split('\n');

let sections = [];
let currentSection = null;
let currentLines = [];
let inTechSection = false;

const TARGET_SECTIONS = {
  '## Frontend': '## Frontend',
  '## Backend': '## Backend',
};

for (const line of lines) {
  const trimmed = line.trimEnd();

  if (line.startsWith('# ') && trimmed === '# Requisitos Técnicos') {
    inTechSection = true;
    currentSection = '## Requisitos Técnicos';
    currentLines = ['## Requisitos Técnicos'];
    continue;
  }

  if (!inTechSection) continue;

  if (line.startsWith('# ') && trimmed !== '# Requisitos Técnicos') break;

  if (TARGET_SECTIONS[trimmed]) {
    sections.push({ name: currentSection, body: currentLines.join('\n') });
    currentSection = trimmed;
    currentLines = [trimmed];
    continue;
  }

  // Pula o sub-header "## Geral"
  if (trimmed === '## Geral') continue;

  currentLines.push(line);
}

if (currentSection) {
  sections.push({ name: currentSection, body: currentLines.join('\n') });
}

const md = sections.map(s => s.body.trim()).join('\n\n');

const jsContent = `// Gerado automaticamente por build-specs.js
// NÃO edite manualmente. Edite TechSpecsConfig.md e rode: node build-specs.js
window.TECH_SPECS_MD = \`\n${md}\n\`;\n`;

fs.writeFileSync(OUTPUT_PATH, jsContent, 'utf-8');
console.log(`✓ tech-specs-config.js gerado em ${OUTPUT_PATH}`);

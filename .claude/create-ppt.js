#!/usr/bin/env node

/**
 * PowerPoint creation skill for Claude
 * Creates PPT from markdown or template
 */

const fs = require('fs');
const path = require('path');

// Available PPT templates
const templates = {
  'Standard': {
    title: 'Standard Business Presentation',
    titleSlideLayout: 'Title Slide',
    contentSlideLayout: 'Title and Content'
  },
  'Business': {
    title: 'Business Strategy Presentation',
    titleSlideLayout: 'Title Slide with Logo',
    contentSlideLayout: 'Business Content'
  },
  'Technical': {
    title: 'Technical Documentation',
    titleSlideLayout: 'Technical Title',
    contentSlideLayout: 'Technical Content'
  },
  'VPN-Business': {
    title: 'Banana VPN Business Plan',
    titleSlideLayout: 'VPN Title',
    contentSlideLayout: 'VPN Business Content'
  },
  'Product-Landing': {
    title: 'Product Landing Page',
    titleSlideLayout: 'Product Title',
    contentSlideLayout: 'Product Features'
  }
};

function showHelp() {
  console.log('🏗️  Banana VPN PowerPoint Creator\n');
  console.log('Usage:');
  console.log('  /create-ppt [template] [title] [content-file]');
  console.log('\nAvailable templates:');
  Object.keys(templates).forEach(t => console.log(`  - ${t}`));
  console.log('\nExample:');
  console.log('  /create-ppt \"VPN-Business\" \"Q1 VPN Growth Strategy\"');
  console.log('  /create-ppt \"Product-Landing\" \"Banana VPN v1.4 Features\" ./content.md');
}

function createPPT(title, templateName = 'Standard') {
  const template = templates[templateName] || templates['Standard'];
  const timestamp = new Date().toISOString().slice(0,10);
  const filename = `${title.replace(/[^a-zA-Z0-9]/g, '_')}_${timestamp}.ppt`;

  console.log(`📊 Creating PowerPoint presentation...`);
  console.log(`Title: ${title}`);
  console.log(`Template: ${templateName}`);
  console.log(`Output: ${filename}`);

  // Create PPT structure
  const pptStructure = {
    filename: filename,
    title: title,
    template: templateName,
    created: new Date().toISOString(),
    slides: [
      {
        type: 'title',
        content: {
          title: title,
          subtitle: template.title,
          template: template.titleSlideLayout
        }
      },
      {
        type: 'content',
        content: {
          title: 'Main Content',
          points: [
            'Content structure initialized',
            'Ready for additional slides',
            'Template applied: ' + templateName
          ],
          template: template.contentSlideLayout
        }
      }
    ]
  };

  // Save structure for further processing
  const outputPath = path.join(process.cwd(), '04_other', filename);
  const jsonStructure = path.join(process.cwd(), '04_other', filename.replace('.ppt', '_structure.json'));

  try {
    fs.writeFileSync(jsonStructure, JSON.stringify(pptStructure, null, 2));
    console.log(`\n✅ PowerPoint structure created successfully!`);
    console.log(`📁 Structure saved to: ${jsonStructure}`);
  } catch (error) {
    console.error(`❌ Error creating file: ${error.message}`);
  }

  return pptStructure;
}

// Main execution
if (process.argv.length === 2) {
  showHelp();
} else {
  const args = process.argv.slice(2);
  const command = args[0];

  if (command === 'help' || command === '--help') {
    showHelp();
    return;
  }

  const templateName = args[0] || 'Standard';
  const title = args[1] || 'Banana VPN Presentation';

  console.log(`🚀 Starting PPT creation...`);
  createPPT(title, templateName);
}

exports.createPPT = createPPT;
exports.templates = templates;
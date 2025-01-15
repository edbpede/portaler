import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the checklist file
const checklistPath = path.join(__dirname, '..', 'docs', 'url_search_plan_checklist.md');
const checklistContent = fs.readFileSync(checklistPath, 'utf8');

// Extract descriptions from checklist
const descriptions = {};
const regex = /- \[x\] (.*?) \((.*?)\)\n  > (.*?)(?=\n\n|\n-|$)/g;
let match;

function createShortDescription(longDesc) {
    // Split into sentences
    const sentences = longDesc.split('.');
    if (sentences.length === 0) return longDesc;

    // Get the first sentence and standardize platform/system naming
    let shortDesc = sentences[0]
        .replace(/Digital (?:læringsportal|fagportal|træningsportal|platform|prøveplatform|engelsksystem|dansksystem|system) til/, 'Digital læringsplatform til')
        .trim();

    // Handle grade ranges and single grades - ensure 'klasse' is always added
    shortDesc = shortDesc
        // Handle ranges first
        .replace(/(\d+)\.-(\d+)\.(?!\s*klasse)/, '$1.-$2. klasse')
        .replace(/(\d+)\.-(\d+)\. klasse/, '$1.-$2. klasse')
        // Handle various patterns where numbers appear
        .replace(/i (\d+)\.(?!\s*klasse)/, 'i $1. klasse')
        .replace(/målrettet (\d+)\.(?!\s*klasse)/, 'målrettet $1. klasse')
        .replace(/for (\d+)\.(?!\s*klasse)/, 'for $1. klasse')
        .replace(/til (\d+)\.(?!\s*klasse)/, 'til $1. klasse')
        // Then handle single grades - match any digit followed by period that's not already followed by 'klasse'
        .replace(/(\d+)\.(?!\s*klasse)(?=[\s,.]|$)/, '$1. klasse')
        .replace(/(\d+)\. klasse/, '$1. klasse')
        // Handle "dansk fra X" pattern
        .replace(/dansk fra (\d+)(?!\. klasse)/, 'dansk fra $1. klasse')
        // Handle remaining cases where a number is followed by a period without 'klasse'
        .replace(/(\d+)\.(?!\s*klasse)/, '$1. klasse');

    // If description starts with subject name and grade, make it more natural
    const originalDesc = shortDesc;
    shortDesc = shortDesc
        .replace(/^([\wæøåÆØÅ]+) fra (\d+)(?!\. klasse)/, '$1 fra $2. klasse')
        .replace(/^([\wæøåÆØÅ]+) for (\d+)(?!\. klasse)/, '$1 til $2. klasse')
        .replace(/^([\wæøåÆØÅ]+) til (\d+)(?!\. klasse)/, '$1 til $2. klasse');

    // If no changes were made by grade replacements, try to include focus/content
    if (shortDesc === originalDesc && sentences[0].includes(',')) {
        const parts = sentences[0].split(',');
        const focusPart = parts[1]?.toLowerCase() || '';
        
        if (focusPart.includes('fokus på') || focusPart.includes('baseret på')) {
            shortDesc = parts[0].trim() + ' med' + parts[1].trim();
        }
    }

    // Final check for any remaining numbers without 'klasse'
    shortDesc = shortDesc
        .replace(/(\d+)\.(?!\s*klasse)(?=\s|$|\.|,)/, '$1. klasse')
        .replace(/(\d+)(?=\s*(?:\.|$))/, '$1. klasse');

    // Special handling for descriptions ending in just a number
    shortDesc = shortDesc.replace(/til (\d+)\.?$/, 'til $1. klasse');

    // Ensure description ends properly and only once
    shortDesc = shortDesc.replace(/\.$/, '');  // Remove any existing period
    shortDesc = shortDesc.replace(/(\d+)\.$/, '$1. klasse.'); // Add 'klasse' if it ends with just a number
    shortDesc = shortDesc.replace(/(?<!\.)$/, '.'); // Add period if missing

    // Capitalize first letter if needed
    shortDesc = shortDesc.charAt(0).toUpperCase() + shortDesc.slice(1);
    
    return shortDesc;
}

while ((match = regex.exec(checklistContent)) !== null) {
    const [, name, id, longDescription] = match;
    descriptions[id] = {
        longDescription,
        description: createShortDescription(longDescription)
    };
}

// Update all platform JSON files
const platformsDir = path.join(__dirname, '..', 'src', 'content', 'platforms');

function updatePlatformFiles(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            updatePlatformFiles(fullPath);
        } else if (file.endsWith('.json')) {
            const content = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
            const id = path.basename(file, '.json');
            
            if (descriptions[id]) {
                content.description = descriptions[id].description;
                content.longDescription = descriptions[id].longDescription;
                fs.writeFileSync(fullPath, JSON.stringify(content, null, '\t') + '\n');
                console.log(`Updated ${fullPath}`);
            } else {
                // For files without matching descriptions, use a default format
                if (!content.longDescription) {
                    content.longDescription = content.description;
                    // Try to create a shorter description from the existing one
                    content.description = createShortDescription(content.description);
                    fs.writeFileSync(fullPath, JSON.stringify(content, null, '\t') + '\n');
                    console.log(`Added default descriptions to ${fullPath}`);
                }
            }
        }
    });
}

updatePlatformFiles(platformsDir);

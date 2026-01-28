import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import os from 'node:os';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCS_DIR = path.resolve(__dirname, '..');

function findMdFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.docusaurus' && file !== 'build' && file !== '.git' && file !== 'static') {
        findMdFiles(filePath, fileList);
      }
    } else {
      if (['.md', '.mdx'].includes(path.extname(file))) {
        fileList.push(filePath);
      }
    }
  });
  return fileList;
}

const files = findMdFiles(DOCS_DIR);
let changedCount = 0;

console.log(`Found ${files.length} markdown/mdx files. Scannning for D2 blocks...`);

files.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;
  
  const regex = /(```d2.*?\n)([\s\S]*?)(\n```)/g;
  
  newContent = newContent.replace(regex, (match, open, d2Code, close) => {
      // Create temp file
      const tempFile = path.join(os.tmpdir(), `d2fmt_${Date.now()}_${Math.random().toString(36).substring(7)}.d2`);
      fs.writeFileSync(tempFile, d2Code);
      
      try {
          // d2 fmt modifies the file in place
          execSync(`d2 fmt "${tempFile}"`, { stdio: 'pipe' }); 
          
          const formatted = fs.readFileSync(tempFile, 'utf8');
          fs.unlinkSync(tempFile);
          
          // Reconstruct the block. 
          // formatted usually ends with a newline.
          // open includes the newline after ```d2
          // close includes the newline before ```
          
          return `${open}${formatted}${close.trim()}`; 
      } catch (error) {
          console.error(`Failed to format block in ${filePath}:`, error.message);
          if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
          return match; 
      }
  });

  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Formatted ${filePath}`);
    changedCount++;
  }
});

console.log(`Finished. Formatted ${changedCount} files.`);

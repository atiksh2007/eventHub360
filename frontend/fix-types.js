import fs from 'fs';
import path from 'path';

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let original = content;

  // Fix object destructuring props: const Component = ({ a, b, c }) => 
  // It handles multiple lines as well using [\s\S]
  content = content.replace(/const\s+(\w+)\s*=\s*\(\{\s*([^}:]+)\s*\}\)\s*=>/g, 'const $1 = ({ $2 }: any) =>');
  
  // Fix function Components: const Component = (props) =>
  content = content.replace(/const\s+(\w+)\s*=\s*\((?!\{\s*)([a-zA-Z0-9_]+)\)\s*=>/g, 'const $1 = ($2: any) =>');

  // Fix function Component({ a, b })
  content = content.replace(/function\s+(\w+)\s*\(\{\s*([^}:]+)\s*\}\)/g, 'function $1({ $2 }: any)');
  
  // Fix inline map parameters: array.map((item, index) =>
  content = content.replace(/\.map\(\(([^,:)]+),\s*([^:)]+)\)\s*=>/g, '.map(($1: any, $2: any) =>');
  content = content.replace(/\.map\(\(([^,:)]+)\)\s*=>/g, '.map(($1: any) =>');
  
  // Fix useState(null) to useState<any>(null) or similar where TS fails
  content = content.replace(/useState\(null\)/g, 'useState<any>(null)');
  content = content.replace(/useState\(\[\]\)/g, 'useState<any[]>([])');
  content = content.replace(/useState\(\{\}\)/g, 'useState<any>({})');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Fixed ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      fixFile(filePath);
    }
  }
}

walkDir('./src');
console.log('Finished base patching.');

import fs from 'fs';
import path from 'path';

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let original = content;

  // common parameter replacements based on the tsc output
  content = content.replace(/\(name\)/g, '(name: any)');
  content = content.replace(/\(id\)/g, '(id: any)');
  content = content.replace(/\(id, e\)/g, '(id: any, e: any)');
  content = content.replace(/\(sectionKey, id, field, value\)/g, '(sectionKey: any, id: any, field: any, value: any)');
  content = content.replace(/\(item\)/g, '(item: any)');
  content = content.replace(/\(sectionKey, id\)/g, '(sectionKey: any, id: any)');
  content = content.replace(/\(id, f, v\)/g, '(id: any, f: any, v: any)');
  content = content.replace(/\(v\)/g, '(v: any)');
  content = content.replace(/\(field, value\)/g, '(field: any, value: any)');
  content = content.replace(/\(val\)/g, '(val: any)');
  
  // TaxConfiguration argument fix
  // "Argument of type '{ ... } | undefined' is not assignable to parameter of type 'SetStateAction<{ ... }>'
  content = content.replace(/setEditingTax\(\s*taxes\.find\([^)]+\)\s*\)/g, 'setEditingTax(taxes.find(t => t.id === id) as any)');

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
console.log('Finished secondary patching.');

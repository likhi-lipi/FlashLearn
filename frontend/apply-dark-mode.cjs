const fs = require('fs');
const path = require('path');

const directories = [
  path.join(__dirname, 'src', 'pages'),
  path.join(__dirname, 'src', 'components')
];

const replacements = [
  { search: /bg-white/g, replace: 'bg-white dark:bg-[#1e1e1e]' },
  { search: /text-\[#4a2c2a\](?![\/])/g, replace: 'text-[#4a2c2a] dark:text-gray-100' },
  { search: /text-\[#4a2c2a\]\/80/g, replace: 'text-[#4a2c2a]/80 dark:text-gray-300' },
  { search: /text-\[#4a2c2a\]\/70/g, replace: 'text-[#4a2c2a]/70 dark:text-gray-400' },
  { search: /text-\[#4a2c2a\]\/60/g, replace: 'text-[#4a2c2a]/60 dark:text-gray-400' },
  { search: /text-\[#4a2c2a\]\/50/g, replace: 'text-[#4a2c2a]/50 dark:text-gray-500' },
  { search: /text-\[#4a2c2a\]\/40/g, replace: 'text-[#4a2c2a]/40 dark:text-gray-500' },
  { search: /text-\[#4a2c2a\]\/30/g, replace: 'text-[#4a2c2a]/30 dark:text-gray-600' },
  { search: /text-\[#4a2c2a\]\/20/g, replace: 'text-[#4a2c2a]/20 dark:text-gray-700' },
  { search: /bg-\[#fdf6f4\]/g, replace: 'bg-[#fdf6f4] dark:bg-[#121212]' },
  { search: /bg-\[#fcf5f6\]/g, replace: 'bg-[#fcf5f6] dark:bg-[#181818]' },
  { search: /bg-\[#f3e8e4\]\/50/g, replace: 'bg-[#f3e8e4]/50 dark:bg-white/5' },
  { search: /border-\[#e3979d\]\/20/g, replace: 'border-[#e3979d]/20 dark:border-white/10' },
  { search: /border-\[#e3979d\]\/30/g, replace: 'border-[#e3979d]/30 dark:border-white/10' },
  { search: /border-\[#e3979d\]\/50/g, replace: 'border-[#e3979d]/50 dark:border-white/20' },
  { search: /border-\[#f3e8e4\]/g, replace: 'border-[#f3e8e4] dark:border-white/10' },
  { search: /bg-\[#f3e8e4\](?![\/])/g, replace: 'bg-[#f3e8e4] dark:bg-white/10' },
  { search: /bg-\[#f9e8e6\]/g, replace: 'bg-[#f9e8e6] dark:bg-[#800020]/20' },
  { search: /bg-\[#eef6f1\]/g, replace: 'bg-[#eef6f1] dark:bg-[#4a9d6e]/20' },
  { search: /bg-orange-50(?![\/])/g, replace: 'bg-orange-50 dark:bg-orange-500/20' },
];

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      // Exclude Navbar as we already manually updated it
      if (file === 'Navbar.jsx') continue;

      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      for (const rule of replacements) {
        content = content.replace(rule.search, rule.replace);
      }
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

directories.forEach(processDirectory);
console.log('Dark mode classes applied globally.');

const fs = require('fs');
const path = require('path');

const files = [
  'src/App.jsx',
  'src/api/mediaApi.js',
  'src/components/CollectionCard.jsx',
  'src/components/Navbar.jsx',
  'src/components/ResultCard.jsx',
  'src/components/ResultGrid.jsx',
  'src/components/SearchBar.jsx',
  'src/index.css',
  'src/pages/CollectionPage.jsx',
  'src/pages/HomePage.jsx',
  'src/redux/features/collectionSlice.js',
  'src/redux/features/searchSlice.js',
  'src/redux/store.js'
];

files.forEach(file => {
  const filepath = path.join(__dirname, file);
  if (!fs.existsSync(filepath)) {
      console.log(`Skipping ${file} - does not exist.`);
      return;
  }
  
  let content = fs.readFileSync(filepath, 'utf8');
  
  // Regex to match the conflict block.
  // We want to remove the <<<<<<< HEAD line, keep the content between it and =======, 
  // and remove from ======= to >>>>>>> <commit-hash>
  
  // This regex matches:
  // ^<<<<<<< HEAD\r?\n
  // (.*?)\n?
  // ^=======\r?\n
  // .*?\n?
  // ^>>>>>>> [0-9a-f]+\r?\n?
  // and replaces it with the first capture group.
  
  const regex = /^<<<<<<< HEAD\r?\n([\s\S]*?)^=======\r?\n[\s\S]*?^>>>>>>> [0-9a-f]+\r?\n?/gm;
  
  if (regex.test(content)) {
    console.log(`Fixing ${file}`);
    content = content.replace(regex, '$1');
    fs.writeFileSync(filepath, content, 'utf8');
  } else {
    console.log(`No conflicts found in ${file}`);
  }
});

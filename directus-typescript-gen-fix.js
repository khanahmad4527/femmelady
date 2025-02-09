import fs from 'fs';

// Read the file content
let fileContent = fs.readFileSync('./app/types/collections.d.ts', 'utf8');

// Regex pattern to match the specific structure for string, number, and multiple component schemas
const regex =
  /\(\(\s*(string|number)(\s*\|\s*components\["schemas"\]\["\w+"\])*\s*\)\[\]\)/g;

// Replacement logic to convert to the desired format
fileContent = fileContent.replace(regex, (match, firstType) => {
  // Extract all component schema types
  const componentSchemas =
    match.match(/components\["schemas"\]\["\w+"\]/g) || [];
  const componentsReplacement = componentSchemas
    .map(schema => `${schema}[]`)
    .join(' | ');

  // Return the final replacement string
  return `${firstType}[] | ${componentsReplacement}`;
});

// Write the updated content back to the file
fs.writeFileSync('./app/types/collections.d.ts', fileContent);

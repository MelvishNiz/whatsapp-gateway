import 'dotenv/config';
import fs from 'fs';

function generateRandomToken(length) {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let token = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    token += charset[randomIndex];
  }
  return token;
}

const randomToken = generateRandomToken(64);
console.log("==================================================================================")
console.log(`Your Token : ${randomToken}`);
console.log("==================================================================================")

// Read the contents of the .env file
fs.readFile('.env', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading .env file:', err);
    return;
  }

  // Split the contents into lines
  const lines = data.split('\n');

  // Find and replace the ACCESS_TOKEN line
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('ACCESS_TOKEN=')) {
      lines[i] = `ACCESS_TOKEN=${randomToken}`;
      break;
    }
  }

  // Join the lines back into a single string
  const updatedEnvContent = lines.join('\n');

  // Write the updated content back to the .env file
  fs.writeFile('.env', updatedEnvContent, 'utf8', (writeErr) => {
    if (writeErr) {
      console.error('Error writing .env file:', writeErr);
    } else {
      console.log('ACCESS_TOKEN on .env updated successfully.');
    }
  });
});
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'hooks/useSignup.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// Fix: Replace the old redirect-on-exist error handler with a clean one
const oldBlock = `      let finalErrorMsg = '';
      if (lowerError.includes('exist') || lowerError.includes('conflict') || (lowerError.includes('already registered with another account') === false && lowerError.includes('already'))) {
        finalErrorMsg = 'This mobile number is already registered. Please login.';
        toast.error('Number already registered. Redirecting to login...');
        setTimeout(() => {
          router.push('/login');
        }, 1500);
      } else if (lowerError.includes('pan') || lowerError.includes('another account')) {
        finalErrorMsg = 'This PAN number is already registered with another account.';
        toast.error(finalErrorMsg);
      } else {
        finalErrorMsg = errorMsg || 'An error occurred during registration.';
        toast.error(finalErrorMsg);
      }
      setError(finalErrorMsg);
      return false;`;

const newBlock = `      let finalErrorMsg = '';
      if (lowerError.includes('pan') || lowerError.includes('another account')) {
        // PAN conflict — show message but don't redirect
        finalErrorMsg = 'This PAN number is already registered with another account.';
        toast.error(finalErrorMsg);
      } else if (lowerError.includes('email already registered')) {
        finalErrorMsg = 'This email is already in use. Please use a different email.';
        toast.error(finalErrorMsg);
      } else {
        finalErrorMsg = errorMsg || 'An error occurred. Please try again.';
        toast.error(finalErrorMsg);
      }
      setError(finalErrorMsg);
      return false;`;

// Normalize line endings to LF for the search, then replace
const normalizedContent = content.replace(/\r\n/g, '\n');
if (normalizedContent.includes(oldBlock)) {
  const newContent = normalizedContent.replace(oldBlock, newBlock);
  fs.writeFileSync(filePath, newContent.replace(/\n/g, '\r\n'), 'utf-8');
  console.log('✅ Error handler fixed successfully.');
} else {
  // Try just removing the redirect part
  const oldRedirect = `        finalErrorMsg = 'This mobile number is already registered. Please login.';
        toast.error('Number already registered. Redirecting to login...');
        setTimeout(() => {
          router.push('/login');
        }, 1500);`;
  
  if (normalizedContent.includes(oldRedirect)) {
    const newContent = normalizedContent
      .replace(
        `if (lowerError.includes('exist') || lowerError.includes('conflict') || (lowerError.includes('already registered with another account') === false && lowerError.includes('already'))) {\n${oldRedirect}\n      } else if`,
        `if (lowerError.includes('pan') || lowerError.includes('another account')) {\n        finalErrorMsg = 'This PAN number is already registered with another account.';\n        toast.error(finalErrorMsg);\n      } else if`
      );
    fs.writeFileSync(filePath, newContent.replace(/\n/g, '\r\n'), 'utf-8');
    console.log('✅ Fixed via partial replacement.');
  } else {
    console.log('❌ Could not find the target block. Searching for fragments...');
    const lines = normalizedContent.split('\n');
    lines.forEach((line, i) => {
      if (line.includes('already registered') || line.includes('Redirecting to login')) {
        console.log(`Line ${i+1}: ${line}`);
      }
    });
  }
}

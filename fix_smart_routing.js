const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'hooks/useSignup.ts');
let content = fs.readFileSync(filePath, 'utf-8').replace(/\r\n/g, '\n');

// Replace the OTP verify case to use isProfileComplete for smart routing
const oldOtpVerify = `          } else {
            // Verify OTP
            const response = await apiClient.verifyPhoneOtp(data.phoneNumber, data.otp);
            if (response.token) {
              apiClient.setToken(response.token);
            }
            return true;
          }`;

const newOtpVerify = `          } else {
            // Verify OTP
            const response = await apiClient.verifyPhoneOtp(data.phoneNumber, data.otp);
            if (response.token) {
              apiClient.setToken(response.token);
            }
            // Smart routing: complete users go to login, incomplete users continue signup
            if ((response as any).isProfileComplete) {
              toast.error('Your profile is already complete. Please login to apply.');
              setTimeout(() => {
                router.push('/login');
              }, 1500);
              return false;
            }
            return true;
          }`;

if (content.includes(oldOtpVerify)) {
  content = content.replace(oldOtpVerify, newOtpVerify);
  fs.writeFileSync(filePath, content.replace(/\n/g, '\r\n'), 'utf-8');
  console.log('✅ Smart routing added to OTP verify step.');
} else {
  console.log('❌ Could not find target. Showing surrounding context...');
  const lines = content.split('\n');
  lines.forEach((line, i) => {
    if (line.includes('Verify OTP') || line.includes('verifyPhoneOtp')) {
      console.log(`Line ${i+1}: ${line}`);
    }
  });
}

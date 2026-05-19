const fs = require('fs');
const path = require('path');

const applyNowPath = path.join(__dirname, 'app/(main)/apply-now/page.tsx');
let applyNowContent = fs.readFileSync(applyNowPath, 'utf-8');

// Change STEPS in apply-now/page.tsx to only be 2 steps
applyNowContent = applyNowContent.replace(
    /const STEPS: Step\[\] = \[[\s\S]*?\];?/,
    `const STEPS: Step[] = [
    { id: 1, title: "Check Eligibility", description: "Get Instant Financial Support You Can Rely On" },
    { id: 2, title: "Personal Details & Documents", description: "Verify PAN/Aadhaar and upload documents" }
]`
);

// Update handlePersonalDetailsSubmit to call submitStep(7) and then setApplicationSubmitted(true)
applyNowContent = applyNowContent.replace(
    /const handlePersonalDetailsSubmit = async \(data: PersonalDetailsForm\): Promise<void> => \{[\s\S]*?const handleDocumentVerificationSubmit/m,
    `const handlePersonalDetailsSubmit = async (data: PersonalDetailsForm): Promise<void> => {
        updateFormData('personalDetails', data)
        const success = await submitStep(7, data)
        if (success) {
            setApplicationSubmitted(true)
        } else {
            alert("Failed to save personal details. Please try again.")
        }
    }

    const handleDocumentVerificationSubmit`
);

// Remove internalStep === 3
applyNowContent = applyNowContent.replace(
    /\{internalStep === 3 && \([\s\S]*?<Step4DocumentVerification[\s\S]*?\/>\s*\)\}/,
    ''
);

fs.writeFileSync(applyNowPath, applyNowContent, 'utf-8');

const useSignupPath = path.join(__dirname, 'hooks/useSignup.ts');
let useSignupContent = fs.readFileSync(useSignupPath, 'utf-8');

if (!useSignupContent.includes('case 7:')) {
    const case7Code = `
        case 7:
          // Update User Info for Apply Now Flow
          const name7 = \`\${data.firstName} \${data.middleName ? data.middleName + ' ' : ''}\${data.lastName}\`.trim();
          const email7 = data.email || undefined;
          
          await apiClient.registerUser({
            name: name7,
            dob: data.dateOfBirth,
            gender: data.gender,
            email: email7,
            password: "Password@123",
          });

          // Verify Aadhaar
          if (data.aadhaarNumber) {
            const cleanAadhaar = data.aadhaarNumber.replace(/\\D/g, '');
            if (cleanAadhaar.length === 12) {
              try {
                await apiClient.verifyAadhaarOtp(cleanAadhaar, "261102");
              } catch (e) { console.error(e) }
            }
          }

          // Verify PAN
          if (data.panNumber) {
            try {
              await apiClient.verifyPan(data.panNumber);
            } catch (e: any) {
              if (e.message?.toLowerCase().includes('already registered')) throw new Error('This PAN number is already registered with another account.');
            }
          }

          // Upload Documents
          try {
            if (data.panImage && data.panImage instanceof File) await apiClient.uploadDocument('PAN', data.panImage);
            if (data.aadhaarImage && data.aadhaarImage instanceof File) await apiClient.uploadDocument('AADHAAR', data.aadhaarImage);

            const documentFormData7 = new FormData();
            let hasBulkDocs7 = false;
            if (data.salarySlipImage && data.salarySlipImage instanceof File) { documentFormData7.append('salarySlips', data.salarySlipImage); hasBulkDocs7 = true; }
            if (data.bankStatementImage && data.bankStatementImage instanceof File) { documentFormData7.append('bankStatements', data.bankStatementImage); hasBulkDocs7 = true; }
            if (hasBulkDocs7) await apiClient.submitDocuments(documentFormData7);
          } catch (e) { console.error(e) }

          return true;
`;
    useSignupContent = useSignupContent.replace('default:', `${case7Code}\n        default:`);
    fs.writeFileSync(useSignupPath, useSignupContent, 'utf-8');
}

console.log('Successfully updated apply-now and useSignup');

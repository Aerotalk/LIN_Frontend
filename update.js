const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'app/(main)/apply-now/page.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// Import Step2PersonalDetails
if (!content.includes('import { Step2PersonalDetails }')) {
    content = content.replace(
        'import { Step4DocumentVerification } from "@/components/signup/Step4DocumentVerification"',
        'import { Step4DocumentVerification } from "@/components/signup/Step4DocumentVerification"\nimport { Step2PersonalDetails } from "@/components/signup/Step2PersonalDetails"'
    );
}

// Import PersonalDetailsData if needed
if (!content.includes('PersonalDetailsData')) {
    content = content.replace(
        'import { EligibilityForm, DocumentVerificationForm } from "@/lib/signup-schemas"',
        'import { EligibilityForm, DocumentVerificationForm, PersonalDetailsForm } from "@/lib/signup-schemas"\nimport { PersonalDetailsData } from "@/lib/types"'
    );
}

// Update STEPS
content = content.replace(
    /const STEPS: Step\[\] = \[\s*\{ id: 1, title: "Check Eligibility", description: "Get Instant Financial Support You Can Rely On" \},\s*\{ id: 2, title: "Verifying documents", description: "Upload the required documents for verification" \},\s*\]/,
    `const STEPS: Step[] = [
    { id: 1, title: "Check Eligibility", description: "Get Instant Financial Support You Can Rely On" },
    { id: 2, title: "Personal Details", description: "Verify your PAN and Aadhaar" },
    { id: 3, title: "Verifying documents", description: "Upload the required documents for verification" },
]`
);

// Insert handlePersonalDetailsSubmit before handleDocumentVerificationSubmit
if (!content.includes('const handlePersonalDetailsSubmit =')) {
    const submitFunc = `
    const handlePersonalDetailsSubmit = async (data: PersonalDetailsForm): Promise<void> => {
        updateFormData('personalDetails', data)
        const success = await submitStep(2, data)
        if (success) {
            handleNext()
        } else {
            alert("Failed to save personal details. Please try again.")
        }
    }

    const handleDocumentVerificationSubmit`;
    content = content.replace('const handleDocumentVerificationSubmit', submitFunc);
}

// Add Step2 into rendering
if (!content.includes('internalStep === 3 && (')) {
    const renderingCode = `
                                    {internalStep === 2 && (
                                        <Step2PersonalDetails
                                            onSubmit={handlePersonalDetailsSubmit}
                                            onGoToDashboard={() => {}}
                                            formData={formData.personalDetails}
                                            setFormData={(data) => updateFormData('personalDetails', data)}
                                            phoneNumber={formData.phoneVerification?.phoneNumber || ""}
                                        />
                                    )}

                                    {internalStep === 3 && (
                                        <Step4DocumentVerification
                                            onSubmit={handleDocumentVerificationSubmit}
                                            formData={formData.documentVerification}
                                            setFormData={(data) => updateFormData('documentVerification', data)}
                                        />
                                    )}`;
    
    // Replace the old Step 2 render block
    const oldStep2Pattern = /\{internalStep === 2 && \([\s\S]*?<Step4DocumentVerification[\s\S]*?\/>\s*\)\}/;
    content = content.replace(oldStep2Pattern, renderingCode);
}

// Add pre-filling logic to useEffect
const prefillCode = `
                    if (p.panVerification || p.aadhaarVerification || p.name) {
                        updateFormData('personalDetails', {
                            ...formData.personalDetails,
                            panNumber: p.panVerification?.panNumber || "",
                            firstName: p.name || "",
                            aadhaarNumber: p.aadhaarVerification?.aadhaarNumber || "",
                            email: p.email || "",
                            dateOfBirth: p.dob ? new Date(p.dob).toISOString().split('T')[0] : "",
                            gender: p.gender === "MALE" ? "Male" : "Female",
                        });
                    }
                    if (p.employment || p.address) {`;
if (!content.includes('p.panVerification ||')) {
    content = content.replace('if (p.employment || p.address) {', prefillCode);
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Updated apply-now/page.tsx successfully');

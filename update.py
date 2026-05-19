import re

with open('app/(main)/apply-now/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Import Step2PersonalDetails
if 'import { Step2PersonalDetails }' not in content:
    content = content.replace(
        'import { Step4DocumentVerification } from "@/components/signup/Step4DocumentVerification"',
        'import { Step4DocumentVerification } from "@/components/signup/Step4DocumentVerification"\nimport { Step2PersonalDetails } from "@/components/signup/Step2PersonalDetails"'
    )

# Import PersonalDetailsData if needed
if 'PersonalDetailsData' not in content:
    content = content.replace(
        'import { EligibilityForm, DocumentVerificationForm } from "@/lib/signup-schemas"',
        'import { EligibilityForm, DocumentVerificationForm, PersonalDetailsForm } from "@/lib/signup-schemas"\nimport { PersonalDetailsData } from "@/lib/types"'
    )

# Update STEPS
content = re.sub(
    r'const STEPS: Step\[\] = \[.*?\]',
    '''const STEPS: Step[] = [
    { id: 1, title: "Check Eligibility", description: "Get Instant Financial Support You Can Rely On" },
    { id: 2, title: "Personal Details", description: "Verify your PAN and Aadhaar" },
    { id: 3, title: "Verifying documents", description: "Upload the required documents for verification" },
]''',
    content,
    flags=re.DOTALL
)

# Insert handlePersonalDetailsSubmit before handleDocumentVerificationSubmit
if 'const handlePersonalDetailsSubmit =' not in content:
    submit_func = '''
    const handlePersonalDetailsSubmit = async (data: PersonalDetailsForm): Promise<void> => {
        updateFormData('personalDetails', data)
        const success = await submitStep(2, data)
        if (success) {
            handleNext()
        } else {
            alert("Failed to save personal details. Please try again.")
        }
    }

    const handleDocumentVerificationSubmit'''
    content = content.replace('const handleDocumentVerificationSubmit', submit_func)

# Add Step2 into rendering
if 'internalStep === 3 && (' not in content:
    rendering_code = '''
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
                                    )}'''
    content = re.sub(r'\{internalStep === 2 && \(\s*<Step4DocumentVerification.*?\/>\s*\)\}', rendering_code, content, flags=re.DOTALL)

# Add pre-filling logic to useEffect
prefill_code = '''
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
                    if (p.employment || p.address) {'''
if 'p.panVerification ||' not in content:
    content = content.replace('if (p.employment || p.address) {', prefill_code)

with open('app/(main)/apply-now/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated apply-now/page.tsx successfully')

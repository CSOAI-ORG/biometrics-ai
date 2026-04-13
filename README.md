# @csoai/biometrics-ai — Biometrics & Identity AI Governance MCP Server

Complete Model Context Protocol server for biometric AI risk assessment, EU AI Act compliance, bias detection, and BIPA litigation risk analysis.

## Features

- **EU AI Act Compliance**: Detects prohibited uses (emotion recognition in workplace/education, real-time facial ID in public spaces, social scoring)
- **Bias Risk Assessment**: Documents demographic disparities in facial recognition accuracy (NIST FRVT studies), age estimation bias, lighting sensitivity, representation bias
- **BIPA Litigation Risk**: Illinois Biometric Information Privacy Act private right of action assessment, per-scan violation accrual, class action exposure
- **GDPR Compliance**: Special category data requirements, Data Protection Impact Assessment mandates, consent standards
- **Technical Requirements**: ISO/IEC biometric standards, liveness detection, anti-spoofing, template protection
- **Regulatory Coverage**: EU AI Act, GDPR, Illinois BIPA, Texas CUBI, Washington state laws, CCPA/CPRA

## Tools

### biometric_risk_assessment
Assess EU AI Act classification, prohibited use check, bias risks, privacy requirements, and remediation for biometric AI systems.

**Input Parameters:**
- `system_name` — Name of the biometric AI system
- `biometric_type` — Type of biometric (facial recognition, fingerprint, voice, iris, gait, emotion detection)
- `use_case` — Use case (identification, verification, categorization, emotion recognition, social scoring)
- `jurisdiction` — Operating jurisdiction (EU, US, UK, Illinois, etc.)
- `deployment_context` — Deployment context (public spaces, workplace, education, law enforcement, border control)

**Output:**
- EU AI Act classification (PROHIBITED, HIGH RISK, or compliant assessment)
- Prohibited use check with exceptions
- Applicable regulations by jurisdiction
- Demographic bias risks
- Privacy requirements (GDPR Article 9, consent, DPIA)
- Technical requirements (FAR/FRR testing, ISO standards, liveness detection)
- Remediation roadmap
- CASA (Continuous AI Safety Audit) tier and costs

### bipa_compliance
Illinois BIPA compliance assessment covering consent requirements, data handling, litigation risks, and penalty exposure.

**Input Parameters:**
- `system_name` — Name of the biometric system
- `biometric_type` — Type of biometric identifier collected
- `collection_method` — How biometric data is collected (camera, sensor, upload, etc.)
- `operating_states` — US states where system operates (e.g., 'Illinois, California' or 'all states')

**Output:**
- BIPA applicability determination
- Written consent requirements
- Data handling and retention rules
- Litigation risks (private right of action, class action exposure, per-scan accrual)
- Penalty exposure ($1K-$5K per violation, recent settlements $39M-$650M)
- Remediation steps (policies, consent forms, encryption, audit trails)

## Resources

- `biometrics://regulations/index` — Regulatory landscape (EU AI Act, US state laws, international frameworks)
- `biometrics://tools/guide` — Tool documentation

## Installation

```bash
npm install
npm run build
npm start
```

## Regulatory Framework

### Prohibited Uses (EU AI Act Article 5)
- Emotion recognition in workplace/education (Article 5(1)(f))
- Biometric categorization inferring race, political beliefs, sexual orientation (Article 5(1)(g))
- Real-time remote biometric identification in public spaces (Article 5(1)(h)) — limited exceptions for missing children, terrorism prevention, serious crimes

### High-Risk Biometric AI (EU AI Act Annex III)
- Remote biometric identification systems
- Post-remote biometric identification

### US State Laws
- **Illinois BIPA** (740 ILCS 14): $1,000-$5,000 per violation, per-scan accrual, private right of action
- **Texas CUBI** (Tex. Bus. & Com. Code § 503.001): $25,000 per violation
- **Washington State** (RCW 19.375): Biometric identifier protection
- **NYC Local Law 144**: Automated employment decision tools
- **CCPA/CPRA**: Biometric information as sensitive personal information

## Key Statistics

- **NIST FRVT Studies**: Facial recognition error rates 10-100x higher for darker-skinned individuals
- **Meta/Facebook Settlement**: $650M BIPA class action (2021)
- **TikTok Settlement**: $228M BIPA class action (2023)
- **Clearview AI Settlement**: $39M consent + BIPA violations (2022)
- **Per-Scan Accrual**: Cothron v. White Castle (2023) — each facial scan = separate BIPA violation

## Author
CSOAI — Council for the Safety of Artificial Intelligence

## License
CC0-1.0 (Public Domain)

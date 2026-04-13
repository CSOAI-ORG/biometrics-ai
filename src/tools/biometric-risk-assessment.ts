/**
 * biometric-risk-assessment.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T05:59:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */


export interface BiometricRiskResult {
  system_name: string;
  eu_ai_act_classification: string;
  prohibited_use_check: { is_prohibited: boolean; reason: string; exceptions: string[] };
  applicable_regulations: string[];
  bias_risks: string[];
  privacy_requirements: string[];
  technical_requirements: string[];
  remediation: string[];
  casa_tier: string;
}

export function handleBiometricRiskAssessment(
  systemName: string,
  biometricType: string,
  useCase: string,
  jurisdiction: string,
  deploymentContext: string
): BiometricRiskResult {
  const typeLower = biometricType.toLowerCase();
  const useLower = useCase.toLowerCase();
  const jurLower = jurisdiction.toLowerCase();
  const ctxLower = deploymentContext.toLowerCase();

  // EU AI Act prohibited use check
  let isProhibited = false;
  let prohibitedReason = "Not classified as prohibited use";
  let exceptions: string[] = [];

  if (typeLower.includes("emotion") && (ctxLower.includes("workplace") || ctxLower.includes("education"))) {
    isProhibited = true;
    prohibitedReason = "EU AI Act Article 5(1)(f) — Emotion recognition in workplace and education is PROHIBITED";
    exceptions = ["No exceptions — this is an absolute prohibition under the EU AI Act"];
  } else if (useLower.includes("social scoring") || useLower.includes("social credit")) {
    isProhibited = true;
    prohibitedReason = "EU AI Act Article 5(1)(c) — Social scoring based on biometric data is PROHIBITED";
    exceptions = [];
  } else if (typeLower.includes("facial") && useLower.includes("real-time") && ctxLower.includes("public")) {
    isProhibited = true;
    prohibitedReason = "EU AI Act Article 5(1)(h) — Real-time remote biometric identification in public spaces is PROHIBITED";
    exceptions = [
      "Targeted search for missing children",
      "Prevention of imminent terrorist threat",
      "Locating suspects of serious criminal offences (judicial authorization required)"
    ];
  } else if (typeLower.includes("categorization") && (useLower.includes("race") || useLower.includes("political") || useLower.includes("sexual orientation"))) {
    isProhibited = true;
    prohibitedReason = "EU AI Act Article 5(1)(g) — Biometric categorization inferring sensitive attributes is PROHIBITED";
    exceptions = ["Law enforcement labelling of lawfully acquired biometric data (limited exception)"];
  }

  let euClassification = "High Risk — EU AI Act Annex III, Section 1 (Biometric identification)";
  let casaTier = "CASA Tier 3 — Enterprise ($75K-$200K/yr)";
  if (isProhibited) {
    euClassification = "PROHIBITED — EU AI Act Article 5";
    casaTier = "N/A — System must be decommissioned or redesigned";
  } else if (useLower.includes("verification") && !useLower.includes("identification")) {
    euClassification = "High Risk — EU AI Act Annex III, Section 1(a) (Remote biometric identification)";
    casaTier = "CASA Tier 3 — Enterprise ($75K-$200K/yr)";
  }

  const applicableRegulations: string[] = [
    "EU AI Act — Biometric AI Provisions (Articles 5, 6, 26)",
    "EU GDPR — Article 9 (Special Categories: Biometric Data)",
    "EU GDPR — Article 35 (DPIA required for biometric processing)"
  ];

  if (jurLower.includes("us") || jurLower.includes("illinois")) {
    applicableRegulations.push(
      "Illinois Biometric Information Privacy Act (BIPA) — 740 ILCS 14",
      "Texas Capture or Use of Biometric Identifier Act (CUBI)",
      "Washington Biometric Privacy Law (RCW 19.375)",
      "NYC Local Law 144 — Automated Employment Decision Tools (if HR context)",
      "CCPA/CPRA — Biometric information as sensitive personal information"
    );
  }
  if (jurLower.includes("uk")) {
    applicableRegulations.push(
      "UK Data Protection Act 2018 — Biometric Data Provisions",
      "UK ICO Biometrics Guidance",
      "UK Equality Act 2010 — Algorithmic Discrimination"
    );
  }

  const biasRisks = [
    "Facial recognition accuracy disparity: significantly higher error rates for darker-skinned individuals, women, and elderly populations (NIST FRVT studies)",
    "Age estimation bias across demographic groups",
    "Lighting and environmental condition sensitivity creating systematic bias",
    "Training data representativeness — Western-centric datasets underperforming globally",
    "Gender presentation bias — misclassification of non-binary and transgender individuals",
    "Disability bias — reduced accuracy for individuals with facial differences or prosthetics"
  ];

  if (typeLower.includes("voice") || typeLower.includes("speech")) {
    biasRisks.push("Accent and dialect bias in voice biometrics", "Age and gender bias in speaker recognition accuracy");
  }
  if (typeLower.includes("gait") || typeLower.includes("behavioral")) {
    biasRisks.push("Mobility disability bias in gait recognition", "Cultural behavioral pattern bias");
  }

  const privacyRequirements = [
    "Explicit consent per GDPR Article 9(2)(a) — freely given, specific, informed",
    "Data Protection Impact Assessment (DPIA) mandatory per GDPR Article 35",
    "Purpose limitation — biometric data used only for stated purpose",
    "Data minimization — collect only necessary biometric features",
    "Storage limitation — automatic deletion policy for biometric templates",
    "Biometric template encryption at rest (AES-256 minimum)",
    "Right to erasure of biometric data per GDPR Article 17",
    isProhibited ? "MANDATORY: System must cease biometric processing immediately" : "Regular privacy impact reviews for biometric processing"
  ];

  const technicalRequirements = [
    "False Acceptance Rate (FAR) and False Rejection Rate (FRR) documented per demographic group",
    "ISO/IEC 19795 — Biometric performance testing and reporting",
    "ISO/IEC 30107 — Presentation attack detection (anti-spoofing)",
    "Template protection per ISO/IEC 24745",
    "Liveness detection for facial recognition systems",
    "Audit logging of all biometric matching decisions",
    "Fail-safe mechanism — alternative identification when biometric fails"
  ];

  const remediation: string[] = [];
  if (isProhibited) {
    remediation.push(
      "1. IMMEDIATE: Cease prohibited biometric processing",
      "2. Assess whether system can be redesigned to remove prohibited functionality",
      "3. If exceptions apply (law enforcement), obtain required judicial authorization",
      "4. Document compliance decision and notify data protection authority",
      "5. Delete biometric data collected under prohibited processing"
    );
  } else {
    remediation.push(
      "1. Conduct DPIA per GDPR Article 35 for all biometric processing",
      "2. Implement demographic-stratified performance testing (NIST FRVT methodology)",
      "3. Deploy anti-spoofing and presentation attack detection",
      "4. Establish consent mechanisms meeting GDPR Article 9 standard",
      "5. Implement biometric template encryption and secure storage",
      "6. Create bias monitoring dashboard with automated demographic alerts",
      "7. Register as high-risk AI system per EU AI Act Article 49",
      "8. Schedule annual third-party bias and accuracy audit"
    );
  }

  return {
    system_name: systemName,
    eu_ai_act_classification: euClassification,
    prohibited_use_check: { is_prohibited: isProhibited, reason: prohibitedReason, exceptions },
    applicable_regulations: applicableRegulations,
    bias_risks: biasRisks,
    privacy_requirements: privacyRequirements,
    technical_requirements: technicalRequirements,
    remediation,
    casa_tier: casaTier
  };
}

/**
 * bipa-compliance.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T05:59:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */


export interface BipaResult {
  system_name: string;
  bipa_applicability: boolean;
  requirements: string[];
  consent_requirements: string[];
  data_handling: string[];
  litigation_risks: string[];
  remediation: string[];
  penalty_exposure: string;
}

export function handleBipaCompliance(
  systemName: string,
  biometricType: string,
  collectionMethod: string,
  operatingStates: string
): BipaResult {
  const statesLower = operatingStates.toLowerCase();
  const bipaApplicable = statesLower.includes("illinois") || statesLower.includes("all") || statesLower.includes("national");

  const requirements = [
    "Written biometric information policy made publicly available",
    "Written notice to subjects describing biometric data collection",
    "Written consent obtained before collection (not opt-out — must be affirmative)",
    "Prohibition on selling, leasing, trading, or profiting from biometric data",
    "Retention schedule: destroy within 3 years of last interaction or when purpose fulfilled",
    "Reasonable security measures protecting biometric data (at least industry standard)"
  ];

  const consentRequirements = [
    "Written informed consent BEFORE any biometric collection",
    "Consent must be specific — general terms of service insufficient",
    "Consent must name the specific biometric identifier being collected",
    "Consent must disclose the specific purpose for collection",
    "Consent must disclose the length of time data will be stored",
    "Separate consent required for each distinct biometric use",
    "Minors: parental consent required per Illinois law"
  ];

  const dataHandling = [
    "Store using reasonable security (encryption at rest and in transit)",
    "Access controls limiting biometric data access to authorized personnel only",
    "Audit trail for all access to biometric data",
    "Destroy data when purpose is fulfilled or within 3 years (whichever comes first)",
    "No sale, lease, trade, or profiting from biometric data",
    "Data breach notification per Illinois Personal Information Protection Act"
  ];

  const litigationRisks = [
    "Private right of action — ANY person aggrieved may sue",
    "No injury-in-fact required — statutory violation alone is sufficient",
    "Class action exposure — BIPA is the #1 biometric class action statute",
    "Damages: $1,000 per negligent violation, $5,000 per intentional/reckless violation",
    "Per-scan accrual: each biometric scan can constitute a separate violation (Cothron v. White Castle, 2023)",
    "Attorney fees and costs recoverable by prevailing plaintiff",
    "5-year statute of limitations (Illinois Supreme Court, 2023)",
    "Recent settlements: $650M (Facebook/Meta), $228M (TikTok), $39M (Clearview AI)"
  ];

  const penaltyExposure = bipaApplicable
    ? "EXTREME — $1,000-$5,000 per violation, per scan. Class action settlements regularly exceed $100M. Cothron v. White Castle ruling means each biometric scan is a separate violation."
    : "Limited — BIPA does not apply outside Illinois, but Texas CUBI ($25K/violation) and Washington state laws may apply.";

  const remediation = [
    "1. Publish written biometric information privacy policy",
    "2. Implement affirmative written consent before any biometric collection",
    "3. Establish retention and destruction schedule (max 3 years)",
    "4. Deploy encryption for all biometric data at rest and in transit",
    "5. Create audit trail for biometric data access",
    "6. Train all employees handling biometric data on BIPA requirements",
    "7. Conduct BIPA compliance audit quarterly",
    "8. Retain outside counsel for BIPA class action readiness"
  ];

  return {
    system_name: systemName,
    bipa_applicability: bipaApplicable,
    requirements,
    consent_requirements: consentRequirements,
    data_handling: dataHandling,
    litigation_risks: litigationRisks,
    remediation,
    penalty_exposure: penaltyExposure
  };
}

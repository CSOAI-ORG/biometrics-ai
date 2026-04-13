/**
 * wban-digital-id.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T08:00:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */

export interface WbanDigitalIdResult {
  system_name: string;
  ieee_802_15_6_compliance: {
    standard: string;
    hub_type: string;
    band_classification: string;
    data_rate_category: string;
    security_level: string;
    mac_layer_security: string[];
    phy_layer: string;
  };
  biometric_modalities: {
    modality: string;
    wban_sensor_type: string;
    ieee_node_type: string;
    data_sensitivity: string;
    latency_requirement: string;
  }[];
  digital_identity_crosswalk: {
    framework: string;
    assurance_level: string;
    binding_method: string;
    applicable_standards: string[];
    governance_requirements: string[];
  };
  regulatory_landscape: {
    regulation: string;
    applicability: string;
    key_requirements: string[];
  }[];
  security_architecture: {
    layer: string;
    mechanism: string;
    standard_reference: string;
  }[];
  risk_assessment: {
    risk_level: string;
    attack_vectors: string[];
    mitigations: string[];
  };
  medical_device_classification: {
    fda_class: string;
    eu_mdr_class: string;
    mhra_class: string;
    requires_510k: boolean;
    requires_ce_mark: boolean;
  };
  interoperability: {
    protocol: string;
    data_format: string;
    integration_pattern: string;
    mcp_governance_hooks: string[];
  };
  remediation: string[];
}

export function handleWbanDigitalId(
  systemName: string,
  wbanTopology: string,
  biometricModalities: string,
  digitalIdFramework: string,
  deploymentContext: string,
  jurisdiction: string
): WbanDigitalIdResult {
  const topoLower = wbanTopology.toLowerCase();
  const modLower = biometricModalities.toLowerCase();
  const idLower = digitalIdFramework.toLowerCase();
  const ctxLower = deploymentContext.toLowerCase();
  const jurLower = jurisdiction.toLowerCase();

  // IEEE 802.15.6 compliance assessment
  let hubType = "Hub (coordinator)";
  let bandClassification = "Narrowband (NB)";
  let dataRateCategory = "Standard";
  let phyLayer = "NB PHY";

  if (topoLower.includes("uwb") || topoLower.includes("ultra-wide")) {
    bandClassification = "Ultra-Wideband (UWB)";
    dataRateCategory = "High-rate (up to 15.6 Mbps)";
    phyLayer = "UWB PHY";
  } else if (topoLower.includes("hbc") || topoLower.includes("human body")) {
    bandClassification = "Human Body Communication (HBC)";
    dataRateCategory = "Medium-rate";
    phyLayer = "HBC PHY";
  }

  if (topoLower.includes("star")) {
    hubType = "Star topology — Single hub coordinator";
  } else if (topoLower.includes("mesh") || topoLower.includes("two-hop")) {
    hubType = "Two-hop star with relay — Extended WBAN";
  }

  let securityLevel = "Level 2 — Authentication and encryption";
  const macSecurity: string[] = [
    "AES-128 CCM for MAC frame encryption",
    "Temporal key management per IEEE 802.15.6 Section 6",
    "Unicast and multicast security associations",
    "Master Key (MK) / Pairwise Temporal Key (PTK) hierarchy"
  ];

  if (ctxLower.includes("medical") || ctxLower.includes("healthcare") || ctxLower.includes("clinical")) {
    securityLevel = "Level 3 — Maximum security (medical-grade)";
    macSecurity.push(
      "DTLS for relay-secured data transport",
      "PHI-specific encryption per HIPAA Security Rule",
      "Emergency data access override with audit logging"
    );
  }

  // Parse biometric modalities
  const modalities: WbanDigitalIdResult["biometric_modalities"] = [];

  if (modLower.includes("ecg") || modLower.includes("electrocardiogram") || modLower.includes("cardiac")) {
    modalities.push({
      modality: "ECG Biometric Authentication",
      wban_sensor_type: "On-body ECG electrode (IEEE 802.15.6 Node Type: Implant/On-body)",
      ieee_node_type: "Type 1 — On-body sensor node",
      data_sensitivity: "CRITICAL — Unique cardiac signature + health data dual-use",
      latency_requirement: "< 250ms for continuous authentication"
    });
  }
  if (modLower.includes("ppg") || modLower.includes("photoplethysmography") || modLower.includes("pulse")) {
    modalities.push({
      modality: "PPG Vascular Pattern Recognition",
      wban_sensor_type: "Wrist/finger PPG optical sensor",
      ieee_node_type: "Type 1 — On-body sensor node",
      data_sensitivity: "HIGH — Vascular pattern + physiological metrics",
      latency_requirement: "< 500ms for authentication, real-time for monitoring"
    });
  }
  if (modLower.includes("eeg") || modLower.includes("brainwave") || modLower.includes("neural")) {
    modalities.push({
      modality: "EEG Brain-Computer Interface Biometric",
      wban_sensor_type: "Scalp EEG electrode array",
      ieee_node_type: "Type 1 — On-body sensor node (high-bandwidth)",
      data_sensitivity: "CRITICAL — Neural data (cognitive state, emotional state, intent)",
      latency_requirement: "< 100ms for real-time BCI, < 2s for authentication"
    });
  }
  if (modLower.includes("emg") || modLower.includes("muscle") || modLower.includes("gesture")) {
    modalities.push({
      modality: "EMG Gesture/Muscle Pattern Authentication",
      wban_sensor_type: "Surface EMG electrodes (forearm/hand)",
      ieee_node_type: "Type 1 — On-body sensor node",
      data_sensitivity: "MEDIUM — Muscle activation patterns",
      latency_requirement: "< 200ms for gesture recognition"
    });
  }
  if (modLower.includes("gait") || modLower.includes("movement") || modLower.includes("imu") || modLower.includes("accelerometer")) {
    modalities.push({
      modality: "Gait/Movement Biometric via IMU",
      wban_sensor_type: "Inertial Measurement Unit (accelerometer + gyroscope)",
      ieee_node_type: "Type 1 — On-body sensor node",
      data_sensitivity: "MEDIUM — Gait signature + mobility health data",
      latency_requirement: "< 1s for gait authentication cycle"
    });
  }
  if (modLower.includes("temperature") || modLower.includes("thermal") || modLower.includes("skin")) {
    modalities.push({
      modality: "Skin Temperature Profile Biometric",
      wban_sensor_type: "Thermistor/IR temperature sensor",
      ieee_node_type: "Type 1 — On-body sensor node",
      data_sensitivity: "LOW-MEDIUM — Thermal profile (limited uniqueness, health correlates)",
      latency_requirement: "< 5s for thermal profile capture"
    });
  }

  if (modalities.length === 0) {
    modalities.push({
      modality: "Generic WBAN Biometric Sensor",
      wban_sensor_type: "Multi-modal on-body sensor",
      ieee_node_type: "Type 1 — On-body sensor node",
      data_sensitivity: "HIGH — Biometric data via body area network",
      latency_requirement: "Application-dependent"
    });
  }

  // Digital Identity Framework crosswalk
  let assuranceLevel = "IAL2/AAL2 — Moderate assurance";
  let bindingMethod = "Biometric binding to digital credential";
  const idStandards: string[] = [];
  const idGovernance: string[] = [];

  if (idLower.includes("eidas") || idLower.includes("eu") || jurLower.includes("eu")) {
    assuranceLevel = "eIDAS LoA High — Biometric identity proofing + continuous authentication";
    bindingMethod = "WBAN biometric bound to eIDAS qualified electronic signature";
    idStandards.push(
      "eIDAS 2.0 Regulation (EU) 2024/1183 — European Digital Identity Framework",
      "ETSI TS 119 461 — Identity proofing for trust services",
      "ISO/IEC 29115 — Entity Authentication Assurance Framework",
      "EU Digital Identity Wallet — Article 5a technical specifications",
      "EN 319 411-1 — Qualified certificate policy for electronic signatures"
    );
    idGovernance.push(
      "EU AI Act biometric provisions apply to WBAN-based authentication",
      "GDPR Article 9 explicit consent for biometric processing",
      "eIDAS wallet certification per CEN/CENELEC standards",
      "Cross-border interoperability via EU Digital Identity Architecture Reference Framework (ARF)"
    );
  } else if (idLower.includes("nist") || idLower.includes("us") || jurLower.includes("us")) {
    assuranceLevel = "NIST SP 800-63B AAL3 — High assurance with hardware-bound authenticator";
    bindingMethod = "WBAN biometric bound to FIDO2/WebAuthn hardware credential";
    idStandards.push(
      "NIST SP 800-63-4 — Digital Identity Guidelines (2024 revision)",
      "NIST SP 800-63A — Identity Proofing (IAL3 with biometric verification)",
      "NIST SP 800-63B — Authentication and Lifecycle Management (AAL3)",
      "FIDO2/WebAuthn — Biometric-bound passkey specification",
      "NIST SP 800-76 — Biometric Specifications for PIV"
    );
    idGovernance.push(
      "FedRAMP requirements for federal biometric systems",
      "HSPD-12 / FIPS 201 PIV credential biometric binding",
      "State biometric privacy laws (BIPA, CCPA/CPRA, TDPSA) apply",
      "FDA 21 CFR Part 11 if medical device context"
    );
  } else if (idLower.includes("iso") || idLower.includes("mdl") || idLower.includes("mobile driver")) {
    assuranceLevel = "ISO/IEC 18013-5 — Mobile document with biometric verification";
    bindingMethod = "WBAN biometric bound to mDL/ISO mobile credential via NFC/BLE";
    idStandards.push(
      "ISO/IEC 18013-5 — Mobile Driving License (mDL)",
      "ISO/IEC 23220 — Mobile eID applications",
      "ISO/IEC 24745 — Biometric template protection",
      "ISO/IEC 19795 — Biometric performance testing"
    );
    idGovernance.push(
      "AAMVA mDL implementation guidelines",
      "ISO/IEC JTC 1/SC 37 biometric data interchange formats",
      "National ID authority certification requirements"
    );
  } else if (idLower.includes("w3c") || idLower.includes("verifiable") || idLower.includes("did") || idLower.includes("vc")) {
    assuranceLevel = "W3C VC — Decentralized identity with biometric proof";
    bindingMethod = "WBAN biometric proof embedded in W3C Verifiable Credential";
    idStandards.push(
      "W3C Verifiable Credentials Data Model 2.0",
      "W3C Decentralized Identifiers (DIDs) v1.0",
      "DIF BioConnect — Biometric binding for verifiable credentials",
      "Hyperledger Aries — Biometric-anchored credential exchange"
    );
    idGovernance.push(
      "Trust framework registration for VC issuers using biometric binding",
      "Biometric template revocability for DID key rotation",
      "Cross-chain interoperability for biometric credential verification"
    );
  } else {
    idStandards.push(
      "ISO/IEC 29115 — Entity Authentication Assurance Framework",
      "ISO/IEC 24745 — Biometric Template Protection",
      "FIDO2/WebAuthn — Biometric authentication standard",
      "IEEE 802.15.6 — WBAN security framework"
    );
    idGovernance.push(
      "Jurisdiction-specific biometric privacy laws apply",
      "Consent and purpose limitation for biometric-digital ID binding",
      "Audit trail requirements for identity assertion lifecycle"
    );
  }

  const digitalIdCrosswalk = {
    framework: digitalIdFramework,
    assurance_level: assuranceLevel,
    binding_method: bindingMethod,
    applicable_standards: idStandards,
    governance_requirements: idGovernance
  };

  // Regulatory landscape
  const regulations: WbanDigitalIdResult["regulatory_landscape"] = [];

  regulations.push({
    regulation: "IEEE 802.15.6-2012 (amended 2024)",
    applicability: "MANDATORY — Core WBAN communication standard",
    key_requirements: [
      "MAC and PHY layer specifications for body area networks",
      "Three security levels (0=unsecured, 1=authentication, 2=auth+encryption)",
      "Quality of Service priorities for medical vs non-medical traffic",
      "Coexistence mechanisms for multiple WBANs in proximity"
    ]
  });

  regulations.push({
    regulation: "IEC 60601-1 — Medical Electrical Equipment Safety",
    applicability: ctxLower.includes("medical") ? "MANDATORY — Medical WBAN deployment" : "CONDITIONAL — If used in healthcare context",
    key_requirements: [
      "Specific Absorption Rate (SAR) limits for on-body RF transmitters",
      "Electromagnetic compatibility (EMC) requirements",
      "Patient safety risk management per ISO 14971",
      "Essential performance requirements for medical WBAN"
    ]
  });

  if (jurLower.includes("eu") || jurLower.includes("uk")) {
    regulations.push({
      regulation: "EU Medical Devices Regulation (MDR) 2017/745",
      applicability: "MANDATORY for EU — WBAN biometric devices as medical/quasi-medical",
      key_requirements: [
        "CE marking with Notified Body assessment for Class IIa+",
        "Clinical evaluation and post-market surveillance",
        "Unique Device Identification (UDI) system registration",
        "Software as Medical Device (SaMD) classification per MDCG 2019-11"
      ]
    });
    regulations.push({
      regulation: "EU AI Act + GDPR intersection",
      applicability: "MANDATORY for EU — Biometric AI processing via WBAN",
      key_requirements: [
        "EU AI Act: WBAN biometric authentication = High-Risk (Annex III, Section 1)",
        "GDPR Article 9: Explicit consent for body-sensor biometric data",
        "GDPR Article 35: DPIA mandatory for innovative biometric processing",
        "EU AI Act Article 26: Deployer obligations for high-risk biometric AI"
      ]
    });
  }

  if (jurLower.includes("us")) {
    regulations.push({
      regulation: "FDA 21 CFR Part 820 / Part 11",
      applicability: ctxLower.includes("medical") ? "MANDATORY — FDA-regulated medical WBAN" : "CONDITIONAL — If WBAN qualifies as medical device",
      key_requirements: [
        "Quality System Regulation (QSR) per 21 CFR 820",
        "Electronic records/signatures per 21 CFR Part 11",
        "510(k) or De Novo classification pathway",
        "Cybersecurity pre-market guidance (FDA 2023)"
      ]
    });
    regulations.push({
      regulation: "FCC Part 95 Subpart I — Medical Device Radio Communications (MedRadio)",
      applicability: "MANDATORY for US — RF WBAN transmitters",
      key_requirements: [
        "Authorized frequency bands: 401-406 MHz (MICS), 413-457 MHz (MBAN)",
        "Maximum EIRP limits for body-worn transmitters",
        "Spectrum sharing requirements with other licensed users",
        "Equipment authorization (certification) required"
      ]
    });
  }

  // Security architecture
  const securityArchitecture: WbanDigitalIdResult["security_architecture"] = [
    {
      layer: "PHY Layer",
      mechanism: "Spread spectrum with body-channel isolation",
      standard_reference: "IEEE 802.15.6 Section 8 (PHY specifications)"
    },
    {
      layer: "MAC Layer",
      mechanism: "AES-128 CCM encryption + replay protection",
      standard_reference: "IEEE 802.15.6 Section 6.2.5 (Security)"
    },
    {
      layer: "Key Management",
      mechanism: "Master Key → Pairwise Temporal Key (MK/PTK) hierarchy",
      standard_reference: "IEEE 802.15.6 Section 6.2.5.3"
    },
    {
      layer: "Biometric Template",
      mechanism: "Cancelable biometrics with fuzzy vault/fuzzy commitment",
      standard_reference: "ISO/IEC 24745 — Biometric Template Protection"
    },
    {
      layer: "Identity Binding",
      mechanism: "Hardware-bound biometric credential with secure element",
      standard_reference: "FIDO2 / GlobalPlatform Secure Element specification"
    },
    {
      layer: "Transport",
      mechanism: "TLS 1.3 / DTLS 1.3 for hub-to-gateway communication",
      standard_reference: "RFC 9147 (DTLS 1.3) / RFC 8446 (TLS 1.3)"
    },
    {
      layer: "Application (MCP Governance)",
      mechanism: "Real-time compliance check via CSOAI Biometrics MCP API",
      standard_reference: "CSOAI MCP Ecosystem — biometric_risk_assessment tool"
    }
  ];

  // Risk assessment
  const hasNeural = modLower.includes("eeg") || modLower.includes("neural") || modLower.includes("brain");
  const hasImplant = topoLower.includes("implant") || topoLower.includes("in-body");
  let riskLevel = "HIGH";
  if (hasNeural || hasImplant) riskLevel = "CRITICAL";
  else if (modalities.length <= 1 && !ctxLower.includes("medical")) riskLevel = "MEDIUM-HIGH";

  const attackVectors = [
    "Relay attack — intercepting WBAN signals between sensor and hub",
    "Replay attack — capturing and re-transmitting biometric authentication signals",
    "Man-in-the-middle on hub-to-gateway backhaul link",
    "Biometric template theft from compromised hub/gateway",
    "Cross-WBAN interference for denial-of-service",
    "Presentation attack — spoofing body-worn sensor with synthetic signals"
  ];
  if (hasNeural) {
    attackVectors.push(
      "Neural signal injection — adversarial stimulation of BCI sensors",
      "Cognitive state inference — unauthorized mental state profiling"
    );
  }
  if (hasImplant) {
    attackVectors.push(
      "In-body node compromise — physical safety risk to patient",
      "Firmware attack on implanted device — life-safety critical"
    );
  }

  const mitigations = [
    "IEEE 802.15.6 Level 2 security minimum (AES-128 CCM + PTK rotation)",
    "Cancelable biometrics — revocable templates that prevent permanent compromise",
    "Proximity verification — RSSI/ToF distance bounding to prevent relay attacks",
    "Continuous authentication — ongoing biometric verification (not single-challenge)",
    "Secure element storage for biometric templates and cryptographic keys",
    "Multi-modal fusion — combine 2+ biometric modalities for anti-spoofing"
  ];
  if (hasImplant) {
    mitigations.push("IEC 62443 industrial security for implanted medical devices");
  }

  // Medical device classification
  const isMedical = ctxLower.includes("medical") || ctxLower.includes("healthcare") || ctxLower.includes("clinical") || hasImplant;
  const medDeviceClass = {
    fda_class: isMedical ? (hasImplant ? "Class III — Implantable WBAN device" : "Class II — Non-implant body-worn medical WBAN") : "Exempt — Non-medical wearable biometric",
    eu_mdr_class: isMedical ? (hasImplant ? "Class III — Active implantable" : "Class IIa — Active non-invasive diagnostic") : "Not MDR-regulated if purely biometric ID",
    mhra_class: isMedical ? (hasImplant ? "Class III" : "Class IIa") : "Not MHRA-regulated if non-medical",
    requires_510k: isMedical && !hasImplant,
    requires_ce_mark: isMedical && (jurLower.includes("eu") || jurLower.includes("uk"))
  };

  // Interoperability
  const interoperability = {
    protocol: "IEEE 802.15.6 MAC/PHY → BLE 5.x gateway → REST/gRPC MCP API",
    data_format: "ISO/IEC 19794 biometric data interchange → CBOR/JSON for MCP",
    integration_pattern: "WBAN Hub → Edge Gateway → Cloud MCP Governance API",
    mcp_governance_hooks: [
      "biometric_risk_assessment — Pre-enrollment EU AI Act classification check",
      "bipa_compliance — US state biometric law compliance verification",
      "wban_digital_id_assessment — This tool: end-to-end WBAN + digital ID governance",
      "Real-time consent verification via MCP API before biometric capture",
      "Continuous compliance monitoring during active WBAN session"
    ]
  };

  // Remediation
  const remediation = [
    "1. Implement IEEE 802.15.6 Level 2+ security for all WBAN biometric links",
    "2. Deploy cancelable biometric template protection per ISO/IEC 24745",
    "3. Conduct DPIA/PIA for WBAN biometric processing (GDPR Art. 35 / NIST RMF)",
    "4. Bind biometric credential to hardware secure element (FIDO2/GlobalPlatform)",
    "5. Register with applicable medical device authorities if healthcare context",
    "6. Implement FCC MedRadio / CE RED compliance for RF WBAN transmitters",
    "7. Deploy multi-modal biometric fusion for anti-spoofing resilience",
    "8. Integrate CSOAI MCP governance APIs for continuous compliance monitoring",
    "9. Establish biometric template revocation mechanism for credential lifecycle",
    "10. Schedule annual IEEE 802.15.6 security audit + penetration test"
  ];
  if (hasNeural) {
    remediation.push("11. CRITICAL: Implement neuroethics review per IEEE Neuroethics Framework");
    remediation.push("12. CRITICAL: Deploy neural data minimization — capture only authentication features, discard cognitive state data");
  }

  return {
    system_name: systemName,
    ieee_802_15_6_compliance: {
      standard: "IEEE 802.15.6-2012 / IEEE 802.15.6a-2024 — Wireless Body Area Networks",
      hub_type: hubType,
      band_classification: bandClassification,
      data_rate_category: dataRateCategory,
      security_level: securityLevel,
      mac_layer_security: macSecurity,
      phy_layer: phyLayer
    },
    biometric_modalities: modalities,
    digital_identity_crosswalk: digitalIdCrosswalk,
    regulatory_landscape: regulations,
    security_architecture: securityArchitecture,
    risk_assessment: {
      risk_level: riskLevel,
      attack_vectors: attackVectors,
      mitigations
    },
    medical_device_classification: medDeviceClass,
    interoperability,
    remediation
  };
}

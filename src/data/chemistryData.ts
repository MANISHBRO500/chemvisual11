import {
  Chapter,
  DiagramTopic,
  MoleculeData,
  OrbitalData,
  VSEPRDomainConfig,
  HybridisationConfig,
  PeriodicElement,
  QuizQuestion,
  JEERevisionCard,
} from "../types/chemistry";

export const CHAPTERS_DATA: Chapter[] = [
  {
    id: "basic-concepts",
    number: 1,
    title: "Some Basic Concepts of Chemistry",
    subtitle: "States of Matter, Thermometer, Pure Substances & Mole Concept",
    description: "Solid, liquid, and gas molecular dynamics, interactive thermometer temperature scales, pure substances vs mixtures, laws of chemical combination, and mole calculations.",
    iconName: "Thermometer",
    topicsCount: 12,
    jeeWeightage: "1-2 Questions (4-8 Marks)",
    keyConcepts: ["States of Matter & Kinetic Theory", "Interactive Thermometer Scales", "Pure Substances vs Mixtures", "Mole Concept & Stoichiometry"],
    topics: [],
  },
  {
    id: "structure-of-atom",
    number: 2,
    title: "Structure of Atom",
    subtitle: "Rutherford, Bohr Model, Quantum Numbers & Orbitals",
    description: "Atomic models, line emission spectra of hydrogen, s, p, d orbital shapes, electronic configurations, and quantum mechanical principles.",
    iconName: "Atom",
    topicsCount: 24,
    jeeWeightage: "2 Questions (8 Marks)",
    keyConcepts: ["Bohr Radius & Energy", "Hydrogen Spectrum", "Shapes of Orbitals", "Aufbau & Hund's Rules"],
    topics: [],
  },
  {
    id: "periodicity",
    number: 3,
    title: "Classification of Elements and Periodicity",
    subtitle: "Modern Periodic Table & Periodic Trends",
    description: "Periodic law, s/p/d/f blocks, atomic and ionic radii, ionisation enthalpy, electron gain enthalpy, electronegativity, and diagonal relationships.",
    iconName: "Table",
    topicsCount: 14,
    jeeWeightage: "1-2 Questions (4-8 Marks)",
    keyConcepts: ["Ionisation Energy Exceptions", "Effective Nuclear Charge", "Electronegativity Scales", "Ionic Radius Trends"],
    topics: [],
  },
  {
    id: "chemical-bonding",
    number: 4,
    title: "Chemical Bonding & Molecular Structure",
    subtitle: "VSEPR, Hybridisation, MOT & Hydrogen Bonding",
    description: "Lewis structures, formal charge, resonance, VSEPR geometry, orbital overlap, hybridisation (sp to sp³d²), Molecular Orbital Theory (MOT) diagrams, and H-bonding.",
    iconName: "Zap",
    topicsCount: 37,
    jeeWeightage: "3-4 Questions (12-16 Marks)",
    keyConcepts: ["VSEPR Geometry & Lone Pairs", "sp³d & sp³d² Hybridisation", "MO Diagrams (O₂, N₂)", "Dipole Moments"],
    topics: [],
  },
  {
    id: "hydrogen",
    number: 5,
    title: "Hydrogen",
    subtitle: "Isotopes, Hydrides, Water & H₂O₂",
    description: "Position in periodic table, isotopes (Protium, Deuterium, Tritium), Ortho & Para hydrogen, ionic/covalent/interstitial hydrides, structure of H₂O₂, and heavy water.",
    iconName: "Droplet",
    topicsCount: 14,
    jeeWeightage: "1 Question (4 Marks)",
    keyConcepts: ["Structure & Strength of H₂O₂", "Hydride Types", "Water Hardness & Softening", "Ortho vs Para H₂"],
    topics: [],
  },
  {
    id: "s-block",
    number: 6,
    title: "s-Block Elements",
    subtitle: "Alkali & Alkaline Earth Metals",
    description: "Group 1 & 2 metals, Na, K, Mg, Ca compounds, NaCl lattice, peroxides/superoxides, diagonal relationships (Li-Mg, Be-Al), and flame test colors.",
    iconName: "Flame",
    topicsCount: 13,
    jeeWeightage: "1-2 Questions (4-8 Marks)",
    keyConcepts: ["Flame Colors & Spectra", "Peroxides & Superoxides", "Solubility Trends of Sulphates/Hydroxides", "Diagonal Relationship"],
    topics: [],
  },
  {
    id: "p-block",
    number: 7,
    title: "p-Block Elements",
    subtitle: "Group 13 & 14 Chemistry (Boron & Carbon Families)",
    description: "Group 13 (Boron, BF₃, Diborane B₂H₆, Al₂Cl₆) and Group 14 (Carbon allotropes, Silicates, SiO₂, Silicones, Oxides of Nitrogen, Phosphorous, Oxoacids of Sulphur/Halogens).",
    iconName: "Layers",
    topicsCount: 54,
    jeeWeightage: "3-4 Questions (12-16 Marks)",
    keyConcepts: ["Diborane 3c-2e Banana Bonds", "Al₂Cl₆ Dative Bridge", "Fullerene & Graphite Allotropes", "Silicate Frameworks & Oxoacids"],
    topics: [],
  },
  {
    id: "environmental-chemistry",
    number: 8,
    title: "Environmental Chemistry",
    subtitle: "Atmospheric Layers, Ozone Depletion & Smog",
    description: "Tropospheric & stratospheric pollution, acid rain, greenhouse effect, photochemical smog (PAN formation), and CFC catalytic ozone destruction cycle.",
    iconName: "Wind",
    topicsCount: 9,
    jeeWeightage: "1 Question (4 Marks)",
    keyConcepts: ["Photochemical Smog Reactions", "CFC Free Radical Cycle", "Acid Rain Reactions", "BOD & Water Quality"],
    topics: [],
  },
];

// Master list of 165 Inorganic Topics across the 7 Chapters
export const ALL_TOPICS: DiagramTopic[] = [
  // Chapter 1: Some Basic Concepts of Chemistry
  {
    id: "states-of-matter-thermometer",
    chapterId: "basic-concepts",
    chapterTitle: "Some Basic Concepts of Chemistry",
    topicNumber: 1,
    title: "States of Matter & Interactive Thermometer Simulator",
    formula: "K = °C + 273.15, °F = (9/5)*°C + 32",
    difficulty: "Easy",
    jeeMainPriority: "VERY_HIGH",
    jeeAdvancedPriority: "HIGH",
    ncertPriority: "VERY_HIGH",
    tags: ["states of matter", "solid", "liquid", "gas", "thermometer", "kinetic theory", "phase transition"],
    description: "Interactive simulation of Solid, Liquid, and Gas particulate behavior with a real-time thermometer temperature control (°C, K, °F) showing particle kinetic velocity.",
    whyItMatters: "Forms the fundamental core of physical chemistry, temperature scales, thermal kinetic energy, and phase transformations.",
    howItWorks: [
      "Solid State: Particles tightly packed in orderly grid with fixed positions, vibrating around mean position.",
      "Liquid State: Particles closely packed but can slide past each other smoothly with fluid flow.",
      "Gas State: Particles far apart, moving continuously at high random velocities in all directions.",
      "Thermometer: Mercury level expands linearly with temperature, increasing particle kinetic energy E_k ∝ T."
    ],
    keyPoints: [
      "Absolute Zero (0 K or -273.15 °C): Temperature at which all molecular kinetic motion ceases.",
      "Melting Point & Boiling Point: Specific temperature thresholds where intermolecular forces are overcome.",
      "Triple Point of Water: 273.16 K (0.01 °C) where solid, liquid, and gas phases coexist in equilibrium."
    ],
    commonMistakes: [
      "Confusing Heat (total thermal energy) with Temperature (average kinetic energy).",
      "Forgetting that Kelvin temperature scale can NEVER be negative (0 K is absolute zero)."
    ],
    examTip: "In JEE calculations, ALWAYS convert temperature to Kelvin: T(K) = t(°C) + 273.15.",
    has3DModel: false,
    svgType: "states-of-matter"
  },
  {
    id: "classification-of-matter",
    chapterId: "basic-concepts",
    chapterTitle: "Some Basic Concepts of Chemistry",
    topicNumber: 2,
    title: "Classification of Matter: Pure Substances vs Mixtures",
    difficulty: "Easy",
    jeeMainPriority: "HIGH",
    jeeAdvancedPriority: "MEDIUM",
    ncertPriority: "VERY_HIGH",
    tags: ["pure substance", "element", "compound", "mixture", "homogeneous", "heterogeneous"],
    description: "Hierarchical classification of matter into Pure Substances (Elements and Compounds) and Mixtures (Homogeneous solutions and Heterogeneous suspensions).",
    whyItMatters: "Essential for distinguishing chemically bonded compounds with fixed ratios from physically blended mixtures with variable compositions.",
    howItWorks: [
      "Pure Substances: Composed of single constituent with fixed chemical formula and sharp melting/boiling points.",
      "Elements: Consist of only one type of atom (e.g. O₂, Au, Fe) and cannot be decomposed further.",
      "Compounds: Two or more elements chemically combined in fixed proportion by mass (e.g. H₂O, NaCl, CO₂).",
      "Homogeneous Mixtures: Uniform composition throughout (e.g. Air, Sugar solution, Brass alloy).",
      "Heterogeneous Mixtures: Non-uniform composition with visible phase boundaries (e.g. Oil in Water, Sand in Water)."
    ],
    keyPoints: [
      "Law of Definite Proportions (Proust): A chemical compound always contains exactly the same proportion of elements by mass.",
      "Constituent properties are LOST in compounds (e.g. H₂ and O₂ gases form liquid H₂O) but RETAINED in mixtures."
    ],
    commonMistakes: [
      "Classifying alloys like Brass or Air as compounds instead of homogeneous mixtures.",
      "Assuming pure water is a mixture because it contains hydrogen and oxygen atoms."
    ],
    examTip: "Compounds can only be separated by chemical methods, while mixtures are separated by physical methods (distillation, filtration, magnetism).",
    has3DModel: false,
    svgType: "classification"
  },
  {
    id: "mole-concept-stoichiometry",
    chapterId: "basic-concepts",
    chapterTitle: "Some Basic Concepts of Chemistry",
    topicNumber: 3,
    title: "Mole Concept, Molar Mass & Stoichiometry",
    formula: "1 Mole = 6.022 × 10^23 particles, n = W / M = V(STP) / 22.4 L",
    difficulty: "Medium",
    jeeMainPriority: "VERY_HIGH",
    jeeAdvancedPriority: "VERY_HIGH",
    ncertPriority: "VERY_HIGH",
    tags: ["mole concept", "avogadro constant", "molar mass", "stoichiometry", "limiting reagent"],
    description: "Quantitative relationship between mass, number of moles, Avogadro's number (N_A), molar gas volume at STP (22.4 L), and limiting reagents in chemical reactions.",
    whyItMatters: "The universal quantitative currency of chemistry, mandatory for all physical chemistry numerical problems.",
    howItWorks: [
      "1 Mole is the amount of substance containing as many elementary entities as atoms in exactly 12g of C-12.",
      "Avogadro Constant (N_A) = 6.02214076 × 10²³ particles/mol.",
      "Molar Volume of Ideal Gas at STP (0°C, 1 atm) = 22.4 L or 22.7 L at (0°C, 1 bar).",
      "Limiting Reagent: The reactant that is completely consumed first in a chemical reaction, determining maximum yield."
    ],
    keyPoints: [
      "Number of Moles (n) = Given Mass (W) / Molar Mass (M) = Given Particles (N) / N_A.",
      "Molarity (M) = Moles of Solute / Volume of Solution in Liters.",
      "Molality (m) = Moles of Solute / Mass of Solvent in Kilograms (Temperature Independent!)."
    ],
    commonMistakes: [
      "Confusing Molarity (depends on solution volume and temperature) with Molality (mass-based, temperature invariant).",
      "Forgetting to balance the chemical equation before determining limiting reagents."
    ],
    examTip: "In JEE stoichiometric problems, always calculate moles first before applying mole ratios!",
    has3DModel: false,
    svgType: "mole-concept"
  },
  // Chapter 2: Structure of Atom
  {
    id: "rutherford-scattering",
    chapterId: "structure-of-atom",
    chapterTitle: "Structure of Atom",
    topicNumber: 1,
    title: "Rutherford Alpha-Particle Scattering Experiment",
    difficulty: "Medium",
    jeeMainPriority: "HIGH",
    jeeAdvancedPriority: "MEDIUM",
    ncertPriority: "VERY_HIGH",
    tags: ["nucleus", "alpha particle", "gold foil", "atomic model"],
    description: "Bombardment of thin gold foil with high-energy α-particles (He²⁺) proving that the atom consists mostly of empty space with a dense positive nucleus.",
    whyItMatters: "Revolutionized physics by disproving Thomson's plum pudding model and establishing the existence of the atomic nucleus.",
    howItWorks: [
      "Most α-particles pass straight through gold foil without deflection (>99.9%).",
      "A small fraction (~1 in 8000) is deflected by large angles (>90°).",
      "Very few reflect back along their original trajectory (180° deflection)."
    ],
    keyPoints: [
      "Radius of nucleus ~ 10⁻¹⁵ m, while atom radius ~ 10⁻¹⁰ m.",
      "Impact parameter (b) determines deflection angle θ.",
      "Distance of closest approach (r₀) gives upper bound on nuclear radius."
    ],
    commonMistakes: [
      "Confusing alpha particles (He²⁺) with electrons or gamma rays.",
      "Assuming deflection is due to collision rather than electrostatic Coulomb repulsion."
    ],
    examTip: "r₀ = (1 / 4πε₀) * (2Ze² / K.E.). In JEE, calculate r₀ when α-particle Kinetic Energy is doubled.",
    has3DModel: false,
    svgType: "rutherford"
  },
  {
    id: "bohr-energy-levels",
    chapterId: "structure-of-atom",
    chapterTitle: "Structure of Atom",
    topicNumber: 4,
    title: "Bohr Model & Energy Levels of Hydrogen",
    formula: "E_n = -13.6 Z^2 / n^2 eV",
    difficulty: "Medium",
    jeeMainPriority: "VERY_HIGH",
    jeeAdvancedPriority: "HIGH",
    ncertPriority: "VERY_HIGH",
    tags: ["bohr", "quantization", "energy levels", "hydrogen spectrum"],
    description: "Quantized circular orbits where electrons revolve without radiating energy unless undergoing transitions between stationary orbits.",
    whyItMatters: "Explains line spectrum of hydrogen atom and provides mathematical formula for orbital radii, electron velocities, and energy values.",
    howItWorks: [
      "Angular momentum quantization: m v r = n h / 2π.",
      "Electrostatic attraction equals centripetal force: k Z e² / r² = m v² / r.",
      "Radius: r_n = 0.529 * (n² / Z) Å."
    ],
    keyPoints: [
      "Energy is negative indicating bound electron state.",
      "As n increases, energy levels become closer together.",
      "Velocity of electron: v_n = 2.18 * 10⁶ * (Z / n) m/s."
    ],
    commonMistakes: [
      "Applying Bohr's model directly to multi-electron atoms (it only holds for 1-electron species like H, He⁺, Li²⁺).",
      "Forgetting to include Z² in energy calculations."
    ],
    examTip: "JEE frequently asks for wavelength ratio during transitions like n=3→1 vs n=2→1.",
    has3DModel: false,
    svgType: "bohr-levels"
  },
  {
    id: "hydrogen-emission-spectrum",
    chapterId: "structure-of-atom",
    chapterTitle: "Structure of Atom",
    topicNumber: 5,
    title: "Hydrogen Emission Spectrum (Lyman, Balmer, Paschen, Brackett, Pfund)",
    formula: "1/λ = R_H * Z^2 * (1/n_1^2 - 1/n_2^2)",
    difficulty: "Medium",
    jeeMainPriority: "VERY_HIGH",
    jeeAdvancedPriority: "VERY_HIGH",
    ncertPriority: "VERY_HIGH",
    tags: ["lyman", "balmer", "paschen", "rydberg constant", "spectral series"],
    description: "Discrete line emission spectrum resulting from de-excitation of electron from higher energy levels n₂ to lower level n₁.",
    whyItMatters: "Direct experimental proof of quantized atomic energy states.",
    howItWorks: [
      "Lyman series: n₁ = 1, n₂ = 2, 3, 4... (UV region)",
      "Balmer series: n₁ = 2, n₂ = 3, 4, 5... (Visible region)",
      "Paschen series: n₁ = 3, n₂ = 4, 5, 6... (Near IR region)",
      "Brackett series: n₁ = 4, n₂ = 5, 6, 7... (IR region)",
      "Pfund series: n₁ = 5, n₂ = 6, 7, 8... (Far IR region)"
    ],
    keyPoints: [
      "Rydberg Constant R_H = 109,677 cm⁻¹ ≈ 1.097 × 10⁷ m⁻¹.",
      "Maximum spectral lines emitted during return from level n: N = n(n - 1) / 2.",
      "Series limit occurs when n₂ = ∞."
    ],
    commonMistakes: [
      "Assuming Balmer series is in UV region (only Balmer is in the visible spectrum).",
      "Calculating total lines without checking if transition ends at ground state or intermediate state."
    ],
    examTip: "Shortest wavelength corresponds to n₂ = ∞; longest wavelength corresponds to n₂ = n₁ + 1.",
    has3DModel: false,
    svgType: "hydrogen-spectrum"
  },
  {
    id: "orbitals-3d-shapes",
    chapterId: "structure-of-atom",
    chapterTitle: "Structure of Atom",
    topicNumber: 11,
    title: "Atomic Orbitals (s, px, py, pz, dxy, dyz, dzx, dx²-y², dz²)",
    difficulty: "Medium",
    jeeMainPriority: "VERY_HIGH",
    jeeAdvancedPriority: "VERY_HIGH",
    ncertPriority: "VERY_HIGH",
    tags: ["s orbital", "p orbital", "d orbital", "nodal planes", "quantum numbers"],
    description: "Three-dimensional electron probability density distributions defined by quantum numbers n, l, m.",
    whyItMatters: "Shapes and directional properties of orbitals govern molecular geometry, hybridisation, and chemical reactivity.",
    howItWorks: [
      "s orbital: Spherical, non-directional (l = 0).",
      "p orbitals: Dumbbell shape, directional along x, y, z axes (l = 1).",
      "d orbitals: Double dumbbell shape (l = 2), except dz² which has a donut ring collar."
    ],
    keyPoints: [
      "Radial nodes = n - l - 1.",
      "Angular nodes = l.",
      "Total nodes = n - 1.",
      "dx²-y² lobes lie ALONG the x and y axes; dxy lobes lie BETWEEN the axes."
    ],
    commonMistakes: [
      "Confusing radial nodes with angular nodal planes.",
      "Thinking dz² has 2 angular nodal planes (dz² has a conical nodal surface)."
    ],
    examTip: "JEE Advanced asks for the number of radial and angular nodes for 4f, 5d, 3p orbitals regularly.",
    has3DModel: true,
    modelType: "orbital"
  },

  // Chapter 2: Classification of Elements and Periodicity
  {
    id: "modern-periodic-table",
    chapterId: "periodicity",
    chapterTitle: "Classification of Elements and Periodicity",
    topicNumber: 25,
    title: "Modern Periodic Table & Electronic Blocks (s, p, d, f)",
    difficulty: "Easy",
    jeeMainPriority: "VERY_HIGH",
    jeeAdvancedPriority: "HIGH",
    ncertPriority: "VERY_HIGH",
    tags: ["periodic law", "s-block", "p-block", "d-block", "f-block"],
    description: "Elements arranged in order of increasing atomic number Z into 18 Groups and 7 Periods based on valence subshell filling.",
    whyItMatters: "Provides systematic framework for predicting chemical behavior, valence, and periodic trends.",
    howItWorks: [
      "s-block: Groups 1 & 2 (outer ns¹⁻²).",
      "p-block: Groups 13 to 18 (outer ns² np¹⁻⁶).",
      "d-block: Groups 3 to 12 (outer (n-1)d¹⁻¹⁰ ns¹⁻²).",
      "f-block: Lanthanides & Actinides (outer (n-2)f¹⁻¹⁴ (n-1)d⁰⁻¹ ns²)."
    ],
    keyPoints: [
      "Effective nuclear charge Z* = Z - S (Slater's screening constant).",
      "General trend: Z* increases across a period, leading to contraction of atomic size."
    ],
    commonMistakes: [
      "Misidentifying block location for anomalous electronic configurations like Cr (3d⁵4s¹) or Cu (3d¹⁰4s¹).",
      "Forgetting that Group 3 contains all f-block elements."
    ],
    examTip: "Always write full configuration using Aufbau principle before identifying block, group, and period.",
    has3DModel: false,
    svgType: "periodic-blocks"
  },
  {
    id: "periodic-trends-radii-ie-en",
    chapterId: "periodicity",
    chapterTitle: "Classification of Elements and Periodicity",
    topicNumber: 30,
    title: "Periodic Trends: Atomic Radius, Ionisation Energy & Electronegativity",
    difficulty: "Hard",
    jeeMainPriority: "VERY_HIGH",
    jeeAdvancedPriority: "VERY_HIGH",
    ncertPriority: "VERY_HIGH",
    tags: ["atomic radius", "ionisation energy", "electronegativity", "slater rules", "exceptions"],
    description: "Systematic variation of physical properties across periods (left to right) and down groups (top to bottom) with critical exceptions.",
    whyItMatters: "Forms the core basis of all inorganic reactions, acid-base strengths, and bond polarities.",
    howItWorks: [
      "Atomic Radius: Decreases across period (Z* increases); Increases down group (new shells added).",
      "Ionisation Energy: Increases across period; Decreases down group.",
      "Electronegativity: Increases across period (F is highest = 4.0); Decreases down group."
    ],
    keyPoints: [
      "IE Exception 1: Be (1s²2s²) > B (1s²2s²2p¹) due to stable fully filled 2s orbital.",
      "IE Exception 2: N (1s²2s²2p³) > O (1s²2s²2p⁴) due to extra stability of half-filled p subshell.",
      "Electron Gain Enthalpy: Cl > F (F has small size leading to strong inter-electronic repulsion)."
    ],
    commonMistakes: [
      "Assuming F has higher electron gain enthalpy than Cl (Cl is more negative: -349 kJ/mol vs F -328 kJ/mol).",
      "Overlooking Ga vs Al size anomaly due to poor shielding by 3d electrons (d-block contraction)."
    ],
    examTip: "Order of 1st IE in 2nd Period: Li < B < Be < C < O < N < F < Ne. Notice Be > B and N > O!",
    has3DModel: false,
    svgType: "periodic-trends"
  },

  // Chapter 3: Chemical Bonding and Molecular Structure
  {
    id: "diborane",
    chapterId: "p-block",
    chapterTitle: "p-Block Elements",
    topicNumber: 106,
    title: "Diborane (B₂H₆) & 3-Centre-2-Electron Banana Bonds",
    formula: "B_2H_6",
    difficulty: "Hard",
    jeeMainPriority: "VERY_HIGH",
    jeeAdvancedPriority: "VERY_HIGH",
    ncertPriority: "VERY_HIGH",
    tags: ["diborane", "banana bond", "3c-2e", "electron deficient", "hybridisation"],
    description: "An electron-deficient dimer of BH₃ containing 4 terminal 2-centre-2-electron (2c-2e) B-H bonds and 2 bridging 3-centre-2-electron (3c-2e) B-H-B banana bonds.",
    whyItMatters: "Classic textbook example of multi-center electron-deficient bonding in inorganic chemistry.",
    howItWorks: [
      "Each Boron atom undergoes sp³ hybridisation.",
      "4 Terminal B-H bonds lie in a single plane (normal 2c-2e σ bonds).",
      "2 Bridging Hydrogen atoms lie ABOVE and BELOW the plane.",
      "Overlap of 1 hybrid orbital from Boron 1 + 1s orbital of Bridging H + 1 hybrid orbital from Boron 2 forms 3c-2e B-H-B bond."
    ],
    keyPoints: [
      "Total valence electrons = (2 × 3) + (6 × 1) = 12 electrons.",
      "4 terminal B-H bonds use 8 electrons; 2 bridging B-H-B bonds use remaining 4 electrons.",
      "Bridge bond angle H-B-H = 97°; Terminal H-B-H = 121°."
    ],
    commonMistakes: [
      "Assuming B₂H₆ contains a direct B-B bond (there is NO B-B bond in diborane).",
      "Thinking all 6 hydrogens are chemically equivalent (terminal H atoms react faster than bridge H)."
    ],
    examTip: "Reactions: B₂H₆ + 2NH₃ (low temp) → [BH₂(NH₃)₂]⁺[BH₄]⁻. High temp heating yields Borazine (B₃N₃H₆ - Inorganic Benzene).",
    has3DModel: true,
    modelType: "molecule",
    moleculeId: "b2h6",
    hybridisation: "sp³",
    geometry: "Tetrahedral around each B",
    bondAngles: "121° (terminal), 97° (bridge)"
  },
  {
    id: "al2cl6",
    chapterId: "p-block",
    chapterTitle: "p-Block Elements",
    topicNumber: 109,
    title: "Aluminium Chloride Dimer (Al₂Cl₆)",
    formula: "Al_2Cl_6",
    difficulty: "Medium",
    jeeMainPriority: "VERY_HIGH",
    jeeAdvancedPriority: "HIGH",
    ncertPriority: "VERY_HIGH",
    tags: ["al2cl6", "dimer", "dative bond", "coordinate bond", "p-block"],
    description: "Anhydrous AlCl₃ completes its octet in the vapor phase and non-polar solvents by forming a dimer via two Cl→Al coordinate dative covalent bonds.",
    whyItMatters: "Demonstrates octet completion through coordinate dative bonding without electron deficiency.",
    howItWorks: [
      "In monomeric AlCl₃, Al has only 6 valence electrons (incomplete octet).",
      "Two AlCl₃ units pair up where chlorine atoms donate lone pairs to vacant 3p orbitals of adjacent Al.",
      "Al atom changes hybridisation from sp² (in monomer) to sp³ (in dimer Al₂Cl₆)."
    ],
    keyPoints: [
      "Contains 4 terminal Al-Cl bonds and 2 bridging Al-Cl-Al coordinate bonds.",
      "All 6 bonds in Al₂Cl₆ are 2-centre-2-electron (2c-2e) bonds (unlike B₂H₆!).",
      "At very high temperatures (>800 K), Al₂Cl₆ dissociates back into planar sp² AlCl₃."
    ],
    commonMistakes: [
      "Calling Al₂Cl₆ electron deficient (it is NOT electron deficient; all atoms satisfy octets).",
      "Confusing Al₂Cl₆ 2c-2e coordinate bridges with B₂H₆ 3c-2e banana bridges."
    ],
    examTip: "In aqueous solution, AlCl₃ exists as hydrated ionic complex [Al(H₂O)₆]³⁺ + 3Cl⁻.",
    has3DModel: true,
    modelType: "molecule",
    moleculeId: "al2cl6",
    hybridisation: "sp³",
    geometry: "Tetrahedral around each Al",
    bondAngles: "101° (bridge Al-Cl-Al), 118° (terminal Cl-Al-Cl)"
  },
  {
    id: "vsepr-geometries",
    chapterId: "chemical-bonding",
    chapterTitle: "Chemical Bonding and Molecular Structure",
    topicNumber: 43,
    title: "VSEPR Theory & Molecular Geometries",
    difficulty: "Hard",
    jeeMainPriority: "VERY_HIGH",
    jeeAdvancedPriority: "VERY_HIGH",
    ncertPriority: "VERY_HIGH",
    tags: ["vsepr", "lone pair", "bond pair", "repulsion", "geometries"],
    description: "Valence Shell Electron Pair Repulsion theory predicts molecular shapes based on minimizing electrostatic repulsions between electron pairs.",
    whyItMatters: "Fundamental tool for predicting 3D shapes, bond angles, and polarity of molecules.",
    howItWorks: [
      "Order of repulsion strength: Lone Pair - Lone Pair (lp-lp) > Lone Pair - Bond Pair (lp-bp) > Bond Pair - Bond Pair (bp-bp).",
      "2 domains: Linear (180°)",
      "3 domains: Trigonal Planar (120°) / Bent",
      "4 domains: Tetrahedral (109.5°) / Trigonal Pyramidal / Bent",
      "5 domains: Trigonal Bipyramidal (90°, 120°) / Seesaw / T-shaped / Linear",
      "6 domains: Octahedral (90°) / Square Pyramidal / Square Planar"
    ],
    keyPoints: [
      "In TBP (5 domains), lone pairs ALWAYS occupy equatorial positions to minimize 90° repulsions.",
      "In Octahedral (6 domains), lone pairs occupy axial positions 180° opposite to each other."
    ],
    commonMistakes: [
      "Placing lone pairs in axial positions in PCl₅ or SF₄ derivatives.",
      "Forgetting that double/triple bonds exert higher repulsion than single bonds."
    ],
    examTip: "XeF₂ is Linear (3 lone pairs in equatorial plane). XeF₄ is Square Planar (2 lone pairs axial). ClF₃ is T-shaped.",
    has3DModel: true,
    modelType: "vsepr"
  },
  {
    id: "hybridisation-sim",
    chapterId: "chemical-bonding",
    chapterTitle: "Chemical Bonding and Molecular Structure",
    topicNumber: 56,
    title: "Hybridisation Simulator (sp, sp², sp³, sp³d, sp³d²)",
    difficulty: "Medium",
    jeeMainPriority: "VERY_HIGH",
    jeeAdvancedPriority: "VERY_HIGH",
    ncertPriority: "VERY_HIGH",
    tags: ["hybridisation", "orbital mixing", "sp3", "sp3d", "sp3d2"],
    description: "Mixing of non-equivalent atomic orbitals of central atom to form set of equivalent hybrid orbitals directed in space.",
    whyItMatters: "Explains equivalent bond lengths and directions in CH₄, BF₃, PCl₅, SF₆.",
    howItWorks: [
      "sp: 1s + 1p = 2 hybrid orbitals (180°, linear).",
      "sp²: 1s + 2p = 3 hybrid orbitals (120°, trigonal planar).",
      "sp³: 1s + 3p = 4 hybrid orbitals (109.5°, tetrahedral).",
      "sp³d: 1s + 3p + 1d_z² = 5 hybrid orbitals (TBP).",
      "sp³d²: 1s + 3p + 1d_x²-y² + 1d_z² = 6 hybrid orbitals (Octahedral)."
    ],
    keyPoints: [
      "Number of hybrid orbitals formed = Number of atomic orbitals mixed.",
      "In sp³d, axial bonds are longer than equatorial bonds due to repulsion from 3 equatorial pairs at 90°."
    ],
    commonMistakes: [
      "Assuming d_xy orbital is used in sp³d hybridisation (dz² is used in sp³d!).",
      "Including π bonds when calculating hybridisation state."
    ],
    examTip: "Formula for Steric Number H = ½ [V + M - C + A] where V=valence e⁻, M=monovalent atoms, C=charge, A=anion charge.",
    has3DModel: true,
    modelType: "hybridisation"
  },
  {
    id: "carbon-allotropes",
    chapterId: "p-block",
    chapterTitle: "p-Block Elements",
    topicNumber: 110,
    title: "Allotropes of Carbon: Diamond, Graphite & Fullerene C₆₀",
    difficulty: "Medium",
    jeeMainPriority: "VERY_HIGH",
    jeeAdvancedPriority: "HIGH",
    ncertPriority: "VERY_HIGH",
    tags: ["diamond", "graphite", "fullerene", "c60", "carbon", "allotropes"],
    description: "Crystalline forms of carbon exhibiting vastly different physical properties based on sp³ vs sp² hybridisation and structural dimensionality.",
    whyItMatters: "Demonstrates how identical chemical composition produces extreme differences in hardness, electrical conductivity, and density.",
    howItWorks: [
      "Diamond: sp³ hybridised 3D rigid tetrahedral framework. Hardest natural substance, electrical insulator.",
      "Graphite: sp² hybridised 2D hexagonal planar sheets held by van der Waals forces. Soft, slippery lubricant, electrical conductor due to delocalized π electrons.",
      "Fullerene C₆₀ (Buckminsterfullerene): Soccer ball geodesic dome consisting of 20 hexagons and 12 pentagons. sp² hybridised with localized double bonds."
    ],
    keyPoints: [
      "Fullerene C₆₀ contains 20 six-membered rings and 12 five-membered rings.",
      "Six-membered rings fuse with both hexagons and pentagons; five-membered rings fuse ONLY with hexagons.",
      "Thermodynamically most stable allotrope of carbon is GRAPHITE."
    ],
    commonMistakes: [
      "Thinking diamond is thermodynamically more stable than graphite (Graphite is standard state; ΔH_f(diamond) = +1.9 kJ/mol).",
      "Assuming pentagons in C₆₀ touch each other (no two pentagons share an edge in C₆₀ - Isolated Pentagon Rule)."
    ],
    examTip: "JEE Advanced question: C-C bond length order: Diamond (154 pm) > C₆₀ single bond (143 pm) > Graphite (141.5 pm) > C₆₀ double bond (138 pm).",
    has3DModel: true,
    modelType: "molecule",
    moleculeId: "c60"
  },
  {
    id: "ozone-depletion-smog",
    chapterId: "environmental-chemistry",
    chapterTitle: "Environmental Chemistry",
    topicNumber: 159,
    title: "Stratospheric Ozone Depletion & Photochemical Smog (PAN)",
    formula: "CF_2Cl_2 -> CF_2Cl* + Cl*",
    difficulty: "Medium",
    jeeMainPriority: "VERY_HIGH",
    jeeAdvancedPriority: "HIGH",
    ncertPriority: "VERY_HIGH",
    tags: ["ozone", "cfc", "free radical", "photochemical smog", "pan"],
    description: "Catalytic destruction of stratospheric ozone by chlorine free radicals generated from chlorofluorocarbons (CFCs) and mechanism of oxidising photochemical smog.",
    whyItMatters: "Key environmental topic frequently tested in JEE Main for specific chemical reaction equations.",
    howItWorks: [
      "CFC breakdown: CF₂Cl₂ + hν → CF₂Cl• + Cl•",
      "Ozone destruction cycle: Cl• + O₃ → ClO• + O₂ followed by ClO• + O → Cl• + O₂",
      "Photochemical smog components: NO₂, O₃, Peroxyacetyl nitrate (PAN), Acrolein, Formaldehyde."
    ],
    keyPoints: [
      "A single chlorine radical can destroy over 100,000 stratospheric ozone molecules.",
      "Classic smog is reducing (SO₂ based, cold humid climate).",
      "Photochemical smog is oxidising (NO₂ + hydrocarbons, sunny dry climate)."
    ],
    commonMistakes: [
      "Confusing Classic (London) smog with Photochemical (Los Angeles) smog.",
      "Forgetting that PAN stands for Peroxyacetyl nitrate [CH₃CO-OO-NO₂]."
    ],
    examTip: "Formula of PAN and primary eye irritants in smog: O₃, PAN, Acrolein (CH₂=CH-CHO).",
    has3DModel: false,
    svgType: "smog-cycle"
  }
];

// 3D Molecule Data Set
export const MOLECULES_DATA: MoleculeData[] = [
  {
    id: "b2h6",
    name: "Diborane",
    formula: "B₂H₆",
    chapterId: "p-block",
    hybridisation: "sp³ (Boron)",
    geometry: "Tetrahedral around each Boron",
    bondAngles: "Terminal H-B-H = 121°, Bridge H-B-H = 97°",
    dipoleMoment: "0 D (Non-polar)",
    magneticCharacter: "Diamagnetic",
    description: "Electron-deficient boron hydride containing two 3-centre-2-electron (3c-2e) B-H-B banana bridge bonds.",
    jeeTips: "Remember: 4 terminal 2c-2e bonds in one plane + 2 bridging 3c-2e bonds perpendicular to plane.",
    atoms: [
      { id: "B1", element: "B", position: [-1.3, 0, 0], label: "Boron 1", color: "#f59e0b", radius: 0.5 },
      { id: "B2", element: "B", position: [1.3, 0, 0], label: "Boron 2", color: "#f59e0b", radius: 0.5 },
      { id: "H1", element: "H", position: [-2.2, 0.9, 0], label: "H (term)", color: "#f3f4f6", radius: 0.3 },
      { id: "H2", element: "H", position: [-2.2, -0.9, 0], label: "H (term)", color: "#f3f4f6", radius: 0.3 },
      { id: "H3", element: "H", position: [2.2, 0.9, 0], label: "H (term)", color: "#f3f4f6", radius: 0.3 },
      { id: "H4", element: "H", position: [2.2, -0.9, 0], label: "H (term)", color: "#f3f4f6", radius: 0.3 },
      { id: "HB1", element: "H", position: [0, 0, 1.2], label: "H (bridge)", isBridge: true, color: "#38bdf8", radius: 0.35 },
      { id: "HB2", element: "H", position: [0, 0, -1.2], label: "H (bridge)", isBridge: true, color: "#38bdf8", radius: 0.35 },
    ],
    bonds: [
      { from: "B1", to: "H1", type: "single" },
      { from: "B1", to: "H2", type: "single" },
      { from: "B2", to: "H3", type: "single" },
      { from: "B2", to: "H4", type: "single" },
      { from: "B1", to: "HB1", type: "3c-2e", label: "3c-2e Banana" },
      { from: "B2", to: "HB1", type: "3c-2e" },
      { from: "B1", to: "HB2", type: "3c-2e", label: "3c-2e Banana" },
      { from: "B2", to: "HB2", type: "3c-2e" },
    ],
    structuralDetails: [
      { title: "Valence Electron Count", content: "2×3 (Boron) + 6×1 (Hydrogen) = 12 valence electrons total." },
      { title: "Terminal vs Bridge Bonds", content: "Terminal B-H bond length = 119 pm. Bridge B-H bond length = 131 pm (longer and weaker)." },
    ],
  },
  {
    id: "al2cl6",
    name: "Aluminium Chloride Dimer",
    formula: "Al₂Cl₆",
    chapterId: "p-block",
    hybridisation: "sp³ (Aluminium)",
    geometry: "Tetrahedral around each Al",
    bondAngles: "Terminal Cl-Al-Cl = 118°, Bridge Al-Cl-Al = 101°",
    dipoleMoment: "0 D",
    description: "Anhydrous AlCl₃ dimer formed via two Cl→Al coordinate dative covalent bonds.",
    jeeTips: "All 6 bonds in Al₂Cl₆ are standard 2c-2e bonds! NOT electron deficient.",
    atoms: [
      { id: "Al1", element: "Al", position: [-1.6, 0, 0], label: "Al 1", color: "#818cf8", radius: 0.55 },
      { id: "Al2", element: "Al", position: [1.6, 0, 0], label: "Al 2", color: "#818cf8", radius: 0.55 },
      { id: "Cl1", element: "Cl", position: [-2.6, 1.2, 0], label: "Cl (term)", color: "#22c55e", radius: 0.45 },
      { id: "Cl2", element: "Cl", position: [-2.6, -1.2, 0], label: "Cl (term)", color: "#22c55e", radius: 0.45 },
      { id: "Cl3", element: "Cl", position: [2.6, 1.2, 0], label: "Cl (term)", color: "#22c55e", radius: 0.45 },
      { id: "Cl4", element: "Cl", position: [2.6, -1.2, 0], label: "Cl (term)", color: "#22c55e", radius: 0.45 },
      { id: "ClB1", element: "Cl", position: [0, 0, 1.3], label: "Cl (bridge dative)", color: "#06b6d4", radius: 0.48 },
      { id: "ClB2", element: "Cl", position: [0, 0, -1.3], label: "Cl (bridge dative)", color: "#06b6d4", radius: 0.48 },
    ],
    bonds: [
      { from: "Al1", to: "Cl1", type: "single" },
      { from: "Al1", to: "Cl2", type: "single" },
      { from: "Al2", to: "Cl3", type: "single" },
      { from: "Al2", to: "Cl4", type: "single" },
      { from: "Al1", to: "ClB1", type: "single" },
      { from: "ClB1", to: "Al2", type: "dative", label: "Cl→Al Dative" },
      { from: "Al2", to: "ClB2", type: "single" },
      { from: "ClB2", to: "Al1", type: "dative", label: "Cl→Al Dative" },
    ],
  },
  {
    id: "pcl5",
    name: "Phosphorus Pentachloride",
    formula: "PCl₅",
    chapterId: "chemical-bonding",
    hybridisation: "sp³d",
    geometry: "Trigonal Bipyramidal (TBP)",
    bondAngles: "Equatorial Cl-P-Cl = 120°, Axial Cl-P-Axial = 180°, Axial-Equatorial = 90°",
    dipoleMoment: "0 D",
    description: "Symmetrical 5-coordinate molecule with non-equivalent axial and equatorial P-Cl bonds.",
    jeeTips: "Axial bonds (219 pm) are LONGER than equatorial bonds (204 pm) due to stronger repulsion at 90°.",
    atoms: [
      { id: "P", element: "P", position: [0, 0, 0], label: "Phosphorus", color: "#f97316", radius: 0.55 },
      { id: "Cl1", element: "Cl", position: [0, 1.8, 0], label: "Cl (axial)", color: "#22c55e", radius: 0.45 },
      { id: "Cl2", element: "Cl", position: [0, -1.8, 0], label: "Cl (axial)", color: "#22c55e", radius: 0.45 },
      { id: "Cl3", element: "Cl", position: [1.6, 0, 0], label: "Cl (eq)", color: "#10b981", radius: 0.45 },
      { id: "Cl4", element: "Cl", position: [-0.8, 0, 1.38], label: "Cl (eq)", color: "#10b981", radius: 0.45 },
      { id: "Cl5", element: "Cl", position: [-0.8, 0, -1.38], label: "Cl (eq)", color: "#10b981", radius: 0.45 },
    ],
    bonds: [
      { from: "P", to: "Cl1", type: "single", label: "Axial (Long)" },
      { from: "P", to: "Cl2", type: "single", label: "Axial (Long)" },
      { from: "P", to: "Cl3", type: "single" },
      { from: "P", to: "Cl4", type: "single" },
      { from: "P", to: "Cl5", type: "single" },
    ],
  },
  {
    id: "sf6",
    name: "Sulfur Hexafluoride",
    formula: "SF₆",
    chapterId: "chemical-bonding",
    hybridisation: "sp³d²",
    geometry: "Regular Octahedral",
    bondAngles: "All F-S-F = 90° (cis) or 180° (trans)",
    dipoleMoment: "0 D",
    description: "Extremely stable, inert octahedral hypervalent molecule used as electrical insulator.",
    jeeTips: "All 6 S-F bonds are completely equivalent in length (156 pm) and angle (90°).",
    atoms: [
      { id: "S", element: "S", position: [0, 0, 0], label: "Sulfur", color: "#eab308", radius: 0.55 },
      { id: "F1", element: "F", position: [0, 1.5, 0], label: "Fluorine", color: "#a855f7", radius: 0.4 },
      { id: "F2", element: "F", position: [0, -1.5, 0], label: "Fluorine", color: "#a855f7", radius: 0.4 },
      { id: "F3", element: "F", position: [1.5, 0, 0], label: "Fluorine", color: "#a855f7", radius: 0.4 },
      { id: "F4", element: "F", position: [-1.5, 0, 0], label: "Fluorine", color: "#a855f7", radius: 0.4 },
      { id: "F5", element: "F", position: [0, 0, 1.5], label: "Fluorine", color: "#a855f7", radius: 0.4 },
      { id: "F6", element: "F", position: [0, 0, -1.5], label: "Fluorine", color: "#a855f7", radius: 0.4 },
    ],
    bonds: [
      { from: "S", to: "F1", type: "single" },
      { from: "S", to: "F2", type: "single" },
      { from: "S", to: "F3", type: "single" },
      { from: "S", to: "F4", type: "single" },
      { from: "S", to: "F5", type: "single" },
      { from: "S", to: "F6", type: "single" },
    ],
  },
  {
    id: "xef4",
    name: "Xenon Tetrafluoride",
    formula: "XeF₄",
    chapterId: "chemical-bonding",
    hybridisation: "sp³d²",
    geometry: "Square Planar (Electron Geometry: Octahedral)",
    bondAngles: "F-Xe-F = 90°, 180°",
    dipoleMoment: "0 D",
    description: "Noble gas compound with 4 bonding pairs and 2 axial lone pairs, resulting in a square planar shape.",
    jeeTips: "2 lone pairs reside at 180° opposite axial positions to minimize repulsions.",
    atoms: [
      { id: "Xe", element: "Xe", position: [0, 0, 0], label: "Xenon", color: "#38bdf8", radius: 0.6 },
      { id: "F1", element: "F", position: [1.4, 0, 1.4], label: "F", color: "#a855f7", radius: 0.4 },
      { id: "F2", element: "F", position: [-1.4, 0, 1.4], label: "F", color: "#a855f7", radius: 0.4 },
      { id: "F3", element: "F", position: [-1.4, 0, -1.4], label: "F", color: "#a855f7", radius: 0.4 },
      { id: "F4", element: "F", position: [1.4, 0, -1.4], label: "F", color: "#a855f7", radius: 0.4 },
    ],
    bonds: [
      { from: "Xe", to: "F1", type: "single" },
      { from: "Xe", to: "F2", type: "single" },
      { from: "Xe", to: "F3", type: "single" },
      { from: "Xe", to: "F4", type: "single" },
    ],
    lonePairs: [
      { atomId: "Xe", offset: [0, 1.3, 0] },
      { atomId: "Xe", offset: [0, -1.3, 0] },
    ],
  },
  {
    id: "clf3",
    name: "Chlorine Trifluoride",
    formula: "ClF₃",
    chapterId: "p-block",
    hybridisation: "sp³d",
    geometry: "T-shaped (Electron Geometry: Trigonal Bipyramidal)",
    bondAngles: "F(axial)-Cl-F(eq) ≈ 87.5° (compressed from 90°)",
    dipoleMoment: "1.72 D (Polar)",
    description: "Interhalogen molecule with 3 bond pairs and 2 lone pairs occupying equatorial positions of TBP geometry.",
    jeeTips: "Lone pairs occupy equatorial positions! Axial F-Cl-F angle is bent to 175° instead of 180° due to lone pair pushing.",
    atoms: [
      { id: "Cl", element: "Cl", position: [0, 0, 0], label: "Chlorine", color: "#22c55e", radius: 0.52 },
      { id: "F1", element: "F", position: [0, 1.5, -0.1], label: "F (axial)", color: "#a855f7", radius: 0.4 },
      { id: "F2", element: "F", position: [0, -1.5, -0.1], label: "F (axial)", color: "#a855f7", radius: 0.4 },
      { id: "F3", element: "F", position: [1.4, 0, 0], label: "F (eq)", color: "#a855f7", radius: 0.4 },
    ],
    bonds: [
      { from: "Cl", to: "F1", type: "single" },
      { from: "Cl", to: "F2", type: "single" },
      { from: "Cl", to: "F3", type: "single" },
    ],
    lonePairs: [
      { atomId: "Cl", offset: [-1.1, 0, 0.9] },
      { atomId: "Cl", offset: [-1.1, 0, -0.9] },
    ],
  },
  {
    id: "h2o",
    name: "Water",
    formula: "H₂O",
    chapterId: "chemical-bonding",
    hybridisation: "sp³",
    geometry: "Bent / V-shaped",
    bondAngles: "H-O-H = 104.5°",
    dipoleMoment: "1.85 D (Polar)",
    description: "Classic bent molecule with 2 bonding pairs and 2 lone pairs compressing the bond angle from 109.5° to 104.5°.",
    jeeTips: "Two lone pairs exert strong lp-lp repulsion.",
    atoms: [
      { id: "O", element: "O", position: [0, 0, 0], label: "Oxygen", color: "#ef4444", radius: 0.55 },
      { id: "H1", element: "H", position: [1.1, 0.8, 0], label: "Hydrogen 1", color: "#f3f4f6", radius: 0.32 },
      { id: "H2", element: "H", position: [-1.1, 0.8, 0], label: "Hydrogen 2", color: "#f3f4f6", radius: 0.32 },
    ],
    bonds: [
      { from: "O", to: "H1", type: "single" },
      { from: "O", to: "H2", type: "single" },
    ],
    lonePairs: [
      { atomId: "O", offset: [0, -1.0, 0.9] },
      { atomId: "O", offset: [0, -1.0, -0.9] },
    ],
  },
  {
    id: "nh3",
    name: "Ammonia",
    formula: "NH₃",
    chapterId: "chemical-bonding",
    hybridisation: "sp³",
    geometry: "Trigonal Pyramidal",
    bondAngles: "H-N-H = 107°",
    dipoleMoment: "1.47 D (Polar)",
    description: "Trigonal pyramidal molecule with 3 bonding pairs and 1 lone pair on Nitrogen.",
    jeeTips: "Dipole moment of NH₃ is higher than NF₃ because N-H dipoles reinforce the lone pair dipole.",
    atoms: [
      { id: "N", element: "N", position: [0, 0.3, 0], label: "Nitrogen", color: "#3b82f6", radius: 0.55 },
      { id: "H1", element: "H", position: [1.0, -0.4, 0.6], label: "H1", color: "#f3f4f6", radius: 0.32 },
      { id: "H2", element: "H", position: [-1.0, -0.4, 0.6], label: "H2", color: "#f3f4f6", radius: 0.32 },
      { id: "H3", element: "H", position: [0, -0.4, -1.1], label: "H3", color: "#f3f4f6", radius: 0.32 },
    ],
    bonds: [
      { from: "N", to: "H1", type: "single" },
      { from: "N", to: "H2", type: "single" },
      { from: "N", to: "H3", type: "single" },
    ],
    lonePairs: [
      { atomId: "N", offset: [0, 1.2, 0] },
    ],
  },
  {
    id: "ch4",
    name: "Methane",
    formula: "CH₄",
    chapterId: "chemical-bonding",
    hybridisation: "sp³",
    geometry: "Regular Tetrahedral",
    bondAngles: "H-C-H = 109.5°",
    dipoleMoment: "0 D (Non-polar)",
    description: "Symmetrical sp³ hybridised carbon molecule with 4 equivalent C-H bonds.",
    jeeTips: "All 4 C-H bonds are equal in length and bond energy.",
    atoms: [
      { id: "C", element: "C", position: [0, 0, 0], label: "Carbon", color: "#6b7280", radius: 0.52 },
      { id: "H1", element: "H", position: [1.1, 1.1, 1.1], label: "H1", color: "#f3f4f6", radius: 0.32 },
      { id: "H2", element: "H", position: [-1.1, -1.1, 1.1], label: "H2", color: "#f3f4f6", radius: 0.32 },
      { id: "H3", element: "H", position: [1.1, -1.1, -1.1], label: "H3", color: "#f3f4f6", radius: 0.32 },
      { id: "H4", element: "H", position: [-1.1, 1.1, -1.1], label: "H4", color: "#f3f4f6", radius: 0.32 },
    ],
    bonds: [
      { from: "C", to: "H1", type: "single" },
      { from: "C", to: "H2", type: "single" },
      { from: "C", to: "H3", type: "single" },
      { from: "C", to: "H4", type: "single" },
    ],
  },
  {
    id: "c60",
    name: "Buckminsterfullerene C₆₀",
    formula: "C₆₀",
    chapterId: "p-block",
    hybridisation: "sp² (Carbon)",
    geometry: "Truncated Icosahedron (Soccer Ball)",
    bondAngles: "Hexagon-Hexagon = 120°, Hexagon-Pentagon = 108°",
    dipoleMoment: "0 D",
    description: "Geodesic sphere of 60 carbon atoms consisting of 20 hexagons and 12 pentagons. No two pentagons share an edge.",
    jeeTips: "Contains 20 six-membered rings and 12 five-membered rings. sp² hybridised with localized double bonds.",
    atoms: [
      // 12 vertices of pentagon-hexagon mesh representing soccer ball C60 truncated icosahedron
      { id: "C1", element: "C", position: [0, 1.618, 2.618], label: "C", color: "#10b981", radius: 0.35 },
      { id: "C2", element: "C", position: [0, -1.618, 2.618], label: "C", color: "#10b981", radius: 0.35 },
      { id: "C3", element: "C", position: [0, 1.618, -2.618], label: "C", color: "#10b981", radius: 0.35 },
      { id: "C4", element: "C", position: [0, -1.618, -2.618], label: "C", color: "#10b981", radius: 0.35 },
      { id: "C5", element: "C", position: [2.618, 0, 1.618], label: "C", color: "#10b981", radius: 0.35 },
      { id: "C6", element: "C", position: [-2.618, 0, 1.618], label: "C", color: "#10b981", radius: 0.35 },
      { id: "C7", element: "C", position: [2.618, 0, -1.618], label: "C", color: "#10b981", radius: 0.35 },
      { id: "C8", element: "C", position: [-2.618, 0, -1.618], label: "C", color: "#10b981", radius: 0.35 },
      { id: "C9", element: "C", position: [1.618, 2.618, 0], label: "C", color: "#10b981", radius: 0.35 },
      { id: "C10", element: "C", position: [-1.618, 2.618, 0], label: "C", color: "#10b981", radius: 0.35 },
      { id: "C11", element: "C", position: [1.618, -2.618, 0], label: "C", color: "#10b981", radius: 0.35 },
      { id: "C12", element: "C", position: [-1.618, -2.618, 0], label: "C", color: "#10b981", radius: 0.35 },
      { id: "C13", element: "C", position: [0.809, 2.3, 1.3], label: "C", color: "#10b981", radius: 0.35 },
      { id: "C14", element: "C", position: [-0.809, 2.3, 1.3], label: "C", color: "#10b981", radius: 0.35 },
      { id: "C15", element: "C", position: [0.809, -2.3, 1.3], label: "C", color: "#10b981", radius: 0.35 },
      { id: "C16", element: "C", position: [-0.809, -2.3, 1.3], label: "C", color: "#10b981", radius: 0.35 },
    ],
    bonds: [
      { from: "C1", to: "C2", type: "single" },
      { from: "C1", to: "C5", type: "double" },
      { from: "C1", to: "C6", type: "single" },
      { from: "C1", to: "C13", type: "single" },
      { from: "C1", to: "C14", type: "double" },
      { from: "C2", to: "C5", type: "single" },
      { from: "C2", to: "C6", type: "double" },
      { from: "C2", to: "C15", type: "single" },
      { from: "C2", to: "C16", type: "double" },
      { from: "C3", to: "C4", type: "single" },
      { from: "C3", to: "C7", type: "double" },
      { from: "C3", to: "C8", type: "single" },
      { from: "C4", to: "C7", type: "single" },
      { from: "C4", to: "C8", type: "double" },
      { from: "C5", to: "C7", type: "single" },
      { from: "C5", to: "C9", type: "double" },
      { from: "C5", to: "C11", type: "single" },
      { from: "C6", to: "C8", type: "single" },
      { from: "C6", to: "C10", type: "double" },
      { from: "C6", to: "C12", type: "single" },
      { from: "C9", to: "C10", type: "single" },
      { from: "C9", to: "C13", type: "single" },
      { from: "C10", to: "C14", type: "single" },
      { from: "C11", to: "C12", type: "single" },
      { from: "C11", to: "C15", type: "single" },
      { from: "C12", to: "C16", type: "single" },
    ],
  }
];

// Orbital Visualisation Data
export const ORBITALS_DATA: OrbitalData[] = [
  {
    id: "s",
    name: "1s / 2s Spherical Orbital",
    type: "s",
    quantumN: 1,
    quantumL: 0,
    quantumM: 0,
    nodalPlanes: 0,
    radialNodes: 0,
    angularNodes: 0,
    shapeDescription: "Spherically symmetrical electron cloud with uniform density distribution in all spatial directions.",
    electronDensityInfo: "Probability ψ² is maximum at the nucleus for 1s and decreases exponentially with distance r.",
    jeeNotes: "s orbitals have no directional character and zero angular nodes."
  },
  {
    id: "pz",
    name: "2pz Dumbbell Orbital",
    type: "pz",
    quantumN: 2,
    quantumL: 1,
    quantumM: 0,
    nodalPlanes: 1,
    radialNodes: 0,
    angularNodes: 1,
    shapeDescription: "Dumbbell shape with two opposite lobes aligned along the Z-axis, separated by a nodal plane (xy-plane).",
    electronDensityInfo: "Nodal plane lies in the xy-plane where ψ = 0.",
    jeeNotes: "pz orbital forms σ bond along Z-axis (internuclear axis)."
  },
  {
    id: "px",
    name: "2px Dumbbell Orbital",
    type: "px",
    quantumN: 2,
    quantumL: 1,
    quantumM: "±1",
    nodalPlanes: 1,
    radialNodes: 0,
    angularNodes: 1,
    shapeDescription: "Two lobes aligned along the X-axis with opposite phase signs (+ and -). Nodal plane is yz-plane.",
    electronDensityInfo: "Maximum probability along ±X axis.",
    jeeNotes: "px forms π bond when internuclear axis is Z."
  },
  {
    id: "py",
    name: "2py Dumbbell Orbital",
    type: "py",
    quantumN: 2,
    quantumL: 1,
    quantumM: "±1",
    nodalPlanes: 1,
    radialNodes: 0,
    angularNodes: 1,
    shapeDescription: "Two lobes aligned along the Y-axis. Nodal plane is xz-plane.",
    electronDensityInfo: "Maximum probability along ±Y axis.",
    jeeNotes: "py forms π bond when internuclear axis is Z."
  },
  {
    id: "dz2",
    name: "3dz² Double Dumbbell with Collar",
    type: "dz2",
    quantumN: 3,
    quantumL: 2,
    quantumM: 0,
    nodalPlanes: 0,
    radialNodes: 0,
    angularNodes: 2,
    shapeDescription: "Two prominent lobes along Z-axis with a doughnut-shaped donut ring (doughnut) of electron density in the xy-plane.",
    electronDensityInfo: "Contains 2 conical nodal surfaces instead of flat nodal planes.",
    jeeNotes: "dz² orbital is involved in sp³d (TBP) and sp³d² (Octahedral) hybridisation."
  },
  {
    id: "dx2-y2",
    name: "3dx²-y² Cloverleaf Orbital",
    type: "dx2-y2",
    quantumN: 3,
    quantumL: 2,
    quantumM: "±2",
    nodalPlanes: 2,
    radialNodes: 0,
    angularNodes: 2,
    shapeDescription: "Four lobes directed directly ALONG the X and Y axes.",
    electronDensityInfo: "Nodal planes are at 45° to the x and y axes.",
    jeeNotes: "dx²-y² participates in sp³d² and dsp² (square planar) hybridisation."
  },
  {
    id: "dxy",
    name: "3dxy Cloverleaf Orbital",
    type: "dxy",
    quantumN: 3,
    quantumL: 2,
    quantumM: "±2",
    nodalPlanes: 2,
    radialNodes: 0,
    angularNodes: 2,
    shapeDescription: "Four lobes lying in the XY-plane BETWEEN the X and Y axes.",
    electronDensityInfo: "Nodal planes are xz and yz planes.",
    jeeNotes: "In octahedral ligand fields, dxy belongs to the lower energy t₂g set."
  }
];

// VSEPR Domain Simulator Data
export const VSEPR_CONFIGS: VSEPRDomainConfig[] = [
  {
    domainsCount: 2,
    bondingPairs: 2,
    lonePairs: 0,
    electronGeometry: "Linear",
    molecularGeometry: "Linear",
    idealBondAngle: "180°",
    actualBondAngle: "180°",
    exampleMolecules: ["BeCl₂", "CO₂", "HCN", "BeH₂"],
    repulsionExplanation: "Two electron domains orient themselves 180° apart to achieve minimum electrostatic repulsion.",
    jeeExamNotes: "Linear molecules with identical terminal atoms have zero net dipole moment."
  },
  {
    domainsCount: 3,
    bondingPairs: 3,
    lonePairs: 0,
    electronGeometry: "Trigonal Planar",
    molecularGeometry: "Trigonal Planar",
    idealBondAngle: "120°",
    actualBondAngle: "120°",
    exampleMolecules: ["BF₃", "BCl₃", "SO₃", "NO₃⁻", "CO₃²⁻"],
    repulsionExplanation: "Three bonding pairs spread in a flat plane at 120° angles.",
    jeeExamNotes: "sp² hybridised central atom. Incomplete octet in BF₃ makes it a strong Lewis acid."
  },
  {
    domainsCount: 3,
    bondingPairs: 2,
    lonePairs: 1,
    electronGeometry: "Trigonal Planar",
    molecularGeometry: "Bent / Angular",
    idealBondAngle: "120°",
    actualBondAngle: "119.5° (SO₂) / 116.8° (O₃)",
    exampleMolecules: ["SO₂", "O₃", "PbCl₂", "SnCl₂"],
    repulsionExplanation: "Lone pair exerts greater repulsive force than bonding pairs, compressing the bond angle slightly below 120°.",
    jeeExamNotes: "Resonance in SO₂ makes both S-O bonds equal in length."
  },
  {
    domainsCount: 4,
    bondingPairs: 4,
    lonePairs: 0,
    electronGeometry: "Tetrahedral",
    molecularGeometry: "Tetrahedral",
    idealBondAngle: "109.5° (109°28')",
    actualBondAngle: "109.5°",
    exampleMolecules: ["CH₄", "SiF₄", "NH₄⁺", "BF₄⁻", "CCl₄"],
    repulsionExplanation: "Four bonding pairs point to the vertices of a regular tetrahedron.",
    jeeExamNotes: "Symmetrical sp³ molecule with no dipole moment."
  },
  {
    domainsCount: 4,
    bondingPairs: 3,
    lonePairs: 1,
    electronGeometry: "Tetrahedral",
    molecularGeometry: "Trigonal Pyramidal",
    idealBondAngle: "109.5°",
    actualBondAngle: "107° (NH₃) / 102° (NF₃)",
    exampleMolecules: ["NH₃", "PCl₃", "H₃O⁺", "XeO₃"],
    repulsionExplanation: "One lone pair pushes the 3 N-H bonding pairs downward, compressing the angle from 109.5° to 107°.",
    jeeExamNotes: "Dipole moment of NH₃ (1.47 D) is HIGHER than NF₃ (0.23 D) because N-H bond dipoles reinforce the lone pair dipole while N-F dipoles oppose it!"
  },
  {
    domainsCount: 4,
    bondingPairs: 2,
    lonePairs: 2,
    electronGeometry: "Tetrahedral",
    molecularGeometry: "Bent / V-shaped",
    idealBondAngle: "109.5°",
    actualBondAngle: "104.5° (H₂O) / 92.2° (H₂S)",
    exampleMolecules: ["H₂O", "OF₂", "SCl₂", "ClO₂⁻"],
    repulsionExplanation: "Two lone pairs exert strong lp-lp repulsion, compressing the H-O-H angle down to 104.5°.",
    jeeExamNotes: "OF₂ bond angle (103°) is SMALLER than H₂O (104.5°) due to higher electronegativity of F pulling bond pairs away."
  },
  {
    domainsCount: 5,
    bondingPairs: 5,
    lonePairs: 0,
    electronGeometry: "Trigonal Bipyramidal",
    molecularGeometry: "Trigonal Bipyramidal",
    idealBondAngle: "90°, 120°",
    actualBondAngle: "90° (axial-eq), 120° (eq-eq)",
    exampleMolecules: ["PCl₅", "PF₅", "AsF₅"],
    repulsionExplanation: "3 equatorial positions at 120° and 2 axial positions at 90°.",
    jeeExamNotes: "Axial bonds are longer and weaker than equatorial bonds."
  },
  {
    domainsCount: 5,
    bondingPairs: 4,
    lonePairs: 1,
    electronGeometry: "Trigonal Bipyramidal",
    molecularGeometry: "Seesaw / Distorted Tetrahedron",
    idealBondAngle: "90°, 120°",
    actualBondAngle: "89° (axial), 117° (eq)",
    exampleMolecules: ["SF₄", "SeF₄", "IF₄⁺"],
    repulsionExplanation: "Lone pair occupies an EQUATORIAL position to minimize 90° repulsions.",
    jeeExamNotes: "SF₄ has 1 equatorial lone pair."
  },
  {
    domainsCount: 5,
    bondingPairs: 3,
    lonePairs: 2,
    electronGeometry: "Trigonal Bipyramidal",
    molecularGeometry: "T-shaped",
    idealBondAngle: "90°",
    actualBondAngle: "87.5°",
    exampleMolecules: ["ClF₃", "BrF₃", "ICl₃"],
    repulsionExplanation: "Two lone pairs occupy EQUATORIAL positions at 120° to each other.",
    jeeExamNotes: "ClF₃ is T-shaped and highly reactive."
  },
  {
    domainsCount: 5,
    bondingPairs: 2,
    lonePairs: 3,
    electronGeometry: "Trigonal Bipyramidal",
    molecularGeometry: "Linear",
    idealBondAngle: "180°",
    actualBondAngle: "180°",
    exampleMolecules: ["XeF₂", "I₃⁻", "ICl₂⁻"],
    repulsionExplanation: "Three lone pairs occupy all 3 EQUATORIAL positions, leaving the two bonding pairs at 180° axial positions.",
    jeeExamNotes: "XeF₂ is linear with 3 equatorial lone pairs."
  },
  {
    domainsCount: 6,
    bondingPairs: 6,
    lonePairs: 0,
    electronGeometry: "Octahedral",
    molecularGeometry: "Octahedral",
    idealBondAngle: "90°",
    actualBondAngle: "90°",
    exampleMolecules: ["SF₆", "PF₆⁻", "SiF₆²⁻"],
    repulsionExplanation: "Six equivalent positions at 90° angles.",
    jeeExamNotes: "sp³d² hybridisation with d_z² and d_x²-y²."
  },
  {
    domainsCount: 6,
    bondingPairs: 5,
    lonePairs: 1,
    electronGeometry: "Octahedral",
    molecularGeometry: "Square Pyramidal",
    idealBondAngle: "90°",
    actualBondAngle: "<90° (~84.8°)",
    exampleMolecules: ["BrF₅", "IF₅", "XeOF₄"],
    repulsionExplanation: "One lone pair sits at axial position pushing 4 equatorial bonds upward.",
    jeeExamNotes: "BrF₅ is square pyramidal."
  },
  {
    domainsCount: 6,
    bondingPairs: 4,
    lonePairs: 2,
    electronGeometry: "Octahedral",
    molecularGeometry: "Square Planar",
    idealBondAngle: "90°",
    actualBondAngle: "90°",
    exampleMolecules: ["XeF₄", "ICl₄⁻"],
    repulsionExplanation: "Two lone pairs occupy 180° opposite axial positions.",
    jeeExamNotes: "XeF₄ has 2 axial lone pairs and 4 equatorial F atoms."
  }
];

// Hybridisation Simulator Data
export const HYBRIDISATION_CONFIGS: HybridisationConfig[] = [
  {
    type: "sp",
    sCount: 1,
    pCount: 1,
    dCount: 0,
    angle: "180°",
    geometry: "Linear",
    orbitalsMixed: ["2s", "2pz"],
    examples: ["BeCl₂", "C₂H₂ (Ethyne)", "CO₂"],
    stepAnimation: [
      { step: 1, title: "Ground State Configuration", description: "Central atom has 2s² valence electrons." },
      { step: 2, title: "Excitation to Excited State", description: "1 electron from 2s is promoted to empty 2p orbital." },
      { step: 3, title: "Orbital Mixing", description: "1 s-orbital and 1 p-orbital mix mathematically to produce 2 equivalent sp hybrid orbitals." },
      { step: 4, title: "Spatial Orientation", description: "The 2 sp hybrid orbitals orient 180° apart for maximum separation." }
    ]
  },
  {
    type: "sp2",
    sCount: 1,
    pCount: 2,
    dCount: 0,
    angle: "120°",
    geometry: "Trigonal Planar",
    orbitalsMixed: ["2s", "2px", "2py"],
    examples: ["BF₃", "C₂H₄ (Ethene)", "SO₂", "Graphite"],
    stepAnimation: [
      { step: 1, title: "Excitation", description: "Electrons promoted to yield 3 unpaired electrons in 2s, 2px, 2py." },
      { step: 2, title: "Hybridisation", description: "1 s + 2 p orbitals combine to form 3 degenerate sp² hybrid orbitals." },
      { step: 3, title: "Trigonal Geometry", description: "Orbitals lie in a single plane at 120° angles to each other." }
    ]
  },
  {
    type: "sp3",
    sCount: 1,
    pCount: 3,
    dCount: 0,
    angle: "109.5°",
    geometry: "Tetrahedral",
    orbitalsMixed: ["2s", "2px", "2py", "2pz"],
    examples: ["CH₄", "NH₃", "H₂O", "Diamond", "B₂H₆"],
    stepAnimation: [
      { step: 1, title: "Excitation", description: "4 valence electrons distributed across 2s and three 2p orbitals." },
      { step: 2, title: "Mixing", description: "1 s and 3 p orbitals mix to generate 4 sp³ hybrid lobes." },
      { step: 3, title: "3D Tetrahedral Alignment", description: "Lobes point to 4 corners of a regular tetrahedron at 109.5°." }
    ]
  },
  {
    type: "sp3d",
    sCount: 1,
    pCount: 3,
    dCount: 1,
    angle: "90° & 120°",
    geometry: "Trigonal Bipyramidal",
    orbitalsMixed: ["3s", "3px", "3py", "3pz", "3dz²"],
    examples: ["PCl₅", "SF₄", "ClF₃", "XeF₂"],
    stepAnimation: [
      { step: 1, title: "d-Orbital Participation", description: "The 3dz² orbital participates alongside 3s and 3p." },
      { step: 2, title: "Splitting into Equivalence Groups", description: "Forms 3 equatorial sp²-like hybrid orbitals (120°) + 2 axial pd-like hybrid orbitals (90°)." }
    ]
  },
  {
    type: "sp3d2",
    sCount: 1,
    pCount: 3,
    dCount: 2,
    angle: "90°",
    geometry: "Octahedral",
    orbitalsMixed: ["3s", "3px", "3py", "3pz", "3dx²-y²", "3dz²"],
    examples: ["SF₆", "XeF₄", "BrF₅", "[Al(H₂O)₆]³⁺"],
    stepAnimation: [
      { step: 1, title: "Axial & Equatorial d-Orbitals", description: "3dx²-y² and 3dz² orbitals mix with s and 3p orbitals." },
      { step: 2, title: "Octahedral Framework", description: "6 equivalent sp³d² hybrid lobes point to vertices of an octahedron at 90°." }
    ]
  }
];

// Interactive Periodic Table Dataset (Selected Key Elements with full data)
export const PERIODIC_ELEMENTS: PeriodicElement[] = [
  {
    number: 1, symbol: "H", name: "Hydrogen", atomicMass: "1.008", category: "nonmetal", group: 1, period: 1, block: "s", configuration: "1s¹", atomicRadius: 37, ionisationEnergy: 1312, electronegativity: 2.20, electronGainEnthalpy: -73, commonOxidationStates: "+1, -1", description: "Lightest element, exists as diatomic gas H₂. Forms protium, deuterium, tritium.", jeeTrends: "Ionisation energy (1312 kJ/mol) is higher than alkali metals due to small size."
  },
  {
    number: 3, symbol: "Li", name: "Lithium", atomicMass: "6.94", category: "alkali", group: 1, period: 2, block: "s", configuration: "[He] 2s¹", atomicRadius: 152, ionisationEnergy: 520, electronegativity: 0.98, electronGainEnthalpy: -60, commonOxidationStates: "+1", description: "Soft, silvery alkali metal with lowest density of all solid elements.", jeeTrends: "Li⁺ has highest hydration energy in Group 1, making Li the strongest reducing agent in aqueous solution."
  },
  {
    number: 4, symbol: "Be", name: "Beryllium", atomicMass: "9.012", category: "alkaline", group: 2, period: 2, block: "s", configuration: "[He] 2s²", atomicRadius: 112, ionisationEnergy: 899, electronegativity: 1.57, electronGainEnthalpy: 0, commonOxidationStates: "+2", description: "Toxic alkaline earth metal forming covalent compounds due to high polarising power.", jeeTrends: "Be shows diagonal relationship with Al. Be(OH)₂ is amphoteric."
  },
  {
    number: 5, symbol: "B", name: "Boron", atomicMass: "10.81", category: "metalloid", group: 13, period: 2, block: "p", configuration: "[He] 2s² 2p¹", atomicRadius: 88, ionisationEnergy: 801, electronegativity: 2.04, electronGainEnthalpy: -27, commonOxidationStates: "+3", description: "Group 13 metalloid forming electron-deficient compounds like BF₃ and Diborane.", jeeTrends: "Boron forms icosahedral B₁₂ clusters and multicenter 3c-2e bonds."
  },
  {
    number: 6, symbol: "C", name: "Carbon", atomicMass: "12.011", category: "nonmetal", group: 14, period: 2, block: "p", configuration: "[He] 2s² 2p²", atomicRadius: 77, ionisationEnergy: 1086, electronegativity: 2.55, electronGainEnthalpy: -122, commonOxidationStates: "+4, +2, -4", description: "Basis of organic life, exhibits maximum catenation power and allotropy (Diamond, Graphite, C₆₀).", jeeTrends: "Catenation order: C >> Si > Ge ≈ Sn."
  },
  {
    number: 7, symbol: "N", name: "Nitrogen", atomicMass: "14.007", category: "nonmetal", group: 15, period: 2, block: "p", configuration: "[He] 2s² 2p³", atomicRadius: 74, ionisationEnergy: 1402, electronegativity: 3.04, electronGainEnthalpy: -7, commonOxidationStates: "+5, +3, -3", description: "Diatomic gas with triple bond N≡N (945 kJ/mol bond dissociation enthalpy).", jeeTrends: "N has higher 1st IE than O due to half-filled 2p³ subshell stability."
  },
  {
    number: 8, symbol: "O", name: "Oxygen", atomicMass: "15.999", category: "nonmetal", group: 16, period: 2, block: "p", configuration: "[He] 2s² 2p⁴", atomicRadius: 66, ionisationEnergy: 1314, electronegativity: 3.44, electronGainEnthalpy: -141, commonOxidationStates: "-2, -1, +2", description: "Essential paramagnetic gas (O₂) forming oxides, peroxides, superoxides, and ozone O₃.", jeeTrends: "O₂ is paramagnetic according to MOT with 2 unpaired electrons in π*2px, π*2py."
  },
  {
    number: 9, symbol: "F", name: "Fluorine", atomicMass: "18.998", category: "halogen", group: 17, period: 2, block: "p", configuration: "[He] 2s² 2p⁵", atomicRadius: 64, ionisationEnergy: 1681, electronegativity: 3.98, electronGainEnthalpy: -328, commonOxidationStates: "-1", description: "Most electronegative and reactive non-metal element.", jeeTrends: "F₂ has surprisingly low bond dissociation enthalpy due to strong lone pair-lone pair repulsions."
  },
  {
    number: 11, symbol: "Na", name: "Sodium", atomicMass: "22.990", category: "alkali", group: 1, period: 3, block: "s", configuration: "[Ne] 3s¹", atomicRadius: 186, ionisationEnergy: 496, electronegativity: 0.93, electronGainEnthalpy: -53, commonOxidationStates: "+1", description: "Soft alkali metal that imparts golden yellow color in flame test.", jeeTrends: "Na₂O₂ contains peroxide ion O₂²⁻; NaO₂ contains superoxide ion O₂⁻."
  },
  {
    number: 12, symbol: "Mg", name: "Magnesium", atomicMass: "24.305", category: "alkaline", group: 2, period: 3, block: "s", configuration: "[Ne] 3s²", atomicRadius: 160, ionisationEnergy: 738, electronegativity: 1.31, electronGainEnthalpy: 0, commonOxidationStates: "+2", description: "Lightweight metal burning with brilliant white flame.", jeeTrends: "Mg diagonal relationship with Li. Mg forms organometallic Grignard reagent RMgX."
  },
  {
    number: 13, symbol: "Al", name: "Aluminium", atomicMass: "26.982", category: "post-transition", group: 13, period: 3, block: "p", configuration: "[Ne] 3s² 3p¹", atomicRadius: 143, ionisationEnergy: 577, electronegativity: 1.61, electronGainEnthalpy: -43, commonOxidationStates: "+3", description: "Group 13 metal forming protective passivating oxide layer Al₂O₃ and dimer Al₂Cl₆.", jeeTrends: "Al size is almost equal to Ga due to d-block contraction."
  },
  {
    number: 14, symbol: "Si", name: "Silicon", atomicMass: "28.085", category: "metalloid", group: 14, period: 3, block: "p", configuration: "[Ne] 3s² 3p²", atomicRadius: 118, ionisationEnergy: 786, electronegativity: 1.90, electronGainEnthalpy: -134, commonOxidationStates: "+4", description: "Semiconductor forming covalent SiO₂ giant 3D network and silicates.", jeeTrends: "SiO₂ does NOT contain discrete Si=O double bonds (unlike CO₂)."
  },
  {
    number: 15, symbol: "P", name: "Phosphorus", atomicMass: "30.974", category: "nonmetal", group: 15, period: 3, block: "p", configuration: "[Ne] 3s² 3p³", atomicRadius: 110, ionisationEnergy: 1012, electronegativity: 2.19, electronGainEnthalpy: -72, commonOxidationStates: "+5, +3, -3", description: "Exhibits White P₄ (poisonous, chemiluminescent), Red P, and Black P allotropes.", jeeTrends: "White P₄ contains tetrahedral angle strain (P-P-P = 60°)."
  },
  {
    number: 16, symbol: "S", name: "Sulfur", atomicMass: "32.06", category: "nonmetal", group: 16, period: 3, block: "p", configuration: "[Ne] 3s² 3p⁴", atomicRadius: 104, ionisationEnergy: 1000, electronegativity: 2.58, electronGainEnthalpy: -200, commonOxidationStates: "+6, +4, +2, -2", description: "Forms puckered crown ring S₈ in Rhombic and Monoclinic allotropes, and oxoacids like H₂SO₄, H₂S₂O₇.", jeeTrends: "S₈ crown ring S-S-S bond angle = 107°."
  },
  {
    number: 17, symbol: "Cl", name: "Chlorine", atomicMass: "35.45", category: "halogen", group: 17, period: 3, block: "p", configuration: "[Ne] 3s² 3p⁵", atomicRadius: 99, ionisationEnergy: 1251, electronegativity: 3.16, electronGainEnthalpy: -349, commonOxidationStates: "+7, +5, +3, +1, -1", description: "Greenish-yellow gas with highest negative electron gain enthalpy (-349 kJ/mol).", jeeTrends: "Cl₂ has higher electron gain enthalpy than F₂."
  },
  {
    number: 18, symbol: "Ar", name: "Argon", atomicMass: "39.948", category: "noble", group: 18, period: 3, block: "p", configuration: "[Ne] 3s² 3p⁶", atomicRadius: 71, ionisationEnergy: 1520, electronegativity: 0, electronGainEnthalpy: 96, commonOxidationStates: "0", description: "Inert noble gas used as shielding environment in arc welding.", jeeTrends: "Noble gases have positive electron gain enthalpy."
  }
];

// Quizzes Data
export const CHAPTER_QUIZZES: Record<string, QuizQuestion[]> = {
  "structure-of-atom": [
    {
      id: "q1",
      chapterId: "structure-of-atom",
      question: "Which quantum transition in Hydrogen atom emits light of the SHORTEST wavelength in the Lyman series?",
      type: "mcq",
      options: ["n = 2 → n = 1", "n = ∞ → n = 1", "n = 3 → n = 2", "n = ∞ → n = 2"],
      correctAnswer: 1,
      explanation: "Shortest wavelength corresponds to maximum energy difference. For Lyman series (n₁ = 1), max energy transition occurs from n₂ = ∞ to n₁ = 1.",
      formula: "1/λ = R_H * (1/1^2 - 1/∞^2) = R_H",
      jeeMainYear: "JEE Main 2021"
    },
    {
      id: "q2",
      chapterId: "structure-of-atom",
      question: "What is the total number of radial and angular nodes present in a 4f orbital?",
      type: "mcq",
      options: ["Radial: 0, Angular: 3", "Radial: 1, Angular: 2", "Radial: 2, Angular: 1", "Radial: 3, Angular: 0"],
      correctAnswer: 0,
      explanation: "For 4f orbital: n = 4, l = 3. Radial nodes = n - l - 1 = 4 - 3 - 1 = 0. Angular nodes = l = 3. Total nodes = 3.",
      jeeMainYear: "JEE Main 2022"
    },
    {
      id: "q3",
      chapterId: "structure-of-atom",
      question: "Assertion: Half-filled and fully-filled degenerate orbitals possess extra stability.\nReason: Symmetrical electron distribution and high exchange energy minimize repulsion.",
      type: "assertion-reason",
      options: [
        "Both Assertion and Reason are correct, and Reason is the correct explanation of Assertion.",
        "Both Assertion and Reason are correct, but Reason is NOT the correct explanation.",
        "Assertion is correct, but Reason is incorrect.",
        "Assertion is incorrect, but Reason is correct."
      ],
      correctAnswer: 0,
      explanation: "Electrons with parallel spins in degenerate orbitals exchange positions, releasing exchange energy and increasing stability."
    }
  ],
  "chemical-bonding": [
    {
      id: "q4",
      chapterId: "chemical-bonding",
      question: "In Diborane (B₂H₆), how many 3-centre-2-electron (3c-2e) and 2-centre-2-electron (2c-2e) bonds are present?",
      type: "mcq",
      options: ["2 3c-2e and 4 2c-2e", "4 3c-2e and 2 2c-2e", "2 3c-2e and 2 2c-2e", "6 2c-2e bonds"],
      correctAnswer: 0,
      explanation: "Diborane has 4 terminal 2c-2e B-H bonds and 2 bridging 3c-2e B-H-B banana bonds.",
      jeeMainYear: "JEE Main 2023"
    },
    {
      id: "q5",
      chapterId: "chemical-bonding",
      question: "Which of the following noble gas compounds is Square Planar with sp³d² hybridisation?",
      type: "mcq",
      options: ["XeF₂", "XeF₄", "XeO₃", "XeOF₄"],
      correctAnswer: 1,
      explanation: "XeF₄ has 4 bonding pairs + 2 lone pairs = 6 electron domains (sp³d² hybridisation). The 2 lone pairs occupy axial positions at 180°, giving a Square Planar geometry."
    },
    {
      id: "q6",
      chapterId: "chemical-bonding",
      question: "According to Molecular Orbital Theory, which of the following diatomic species is PARAMAGNETIC with a bond order of 2?",
      type: "mcq",
      options: ["N₂", "O₂", "C₂", "B₂"],
      correctAnswer: 1,
      explanation: "O₂ has 16 electrons. Its MO configuration places 2 unpaired electrons in degenerate antibonding orbitals π*2px¹ and π*2py¹, making it paramagnetic with bond order = (10 - 6)/2 = 2."
    }
  ],
  "p-block": [
    {
      id: "q7",
      chapterId: "p-block",
      question: "Which of the following statements about Aluminium Chloride dimer (Al₂Cl₆) is INCORRECT?",
      type: "mcq",
      options: [
        "It contains two Cl→Al coordinate dative bonds.",
        "Aluminium atom is sp³ hybridised.",
        "It is an electron-deficient molecule with 3c-2e bonds.",
        "At high temperature (>800 K) it dissociates into planar AlCl₃."
      ],
      correctAnswer: 2,
      explanation: "Al₂Cl₆ is NOT electron deficient. All atoms complete their octet via coordinate dative bonds, and all bonds are normal 2-centre-2-electron (2c-2e) bonds."
    }
  ]
};

// JEE Revision High-Yield Cards
export const JEE_REVISION_CARDS: JEERevisionCard[] = [
  {
    id: "rev-diborane",
    chapterId: "p-block",
    topic: "Diborane B₂H₆ Bonding & Reactions",
    formulaOrStructure: "B₂H₆",
    priority: "VERY_HIGH",
    jeeMainStars: 5,
    jeeAdvStars: 5,
    ncertStars: 5,
    summary30Sec: "sp³ Boron. 4 terminal 2c-2e B-H bonds + 2 bridging 3c-2e B-H-B banana bonds. Total 12 valence electrons. Reacts with NH₃ to form Borazine B₃N₃H₆.",
    frequentlyTestedPoints: [
      "Terminal H atoms are 2c-2e; Bridge H atoms are 3c-2e.",
      "Terminal angle (121°) > Bridge angle (97°).",
      "Cleavage reactions: Symmetrical cleavage with large soft bases (PMe₃, CO); Unsymmetrical with small hard bases (NH₃, MeNH₂)."
    ],
    commonTraps: [
      "Trap: Writing that Diborane has a B-B direct bond (FALSE).",
      "Trap: Confusing Borazine B₃N₃H₆ structure with Benzene C₆H₆."
    ],
    keyDiagramDescription: "Two Boron centers with 4 planar terminal hydrogens and 2 perpendicular bridging hydrogens above and below."
  },
  {
    id: "rev-vsepr-shapes",
    chapterId: "chemical-bonding",
    topic: "VSEPR Geometry & Lone Pair Positions",
    formulaOrStructure: "Steric Number = BP + LP",
    priority: "VERY_HIGH",
    jeeMainStars: 5,
    jeeAdvStars: 5,
    ncertStars: 5,
    summary30Sec: "Order of repulsion: LP-LP > LP-BP > BP-BP. Steric 5 (sp³d): Lone pairs go EQUATORIAL. Steric 6 (sp³d²): Lone pairs go AXIAL (180°).",
    frequentlyTestedPoints: [
      "SF₄: Seesaw (1 eq LP). ClF₃: T-shaped (2 eq LPs). XeF₂: Linear (3 eq LPs).",
      "XeF₄: Square Planar (2 axial LPs). BrF₅: Square Pyramidal (1 axial LP).",
      "Axial P-Cl bonds in PCl₅ are LONGER than equatorial P-Cl bonds."
    ],
    commonTraps: [
      "Placing lone pairs in axial positions in sp³d molecules (SF₄, ClF₃, XeF₂). ALWAYS place them EQUATORIAL in sp³d!"
    ],
    keyDiagramDescription: "TBP frame with 3 equatorial positions at 120° and 2 axial positions at 90°."
  },
  {
    id: "rev-periodic-exceptions",
    chapterId: "periodicity",
    topic: "Ionisation Energy & Size Exceptions",
    formulaOrStructure: "Z* = Z - S",
    priority: "VERY_HIGH",
    jeeMainStars: 5,
    jeeAdvStars: 4,
    ncertStars: 5,
    summary30Sec: "2nd Period IE order: Li < B < Be < C < O < N < F < Ne (Be > B due to 2s² penetration; N > O due to half-filled 2p³). Cl has highest negative Electron Gain Enthalpy.",
    frequentlyTestedPoints: [
      "Ga radius ≈ Al radius due to d-block contraction (poor shielding by 3d¹⁰).",
      "Tl > In in 1st IE due to lanthanide contraction (poor shielding by 4f¹⁴).",
      "Electron gain enthalpy: Cl (-349 kJ/mol) > F (-328 kJ/mol)."
    ],
    commonTraps: [
      "Assuming Fluorine has higher electron gain enthalpy than Chlorine."
    ],
    keyDiagramDescription: "Zig-zag graph of Ionisation Energy across Period 2 with peaks at Be and N."
  }
];

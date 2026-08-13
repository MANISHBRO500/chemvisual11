export interface FullElement {
  number: number;
  symbol: string;
  name: string;
  atomicMass: string;
  category:
    | "alkali"
    | "alkaline"
    | "lanthanoid"
    | "actinoid"
    | "transition"
    | "post-transition"
    | "metalloid"
    | "nonmetal"
    | "noble"
    | "unknown";
  group: number; // 1 to 18 (0 for lanthanides/actinides or 3)
  period: number; // 1 to 7
  shells: number[];
  configuration?: string;
  block?: string;
}

export const ALL_118_ELEMENTS: FullElement[] = [
  // Period 1
  { number: 1, symbol: "H", name: "Hydrogen", atomicMass: "1.008", category: "nonmetal", group: 1, period: 1, shells: [1], configuration: "1s¹", block: "s" },
  { number: 2, symbol: "He", name: "Helium", atomicMass: "4.0026", category: "noble", group: 18, period: 1, shells: [2], configuration: "1s²", block: "s" },

  // Period 2
  { number: 3, symbol: "Li", name: "Lithium", atomicMass: "6.94", category: "alkali", group: 1, period: 2, shells: [2, 1], configuration: "[He] 2s¹", block: "s" },
  { number: 4, symbol: "Be", name: "Beryllium", atomicMass: "9.0122", category: "alkaline", group: 2, period: 2, shells: [2, 2], configuration: "[He] 2s²", block: "s" },
  { number: 5, symbol: "B", name: "Boron", atomicMass: "10.81", category: "metalloid", group: 13, period: 2, shells: [2, 3], configuration: "[He] 2s² 2p¹", block: "p" },
  { number: 6, symbol: "C", name: "Carbon", atomicMass: "12.011", category: "nonmetal", group: 14, period: 2, shells: [2, 4], configuration: "[He] 2s² 2p²", block: "p" },
  { number: 7, symbol: "N", name: "Nitrogen", atomicMass: "14.007", category: "nonmetal", group: 15, period: 2, shells: [2, 5], configuration: "[He] 2s² 2p³", block: "p" },
  { number: 8, symbol: "O", name: "Oxygen", atomicMass: "15.999", category: "nonmetal", group: 16, period: 2, shells: [2, 6], configuration: "[He] 2s² 2p⁴", block: "p" },
  { number: 9, symbol: "F", name: "Fluorine", atomicMass: "18.998", category: "nonmetal", group: 17, period: 2, shells: [2, 7], configuration: "[He] 2s² 2p⁵", block: "p" },
  { number: 10, symbol: "Ne", name: "Neon", atomicMass: "20.180", category: "noble", group: 18, period: 2, shells: [2, 8], configuration: "[He] 2s² 2p⁶", block: "p" },

  // Period 3
  { number: 11, symbol: "Na", name: "Sodium", atomicMass: "22.990", category: "alkali", group: 1, period: 3, shells: [2, 8, 1], configuration: "[Ne] 3s¹", block: "s" },
  { number: 12, symbol: "Mg", name: "Magnesium", atomicMass: "24.305", category: "alkaline", group: 2, period: 3, shells: [2, 8, 2], configuration: "[Ne] 3s²", block: "s" },
  { number: 13, symbol: "Al", name: "Aluminium", atomicMass: "26.982", category: "post-transition", group: 13, period: 3, shells: [2, 8, 3], configuration: "[Ne] 3s² 3p¹", block: "p" },
  { number: 14, symbol: "Si", name: "Silicon", atomicMass: "28.085", category: "metalloid", group: 14, period: 3, shells: [2, 8, 4], configuration: "[Ne] 3s² 3p²", block: "p" },
  { number: 15, symbol: "P", name: "Phosphorus", atomicMass: "30.974", category: "nonmetal", group: 15, period: 3, shells: [2, 8, 5], configuration: "[Ne] 3s² 3p³", block: "p" },
  { number: 16, symbol: "S", name: "Sulfur", atomicMass: "32.06", category: "nonmetal", group: 16, period: 3, shells: [2, 8, 6], configuration: "[Ne] 3s² 3p⁴", block: "p" },
  { number: 17, symbol: "Cl", name: "Chlorine", atomicMass: "35.45", category: "nonmetal", group: 17, period: 3, shells: [2, 8, 7], configuration: "[Ne] 3s² 3p⁵", block: "p" },
  { number: 18, symbol: "Ar", name: "Argon", atomicMass: "39.948", category: "noble", group: 18, period: 3, shells: [2, 8, 8], configuration: "[Ne] 3s² 3p⁶", block: "p" },

  // Period 4
  { number: 19, symbol: "K", name: "Potassium", atomicMass: "39.098", category: "alkali", group: 1, period: 4, shells: [2, 8, 8, 1], configuration: "[Ar] 4s¹", block: "s" },
  { number: 20, symbol: "Ca", name: "Calcium", atomicMass: "40.078", category: "alkaline", group: 2, period: 4, shells: [2, 8, 8, 2], configuration: "[Ar] 4s²", block: "s" },
  { number: 21, symbol: "Sc", name: "Scandium", atomicMass: "44.956", category: "transition", group: 3, period: 4, shells: [2, 8, 9, 2], configuration: "[Ar] 3d¹ 4s²", block: "d" },
  { number: 22, symbol: "Ti", name: "Titanium", atomicMass: "47.867", category: "transition", group: 4, period: 4, shells: [2, 8, 10, 2], configuration: "[Ar] 3d² 4s²", block: "d" },
  { number: 23, symbol: "V", name: "Vanadium", atomicMass: "50.942", category: "transition", group: 5, period: 4, shells: [2, 8, 11, 2], configuration: "[Ar] 3d³ 4s²", block: "d" },
  { number: 24, symbol: "Cr", name: "Chromium", atomicMass: "51.996", category: "transition", group: 6, period: 4, shells: [2, 8, 13, 1], configuration: "[Ar] 3d⁵ 4s¹", block: "d" },
  { number: 25, symbol: "Mn", name: "Manganese", atomicMass: "54.938", category: "transition", group: 7, period: 4, shells: [2, 8, 13, 2], configuration: "[Ar] 3d⁵ 4s²", block: "d" },
  { number: 26, symbol: "Fe", name: "Iron", atomicMass: "55.845", category: "transition", group: 8, period: 4, shells: [2, 8, 14, 2], configuration: "[Ar] 3d⁶ 4s²", block: "d" },
  { number: 27, symbol: "Co", name: "Cobalt", atomicMass: "58.933", category: "transition", group: 9, period: 4, shells: [2, 8, 15, 2], configuration: "[Ar] 3d⁷ 4s²", block: "d" },
  { number: 28, symbol: "Ni", name: "Nickel", atomicMass: "58.693", category: "transition", group: 10, period: 4, shells: [2, 8, 16, 2], configuration: "[Ar] 3d⁸ 4s²", block: "d" },
  { number: 29, symbol: "Cu", name: "Copper", atomicMass: "63.546", category: "transition", group: 11, period: 4, shells: [2, 8, 18, 1], configuration: "[Ar] 3d¹⁰ 4s¹", block: "d" },
  { number: 30, symbol: "Zn", name: "Zinc", atomicMass: "65.38", category: "transition", group: 12, period: 4, shells: [2, 8, 18, 2], configuration: "[Ar] 3d¹⁰ 4s²", block: "d" },
  { number: 31, symbol: "Ga", name: "Gallium", atomicMass: "69.723", category: "post-transition", group: 13, period: 4, shells: [2, 8, 18, 3], configuration: "[Ar] 3d¹⁰ 4s² 4p¹", block: "p" },
  { number: 32, symbol: "Ge", name: "Germanium", atomicMass: "72.630", category: "metalloid", group: 14, period: 4, shells: [2, 8, 18, 4], configuration: "[Ar] 3d¹⁰ 4s² 4p²", block: "p" },
  { number: 33, symbol: "As", name: "Arsenic", atomicMass: "74.922", category: "metalloid", group: 15, period: 4, shells: [2, 8, 18, 5], configuration: "[Ar] 3d¹⁰ 4s² 4p³", block: "p" },
  { number: 34, symbol: "Se", name: "Selenium", atomicMass: "78.971", category: "nonmetal", group: 16, period: 4, shells: [2, 8, 18, 6], configuration: "[Ar] 3d¹⁰ 4s² 4p⁴", block: "p" },
  { number: 35, symbol: "Br", name: "Bromine", atomicMass: "79.904", category: "nonmetal", group: 17, period: 4, shells: [2, 8, 18, 7], configuration: "[Ar] 3d¹⁰ 4s² 4p⁵", block: "p" },
  { number: 36, symbol: "Kr", name: "Krypton", atomicMass: "83.798", category: "noble", group: 18, period: 4, shells: [2, 8, 18, 8], configuration: "[Ar] 3d¹⁰ 4s² 4p⁶", block: "p" },

  // Period 5
  { number: 37, symbol: "Rb", name: "Rubidium", atomicMass: "85.468", category: "alkali", group: 1, period: 5, shells: [2, 8, 18, 8, 1], configuration: "[Kr] 5s¹", block: "s" },
  { number: 38, symbol: "Sr", name: "Strontium", atomicMass: "87.62", category: "alkaline", group: 2, period: 5, shells: [2, 8, 18, 8, 2], configuration: "[Kr] 5s²", block: "s" },
  { number: 39, symbol: "Y", name: "Yttrium", atomicMass: "88.906", category: "transition", group: 3, period: 5, shells: [2, 8, 18, 9, 2], configuration: "[Kr] 4d¹ 5s²", block: "d" },
  { number: 40, symbol: "Zr", name: "Zirconium", atomicMass: "91.224", category: "transition", group: 4, period: 5, shells: [2, 8, 18, 10, 2], configuration: "[Kr] 4d² 5s²", block: "d" },
  { number: 41, symbol: "Nb", name: "Niobium", atomicMass: "92.906", category: "transition", group: 5, period: 5, shells: [2, 8, 18, 12, 1], configuration: "[Kr] 4d⁴ 5s¹", block: "d" },
  { number: 42, symbol: "Mo", name: "Molybdenum", atomicMass: "95.95", category: "transition", group: 6, period: 5, shells: [2, 8, 18, 13, 1], configuration: "[Kr] 4d⁵ 5s¹", block: "d" },
  { number: 43, symbol: "Tc", name: "Technetium", atomicMass: "(98)", category: "transition", group: 7, period: 5, shells: [2, 8, 18, 13, 2], configuration: "[Kr] 4d⁵ 5s²", block: "d" },
  { number: 44, symbol: "Ru", name: "Ruthenium", atomicMass: "101.07", category: "transition", group: 8, period: 5, shells: [2, 8, 18, 15, 1], configuration: "[Kr] 4d⁷ 5s¹", block: "d" },
  { number: 45, symbol: "Rh", name: "Rhodium", atomicMass: "102.91", category: "transition", group: 9, period: 5, shells: [2, 8, 18, 16, 1], configuration: "[Kr] 4d⁸ 5s¹", block: "d" },
  { number: 46, symbol: "Pd", name: "Palladium", atomicMass: "106.42", category: "transition", group: 10, period: 5, shells: [2, 8, 18, 18, 0], configuration: "[Kr] 4d¹⁰", block: "d" },
  { number: 47, symbol: "Ag", name: "Silver", atomicMass: "107.87", category: "transition", group: 11, period: 5, shells: [2, 8, 18, 18, 1], configuration: "[Kr] 4d¹⁰ 5s¹", block: "d" },
  { number: 48, symbol: "Cd", name: "Cadmium", atomicMass: "112.41", category: "transition", group: 12, period: 5, shells: [2, 8, 18, 18, 2], configuration: "[Kr] 4d¹⁰ 5s²", block: "d" },
  { number: 49, symbol: "In", name: "Indium", atomicMass: "114.82", category: "post-transition", group: 13, period: 5, shells: [2, 8, 18, 18, 3], configuration: "[Kr] 4d¹⁰ 5s² 5p¹", block: "p" },
  { number: 50, symbol: "Sn", name: "Tin", atomicMass: "118.71", category: "post-transition", group: 14, period: 5, shells: [2, 8, 18, 18, 4], configuration: "[Kr] 4d¹⁰ 5s² 5p²", block: "p" },
  { number: 51, symbol: "Sb", name: "Antimony", atomicMass: "121.76", category: "metalloid", group: 15, period: 5, shells: [2, 8, 18, 18, 5], configuration: "[Kr] 4d¹⁰ 5s² 5p³", block: "p" },
  { number: 52, symbol: "Te", name: "Tellurium", atomicMass: "127.60", category: "metalloid", group: 16, period: 5, shells: [2, 8, 18, 18, 6], configuration: "[Kr] 4d¹⁰ 5s² 5p⁴", block: "p" },
  { number: 53, symbol: "I", name: "Iodine", atomicMass: "126.90", category: "nonmetal", group: 17, period: 5, shells: [2, 8, 18, 18, 7], configuration: "[Kr] 4d¹⁰ 5s² 5p⁵", block: "p" },
  { number: 54, symbol: "Xe", name: "Xenon", atomicMass: "131.29", category: "noble", group: 18, period: 5, shells: [2, 8, 18, 18, 8], configuration: "[Kr] 4d¹⁰ 5s² 5p⁶", block: "p" },

  // Period 6
  { number: 55, symbol: "Cs", name: "Caesium", atomicMass: "132.91", category: "alkali", group: 1, period: 6, shells: [2, 8, 18, 18, 8, 1], configuration: "[Xe] 6s¹", block: "s" },
  { number: 56, symbol: "Ba", name: "Barium", atomicMass: "137.33", category: "alkaline", group: 2, period: 6, shells: [2, 8, 18, 18, 8, 2], configuration: "[Xe] 6s²", block: "s" },

  // Lanthanoids (57-71)
  { number: 57, symbol: "La", name: "Lanthanum", atomicMass: "138.91", category: "lanthanoid", group: 3, period: 6, shells: [2, 8, 18, 18, 9, 2], configuration: "[Xe] 5d¹ 6s²", block: "f" },
  { number: 58, symbol: "Ce", name: "Cerium", atomicMass: "140.12", category: "lanthanoid", group: 3, period: 6, shells: [2, 8, 18, 19, 9, 2], configuration: "[Xe] 4f¹ 5d¹ 6s²", block: "f" },
  { number: 59, symbol: "Pr", name: "Praseodymium", atomicMass: "140.91", category: "lanthanoid", group: 3, period: 6, shells: [2, 8, 18, 21, 8, 2], configuration: "[Xe] 4f³ 6s²", block: "f" },
  { number: 60, symbol: "Nd", name: "Neodymium", atomicMass: "144.24", category: "lanthanoid", group: 3, period: 6, shells: [2, 8, 18, 22, 8, 2], configuration: "[Xe] 4f⁴ 6s²", block: "f" },
  { number: 61, symbol: "Pm", name: "Promethium", atomicMass: "144.24", category: "lanthanoid", group: 3, period: 6, shells: [2, 8, 18, 23, 8, 2], configuration: "[Xe] 4f⁵ 6s²", block: "f" },
  { number: 62, symbol: "Sm", name: "Samarium", atomicMass: "150.36", category: "lanthanoid", group: 3, period: 6, shells: [2, 8, 18, 25, 8, 2], configuration: "[Xe] 4f⁶ 6s²", block: "f" },
  { number: 63, symbol: "Eu", name: "Europium", atomicMass: "151.96", category: "lanthanoid", group: 3, period: 6, shells: [2, 8, 18, 25, 8, 2], configuration: "[Xe] 4f⁷ 6s²", block: "f" },
  { number: 64, symbol: "Gd", name: "Gadolinium", atomicMass: "157.25", category: "lanthanoid", group: 3, period: 6, shells: [2, 8, 18, 25, 9, 2], configuration: "[Xe] 4f⁷ 5d¹ 6s²", block: "f" },
  { number: 65, symbol: "Tb", name: "Terbium", atomicMass: "158.93", category: "lanthanoid", group: 3, period: 6, shells: [2, 8, 18, 27, 8, 2], configuration: "[Xe] 4f⁹ 6s²", block: "f" },
  { number: 66, symbol: "Dy", name: "Dysprosium", atomicMass: "162.50", category: "lanthanoid", group: 3, period: 6, shells: [2, 8, 18, 28, 8, 2], configuration: "[Xe] 4f¹⁰ 6s²", block: "f" },
  { number: 67, symbol: "Ho", name: "Holmium", atomicMass: "164.93", category: "lanthanoid", group: 3, period: 6, shells: [2, 8, 18, 29, 8, 2], configuration: "[Xe] 4f¹¹ 6s²", block: "f" },
  { number: 68, symbol: "Er", name: "Erbium", atomicMass: "167.26", category: "lanthanoid", group: 3, period: 6, shells: [2, 8, 18, 30, 8, 2], configuration: "[Xe] 4f¹² 6s²", block: "f" },
  { number: 69, symbol: "Tm", name: "Thulium", atomicMass: "168.93", category: "lanthanoid", group: 3, period: 6, shells: [2, 8, 18, 31, 8, 2], configuration: "[Xe] 4f¹³ 6s²", block: "f" },
  { number: 70, symbol: "Yb", name: "Ytterbium", atomicMass: "173.05", category: "lanthanoid", group: 3, period: 6, shells: [2, 8, 18, 32, 8, 2], configuration: "[Xe] 4f¹⁴ 6s²", block: "f" },
  { number: 71, symbol: "Lu", name: "Lutetium", atomicMass: "174.97", category: "lanthanoid", group: 3, period: 6, shells: [2, 8, 18, 32, 9, 2], configuration: "[Xe] 4f¹⁴ 5d¹ 6s²", block: "f" },

  // Period 6 (continued)
  { number: 72, symbol: "Hf", name: "Hafnium", atomicMass: "178.49", category: "transition", group: 4, period: 6, shells: [2, 8, 18, 32, 10, 2], configuration: "[Xe] 4f¹⁴ 5d² 6s²", block: "d" },
  { number: 73, symbol: "Ta", name: "Tantalum", atomicMass: "180.95", category: "transition", group: 5, period: 6, shells: [2, 8, 18, 32, 11, 2], configuration: "[Xe] 4f¹⁴ 5d³ 6s²", block: "d" },
  { number: 74, symbol: "W", name: "Tungsten", atomicMass: "183.84", category: "transition", group: 6, period: 6, shells: [2, 8, 18, 32, 12, 2], configuration: "[Xe] 4f¹⁴ 5d⁴ 6s²", block: "d" },
  { number: 75, symbol: "Re", name: "Rhenium", atomicMass: "186.21", category: "transition", group: 7, period: 6, shells: [2, 8, 18, 32, 13, 2], configuration: "[Xe] 4f¹⁴ 5d⁵ 6s²", block: "d" },
  { number: 76, symbol: "Os", name: "Osmium", atomicMass: "190.23", category: "transition", group: 8, period: 6, shells: [2, 8, 18, 32, 14, 2], configuration: "[Xe] 4f¹⁴ 5d⁶ 6s²", block: "d" },
  { number: 77, symbol: "Ir", name: "Iridium", atomicMass: "192.22", category: "transition", group: 9, period: 6, shells: [2, 8, 18, 32, 15, 2], configuration: "[Xe] 4f¹⁴ 5d⁷ 6s²", block: "d" },
  { number: 78, symbol: "Pt", name: "Platinum", atomicMass: "195.08", category: "transition", group: 10, period: 6, shells: [2, 8, 18, 32, 17, 1], configuration: "[Xe] 4f¹⁴ 5d⁹ 6s¹", block: "d" },
  { number: 79, symbol: "Au", name: "Gold", atomicMass: "196.97", category: "transition", group: 11, period: 6, shells: [2, 8, 18, 32, 18, 1], configuration: "[Xe] 4f¹⁴ 5d¹⁰ 6s¹", block: "d" },
  { number: 80, symbol: "Hg", name: "Mercury", atomicMass: "200.59", category: "transition", group: 12, period: 6, shells: [2, 8, 18, 32, 18, 2], configuration: "[Xe] 4f¹⁴ 5d¹⁰ 6s²", block: "d" },
  { number: 81, symbol: "Tl", name: "Thallium", atomicMass: "204.38", category: "post-transition", group: 13, period: 6, shells: [2, 8, 18, 32, 18, 3], configuration: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹", block: "p" },
  { number: 82, symbol: "Pb", name: "Lead", atomicMass: "207.2", category: "post-transition", group: 14, period: 6, shells: [2, 8, 18, 32, 18, 4], configuration: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²", block: "p" },
  { number: 83, symbol: "Bi", name: "Bismuth", atomicMass: "208.98", category: "post-transition", group: 15, period: 6, shells: [2, 8, 18, 32, 18, 5], configuration: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³", block: "p" },
  { number: 84, symbol: "Po", name: "Polonium", atomicMass: "(209)", category: "post-transition", group: 16, period: 6, shells: [2, 8, 18, 32, 18, 6], configuration: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴", block: "p" },
  { number: 85, symbol: "At", name: "Astatine", atomicMass: "(210)", category: "metalloid", group: 17, period: 6, shells: [2, 8, 18, 32, 18, 7], configuration: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵", block: "p" },
  { number: 86, symbol: "Rn", name: "Radon", atomicMass: "(222)", category: "noble", group: 18, period: 6, shells: [2, 8, 18, 32, 18, 8], configuration: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶", block: "p" },

  // Period 7
  { number: 87, symbol: "Fr", name: "Francium", atomicMass: "(223)", category: "alkali", group: 1, period: 7, shells: [2, 8, 18, 32, 18, 8, 1], configuration: "[Rn] 7s¹", block: "s" },
  { number: 88, symbol: "Ra", name: "Radium", atomicMass: "(226)", category: "alkaline", group: 2, period: 7, shells: [2, 8, 18, 32, 18, 8, 2], configuration: "[Rn] 7s²", block: "s" },

  // Actinoids (89-103)
  { number: 89, symbol: "Ac", name: "Actinium", atomicMass: "(227)", category: "actinoid", group: 3, period: 7, shells: [2, 8, 18, 32, 18, 9, 2], configuration: "[Rn] 6d¹ 7s²", block: "f" },
  { number: 90, symbol: "Th", name: "Thorium", atomicMass: "232.04", category: "actinoid", group: 3, period: 7, shells: [2, 8, 18, 32, 18, 10, 2], configuration: "[Rn] 6d² 7s²", block: "f" },
  { number: 91, symbol: "Pa", name: "Protactinium", atomicMass: "231.04", category: "actinoid", group: 3, period: 7, shells: [2, 8, 18, 32, 20, 9, 2], configuration: "[Rn] 5f² 6d¹ 7s²", block: "f" },
  { number: 92, symbol: "U", name: "Uranium", atomicMass: "238.03", category: "actinoid", group: 3, period: 7, shells: [2, 8, 18, 32, 21, 9, 2], configuration: "[Rn] 5f³ 6d¹ 7s²", block: "f" },
  { number: 93, symbol: "Np", name: "Neptunium", atomicMass: "(237)", category: "actinoid", group: 3, period: 7, shells: [2, 8, 18, 32, 22, 9, 2], configuration: "[Rn] 5f⁴ 6d¹ 7s²", block: "f" },
  { number: 94, symbol: "Pu", name: "Plutonium", atomicMass: "(244)", category: "actinoid", group: 3, period: 7, shells: [2, 8, 18, 32, 24, 8, 2], configuration: "[Rn] 5f⁶ 7s²", block: "f" },
  { number: 95, symbol: "Am", name: "Americium", atomicMass: "(243)", category: "actinoid", group: 3, period: 7, shells: [2, 8, 18, 32, 25, 8, 2], configuration: "[Rn] 5f⁷ 7s²", block: "f" },
  { number: 96, symbol: "Cm", name: "Curium", atomicMass: "(247)", category: "actinoid", group: 3, period: 7, shells: [2, 8, 18, 32, 25, 9, 2], configuration: "[Rn] 5f⁷ 6d¹ 7s²", block: "f" },
  { number: 97, symbol: "Bk", name: "Berkelium", atomicMass: "(247)", category: "actinoid", group: 3, period: 7, shells: [2, 8, 18, 32, 27, 8, 2], configuration: "[Rn] 5f⁹ 7s²", block: "f" },
  { number: 98, symbol: "Cf", name: "Californium", atomicMass: "(251)", category: "actinoid", group: 3, period: 7, shells: [2, 8, 18, 32, 28, 8, 2], configuration: "[Rn] 5f¹⁰ 7s²", block: "f" },
  { number: 99, symbol: "Es", name: "Einsteinium", atomicMass: "(252)", category: "actinoid", group: 3, period: 7, shells: [2, 8, 18, 32, 29, 8, 2], configuration: "[Rn] 5f¹¹ 7s²", block: "f" },
  { number: 100, symbol: "Fm", name: "Fermium", atomicMass: "(257)", category: "actinoid", group: 3, period: 7, shells: [2, 8, 18, 32, 30, 8, 2], configuration: "[Rn] 5f¹² 7s²", block: "f" },
  { number: 101, symbol: "Md", name: "Mendelevium", atomicMass: "(258)", category: "actinoid", group: 3, period: 7, shells: [2, 8, 18, 32, 31, 8, 2], configuration: "[Rn] 5f¹³ 7s²", block: "f" },
  { number: 102, symbol: "No", name: "Nobelium", atomicMass: "(259)", category: "actinoid", group: 3, period: 7, shells: [2, 8, 18, 32, 32, 8, 2], configuration: "[Rn] 5f¹⁴ 7s²", block: "f" },
  { number: 103, symbol: "Lr", name: "Lawrencium", atomicMass: "(266)", category: "actinoid", group: 3, period: 7, shells: [2, 8, 18, 32, 32, 9, 2], configuration: "[Rn] 5f¹⁴ 6d¹ 7s²", block: "f" },

  // Period 7 (continued)
  { number: 104, symbol: "Rf", name: "Rutherfordium", atomicMass: "(267)", category: "transition", group: 4, period: 7, shells: [2, 8, 18, 32, 32, 10, 2], configuration: "[Rn] 5f¹⁴ 6d² 7s²", block: "d" },
  { number: 105, symbol: "Db", name: "Dubnium", atomicMass: "(268)", category: "transition", group: 5, period: 7, shells: [2, 8, 18, 32, 32, 11, 2], configuration: "[Rn] 5f¹⁴ 6d³ 7s²", block: "d" },
  { number: 106, symbol: "Sg", name: "Seaborgium", atomicMass: "(269)", category: "transition", group: 6, period: 7, shells: [2, 8, 18, 32, 32, 12, 2], configuration: "[Rn] 5f¹⁴ 6d⁴ 7s²", block: "d" },
  { number: 107, symbol: "Bh", name: "Bohrium", atomicMass: "(270)", category: "transition", group: 7, period: 7, shells: [2, 8, 18, 32, 32, 13, 2], configuration: "[Rn] 5f¹⁴ 6d⁵ 7s²", block: "d" },
  { number: 108, symbol: "Hs", name: "Hassium", atomicMass: "(277)", category: "transition", group: 8, period: 7, shells: [2, 8, 18, 32, 32, 14, 2], configuration: "[Rn] 5f¹⁴ 6d⁶ 7s²", block: "d" },
  { number: 109, symbol: "Mt", name: "Meitnerium", atomicMass: "(278)", category: "transition", group: 9, period: 7, shells: [2, 8, 18, 32, 32, 15, 2], configuration: "[Rn] 5f¹⁴ 6d⁷ 7s²", block: "d" },
  { number: 110, symbol: "Ds", name: "Darmstadtium", atomicMass: "(281)", category: "transition", group: 10, period: 7, shells: [2, 8, 18, 32, 32, 17, 1], configuration: "[Rn] 5f¹⁴ 6d⁹ 7s¹", block: "d" },
  { number: 111, symbol: "Rg", name: "Roentgenium", atomicMass: "(282)", category: "transition", group: 11, period: 7, shells: [2, 8, 18, 32, 32, 18, 1], configuration: "[Rn] 5f¹⁴ 6d¹⁰ 7s¹", block: "d" },
  { number: 112, symbol: "Cn", name: "Copernicium", atomicMass: "(282)", category: "transition", group: 12, period: 7, shells: [2, 8, 18, 32, 32, 18, 2], configuration: "[Rn] 5f¹⁴ 6d¹⁰ 7s²", block: "d" },
  { number: 113, symbol: "Nh", name: "Nihonium", atomicMass: "(286)", category: "post-transition", group: 13, period: 7, shells: [2, 8, 18, 32, 32, 18, 3], configuration: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹", block: "p" },
  { number: 114, symbol: "Fl", name: "Flerovium", atomicMass: "(289)", category: "post-transition", group: 14, period: 7, shells: [2, 8, 18, 32, 32, 18, 4], configuration: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²", block: "p" },
  { number: 115, symbol: "Mc", name: "Moscovium", atomicMass: "(290)", category: "post-transition", group: 15, period: 7, shells: [2, 8, 18, 32, 32, 18, 5], configuration: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³", block: "p" },
  { number: 116, symbol: "Lv", name: "Livermorium", atomicMass: "(293)", category: "post-transition", group: 16, period: 7, shells: [2, 8, 18, 32, 32, 18, 6], configuration: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴", block: "p" },
  { number: 117, symbol: "Ts", name: "Tennessine", atomicMass: "(294)", category: "unknown", group: 17, period: 7, shells: [2, 8, 18, 32, 32, 18, 7], configuration: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵", block: "p" },
  { number: 118, symbol: "Og", name: "Oganesson", atomicMass: "(294)", category: "noble", group: 18, period: 7, shells: [2, 8, 18, 32, 32, 18, 8], configuration: "[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶", block: "p" },
];

export interface CategoryInfo {
  id: string;
  label: string;
  color: string; // Tailwind text color or hex
  borderColor: string;
  bgColor: string;
  glowColor: string;
}

export const CATEGORY_MAP: Record<string, CategoryInfo> = {
  alkali: {
    id: "alkali",
    label: "Alkali Metals",
    color: "text-amber-400",
    borderColor: "border-amber-500/70",
    bgColor: "bg-amber-950/30",
    glowColor: "shadow-amber-500/30",
  },
  alkaline: {
    id: "alkaline",
    label: "Alkaline Earth Metals",
    color: "text-lime-400",
    borderColor: "border-lime-500/70",
    bgColor: "bg-lime-950/30",
    glowColor: "shadow-lime-500/30",
  },
  lanthanoid: {
    id: "lanthanoid",
    label: "Lanthanoids",
    color: "text-fuchsia-400",
    borderColor: "border-fuchsia-500/70",
    bgColor: "bg-fuchsia-950/30",
    glowColor: "shadow-fuchsia-500/30",
  },
  actinoid: {
    id: "actinoid",
    label: "Aktinoids",
    color: "text-purple-400",
    borderColor: "border-purple-500/70",
    bgColor: "bg-purple-950/30",
    glowColor: "shadow-purple-500/30",
  },
  transition: {
    id: "transition",
    label: "Transition Metals",
    color: "text-rose-400",
    borderColor: "border-rose-500/70",
    bgColor: "bg-rose-950/30",
    glowColor: "shadow-rose-500/30",
  },
  "post-transition": {
    id: "post-transition",
    label: "Post-Transition Metals",
    color: "text-sky-400",
    borderColor: "border-sky-500/70",
    bgColor: "bg-sky-950/30",
    glowColor: "shadow-sky-500/30",
  },
  metalloid: {
    id: "metalloid",
    label: "Metalloids",
    color: "text-emerald-400",
    borderColor: "border-emerald-500/70",
    bgColor: "bg-emerald-950/30",
    glowColor: "shadow-emerald-500/30",
  },
  nonmetal: {
    id: "nonmetal",
    label: "Other Nonmetals",
    color: "text-green-400",
    borderColor: "border-green-500/70",
    bgColor: "bg-green-950/30",
    glowColor: "shadow-green-500/30",
  },
  noble: {
    id: "noble",
    label: "Noble Gasses",
    color: "text-indigo-400",
    borderColor: "border-indigo-500/70",
    bgColor: "bg-indigo-950/30",
    glowColor: "shadow-indigo-500/30",
  },
  unknown: {
    id: "unknown",
    label: "Unknown",
    color: "text-slate-400",
    borderColor: "border-slate-600/70",
    bgColor: "bg-slate-900/30",
    glowColor: "shadow-slate-500/20",
  },
};

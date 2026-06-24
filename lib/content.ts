import type { LucideIcon } from "lucide-react";
import {
  Award,
  BadgeCheck,
  BookOpen,
  BrainCircuit,
  Building2,
  ClipboardCheck,
  FileText,
  Gavel,
  Globe2,
  HandHeart,
  HeartPulse,
  Landmark,
  LibraryBig,
  Mail,
  Megaphone,
  Microscope,
  Network,
  Scale,
  ShieldCheck,
  Stethoscope,
  UsersRound
} from "lucide-react";

export type IconItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const site = {
  name: "Medical Law Hub",
  tagline: "Where Medicine Meets Law",
  url: "https://medlawhub.com",
  email: "info@medlawhub.com",
  phones: ["+44 7309 723655", "+234 7050 864555"],
  address: "Royal Drive, Bolsover S44 6ZD, United Kingdom"
};

export const navItems = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Who We Are", href: "/about#who-we-are" },
      { label: "Team & Board", href: "/about#team" },
      { label: "Governance", href: "/about#governance" }
    ]
  },
  {
    label: "Charitable Work",
    href: "/charitable-work",
    children: [
      { label: "Training Modules", href: "/charitable-work#training" },
      { label: "Policy Desks", href: "/charitable-work#policy" },
      { label: "Competitions", href: "/charitable-work#competitions" }
    ]
  },
  {
    label: "Research & Media",
    href: "/research-media",
    children: [
      { label: "Magazine", href: "/research-media#magazine" },
      { label: "Blog", href: "/blog" },
      { label: "Policy Briefs", href: "/research-media#briefs" },
      { label: "Digital Health", href: "/research-media#digital-health" }
    ]
  },
  { label: "Blog", href: "/blog" },
  { label: "Donate", href: "/donate" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Contact", href: "/contact" }
];

export const stats = [
  { value: "7+", label: "program pillars" },
  { value: "13", label: "expert contributors" },
  { value: "2", label: "global hotlines" },
  { value: "100%", label: "public benefit model" }
];

export const impactCards: IconItem[] = [
  {
    title: "Patient Rights",
    description: "Clear public education on consent, confidentiality, autonomy and clinical accountability.",
    icon: ShieldCheck
  },
  {
    title: "Medical Law Research",
    description: "Independent analysis for clinical negligence, healthcare standards and emerging law reform.",
    icon: LibraryBig
  },
  {
    title: "Bioethics & AI in Medicine",
    description: "Practical guidance on responsible innovation, automated diagnostics and health data governance.",
    icon: BrainCircuit
  },
  {
    title: "Health Policy Reform",
    description: "Policy briefs and statutory critiques designed for ministries, regulators and institutions.",
    icon: Landmark
  },
  {
    title: "Educational Competitions",
    description: "Essay, debate and training formats that develop the next generation of health law leaders.",
    icon: Award
  },
  {
    title: "Public Awareness",
    description: "Open-access toolkits and campaigns that translate complex legal rules into usable knowledge.",
    icon: Megaphone
  }
];

export const audiences: IconItem[] = [
  {
    title: "The Public & Patients",
    description: "Rights, consent, confidentiality and practical pathways when adverse clinical events happen.",
    icon: HeartPulse
  },
  {
    title: "Healthcare Practitioners",
    description: "Legal context for clinical negligence, telemedicine, ethics and cross-border healthcare delivery.",
    icon: Stethoscope
  },
  {
    title: "Legal Professionals",
    description: "Research pipelines, continuing development and specialist medico-legal advocacy platforms.",
    icon: Gavel
  },
  {
    title: "Academics & Scholars",
    description: "A forum for rigorous research, debate, publication and institutional collaboration.",
    icon: BookOpen
  }
];

export const focusSectors: IconItem[] = [
  {
    title: "Medico-Legal Problems & Litigation",
    description: "Real-world disputes, liability questions and standards of clinical accountability.",
    icon: Scale
  },
  {
    title: "Global Medical Law & Bioethics",
    description: "Comparative legal frameworks for ethical, equitable and rights-based healthcare.",
    icon: Globe2
  },
  {
    title: "Public Health Law & Policy Reform",
    description: "Evidence-led reform for disease control, emergency care and health governance.",
    icon: FileText
  },
  {
    title: "Mental Health Law",
    description: "Protection, capacity, dignity and safeguards across mental healthcare systems.",
    icon: BrainCircuit
  },
  {
    title: "Children, Medicine & Law",
    description: "Consent, welfare, guardianship and child-centered clinical decision-making.",
    icon: UsersRound
  },
  {
    title: "Telemedicine, EHR & AI Regulation",
    description: "Digital care, electronic records, automated tools and cross-border compliance.",
    icon: Network
  },
  {
    title: "Consent, Autonomy & Refusal",
    description: "The legal and ethical foundations of informed choice in healthcare.",
    icon: ClipboardCheck
  },
  {
    title: "Medical Malpractice & Clinical Negligence",
    description: "Standards, remedies, government facility benchmarks and patient safety duties.",
    icon: BadgeCheck
  },
  {
    title: "Organ Transplantation & Genetic Privacy",
    description: "Transplant regulation, genomics, data privacy and biomedical innovation safeguards.",
    icon: Microscope
  }
];

export const activities: IconItem[] = [
  {
    title: "Education & Training Tournaments",
    description:
      "National essay and debate competitions created with academic and clinical stakeholders to sharpen medico-legal reasoning.",
    icon: Award
  },
  {
    title: "Medical Hub Quarterly Magazine",
    description:
      "Accessible thematic publications that turn complex subjects such as organ transplantation into professional public resources.",
    icon: BookOpen
  },
  {
    title: "Independent Policy & Legislation Research",
    description:
      "Statutory critique papers and policy briefs focused on public health, healthcare technology and regulatory reform.",
    icon: FileText
  }
];

export const team = [
  {
    name: "Damilare A. Adeoye, Esq",
    role: "Chief Executive Officer",
    bio: "Medical law expert, human rights scholar, research fellow and member of international medical law associations."
  },
  {
    name: "Dr. Adeleke Adeoye",
    role: "Hub Medical Expert",
    bio: "Medical doctor with practical experience across public and private healthcare sectors in multiple regions."
  },
  {
    name: "Dr. Ife Ofunne",
    role: "Hub Medical Expert",
    bio: "Physician, legal scholar and medical ethics expert working at the intersection of medicine, law and governance."
  },
  {
    name: "Faridah Abdullahi",
    role: "Hub Program Coordinator",
    bio: "Lawyer and cross-sector administrator focused on ethical healthcare research, policy and gender equality."
  },
  {
    name: "Yusuf Balogun, Esq.",
    role: "Hub Research Expert",
    bio: "Health law and policy specialist covering patient rights, AI, digital health, biotechnology and privacy."
  },
  {
    name: "Omar Al Saqer",
    role: "Hub Policy Expert",
    bio: "Medical ethics and law specialist supporting policy formation and healthcare compliance advisory work."
  },
  {
    name: "Mutiat Afolabi",
    role: "Hub Medical Law Expert",
    bio: "Commonwealth Scholar and legal professional contributing expertise on contemporary medico-legal issues."
  },
  {
    name: "Betty Adeoye",
    role: "Science/Healthcare Expert",
    bio: "Senior bioprocess scientist focused on biotechnology, patient safety and public health regulation."
  },
  {
    name: "Samson Ogundele, Esq",
    role: "Hub Legal Expert",
    bio: "Legal practitioner interested in technology regulation and its impact on medical practice."
  },
  {
    name: "Modupe Akinrinade, Esq",
    role: "Hub Legal Expert",
    bio: "Corporate legal practitioner with a health law foundation and medico-legal advisory experience."
  },
  {
    name: "Sandra Bello",
    role: "Hub Health Law Expert",
    bio: "Healthcare legal risk specialist focused on compliance, risk management and legal clarity."
  },
  {
    name: "Hannah Enyawuile",
    role: "Hub Content Manager",
    bio: "Lawyer, editor and content developer translating medico-legal subjects for public platforms."
  },
  {
    name: "Temiloluwa Onaleye",
    role: "Hub Tech Manager",
    bio: "Technology expert supporting the Hub's online platforms and digital operations."
  }
];

export const charitablePrograms: IconItem[] = [
  {
    title: "Education & Professional Training Modules",
    description: "Accessible learning pathways for students, clinicians, lawyers and public-interest advocates.",
    icon: BookOpen
  },
  {
    title: "Law Reform Policy Desks",
    description: "Independent desks for legislative critique, health data privacy and digital medical frameworks.",
    icon: Landmark
  },
  {
    title: "National Medical Law Competitions",
    description: "Essay and debate tournaments that cultivate analytical depth and professional confidence.",
    icon: Award
  },
  {
    title: "Community Sensitization Campaigns",
    description: "Public education on consent, emergency care rights, confidentiality and healthcare accountability.",
    icon: Megaphone
  },
  {
    title: "Open-Access Legal Toolkits",
    description: "Plain-language resources designed for families, patients and vulnerable communities.",
    icon: FileText
  },
  {
    title: "Public Health Awareness Campaigns",
    description: "Rights-based awareness work around critical statutes, clinical safety and public health duties.",
    icon: HandHeart
  }
];

export const resources = [
  {
    title: "Medical Hub Quarterly Magazine",
    category: "Magazine",
    description: "A thematic publication designed to make complex health law questions accessible to professionals and the public.",
    meta: "Quarterly archive"
  },
  {
    title: "Organ Transplantation in Africa",
    category: "Featured Issue",
    description: "A focused issue on legal, ethical and regulatory pathways for transplantation frameworks across Africa.",
    meta: "Volume I"
  },
  {
    title: "Digital Health & Genomics Deep-Dives",
    category: "Research",
    description: "Analysis of health data privacy, genetic information, biomedical innovation and public accountability.",
    meta: "Emerging law"
  },
  {
    title: "AI in Medicine Research",
    category: "Policy Brief",
    description: "Risk, consent, explainability and liability questions for automated diagnostics and clinical decision support.",
    meta: "Technology"
  },
  {
    title: "Telemedicine Compliance",
    category: "Guide",
    description: "Cross-border delivery, remote consultations, records, insurance and professional standards.",
    meta: "Digital care"
  },
  {
    title: "Statutory Critiques",
    category: "Briefing",
    description: "Independent evaluations of health law implementation bottlenecks and reform opportunities.",
    meta: "Law reform"
  }
];

export const donationTiers = [
  {
    amount: "GBP 25 / USD 30",
    title: "Legal Literacy & Patient Empowerment",
    description:
      "Supports free digital legal toolkits on consent, confidentiality, clinical records and routes after adverse events."
  },
  {
    amount: "GBP 100 / USD 125",
    title: "Nurturing Evolving Health Law Experts",
    description:
      "Subsidizes training materials and competition support for students entering essay and debate programmes."
  },
  {
    amount: "GBP 250 / USD 310",
    title: "Public Health & Legislative Advocacy Briefs",
    description:
      "Funds specialist policy briefs delivered to ministries, regulators and legislative assemblies."
  },
  {
    amount: "GBP 500 / USD 620",
    title: "Health Technology & Bioethics Research",
    description:
      "Underwrites open-access research on AI diagnostics, telemedicine, genomics and health data privacy."
  }
];

export const involvement = [
  {
    title: "Professional Memberships",
    description: "Join a specialist network of lawyers, clinicians, researchers and policy professionals.",
    icon: UsersRound
  },
  {
    title: "Volunteer Networks",
    description: "Support public legal education, events, campaigns and open-access resource development.",
    icon: HandHeart
  },
  {
    title: "Academic Fellowships",
    description: "Contribute research, editorial analysis and teaching across priority medico-legal themes.",
    icon: LibraryBig
  },
  {
    title: "Institutional Alliances",
    description: "Partner with the Hub on competitions, policy work, publications and public-interest projects.",
    icon: Building2
  },
  {
    title: "Corporate Partnerships",
    description: "Sponsor research, training and awareness pillars with strong transparency safeguards.",
    icon: Network
  }
];

export const contactCards: IconItem[] = [
  {
    title: "Central Email Registry",
    description: site.email,
    icon: Mail
  },
  {
    title: "Global Hotlines",
    description: site.phones.join(" | "),
    icon: HeartPulse
  },
  {
    title: "Registered Office",
    description: site.address,
    icon: Building2
  }
];

export const faqs = [
  {
    question: "How can I make a donation?",
    answer:
      "You can donate by bank transfer to Medical Law Hub's UBA account using the details provided on this page."
  },
  {
    question: "How are donations allocated?",
    answer:
      "Public giving is positioned for educational, research and advocacy operations under the Hub's transparency commitment."
  },
  {
    question: "Can institutions sponsor a specific programme?",
    answer:
      "Yes. Sponsors can align with pillars such as debate tournaments, open-access research or community campaigns."
  }
];

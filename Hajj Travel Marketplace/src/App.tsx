import { AnchorHTMLAttributes, createElement, FormEvent, ImageHTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes, useEffect, useRef, useState } from "react";

type IconName =
  | "arrow"
  | "calendar"
  | "check"
  | "chevron"
  | "clock"
  | "compass"
  | "globe"
  | "grid"
  | "headset"
  | "heart"
  | "instagram"
  | "location"
  | "list"
  | "mail"
  | "menu"
  | "moon"
  | "people"
  | "plane"
  | "search"
  | "sliders"
  | "shield"
  | "star"
  | "sun"
  | "tag";

const photos = {
  madinah:
    "https://images.unsplash.com/photo-1667454872134-c25973237138?auto=format&fit=crop&w=1800&q=88",
  madinahPortrait:
    "https://images.unsplash.com/photo-1724191078796-8a997b989f43?auto=format&fit=crop&w=900&q=85",
  makkah:
    "https://images.unsplash.com/photo-1720482229376-d5574ffeb0c8?auto=format&fit=crop&w=1200&q=85",
  tawaf:
    "https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&w=1200&q=85",
  kaaba:
    "https://images.unsplash.com/photo-1693590614566-1d3ea9ef32f7?auto=format&fit=crop&w=1200&q=85",
  pilgrims:
    "https://images.unsplash.com/photo-1633546707050-88e2b545831c?auto=format&fit=crop&w=1200&q=85",
  haram:
    "https://images.unsplash.com/photo-1592326871020-04f58c1a52f3?auto=format&fit=crop&w=1200&q=85",
  faqHero:
    "https://images.unsplash.com/photo-1770786106021-52580470e31e?auto=format&fit=crop&w=1200&q=85",
  madinahCourtyard:
    "https://images.unsplash.com/photo-1602769490455-36cf9734dbcb?auto=format&fit=crop&w=1200&q=85",
  hotelRoom:
    "https://images.unsplash.com/photo-1702014859878-5d4743176d28?auto=format&fit=crop&w=1200&q=85",
  hotelExterior:
    "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=1200&q=85",
  pilgrimTravel:
    "https://images.unsplash.com/photo-1722628920463-647fb7385b16?auto=format&fit=crop&w=1200&q=85",
  agencyOffice:
    "https://images.unsplash.com/photo-1716703373229-b0e43de7dd5c?auto=format&fit=crop&w=1200&q=85",
  pilgrimGroup:
    "https://images.unsplash.com/photo-1736240624842-c13db7ba4275?auto=format&fit=crop&w=1200&q=85",
  eventHall:
    "https://images.unsplash.com/photo-1778876091184-8839210e1917?auto=format&fit=crop&w=1200&q=85",
  eventWorkshop:
    "https://images.unsplash.com/photo-1651293478838-1f51675131c5?auto=format&fit=crop&w=1200&q=85",
  arafat:
    "https://images.unsplash.com/photo-1650446647974-451d05d2136d?auto=format&fit=crop&w=1200&q=85",
  jabal:
    "https://images.unsplash.com/photo-1591604145021-d877bc5303a8?auto=format&fit=crop&w=1200&q=85",
  quba:
    "https://images.unsplash.com/photo-1635829576353-1a14caec2f6f?auto=format&fit=crop&w=1200&q=85",
  madinahMosque:
    "https://images.unsplash.com/photo-1605976528013-638e49b6599f?auto=format&fit=crop&w=1200&q=85",
  guide1:
    "https://images.unsplash.com/photo-1651596082386-f83cfa746e64?auto=format&fit=crop&w=700&q=85",
  guide2:
    "https://images.unsplash.com/photo-1552930210-e6a606743743?auto=format&fit=crop&w=700&q=85",
  guide3:
    "https://images.unsplash.com/photo-1554400695-5973d75d179e?auto=format&fit=crop&w=700&q=85",
  guide4:
    "https://images.unsplash.com/photo-1651596082255-bcb4993cee27?auto=format&fit=crop&w=700&q=85",
  guideWoman:
    "https://images.unsplash.com/photo-1550546094-9835463f9f71?auto=format&fit=crop&w=700&q=85",
  guideMan:
    "https://images.unsplash.com/photo-1520434087499-0fa48ffb40c9?auto=format&fit=crop&w=700&q=85",
  hajjPacking:
    "https://images.unsplash.com/photo-1740727262054-d5f2af971131?auto=format&fit=crop&w=1200&q=85",
  ihram:
    "https://images.unsplash.com/photo-1542058186993-286fdce0b580?auto=format&fit=crop&w=1200&q=85",
};

const ROUTE_CHANGE_EVENT = "hot-solutions:route-change";
let navigationTimer: number | undefined;

function navigateTo(destination: string) {
  const url = new URL(destination, window.location.href);
  if (url.origin !== window.location.origin) {
    window.location.href = url.href;
    return;
  }

  const nextLocation = `${url.pathname}${url.search}${url.hash}`;
  const currentLocation = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (nextLocation === currentLocation) return;

  document.documentElement.classList.add("page-is-leaving", "page-is-loading");
  window.clearTimeout(navigationTimer);
  navigationTimer = window.setTimeout(() => {
    window.history.pushState({}, "", nextLocation);
    window.dispatchEvent(new Event(ROUTE_CHANGE_EVENT));
  }, 160);
}

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    calendar: <><path d="M6 2v4M18 2v4M3 9h18" /><rect x="3" y="4" width="18" height="18" rx="3" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m8 10 4 4 4-4" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    compass: <><circle cx="12" cy="12" r="9" /><path d="m15 9-2 4-4 2 2-4 4-2Z" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" /></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    headset: <><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><path d="M4 14v4h4v-6H6a2 2 0 0 0-2 2ZM20 14v4h-4v-6h2a2 2 0 0 1 2 2ZM16 20c-1 1-2 1-4 1" /></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>,
    location: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    list: <><path d="M8 6h13M8 12h13M8 18h13" /><path d="M3 6h.01M3 12h.01M3 18h.01" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    moon: <path d="M21 15.5A9 9 0 0 1 8.5 3 9 9 0 1 0 21 15.5Z" />,
    people: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></>,
    plane: <><path d="M22 2 9 15" /><path d="m22 2-7 20-4-9-9-4 20-7Z" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    sliders: <><path d="M4 6h16M4 12h16M4 18h16" /><circle cx="9" cy="6" r="2" fill="currentColor" /><circle cx="15" cy="12" r="2" fill="currentColor" /><circle cx="7" cy="18" r="2" fill="currentColor" /></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></>,
    star: <path d="m12 2 3.1 6.3 6.9 1-5 4.8 1.2 6.9-6.2-3.3L5.8 21 7 14.1l-5-4.8 6.9-1L12 2Z" />,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
    tag: <><path d="M20.6 13.6 11 23l-9-9V2h12l6.6 6.6a3.5 3.5 0 0 1 0 5Z" /><circle cx="7" cy="7" r="1" /></>,
  };
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className={`logo ${light ? "logo-light" : ""}`}>
      <span className="logo-mark"><span className="dome" /><Icon name="plane" size={15} /></span>
      <span><strong>Hajj Solutions</strong><small>Travel · Explore · Experience</small></span>
    </div>
  );
}

function Button({
  children,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
}: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "light";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  return <button type={type} className={`button button-${variant} ${className}`} onClick={onClick}>{children}</button>;
}

function TextLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return createElement("a", props);
}

function Title({ as, children }: { as: "h1" | "h2" | "h3"; children: ReactNode }) {
  return createElement(as, null, children);
}

function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return createElement("input", props);
}

function SelectInput(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return createElement("select", props);
}

function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return createElement("textarea", props);
}

function Image(props: ImageHTMLAttributes<HTMLImageElement>) {
  return createElement("img", props);
}

function PageTransitionLayer() {
  return <div className="page-transition-layer" aria-hidden="true"><span className="page-progress" /><div className="page-skeleton"><span /><span /><span /></div></div>;
}

function SectionHeading({ eyebrow, title, text, action }: { eyebrow: string; title: string; text: string; action: string }) {
  return (
    <div className="section-heading">
      <div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2><p>{text}</p></div>
      <a href="#top" className="text-link">{action}<Icon name="arrow" size={17} /></a>
    </div>
  );
}

const packages = [
  { title: "Premium Hajj Package 2027", place: "Makkah, Mina & Madinah", days: "40 Days", price: "$5,650", rating: "4.9", reviews: 248, agency: "Al Haramain Travels", image: photos.kaaba, badge: "Premium Hajj" },
  { title: "Economy Hajj Package 2027", place: "Makkah, Mina & Madinah", days: "35 Days", price: "$4,280", rating: "4.8", reviews: 196, agency: "Global Hajj Services", image: photos.pilgrims, badge: "Economy Hajj" },
  { title: "Ramadan Umrah Package", place: "Makkah & Madinah", days: "14 Days", price: "$1,790", rating: "4.9", reviews: 221, agency: "Rahmaniya Umrah Travels", image: photos.madinah, badge: "Ramadan Umrah" },
  { title: "14-Day Premium Umrah", place: "Makkah & Madinah", days: "14 Days", price: "$1,450", rating: "4.8", reviews: 173, agency: "Nusuk Hajj Services", image: photos.tawaf, badge: "Premium Umrah" },
];

function Rating({ score, reviews }: { score: string; reviews?: number }) {
  return <span className="rating"><Icon name="star" size={14} /><strong>{score}</strong>{reviews !== undefined && <span>({reviews})</span>}</span>;
}

function PackageCard({ item, index }: { item: typeof packages[number]; index: number }) {
  const [liked, setLiked] = useState(false);
  return (
    <article className="package-card reveal" style={{ animationDelay: `${index * 80}ms` }}>
      <div className="package-image">
        <img src={item.image} alt={`${item.place} travel experience`} />
        <span className="badge">{item.badge}</span>
        <button className={`heart ${liked ? "liked" : ""}`} aria-label="Save package" onClick={() => setLiked(!liked)}><Icon name="heart" size={18} /></button>
      </div>
      <div className="package-body">
        <div className="package-meta"><span><Icon name="location" size={15} />{item.place}</span><Rating score={item.rating} reviews={item.reviews} /></div>
        <h3>{item.title}</h3>
        <div className="facts"><span><Icon name="clock" size={15} />{item.days}</span><span><Icon name="plane" size={15} />From Dhaka</span></div>
        <div className="agency-line"><span className="agency-avatar">{item.agency[0]}</span><span>Offered by <strong>{item.agency}</strong></span><span className="verified"><Icon name="check" size={11} /></span></div>
        <div className="package-footer"><div><small>Starting from</small><strong>{item.price}</strong><span>/ person</span></div><Button variant="secondary">View details</Button></div>
      </div>
    </article>
  );
}

const destinations = [
  { name: "Masjid al-Haram", country: "Makkah", count: 48, image: photos.makkah, className: "destination-large" },
  { name: "Al-Masjid an-Nabawi", country: "Madinah", count: 42, image: photos.madinahPortrait, className: "destination-large" },
  { name: "The Holy Kaaba", country: "Makkah", count: 36, image: photos.kaaba },
  { name: "Mina", country: "Hajj Sacred Site", count: 24, image: photos.pilgrims },
  { name: "Arafat", country: "Hajj Sacred Site", count: 19, image: photos.haram },
  { name: "Prophet's Mosque Courtyard", country: "Madinah", count: 28, image: photos.madinahCourtyard },
];

const agencies = [
  {
    initials: "AH",
    name: "Al Haramain Travels",
    location: "Dhaka, Bangladesh",
    rating: "4.9",
    reviews: 245,
    packages: 24,
    experience: 12,
    cover: photos.madinah,
    description: "Specialists in thoughtfully planned Hajj and Umrah journeys with personal care at every step.",
    specialties: "Group Hajj · Premium Umrah",
    featured: [
      { name: "Premium Umrah Package", category: "HOT UMRAH PACKAGE", price: "$1,250", image: photos.makkah },
      { name: "Ramadan Umrah Package", category: "RAMADAN UMRAH", price: "$1,680", image: photos.madinahPortrait },
    ],
  },
  {
    initials: "AH",
    name: "Rahmaniya Umrah Travels",
    location: "Sylhet, Bangladesh",
    rating: "4.8",
    reviews: 186,
    packages: 18,
    experience: 9,
    cover: photos.madinahCourtyard,
    description: "Dedicated Umrah specialists offering guided, comfortable journeys for families and private groups.",
    specialties: "Premium Umrah · Ramadan Umrah",
    featured: [
      { name: "VIP Umrah Experience", category: "HOT UMRAH PACKAGE", price: "$2,150", image: photos.madinah },
      { name: "Family Umrah Package", category: "FAMILY UMRAH", price: "$1,340", image: photos.tawaf },
    ],
  },
  {
    initials: "GH",
    name: "Global Hajj Services",
    location: "Chattogram, Bangladesh",
    rating: "4.9",
    reviews: 320,
    packages: 32,
    experience: 15,
    cover: photos.makkah,
    description: "Trusted pilgrimage experts delivering comfortable, guided, and spiritually meaningful journeys.",
    specialties: "Premium Hajj · Economy Hajj",
    featured: [
      { name: "Premium Hajj Package 2027", category: "PREMIUM HAJJ", price: "$5,650", image: photos.makkah },
      { name: "Family Umrah Package", category: "FAMILY UMRAH", price: "$1,390", image: photos.madinah },
    ],
  },
  {
    initials: "IT",
    name: "Nusuk Hajj Services",
    location: "Jeddah, Saudi Arabia",
    rating: "4.7",
    reviews: 154,
    packages: 16,
    experience: 8,
    cover: photos.tawaf,
    description: "Saudi-based pilgrimage experts providing premium ground services, ziyarat, and personal guidance.",
    specialties: "VIP Hajj · Customized Umrah",
    featured: [
      { name: "VIP Hajj Experience", category: "VIP HAJJ", price: "$7,900", image: photos.kaaba },
      { name: "Customized Umrah Package", category: "HOT UMRAH PACKAGE", price: "$1,720", image: photos.madinahCourtyard },
    ],
  },
];

const events = [
  { title: "Premium Umrah Group Departure", place: "Makkah & Madinah", date: "12 Jan 2027", days: "14 days", seats: 12, image: photos.madinah, category: "Premium Umrah" },
  { title: "Ramadan Umrah Departure", place: "Makkah & Madinah", date: "18 Feb 2027", days: "14 days", seats: 8, image: photos.tawaf, category: "Ramadan Umrah" },
  { title: "Family Umrah Group", place: "Makkah & Madinah", date: "08 Mar 2027", days: "12 days", seats: 16, image: photos.madinahCourtyard, category: "Family Umrah" },
  { title: "VIP Hajj Group 2027", place: "Makkah, Mina & Arafat", date: "22 May 2027", days: "40 days", seats: 10, image: photos.kaaba, category: "VIP Hajj" },
];

const guides = [
  { name: "Omar Al-Farsi", place: "Madinah, Saudi Arabia", languages: "Arabic, English", years: 9, rating: "4.9", image: photos.guide1 },
  { name: "Nadia Rahman", place: "Madinah, Saudi Arabia", languages: "English, Bengali", years: 7, rating: "4.8", image: photos.guide2 },
  { name: "Yusuf Khan", place: "Makkah, Saudi Arabia", languages: "Arabic, English, Urdu", years: 11, rating: "4.9", image: photos.guide3 },
  { name: "Hamza Noor", place: "Makkah, Saudi Arabia", languages: "Arabic, Bengali", years: 8, rating: "4.7", image: photos.guide4 },
];

function Header({ dark, toggleTheme, active = "Home" }: { dark: boolean; toggleTheme: () => void; active?: string }) {
  const [open, setOpen] = useState(false);
  const links = ["Home", "Packages", "Agencies", "Events", "Destinations", "Guides", "Blog", "About Us", ...(active === "FAQ" ? ["FAQ"] : []), ...(active === "Contact" ? ["Contact"] : [])];
  return (
    <header className="site-header" id="top">
      <div className="nav-shell">
        <a href="#top" aria-label="Hajj Solutions home"><Logo /></a>
        <nav className={open ? "open" : ""}>{links.map((link) => {
          const slug = link.toLowerCase().replace(" ", "-");
          const href = link === "Home" ? "/" : link === "Packages" ? "/packages" : link === "Agencies" ? "/agencies" : link === "Events" ? "/events" : link === "Destinations" ? "/destinations" : link === "Guides" ? "/guides" : link === "Blog" ? "/blog" : link === "About Us" ? "/about" : link === "FAQ" ? "/faq" : link === "Contact" ? "/contact" : `/#${slug}`;
          return <a key={link} className={link === active ? "active" : ""} href={href} onClick={() => setOpen(false)}>{link}</a>;
        })}</nav>
        <div className="header-actions">
          <button className="icon-button search-top" aria-label="Search"><Icon name="search" /></button>
          <button className="theme-toggle" aria-label="Toggle color theme" onClick={toggleTheme}><Icon name={dark ? "sun" : "moon"} size={17} /><span>{dark ? "Light" : "Dark"}</span></button>
          <Button variant="ghost" className="login">Log in</Button>
          <Button>Sign up</Button>
          <button className="icon-button menu-button" aria-label="Open menu" onClick={() => setOpen(!open)}><Icon name="menu" /></button>
        </div>
      </div>
    </header>
  );
}

type HomeSearchCriteria = {
  tourType: string;
  destination: string;
  cities: string[];
  departureDate: string;
  returnDate: string;
  adults: number;
  children: number;
  infants: number;
  packageCategory: string;
  priceRange: string;
  durations: string[];
  agencies: string[];
  packageTypes: string[];
};

const defaultHomeSearch: HomeSearchCriteria = {
  tourType: "Hajj & Umrah",
  destination: "Makkah & Madinah",
  cities: ["Dhaka", "Chattogram", "Sylhet"],
  departureDate: "",
  returnDate: "",
  adults: 2,
  children: 0,
  infants: 0,
  packageCategory: "",
  priceRange: "",
  durations: [],
  agencies: [],
  packageTypes: [],
};

function dateAfter(value: string) {
  const date = value ? new Date(`${value}T00:00:00`) : new Date();
  date.setDate(date.getDate() + 1);
  return date.toISOString().slice(0, 10);
}

function displayDate(value: string) {
  return value ? new Date(`${value}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Select date";
}

function SearchControl({ id, label, value, icon, open, invalid, onToggle, children }: { id: string; label: string; value: string; icon: IconName; open: boolean; invalid?: boolean; onToggle: (id: string) => void; children: ReactNode }) {
  return <div className={`search-control ${open ? "open" : ""} ${invalid ? "invalid" : ""}`}><Button variant="ghost" className="search-field" onClick={() => onToggle(open ? "" : id)}><span className="field-icon"><Icon name={icon} size={19} /></span><span><small>{label}</small><strong>{value}</strong></span><Icon name="chevron" size={15} /></Button>{open && <div className="search-popover">{children}</div>}</div>;
}

function SearchOptions({ options, selected, onSelect, multiple = false }: { options: string[]; selected: string[]; onSelect: (option: string) => void; multiple?: boolean }) {
  return <div className="search-options">{options.map((option) => <Button variant="ghost" className={selected.includes(option) ? "selected" : ""} onClick={() => onSelect(option)} key={option}><span>{multiple && selected.includes(option) && <Icon name="check" size={12} />}</span>{option}</Button>)}</div>;
}

function SearchPanel({ tab, onTabChange }: { tab: string; onTabChange: (tab: string) => void }) {
  const tabs = ["All Packages", "Hajj", "Umrah", "Premium", "Economy", "Ramadan"];
  const [criteria, setCriteria] = useState<HomeSearchCriteria>(defaultHomeSearch);
  const [open, setOpen] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);
  const today = new Date().toISOString().slice(0, 10);
  const totalTravelers = criteria.adults + criteria.children + criteria.infants;

  useEffect(() => {
    const close = (event: globalThis.MouseEvent) => {
      if (panelRef.current && event.target instanceof Node && !panelRef.current.contains(event.target)) setOpen("");
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const update = <K extends keyof HomeSearchCriteria>(key: K, value: HomeSearchCriteria[K]) => {
    setCriteria((current) => ({ ...current, [key]: value }));
    setErrors((current) => current.filter((item) => item !== key));
  };
  const toggleList = (key: "cities" | "durations" | "agencies" | "packageTypes", value: string) => {
    const selected = criteria[key];
    update(key, selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value]);
  };
  const chooseTab = (value: string) => {
    onTabChange(value);
    setCriteria((current) => ({
      ...current,
      tourType: value === "Hajj" ? "Hajj" : value === "Umrah" || value === "Ramadan" ? "Umrah" : value === "All Packages" ? "Hajj & Umrah" : current.tourType,
      packageCategory: value === "Premium" || value === "Economy" ? value : value === "All Packages" ? "" : current.packageCategory,
    }));
  };
  const resetAdvanced = () => setCriteria((current) => ({ ...current, cities: ["Dhaka", "Chattogram", "Sylhet"], priceRange: "", durations: [], agencies: [], packageTypes: [] }));
  const submit = () => {
    const invalid = [
      ...(!criteria.tourType ? ["tourType"] : []),
      ...(!criteria.destination ? ["destination"] : []),
      ...(!criteria.cities.length ? ["cities"] : []),
      ...(!criteria.departureDate ? ["departureDate"] : []),
      ...(!criteria.returnDate ? ["returnDate"] : []),
      ...(!criteria.packageCategory ? ["packageCategory"] : []),
      ...(criteria.departureDate && criteria.returnDate && criteria.returnDate <= criteria.departureDate ? ["returnDate"] : []),
    ];
    setErrors(invalid);
    if (invalid.length) return;
    const params = new URLSearchParams({
      tab,
      type: criteria.tourType,
      destination: criteria.destination,
      cities: criteria.cities.join("|"),
      departure: criteria.departureDate,
      return: criteria.returnDate,
      travelers: String(totalTravelers),
      category: criteria.packageCategory,
    });
    if (criteria.priceRange) params.set("price", criteria.priceRange);
    if (criteria.durations.length) params.set("durations", criteria.durations.join("|"));
    if (criteria.agencies.length) params.set("agencies", criteria.agencies.join("|"));
    if (criteria.packageTypes.length) params.set("packageTypes", criteria.packageTypes.join("|"));
    navigateTo(`/packages?${params.toString()}`);
  };

  const advanced = [
    { id: "priceRange", label: "Price range", active: criteria.priceRange ? 1 : 0, options: ["Under $2,000", "$2,000–$4,000", "$4,000+"], selected: criteria.priceRange ? [criteria.priceRange] : [], select: (value: string) => { update("priceRange", criteria.priceRange === value ? "" : value); setOpen(""); }, multiple: false },
    { id: "durations", label: "Duration", active: criteria.durations.length, options: ["7–10 Days", "11–14 Days", "15–20 Days", "30+ Days"], selected: criteria.durations, select: (value: string) => toggleList("durations", value), multiple: true },
    { id: "advancedCities", label: "Departure city", active: criteria.cities.length < 3 ? criteria.cities.length : 0, options: ["Dhaka", "Chattogram", "Sylhet"], selected: criteria.cities, select: (value: string) => toggleList("cities", value), multiple: true },
    { id: "agencies", label: "Agency", active: criteria.agencies.length, options: ["Al Haramain Travels", "Global Hajj Services", "Arabian Travel Services", "Noor International", "Al Madinah Tours"], selected: criteria.agencies, select: (value: string) => toggleList("agencies", value), multiple: true },
    { id: "packageTypes", label: "Package type", active: criteria.packageTypes.length, options: ["Hajj", "Umrah"], selected: criteria.packageTypes, select: (value: string) => toggleList("packageTypes", value), multiple: true },
  ];

  return (
    <div className="search-panel" ref={panelRef}>
      <div className="search-tabs">{tabs.map((item) => <Button variant="ghost" key={item} className={item === tab ? "active" : ""} onClick={() => chooseTab(item)}>{item}</Button>)}</div>
      <div className="search-fields">
        <SearchControl id="tourType" label="Tour Type" value={criteria.tourType || "Select tour type"} icon="compass" open={open === "tourType"} invalid={errors.includes("tourType")} onToggle={setOpen}><SearchOptions options={["Hajj", "Umrah", "Hajj & Umrah"]} selected={[criteria.tourType]} onSelect={(value) => { update("tourType", value); setOpen(""); }} /></SearchControl>
        <SearchControl id="destination" label="Destination" value={criteria.destination || "Select destination"} icon="location" open={open === "destination"} invalid={errors.includes("destination")} onToggle={setOpen}><SearchOptions options={["Makkah", "Madinah", "Makkah & Madinah"]} selected={[criteria.destination]} onSelect={(value) => { update("destination", value); setOpen(""); }} /></SearchControl>
        <SearchControl id="cities" label="Departure City" value={criteria.cities.length ? criteria.cities.join(", ") : "Select city"} icon="plane" open={open === "cities"} invalid={errors.includes("cities")} onToggle={setOpen}><SearchOptions options={["Dhaka", "Chattogram", "Sylhet"]} selected={criteria.cities} onSelect={(value) => toggleList("cities", value)} multiple /></SearchControl>
        <SearchControl id="departureDate" label="Departure Date" value={displayDate(criteria.departureDate)} icon="calendar" open={open === "departureDate"} invalid={errors.includes("departureDate")} onToggle={setOpen}><div className="date-popover"><TextInput type="date" min={today} value={criteria.departureDate} onChange={(event) => { update("departureDate", event.target.value); if (criteria.returnDate && criteria.returnDate <= event.target.value) update("returnDate", ""); setOpen(""); }} /></div></SearchControl>
        <SearchControl id="returnDate" label="Return Date" value={displayDate(criteria.returnDate)} icon="calendar" open={open === "returnDate"} invalid={errors.includes("returnDate")} onToggle={setOpen}><div className="date-popover"><TextInput type="date" min={dateAfter(criteria.departureDate || today)} value={criteria.returnDate} onChange={(event) => { update("returnDate", event.target.value); setOpen(""); }} /></div></SearchControl>
        <SearchControl id="travelers" label="Travelers" value={`${totalTravelers} ${totalTravelers === 1 ? "Traveler" : "Travelers"}`} icon="people" open={open === "travelers"} onToggle={setOpen}><div className="traveler-popover">{([["Adults", "adults", "Age 12+"], ["Children", "children", "Age 2–11"], ["Infants", "infants", "Under 2"]] as const).map(([label, key, hint]) => <div key={key}><span><strong>{label}</strong><small>{hint}</small></span><span><Button variant="secondary" onClick={() => update(key, Math.max(key === "adults" ? 1 : 0, criteria[key] - 1))}>−</Button><strong>{criteria[key]}</strong><Button variant="secondary" onClick={() => update(key, criteria[key] + 1)}>+</Button></span></div>)}</div></SearchControl>
        <SearchControl id="packageCategory" label="Package Category" value={criteria.packageCategory || "Premium, Economy or Family"} icon="tag" open={open === "packageCategory"} invalid={errors.includes("packageCategory")} onToggle={setOpen}><SearchOptions options={["Premium", "Economy", "Family"]} selected={[criteria.packageCategory]} onSelect={(value) => { update("packageCategory", value); setOpen(""); }} /></SearchControl>
        <Button className="search-submit" onClick={submit}><Icon name="search" size={18} />Search packages</Button>
      </div>
      <div className="advanced-filters"><span>Filter by</span>{advanced.map((filter) => <div className="advanced-filter" key={filter.id}><Button variant="ghost" className={filter.active ? "active" : ""} onClick={() => setOpen(open === filter.id ? "" : filter.id)}>{filter.label}{filter.active ? ` (${filter.active})` : ""}<Icon name="chevron" size={13} /></Button>{open === filter.id && <div className="search-popover"><SearchOptions options={filter.options} selected={filter.selected} onSelect={filter.select} multiple={filter.multiple} />{filter.selected.length > 0 && <Button variant="ghost" className="filter-clear" onClick={() => { if (filter.id === "priceRange") update("priceRange", ""); else update(filter.id === "advancedCities" ? "cities" : filter.id as "durations" | "agencies" | "packageTypes", []); }}>Clear</Button>}</div>}</div>)}{advanced.some((item) => item.active) && <Button variant="ghost" className="filter-reset" onClick={resetAdvanced}>Reset all</Button>}{errors.length > 0 && <span className="search-error">Complete the highlighted fields.</span>}</div>
    </div>
  );
}

function Hero({ tab, onTabChange }: { tab: string; onTabChange: (tab: string) => void }) {
  return (
    <section className="hero" id="home">
      <img className="hero-image" src={photos.madinah} alt="Al-Masjid an-Nabawi and the Green Dome in Madinah" />
      <div className="hero-overlay" />
      <div className="hero-pattern" />
      <div className="container hero-content">
        <span className="hero-kicker"><span />Hajj · Umrah · Faith</span>
        <h1>Answer the Call,<br /><em>Journey with Confidence</em></h1>
        <p>Compare trusted Hajj and Umrah agencies, verified pilgrimage packages, and carefully guided journeys to Makkah and Madinah.</p>
        <div className="hero-actions"><Button>Explore Hajj packages <Icon name="arrow" size={18} /></Button><Button variant="light">Explore Umrah packages</Button></div>
      </div>
      <div className="container search-wrap"><SearchPanel tab={tab} onTabChange={onTabChange} /></div>
    </section>
  );
}

function BenefitsBar() {
  const benefits = [
    ["shield", "Verified Agencies", "Trusted travel partners"],
    ["tag", "Best Price Guarantee", "Competitive tour packages"],
    ["globe", "Pilgrimage Expertise", "Focused on Hajj and Umrah"],
    ["headset", "24/7 Support", "Here whenever you need us"],
  ] as const;
  return <div className="benefits-bar"><div className="container benefits-grid">{benefits.map(([icon, title, text]) => <div className="benefit" key={title}><span><Icon name={icon} size={23} /></span><div><strong>{title}</strong><small>{text}</small></div></div>)}</div></div>;
}

function Destinations() {
  return (
    <section className="section destinations-section" id="destinations">
      <div className="container">
        <SectionHeading eyebrow="The sacred journey" title="Explore Sacred Places" text="Prepare for the holy sites at the heart of every Hajj and Umrah journey." action="Explore all sacred places" />
        <div className="destinations-grid">
          {destinations.map((item) => <article className={`destination-card ${item.className || ""}`} key={item.name}><img src={item.image} alt={`${item.name}, ${item.country}`} /><div className="destination-shade" /><span className="package-count">{item.count} packages</span><div className="destination-info"><small>{item.country}</small><h3>{item.name}</h3><a href="#packages">Explore destination <Icon name="arrow" size={16} /></a></div></article>)}
        </div>
      </div>
    </section>
  );
}

function AgencyCard({ agency }: { agency: typeof agencies[number] }) {
  const [liked, setLiked] = useState(false);
  return (
    <article className="agency-card">
      <div className="agency-cover">
        <img src={agency.cover} alt={`${agency.name} travel destinations`} />
        <div className="agency-cover-shade" />
        <span className="agency-cover-badge"><Icon name="shield" size={12} />Verified</span>
        <button className={`heart agency-heart ${liked ? "liked" : ""}`} aria-label={`Save ${agency.name}`} onClick={() => setLiked(!liked)}><Icon name="heart" size={18} /></button>
      </div>
      <div className="agency-card-body">
        <div className="agency-profile">
          <div className="agency-logo">{agency.initials}<span><Icon name="check" size={11} /></span></div>
          <div className="agency-profile-copy">
            <div className="agency-name-row"><h3>{agency.name}</h3><span className="agency-verified" title="Verified agency"><Icon name="check" size={10} /></span></div>
            <p><Icon name="location" size={13} />{agency.location}</p>
            <div className="agency-rating"><Rating score={agency.rating} /><span>{agency.reviews} reviews</span></div>
          </div>
        </div>
        <p className="agency-description">{agency.description}</p>
        <p className="agency-specialties"><Icon name="check" size={12} />{agency.specialties}</p>
        <div className="featured-packages">
          <div className="featured-packages-title"><strong>Featured packages</strong><span>From this agency</span></div>
          {agency.featured.map((item) => (
            <div className="agency-package-preview" key={item.name}>
              <img src={item.image} alt={item.name} />
              <div><span className="agency-category">{item.category}</span><strong>{item.name}</strong></div>
              <span className="agency-package-price"><small>From</small>{item.price}</span>
            </div>
          ))}
        </div>
        <div className="agency-stats">
          <span><Icon name="compass" size={16} /><span><strong>{agency.packages}</strong><small>Packages</small></span></span>
          <span><Icon name="clock" size={16} /><span><strong>{agency.experience} yrs</strong><small>Experience</small></span></span>
          <span><Icon name="star" size={16} /><span><strong>{agency.rating}/5</strong><small>Customer rating</small></span></span>
        </div>
        <Button className="explore-agency">Explore Agency <Icon name="arrow" size={16} /></Button>
      </div>
    </article>
  );
}

function Agencies() {
  const [filter, setFilter] = useState("Hajj & Umrah Agencies");
  const filters = ["Hajj Agencies", "Umrah Agencies", "Hajj & Umrah Agencies", "Premium Packages", "Economy Packages", "Ramadan Packages", "Family Packages"];
  return (
    <section className="section agencies-section" id="agencies"><div className="container">
      <SectionHeading eyebrow="Pilgrimage specialists" title="Trusted Hajj & Umrah Agencies" text="Discover verified pilgrimage agencies and compare their dedicated Hajj and Umrah packages." action="View all agencies" />
      <div className="agency-filters">{filters.map((item) => <button className={filter === item ? "active" : ""} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div>
      <div className="agency-grid">{agencies.map((agency) => <AgencyCard agency={agency} key={agency.name} />)}</div>
    </div></section>
  );
}

function Events() {
  return (
    <section className="section events-section" id="events"><div className="container">
      <SectionHeading eyebrow="Pilgrimage departures" title="Upcoming Hajj & Umrah Groups" text="Join guided group departures for Hajj, Ramadan Umrah, and family Umrah." action="View all departures" />
      <div className="event-grid">{events.map((event) => <article className="event-card" key={event.title}><div className="event-image"><img src={event.image} alt={event.title} /><span>{event.category}</span><div className="event-date"><strong>{event.date.split(" ")[0]}</strong><small>{event.date.split(" ").slice(1).join(" ")}</small></div></div><div className="event-body"><p><Icon name="location" size={15} />{event.place}</p><h3>{event.title}</h3><div className="event-facts"><span><Icon name="clock" size={15} />{event.days}</span><span><Icon name="people" size={15} />{event.seats} seats left</span></div><Button variant="secondary">View details <Icon name="arrow" size={16} /></Button></div></article>)}</div>
    </div></section>
  );
}

function WhyChoose() {
  const items = [
    ["shield", "Verified Agencies", "Travel with partners carefully reviewed by our team."],
    ["check", "Secure Booking", "A protected and dependable booking experience."],
    ["compass", "Pilgrimage Packages", "Compare premium, economy, family, and group options."],
    ["people", "Experienced Guides", "Perform each ritual with knowledgeable pilgrimage guides."],
    ["tag", "Transparent Pricing", "Clear inclusions and pricing with no surprises."],
    ["headset", "Dedicated Support", "Real assistance before, during, and after your trip."],
  ] as const;
  return (
    <section className="why-section" id="about-us"><div className="arabesque" /><div className="container why-layout"><div className="why-intro"><span className="eyebrow">The Hajj Solutions difference</span><h2>Why Choose<br /><em>Hajj Solutions?</em></h2><p>Everything you need to plan your next journey with complete confidence.</p><Button>Learn about us <Icon name="arrow" size={17} /></Button></div><div className="why-grid">{items.map(([icon, title, text], i) => <article key={title}><span className="why-number">0{i + 1}</span><span className="why-icon"><Icon name={icon} size={22} /></span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>
  );
}

function Guides() {
  return (
    <section className="section guides-section" id="guides"><div className="container">
      <SectionHeading eyebrow="Pilgrimage guidance" title="Meet Our Hajj & Umrah Guides" text="Experienced guides who support you through every ritual in Makkah and Madinah." action="View all guides" />
      <div className="guide-grid">{guides.map((guide) => <article className="guide-card" key={guide.name}><div className="guide-image"><img src={guide.image} alt={`${guide.name}, professional tour guide`} /><span className="available"><i />Available</span><Rating score={guide.rating} /></div><div className="guide-body"><h3>{guide.name}</h3><p><Icon name="location" size={14} />{guide.place}</p><div className="guide-meta"><span><small>Languages</small><strong>{guide.languages}</strong></span><span><small>Experience</small><strong>{guide.years} years</strong></span></div><Button variant="secondary">View profile</Button></div></article>)}</div>
    </div></section>
  );
}

const blogs = [
  { title: "A Complete Guide to Visiting Madinah", category: "Umrah Guide", date: "Dec 18, 2026", text: "Everything you need to know for a meaningful, comfortable visit to the radiant city.", image: photos.madinah },
  { title: "Preparing for Hajj: A Practical Checklist", category: "Hajj Guide", date: "Dec 12, 2026", text: "Essential documents, packing advice, rituals, and health guidance for your sacred journey.", image: photos.pilgrims },
  { title: "How to Choose the Right Umrah Package", category: "Package Guide", date: "Dec 04, 2026", text: "Compare hotel distance, flights, group support, and inclusions with complete confidence.", image: photos.tawaf },
];

function Blog() {
  return (
    <section className="section blog-section" id="blog"><div className="container">
      <SectionHeading eyebrow="The pilgrimage journal" title="Hajj & Umrah Guides" text="Practical guidance, ritual preparation, and trusted advice for your sacred journey." action="View all articles" />
      <div className="blog-grid">{blogs.map((post, i) => <article className={`blog-card ${i === 0 ? "blog-featured" : ""}`} key={post.title}><div className="blog-image"><img src={post.image} alt={post.title} /><span>{post.category}</span></div><div className="blog-content"><small>{post.date} · 6 min read</small><h3>{post.title}</h3><p>{post.text}</p><a href="#top">Read story <Icon name="arrow" size={16} /></a></div></article>)}</div>
    </div></section>
  );
}

function Newsletter({ title = <>Get Hajj & Umrah<br />Package Updates</>, description = "New departures, verified package offers, and practical pilgrimage guidance—delivered thoughtfully." }: { title?: ReactNode; description?: string }) {
  const [message, setMessage] = useState("");
  function submit(event: FormEvent) { event.preventDefault(); setMessage("Thank you — your next journey starts here."); }
  return (
    <section className="newsletter"><div className="newsletter-pattern" /><div className="container newsletter-inner"><div><span className="hero-kicker"><span />Prepare for the sacred journey</span><h2>{title}</h2><p>{description}</p></div><form onSubmit={submit}><label htmlFor="email">Your email address</label><div className="newsletter-field"><Icon name="mail" size={19} /><input id="email" type="email" placeholder="name@example.com" required /><Button type="submit">Subscribe <Icon name="arrow" size={17} /></Button></div><small>{message || "By subscribing, you agree to our Privacy Policy. No clutter, ever."}</small></form></div></section>
  );
}

function Footer() {
  const columns = [
    ["Explore", "Home", "Packages", "Agencies", "Events", "Destinations", "Guides", "Blog"],
    ["Sacred Places", "Makkah", "Madinah", "Masjid al-Haram", "Masjid an-Nabawi", "Mina", "Arafat"],
    ["Support", "Help Center", "Contact Us", "FAQs", "Booking Policy", "Privacy Policy", "Terms & Conditions"],
  ];
  return (
    <footer><div className="container footer-grid"><div className="footer-brand"><Logo light /><p>A dedicated marketplace connecting pilgrims with verified Hajj and Umrah agencies and trusted packages.</p><div className="socials"><button aria-label="Instagram"><Icon name="instagram" /></button><button aria-label="Facebook"><strong>f</strong></button><button aria-label="X"><strong>𝕏</strong></button></div></div>{columns.map(([title, ...links]) => <div className="footer-column" key={title}><h3>{title}</h3>{links.map((link) => <a href="#top" key={link}>{link}</a>)}</div>)}<div className="app-column"><h3>Your pilgrimage companion</h3><p>Save packages and manage your sacred journey from anywhere.</p><button className="store-badge"><span>▶</span><small>GET IT ON<strong>Google Play</strong></small></button><button className="store-badge"><span>●</span><small>Download on the<strong>App Store</strong></small></button></div></div><div className="container footer-bottom"><span>© 2026 Hajj Solutions. All rights reserved.</span><div><button>English <Icon name="chevron" size={13} /></button><button>USD <Icon name="chevron" size={13} /></button><a href="#top">Back to top ↑</a></div></div></footer>
  );
}

const listingPackages = [
  { id: 1, title: "Premium Hajj Package 2027", category: "Premium Hajj", packageClass: "Premium", type: "Hajj", destination: "Makkah & Madinah", duration: "40 Days", durationDays: 40, city: "Dhaka", date: "May 18, 2027", dateISO: "2027-05-18", returnISO: "2027-06-27", maxTravelers: 6, agency: "Al Haramain Travels", initials: "AH", rating: "4.9", reviews: 245, price: "$5,200", priceValue: 5200, hotel: "5-Star Hotels", distance: "450m from Haram", image: photos.kaaba, hot: true },
  { id: 2, title: "Economy Umrah Package", category: "Economy Umrah", packageClass: "Economy", type: "Umrah", destination: "Makkah", duration: "10 Days", durationDays: 10, city: "Dhaka", date: "Jan 12, 2027", dateISO: "2027-01-12", returnISO: "2027-01-22", maxTravelers: 8, agency: "Global Hajj Services", initials: "GH", rating: "4.8", reviews: 198, price: "$1,150", priceValue: 1150, hotel: "3-Star Hotels", distance: "900m from Haram", image: photos.makkah, hot: false },
  { id: 3, title: "Ramadan Umrah Special", category: "Ramadan Umrah", packageClass: "Premium", type: "Umrah", destination: "Makkah & Madinah", duration: "15 Days", durationDays: 15, city: "Chattogram", date: "Feb 18, 2027", dateISO: "2027-02-18", returnISO: "2027-03-05", maxTravelers: 5, agency: "Arabian Travel Services", initials: "AT", rating: "4.9", reviews: 286, price: "$2,100", priceValue: 2100, hotel: "4-Star Hotels", distance: "600m from Haram", image: photos.madinah, hot: true },
  { id: 4, title: "VIP Umrah Experience", category: "VIP Umrah", packageClass: "Premium", type: "Umrah", destination: "Makkah", duration: "12 Days", durationDays: 12, city: "Dhaka", date: "Mar 05, 2027", dateISO: "2027-03-05", returnISO: "2027-03-17", maxTravelers: 4, agency: "Noor International", initials: "NI", rating: "4.8", reviews: 164, price: "$3,500", priceValue: 3500, hotel: "5-Star Haram View", distance: "150m from Haram", image: photos.tawaf, hot: false },
  { id: 5, title: "Family Umrah Package", category: "Family Umrah", packageClass: "Family", type: "Umrah", destination: "Makkah & Madinah", duration: "14 Days", durationDays: 14, city: "Sylhet", date: "Apr 09, 2027", dateISO: "2027-04-09", returnISO: "2027-04-23", maxTravelers: 10, agency: "Al Madinah Tours", initials: "AM", rating: "4.7", reviews: 132, price: "$1,850", priceValue: 1850, hotel: "4-Star Hotels", distance: "700m from Haram", image: photos.madinahCourtyard, hot: false },
  { id: 6, title: "Standard Hajj Package 2027", category: "Standard Hajj", packageClass: "Economy", type: "Hajj", destination: "Makkah & Madinah", duration: "35 Days", durationDays: 35, city: "Dhaka", date: "May 22, 2027", dateISO: "2027-05-22", returnISO: "2027-06-26", maxTravelers: 8, agency: "Global Hajj Services", initials: "GH", rating: "4.8", reviews: 219, price: "$4,300", priceValue: 4300, hotel: "4-Star Hotels", distance: "Shuttle to Haram", image: photos.pilgrims, hot: true },
];

type ListingPackage = typeof listingPackages[number];

type ListingFilters = {
  types: string[];
  categories: string[];
  cities: string[];
  durations: string[];
  agencies: string[];
  hotels: string[];
  ratings: string[];
  verified: boolean;
  priceMin: number;
  priceMax: number;
};

type PackageSearchMeta = {
  destination: string;
  departureDate: string;
  returnDate: string;
  travelers: number;
};

const emptyListingFilters: ListingFilters = {
  types: [],
  categories: [],
  cities: [],
  durations: [],
  agencies: [],
  hotels: [],
  ratings: [],
  verified: false,
  priceMin: 900,
  priceMax: 8000,
};

function splitParam(params: URLSearchParams, key: string) {
  return params.get(key)?.split("|").filter(Boolean) ?? [];
}

function filtersFromSearch() {
  const params = new URLSearchParams(window.location.search);
  const type = params.get("type");
  const packageTypes = splitParam(params, "packageTypes");
  const price = params.get("price") ?? "";
  const category = params.get("category");
  return {
    category: params.get("tab") === "Hajj" ? "Hajj Packages" : params.get("tab") === "Umrah" ? "Umrah Packages" : params.get("tab") === "Ramadan" ? "Ramadan Umrah" : params.get("tab") === "Premium" ? "Premium Packages" : params.get("tab") === "Economy" ? "Economy Packages" : "All Packages",
    filters: {
      ...emptyListingFilters,
      types: packageTypes.length ? packageTypes : type && type !== "Hajj & Umrah" ? [type] : [],
      categories: category ? [category] : [],
      cities: splitParam(params, "cities"),
      durations: splitParam(params, "durations"),
      agencies: splitParam(params, "agencies"),
      priceMin: price === "$2,000–$4,000" ? 2000 : price === "$4,000+" ? 4000 : 900,
      priceMax: price === "Under $2,000" ? 2000 : price === "$2,000–$4,000" ? 4000 : 8000,
    } satisfies ListingFilters,
    search: {
      destination: params.get("destination") ?? "",
      departureDate: params.get("departure") ?? "",
      returnDate: params.get("return") ?? "",
      travelers: Number(params.get("travelers") ?? 0),
    } satisfies PackageSearchMeta,
  };
}

function matchesDuration(days: number, option: string) {
  if (option === "7–10 Days") return days >= 7 && days <= 10;
  if (option === "11–14 Days") return days >= 11 && days <= 14;
  if (option === "15–20 Days") return days >= 15 && days <= 20;
  if (option === "21–30 Days") return days >= 21 && days <= 30;
  return days > 30;
}

function ListingSearch() {
  const fields = [
    ["Package Type", "Hajj or Umrah", "compass"],
    ["Departure City", "Select city", "plane"],
    ["Destination", "Makkah & Madinah", "location"],
    ["Departure Date", "Select date", "calendar"],
    ["Travelers", "2 Adults", "people"],
    ["Package Category", "Economy to VIP", "tag"],
  ] as const;
  return (
    <div className="listing-search">
      {fields.map(([label, value, icon]) => <button className="listing-search-field" key={label}><span><Icon name={icon} size={18} /></span><span><small>{label}</small><strong>{value}</strong></span><Icon name="chevron" size={14} /></button>)}
      <Button><Icon name="search" size={18} />Search Packages</Button>
    </div>
  );
}

function PackagesHero() {
  return (
    <section className="packages-hero">
      <img src={photos.kaaba} alt="Pilgrims at the Holy Kaaba in Makkah" />
      <div className="packages-hero-overlay" />
      <div className="container packages-hero-content">
        <span className="hero-kicker"><span />Hajj & Umrah Packages</span>
        <h1>Find Your Perfect<br /><em>Hajj & Umrah Journey</em></h1>
        <p>Explore trusted Hajj and Umrah packages from verified travel agencies. Compare prices, discover exclusive offers, and plan your spiritual journey with confidence.</p>
        <div className="hero-actions"><Button>Explore Hajj Packages <Icon name="arrow" size={17} /></Button><Button variant="light">Explore Umrah Packages</Button></div>
      </div>
      <div className="container listing-search-wrap"><ListingSearch /></div>
    </section>
  );
}

function AgencyMini({ item }: { item: ListingPackage }) {
  return (
    <div className="listing-agency"><span>{item.initials}</span><div><small>Offered by</small><strong>{item.agency}<i><Icon name="check" size={9} /></i></strong></div><Rating score={item.rating} reviews={item.reviews} /></div>
  );
}

function FeaturedListingCard({ item }: { item: ListingPackage }) {
  const [liked, setLiked] = useState(false);
  return (
    <article className="featured-listing-card">
      <div className="featured-listing-image"><img src={item.image} alt={item.title} /><div className="featured-listing-shade" /><span className="badge">Featured</span><span className="type-badge">{item.type}</span><button className={`heart ${liked ? "liked" : ""}`} aria-label={`Save ${item.title}`} onClick={() => setLiked(!liked)}><Icon name="heart" size={18} /></button><div className="featured-listing-title"><small>{item.category}</small><h3>{item.title}</h3></div></div>
      <div className="featured-listing-body"><AgencyMini item={item} /><div className="featured-facts"><span><Icon name="clock" size={15} />{item.duration}</span><span><Icon name="plane" size={15} />{item.city}</span><span><Icon name="location" size={15} />{item.hotel}</span></div><div className="featured-price"><span><small>Starting from</small><strong>{item.price}</strong> / person</span><Button variant="secondary" onClick={() => { navigateTo("/packages/premium-14-day-umrah"); }}>View Details</Button></div></div>
    </article>
  );
}

function FilterGroup({ title, options, selected, onToggle }: { title: string; options: string[]; selected?: string[]; onToggle?: (option: string) => void }) {
  return <div className="filter-group"><Title as="h3">{title}<Icon name="chevron" size={14} /></Title>{options.map((option) => <label key={option}><TextInput type="checkbox" checked={selected ? selected.includes(option) : undefined} onChange={onToggle ? () => onToggle(option) : undefined} /><span />{option}<small>{listingPackages.filter((item) => `${item.type} ${item.category} ${item.city} ${item.agency} ${item.duration} ${item.hotel}`.includes(option.replace(" Package", "").replace(" Special", ""))).length || "—"}</small></label>)}</div>;
}

function Filters({ filters, setFilters, close, resetAll }: { filters: ListingFilters; setFilters: (filters: ListingFilters) => void; close?: () => void; resetAll?: () => void }) {
  const toggle = (key: "types" | "categories" | "cities" | "durations" | "agencies" | "hotels" | "ratings", option: string) => {
    const selected = filters[key];
    setFilters({ ...filters, [key]: selected.includes(option) ? selected.filter((item) => item !== option) : [...selected, option] });
  };
  return (
    <aside className="filter-sidebar">
      <div className="filter-title"><div><span className="eyebrow">Refine results</span><Title as="h2">Filters</Title></div>{close && <Button variant="ghost" onClick={close}>×</Button>}</div>
      <FilterGroup title="Package Type" options={["Hajj", "Umrah"]} selected={filters.types} onToggle={(option) => toggle("types", option)} />
      <FilterGroup title="Package Category" options={["Economy", "Standard", "Premium", "VIP", "Ramadan Special", "Family Package"]} selected={filters.categories} onToggle={(option) => toggle("categories", option)} />
      <FilterGroup title="Departure City" options={["Dhaka", "Chattogram", "Sylhet"]} selected={filters.cities} onToggle={(option) => toggle("cities", option)} />
      <FilterGroup title="Travel Duration" options={["7–10 Days", "11–14 Days", "15–20 Days", "21–30 Days", "30+ Days"]} selected={filters.durations} onToggle={(option) => toggle("durations", option)} />
      <FilterGroup title="Agency" options={["Al Haramain Travels", "Global Hajj Services", "Arabian Travel Services", "Noor International", "Al Madinah Tours"]} selected={filters.agencies} onToggle={(option) => toggle("agencies", option)} />
      <div className="filter-group price-filter"><Title as="h3">Price Range<Icon name="chevron" size={14} /></Title><div className="price-values"><span>${filters.priceMin.toLocaleString()}</span><span>${filters.priceMax.toLocaleString()}</span></div><TextInput type="range" min="900" max="8000" step="100" value={filters.priceMax} onChange={(event) => setFilters({ ...filters, priceMax: Number(event.target.value) })} /><div><small>Minimum</small><small>Maximum</small></div></div>
      <FilterGroup title="Hotel Category" options={["3-Star", "4-Star", "5-Star"]} selected={filters.hotels} onToggle={(option) => toggle("hotels", option)} />
      <FilterGroup title="Agency Rating" options={["5 Stars", "4+ Stars", "3+ Stars"]} selected={filters.ratings} onToggle={(option) => toggle("ratings", option)} />
      <div className="filter-group"><Title as="h3">Agency Verification<Icon name="chevron" size={14} /></Title><label><TextInput type="checkbox" checked={filters.verified} onChange={() => setFilters({ ...filters, verified: !filters.verified })} /><span />Verified Agencies Only</label></div>
      <div className="filter-actions"><Button onClick={close}>Apply Filters</Button><Button variant="ghost" onClick={resetAll ?? (() => setFilters(emptyListingFilters))}>Reset Filters</Button></div>
    </aside>
  );
}

function ListingCard({ item, selected, onCompare, view }: { item: ListingPackage; selected: boolean; onCompare: () => void; view: "grid" | "list" }) {
  const [liked, setLiked] = useState(false);
  return (
    <article className={`listing-card ${view === "list" ? "listing-card-list" : ""}`}>
      <div className="listing-card-image"><img src={item.image} alt={item.title} /><span className="badge">{item.category}</span>{item.hot && <span className="hot-badge">Hot package</span>}<button className={`heart ${liked ? "liked" : ""}`} aria-label={`Save ${item.title}`} onClick={() => setLiked(!liked)}><Icon name="heart" size={18} /></button></div>
      <div className="listing-card-content">
        <div className="listing-type-row"><span>{item.type} Package</span><Rating score={item.rating} reviews={item.reviews} /></div>
        <h3>{item.title}</h3>
        <div className="listing-facts"><span><Icon name="clock" size={14} />{item.duration}</span><span><Icon name="plane" size={14} />From {item.city}</span><span><Icon name="calendar" size={14} />{item.date}</span><span><Icon name="star" size={14} />{item.hotel}</span><span><Icon name="location" size={14} />{item.distance}</span></div>
        <AgencyMini item={item} />
        <div className="listing-card-footer"><div><small>Starting from</small><strong>{item.price}</strong><span> USD / person</span></div><div><button className={`compare-button ${selected ? "selected" : ""}`} onClick={onCompare}><span>{selected && <Icon name="check" size={11} />}</span>{selected ? "Selected" : "Compare"}</button><Button onClick={() => { navigateTo("/packages/premium-14-day-umrah"); }}>View Details</Button></div></div>
      </div>
    </article>
  );
}

function JourneyBanner() {
  return (
    <div className="journey-banner"><img src={photos.madinah} alt="Al-Masjid an-Nabawi in Madinah" /><div /><section><span className="eyebrow">Plan with confidence</span><h2>Your Spiritual Journey Starts Here</h2><p>Explore Hajj and Umrah packages designed to help you plan your pilgrimage with trusted travel agencies.</p><div><Button>Explore Hajj</Button><Button variant="light">Explore Umrah</Button></div></section></div>
  );
}

function ComparisonBar({ selected, clear }: { selected: ListingPackage[]; clear: () => void }) {
  if (!selected.length) return null;
  return (
    <div className="comparison-bar"><div className="comparison-inner"><div className="comparison-packages">{selected.map((item) => <div key={item.id}><img src={item.image} alt="" /><span><small>Selected</small><strong>{item.title}</strong></span></div>)}</div><div className="comparison-actions"><button onClick={clear}>Clear selection</button><Button>Compare {selected.length} Packages <Icon name="arrow" size={16} /></Button></div></div></div>
  );
}

function PackagesEmpty({ reset }: { reset: () => void }) {
  return <div className="packages-empty"><span><Icon name="search" size={29} /></span><Title as="h3">No matching packages found</Title><p>Try adjusting your dates, traveler count, category, or filters to explore other Hajj and Umrah options.</p><Button onClick={reset}>Clear Search & Filters</Button></div>;
}

function PackagesPage({ dark, toggleTheme }: { dark: boolean; toggleTheme: () => void }) {
  const categories = ["All Packages", "Hajj Packages", "Umrah Packages", "Ramadan Umrah", "Family Umrah", "Economy Packages", "Premium Packages", "VIP Packages"];
  const initial = filtersFromSearch();
  const [category, setCategory] = useState(initial.category);
  const [filters, setFilters] = useState<ListingFilters>(initial.filters);
  const [searchMeta, setSearchMeta] = useState<PackageSearchMeta>(initial.search);
  const [selected, setSelected] = useState<number[]>([]);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sort, setSort] = useState("Recommended");
  function toggleCompare(id: number) { setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : current.length < 3 ? [...current, id] : current); }
  const reset = () => {
    setCategory("All Packages");
    setFilters(emptyListingFilters);
    setSearchMeta({ destination: "", departureDate: "", returnDate: "", travelers: 0 });
    window.history.replaceState({}, "", "/packages");
  };
  const filteredPackages = listingPackages.filter((item) => {
    const categoryMatch = category === "All Packages"
      || (category === "Hajj Packages" && item.type === "Hajj")
      || (category === "Umrah Packages" && item.type === "Umrah")
      || (category === "Ramadan Umrah" && item.category.includes("Ramadan"))
      || (category === "Family Umrah" && item.category.includes("Family"))
      || (category === "Economy Packages" && item.packageClass === "Economy")
      || (category === "Premium Packages" && item.packageClass === "Premium")
      || (category === "VIP Packages" && item.category.includes("VIP"));
    const selectedCategoryMatch = !filters.categories.length || filters.categories.some((value) => item.category.includes(value.replace(" Special", "").replace(" Package", "")) || item.packageClass === value);
    const ratingThreshold = filters.ratings.length ? Math.max(...filters.ratings.map((value) => Number.parseInt(value))) : 0;
    return categoryMatch
      && (!filters.types.length || filters.types.includes(item.type))
      && selectedCategoryMatch
      && (!filters.cities.length || filters.cities.includes(item.city))
      && (!filters.durations.length || filters.durations.some((value) => matchesDuration(item.durationDays, value)))
      && (!filters.agencies.length || filters.agencies.includes(item.agency))
      && (!filters.hotels.length || filters.hotels.some((value) => item.hotel.startsWith(value)))
      && Number(item.rating) >= ratingThreshold
      && item.priceValue >= filters.priceMin
      && item.priceValue <= filters.priceMax
      && (!searchMeta.destination || (searchMeta.destination === "Makkah & Madinah" ? item.destination === searchMeta.destination : item.destination.includes(searchMeta.destination)))
      && (!searchMeta.departureDate || item.dateISO === searchMeta.departureDate)
      && (!searchMeta.returnDate || item.returnISO === searchMeta.returnDate)
      && (!searchMeta.travelers || item.maxTravelers >= searchMeta.travelers);
  });
  const visiblePackages = [...filteredPackages].sort((a, b) => sort === "Lowest Price" ? a.priceValue - b.priceValue : sort === "Highest Price" ? b.priceValue - a.priceValue : sort === "Highest Rated" ? Number(b.rating) - Number(a.rating) : sort === "Shortest Duration" ? a.durationDays - b.durationDays : sort === "Newest Packages" ? b.dateISO.localeCompare(a.dateISO) : Number(b.hot) - Number(a.hot));
  const compared = listingPackages.filter((item) => selected.includes(item.id));
  return (
    <div className="app packages-page">
      <Header dark={dark} toggleTheme={toggleTheme} active="Packages" />
      <main>
        <PackagesHero />
        <section className="category-strip"><div className="container">{categories.map((item, index) => <Button variant="secondary" className={category === item ? "active" : ""} onClick={() => setCategory(item)} key={item}><Icon name={index === 0 ? "grid" : index % 2 ? "compass" : "location"} size={16} />{item}</Button>)}</div></section>
        {visiblePackages.length > 0 && <section className="section featured-listing"><div className="container"><SectionHeading eyebrow="Handpicked pilgrimages" title="Featured Hajj & Umrah Packages" text="Explore selected packages from verified agencies specializing in Hajj and Umrah services." action="View all packages" /><div className="featured-listing-grid">{visiblePackages.slice(0, 3).map((item) => <FeaturedListingCard item={item} key={item.id} />)}</div></div></section>}
        <section className="section all-packages-section"><div className="container">
          <div className="listing-section-head"><div><span className="eyebrow">Compare with confidence</span><Title as="h2">Explore All Hajj & Umrah Packages</Title><p>Find a package that matches your travel preferences and budget.</p></div><strong>Showing {visiblePackages.length} {visiblePackages.length === 1 ? "package" : "packages"}</strong></div>
          <div className="mobile-filter-row"><Button variant="secondary" onClick={() => setFilterOpen(true)}><Icon name="sliders" size={17} />Filters</Button><span>{visiblePackages.length} packages</span></div>
          <div className="packages-layout"><Filters filters={filters} setFilters={setFilters} resetAll={reset} /><div className="listing-results">
            <div className="listing-toolbar"><div><span>Sort by</span><SelectInput aria-label="Sort packages" value={sort} onChange={(event) => setSort(event.target.value)}><option>Recommended</option><option>Lowest Price</option><option>Highest Price</option><option>Highest Rated</option><option>Shortest Duration</option><option>Newest Packages</option></SelectInput></div><div><Button variant="ghost" className={view === "grid" ? "active" : ""} onClick={() => setView("grid")}><Icon name="grid" size={17} /></Button><Button variant="ghost" className={view === "list" ? "active" : ""} onClick={() => setView("list")}><Icon name="list" size={18} /></Button></div></div>
            {visiblePackages.length ? <><div className={`listing-grid ${view === "list" ? "list-view" : ""}`}>{visiblePackages.map((item) => <ListingCard item={item} view={view} selected={selected.includes(item.id)} onCompare={() => toggleCompare(item.id)} key={item.id} />)}</div><JourneyBanner /><div className="pagination"><Button variant="ghost">Previous</Button><Button className="active">1</Button><Button variant="ghost">Next</Button><label>Show <SelectInput defaultValue="12"><option>12</option><option>24</option><option>48</option></SelectInput></label></div></> : <PackagesEmpty reset={reset} />}
          </div></div>
        </div></section>
        <Newsletter title={<>Get the Latest<br />Hajj & Umrah Offers</>} description="Receive updates about new packages, seasonal offers, and trusted pilgrimage information." />
      </main>
      <Footer />
      {filterOpen && <div className="filter-drawer"><Button variant="ghost" className="drawer-backdrop" onClick={() => setFilterOpen(false)}><span className="sr-only">Close filters</span></Button><div><Filters filters={filters} setFilters={setFilters} close={() => setFilterOpen(false)} resetAll={reset} /></div></div>}
      <ComparisonBar selected={compared} clear={() => setSelected([])} />
    </div>
  );
}

const itinerary = [
  ["Departure from Dhaka", "Airport check-in, flight departure, and arrival assistance from the pilgrimage coordination team."],
  ["Arrival in Madinah", "Private group transfer, hotel check-in, rest, and an evening visit to Al-Masjid an-Nabawi."],
  ["Explore Madinah", "Guided visits to significant religious sites, with time for prayer and reflection."],
  ["Madinah to Makkah", "Enter Ihram, travel by air-conditioned coach to Makkah, and check in near the Haram."],
  ["Umrah Preparation", "A detailed briefing on the rites of Umrah with practical guidance from the group scholar."],
  ["Perform Umrah", "Perform Tawaf and Sa'i with assistance from experienced group coordinators."],
  ["Spiritual Activities", "A flexible day for prayers, Quran recitation, rest, and personal worship at Masjid al-Haram."],
  ["Makkah Exploration", "Visit selected sacred sites around Makkah, subject to the confirmed group schedule."],
  ["Guided Religious Visits", "Participate in organized group activities and educational sessions."],
  ["Personal Worship", "Free time for prayers, reflection, and rest near Masjid al-Haram."],
  ["Group Activities", "Join scheduled group worship and a practical question-and-answer session."],
  ["Shopping and Leisure", "Optional personal activities and time to prepare gifts and essentials for departure."],
  ["Departure Preparation", "Complete hotel checkout, luggage coordination, and final departure briefing."],
  ["Return to Dhaka", "Airport transfer, return flight, and arrival assistance in Dhaka."],
];

function DetailGallery() {
  const [open, setOpen] = useState(false);
  const gallery = [photos.kaaba, photos.madinah, photos.hotelRoom, photos.hotelExterior, photos.pilgrimTravel];
  return (
    <>
      <div className="detail-gallery">{gallery.map((image, index) => <button key={image} onClick={() => setOpen(true)}><img src={image} alt={index === 0 ? "The Holy Kaaba and pilgrims" : "Umrah package gallery"} />{index === 4 && <span>+18 photos</span>}</button>)}<Button variant="light" className="view-gallery" onClick={() => setOpen(true)}><Icon name="grid" size={16} />View All Photos</Button></div>
      {open && <div className="gallery-modal"><button className="gallery-close" onClick={() => setOpen(false)} aria-label="Close gallery">×</button><img src={photos.kaaba} alt="The Holy Kaaba full-screen gallery view" /><span>1 / 22</span></div>}
    </>
  );
}

function DetailHero() {
  const [liked, setLiked] = useState(false);
  return (
    <>
      <div className="detail-breadcrumb"><div className="container"><a href="/">Home</a><span>›</span><a href="/packages">Packages</a><span>›</span><a href="/packages">Umrah Packages</a><span>›</span><strong>Premium 14-Day Umrah</strong></div></div>
      <section className="detail-hero"><div className="container detail-hero-grid"><div className="detail-hero-image"><img src={photos.tawaf} alt="Pilgrims performing Tawaf around the Holy Kaaba" /><span className="detail-category">Premium Umrah</span></div><div className="detail-hero-copy"><span className="eyebrow">A carefully guided sacred journey</span><h1>Premium 14-Day<br />Umrah Package</h1><p>Experience a comfortable and memorable spiritual journey with carefully selected accommodation and professional travel assistance.</p><div className="detail-rating"><Rating score="4.9" reviews={245} /><span>Excellent</span></div><div className="detail-hero-facts"><span><Icon name="clock" size={17} /><small>Duration</small><strong>14 Days</strong></span><span><Icon name="location" size={17} /><small>Destination</small><strong>Makkah & Madinah</strong></span><span><Icon name="plane" size={17} /><small>Departure</small><strong>Dhaka</strong></span></div><div className="detail-agency-row"><span className="detail-agency-logo">AH</span><span><small>Package provided by</small><strong>Al Haramain Travels <i><Icon name="check" size={10} /></i></strong></span></div><div className="detail-hero-bottom"><div><small>Starting from</small><strong>$1,850</strong><span> / person</span></div><Button onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}>Book This Package <Icon name="arrow" size={17} /></Button></div><div className="detail-social-actions"><button><Icon name="arrow" size={16} />Share</button><button className={liked ? "liked" : ""} onClick={() => setLiked(!liked)}><Icon name="heart" size={16} />{liked ? "Saved" : "Save"}</button></div></div></div></section>
    </>
  );
}

function QuickInfo() {
  const items = [["clock", "Duration", "14 Days"], ["plane", "Departure", "Dhaka"], ["location", "Destination", "Makkah & Madinah"], ["compass", "Package Type", "Umrah"], ["star", "Accommodation", "4-Star Hotel"], ["people", "Availability", "Limited Seats"]] as const;
  return <div className="detail-quick"><div className="container">{items.map(([icon, label, value]) => <div key={label}><span><Icon name={icon} size={19} /></span><p><small>{label}</small><strong>{value}</strong></p></div>)}</div></div>;
}

function DetailSectionNav() {
  return <nav className="detail-section-nav"><div className="container">{["Overview", "Itinerary", "Hotels", "Inclusions", "Agency", "Reviews"].map((item, index) => <a className={index === 0 ? "active" : ""} href={`#${item.toLowerCase()}`} key={item}>{item}</a>)}</div></nav>;
}

function OverviewSection() {
  const specs = [["clock", "Package duration", "14 days / 13 nights"], ["plane", "Departure location", "Hazrat Shahjalal Airport"], ["location", "Arrival airport", "Madinah Airport"], ["globe", "Destination", "Makkah & Madinah"], ["people", "Group size", "Up to 32 pilgrims"], ["star", "Accommodation", "Carefully selected 4-star"], ["compass", "Transportation", "Private air-conditioned coach"], ["headset", "Travel assistance", "24/7 group coordinator"]] as const;
  const highlights = ["Visit Makkah and Madinah", "Stay in carefully selected hotels", "Organized group transportation", "Assistance throughout the journey", "Experienced tour coordinators"];
  return (
    <section className="detail-card detail-overview" id="overview"><span className="eyebrow">Everything at a glance</span><h2>Package Overview</h2><p>Discover a carefully organized Umrah journey that combines spiritual experiences with comfortable accommodation and convenient travel arrangements.</p><div className="overview-specs">{specs.map(([icon, label, value]) => <div key={label}><span><Icon name={icon} size={18} /></span><p><small>{label}</small><strong>{value}</strong></p></div>)}</div><div className="package-highlights"><h3>Package Highlights</h3><div>{highlights.map((item) => <span key={item}><i><Icon name="check" size={12} /></i>{item}</span>)}</div></div></section>
  );
}

function ItinerarySection() {
  const [expanded, setExpanded] = useState(0);
  return (
    <section className="detail-card itinerary-section" id="itinerary"><span className="eyebrow">A thoughtfully paced pilgrimage</span><h2>Your Journey, Day by Day</h2><p>Every day is planned to balance worship, guidance, rest, and meaningful visits.</p><div className="itinerary-timeline">{itinerary.map(([title, description], index) => <article className={expanded === index ? "open" : ""} key={title}><span className="timeline-day"><small>Day</small>{String(index + 1).padStart(2, "0")}</span><button onClick={() => setExpanded(expanded === index ? -1 : index)}><span><strong>{title}</strong><small>{expanded === index ? description : index < 3 ? description : "View day details and planned activities"}</small></span><i>{expanded === index ? "−" : "+"}</i></button></article>)}</div><small className="itinerary-note">The itinerary is sample content and may change based on flight schedules, local conditions, and the final package configuration.</small></section>
  );
}

function HotelsSection() {
  const hotels = [
    { city: "Makkah", name: "Dar Al Tawhid Intercontinental", distance: "450m from Masjid al-Haram", image: photos.hotelExterior, room: "Deluxe quad-sharing room", amenities: "Breakfast · Wi-Fi · Shuttle" },
    { city: "Madinah", name: "Anwar Al Madinah Mövenpick", distance: "350m from Al-Masjid an-Nabawi", image: photos.hotelRoom, room: "Superior quad-sharing room", amenities: "Breakfast · Wi-Fi · Concierge" },
  ];
  return <section className="detail-card" id="hotels"><span className="eyebrow">Rest close to the sacred mosques</span><h2>Accommodation & Hotels</h2><p>Comfortable sample accommodation selected for convenient access and dependable service.</p><div className="hotel-grid">{hotels.map((hotel) => <article key={hotel.city}><div className="hotel-image"><img src={hotel.image} alt={`${hotel.name} sample accommodation`} /><span>{hotel.city}</span></div><div className="hotel-content"><div><h3>{hotel.name}</h3><Rating score="4.8" /></div><p><Icon name="location" size={14} />{hotel.distance}</p><div className="hotel-details"><span><small>Room type</small><strong>{hotel.room}</strong></span><span><small>Included amenities</small><strong>{hotel.amenities}</strong></span></div><Button variant="secondary">View Hotel Details</Button></div></article>)}</div><small className="sample-note">Hotel names and distances are editable sample data and remain subject to final agency confirmation.</small></section>;
}

function InclusionsSection() {
  const included = ["Return flight", "Hotel accommodation", "Airport transfers", "Group transportation", "Visa assistance, where applicable", "Tour coordinator", "Selected guided visits"];
  const excluded = ["Personal expenses", "Optional activities", "Additional meals not specified", "Excess baggage fees", "Travel insurance, if not included"];
  return <section id="inclusions"><div className="include-grid"><article className="detail-card"><span className="eyebrow">Covered by your package</span><h2>What's Included</h2>{included.map((item) => <p key={item}><i><Icon name="check" size={13} /></i>{item}</p>)}</article><article className="detail-card exclusion-card"><span className="eyebrow">Plan separately</span><h2>What's Not Included</h2>{excluded.map((item) => <p key={item}><i>×</i>{item}</p>)}</article></div></section>;
}

function PricingSection() {
  const [selected, setSelected] = useState("Premium");
  const options = [
    ["Economy", "$1,250", "3-star · Quad room", "Flights, visa support, transfers"],
    ["Standard", "$1,550", "4-star · Quad room", "Breakfast and guided visits"],
    ["Premium", "$1,850", "4-star · Triple room", "Closer hotels and full assistance"],
    ["VIP", "$2,750", "5-star · Double room", "Haram view and private transfers"],
  ];
  return <section className="detail-card pricing-section"><span className="eyebrow">Choose your comfort level</span><h2>Package Pricing</h2><p>Select an option that suits your accommodation preferences. Final prices depend on travel dates and confirmed availability.</p><div className="pricing-grid">{options.map(([name, price, room, services]) => <article className={selected === name ? "selected" : ""} key={name}><span>{name === "Premium" ? "Most popular" : `${name} option`}</span><h3>{name}</h3><strong>{price}<small> / person</small></strong><p>{room}</p><p>{services}</p><Button variant={selected === name ? "primary" : "secondary"} onClick={() => setSelected(name)}>Select Package</Button></article>)}</div><div className="pricing-note"><Icon name="shield" size={19} /><span><strong>Flexible payment support</strong><small>Secure your place with a 30% deposit. Child pricing and private room supplements are available on request.</small></span></div></section>;
}

function BookingPanel() {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  return <aside className="booking-panel" id="booking"><span className="eyebrow">Reserve your journey</span><p>Starting from</p><h2>$1,850 <small>/ person</small></h2><div className="booking-fields"><label>Departure Date<button><Icon name="calendar" size={16} />18 February 2027<Icon name="chevron" size={13} /></button></label><div><label>Adults<select value={adults} onChange={(event) => setAdults(Number(event.target.value))}><option>1</option><option>2</option><option>3</option><option>4</option></select></label><label>Children<select value={children} onChange={(event) => setChildren(Number(event.target.value))}><option>0</option><option>1</option><option>2</option></select></label></div><label>Room Type<select><option>Quad sharing</option><option>Triple sharing</option><option>Double room</option></select></label><label>Package Category<select><option>Premium</option><option>Standard</option><option>VIP</option></select></label></div><div className="booking-summary"><span><small>Travelers</small><strong>{adults + children} guests</strong></span><span><small>Selected package</small><strong>Premium</strong></span><span><small>Departure</small><strong>18 Feb 2027</strong></span><span className="booking-total"><small>Estimated total</small><strong>${(adults * 1850 + children * 1295).toLocaleString()}</strong></span></div><Button>Book Now <Icon name="arrow" size={17} /></Button><Button variant="secondary"><Icon name="headset" size={16} />Contact Agency</Button><p className="booking-note"><Icon name="shield" size={14} />Final availability and pricing are subject to confirmation by the travel agency.</p></aside>;
}

function AgencyDetails() {
  return <section className="detail-card agency-detail" id="agency"><div className="agency-detail-cover"><img src={photos.madinah} alt="Al Haramain Travels pilgrimage services" /><span>Package Provided By</span></div><div className="agency-detail-profile"><span className="agency-detail-logo">AH<i><Icon name="check" size={11} /></i></span><div><span className="eyebrow">Verified Hajj & Umrah agency</span><h2>Al Haramain Travels</h2><p><Icon name="location" size={14} />Dhaka, Bangladesh</p></div><Rating score="4.9" reviews={245} /></div><p>Al Haramain Travels has supported pilgrims with carefully organized Hajj and Umrah journeys, attentive coordination, and dependable ground assistance for more than twelve years.</p><div className="agency-detail-stats"><span><strong>12+</strong><small>Years experience</small></span><span><strong>24</strong><small>Hajj & Umrah packages</small></span><span><strong>4.9/5</strong><small>Traveler rating</small></span></div><div className="agency-detail-actions"><Button>Explore Agency <Icon name="arrow" size={16} /></Button><Button variant="secondary">Contact Agency</Button></div></section>;
}

function ReviewsSection() {
  const reviews = [
    ["MR", "Mahmud Rahman", "A deeply organized and peaceful journey", "The hotels were comfortable, the coordinators were always available, and every important step was explained clearly.", "18 Mar 2026"],
    ["SA", "Samira Ahmed", "Excellent support for our family", "Our family felt cared for from Dhaka to Madinah and Makkah. Transportation and group communication were very dependable.", "02 Feb 2026"],
  ];
  return <section className="detail-card reviews-section" id="reviews"><div className="reviews-head"><div><span className="eyebrow">Verified pilgrim experiences</span><h2>Traveler Reviews</h2></div><Button variant="secondary">Write a Review</Button></div><div className="review-summary"><div><strong>4.9</strong><Rating score="4.9" /><small>245 verified reviews</small></div><div>{[["5", 92], ["4", 6], ["3", 2], ["2", 0], ["1", 0]].map(([stars, percent]) => <span key={stars}><small>{stars} stars</small><progress value={Number(percent)} max="100" /><small>{percent}%</small></span>)}</div></div><div className="review-list">{reviews.map(([initials, name, title, text, date]) => <article key={name}><div className="review-author"><span>{initials}</span><div><strong>{name}</strong><small><Icon name="check" size={10} />Verified booking</small></div><time>{date}</time></div><Rating score="5.0" /><h3>{title}</h3><p>{text}</p></article>)}</div></section>;
}

function FAQSection() {
  const faqs = [
    ["What is included in this package?", "The package includes return flights, accommodation, airport transfers, group transportation, visa assistance where applicable, and pilgrimage coordination."],
    ["How can I book this Umrah package?", "Select your preferred departure date, traveler count, room type, and package category, then submit the booking request for agency confirmation."],
    ["What documents are required?", "A valid passport, recent photographs, vaccination evidence where required, and other documents requested by Saudi authorities or the agency."],
    ["Can I choose my hotel room?", "Yes. Quad, triple, and double room options may be requested, subject to availability and an applicable supplement."],
    ["Are flights included?", "Return economy flights are included in this sample package unless a selected configuration states otherwise."],
    ["Can I cancel or modify my booking?", "Changes and cancellations follow the confirmed agency policy and may depend on airline, visa, and hotel conditions."],
    ["How can I contact the travel agency?", "Use the Contact Agency button to send an inquiry directly to Al Haramain Travels."],
  ];
  const [open, setOpen] = useState(0);
  return <section className="faq-section"><div className="faq-intro"><span className="eyebrow">Helpful answers before you book</span><h2>Frequently Asked Questions</h2><p>Find clear answers about booking, documents, accommodation, and package conditions.</p></div><div>{faqs.map(([question, answer], index) => <article className={open === index ? "open" : ""} key={question}><button onClick={() => setOpen(open === index ? -1 : index)}><strong>{question}</strong><span>{open === index ? "−" : "+"}</span></button>{open === index && <p>{answer}</p>}</article>)}</div></section>;
}

function PackageDetailsPage({ dark, toggleTheme }: { dark: boolean; toggleTheme: () => void }) {
  return <div className="app package-details-page"><Header dark={dark} toggleTheme={toggleTheme} active="Packages" /><main><DetailHero /><section className="container detail-gallery-wrap"><DetailGallery /></section><QuickInfo /><DetailSectionNav /><div className="container detail-layout"><div className="detail-main"><OverviewSection /><ItinerarySection /><HotelsSection /><InclusionsSection /><PricingSection /><AgencyDetails /><ReviewsSection /></div><div className="detail-aside"><BookingPanel /></div></div><section className="section related-section"><div className="container"><SectionHeading eyebrow="Continue exploring" title="You May Also Like" text="Other verified Hajj and Umrah packages selected for your spiritual journey." action="View all packages" /><div className="related-grid">{listingPackages.slice(1, 5).map((item) => <ListingCard item={item} selected={false} onCompare={() => {}} view="grid" key={item.id} />)}</div></div></section><section className="section faq-wrap"><div className="container"><FAQSection /></div></section><Newsletter /></main><Footer /><div className="mobile-booking-bar"><span><small>Starting from</small><strong>$1,850</strong> / person</span><Button onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}>Book Now</Button></div></div>;
}

const directoryAgencies = [
  {
    id: 1, initials: "AH", name: "Al Haramain Travels", location: "Dhaka, Bangladesh", rating: "4.9", reviews: 245, experience: 12, totalPackages: 24, cover: photos.madinah, specialties: ["Hajj", "Umrah", "Premium Umrah"], featured: true,
    description: "Providing organized Hajj and Umrah travel services with attentive guidance, comfortable accommodation, and experienced group coordinators.",
    packages: [{ title: "Premium Umrah Package", type: "Premium Umrah", duration: "14 Days", price: "$1,850", image: photos.tawaf }, { title: "Hajj Special Package", type: "Hot Hajj Package", duration: "40 Days", price: "$5,200", image: photos.kaaba }],
  },
  {
    id: 2, initials: "NI", name: "Noor International", location: "Chattogram, Bangladesh", rating: "4.8", reviews: 186, experience: 9, totalPackages: 18, cover: photos.madinahCourtyard, specialties: ["Umrah", "Family Umrah", "Ramadan Umrah"], featured: true,
    description: "Family-focused Umrah specialists known for thoughtful Ramadan departures, dependable support, and carefully selected hotels.",
    packages: [{ title: "Ramadan Umrah Special", type: "Ramadan Special", duration: "15 Days", price: "$2,100", image: photos.madinah }, { title: "Family Umrah Package", type: "Family Umrah", duration: "14 Days", price: "$1,850", image: photos.haram }],
  },
  {
    id: 3, initials: "GH", name: "Global Hajj Services", location: "Dhaka, Bangladesh", rating: "4.9", reviews: 320, experience: 15, totalPackages: 32, cover: photos.kaaba, specialties: ["Hajj", "Umrah", "VIP Packages"], featured: true,
    description: "Experienced pilgrimage professionals delivering premium Hajj operations, dedicated scholars, and complete ground assistance.",
    packages: [{ title: "Premium Hajj Package", type: "Hot Hajj Package", duration: "40 Days", price: "$5,650", image: photos.pilgrims }, { title: "VIP Umrah Experience", type: "Premium Umrah", duration: "12 Days", price: "$3,500", image: photos.tawaf }],
  },
  {
    id: 4, initials: "AM", name: "Al Madinah Tours", location: "Sylhet, Bangladesh", rating: "4.7", reviews: 154, experience: 8, totalPackages: 16, cover: photos.madinahPortrait, specialties: ["Umrah", "Family Umrah"], featured: false,
    description: "Accessible Umrah journeys with caring group leaders, family-friendly itineraries, and clear package inclusions.",
    packages: [{ title: "Economy Umrah Package", type: "Economy Umrah", duration: "10 Days", price: "$1,150", image: photos.makkah }, { title: "Family Umrah Package", type: "Family Umrah", duration: "14 Days", price: "$1,850", image: photos.madinah }],
  },
  {
    id: 5, initials: "AT", name: "Arabian Horizon Travels", location: "Dubai, UAE", rating: "4.8", reviews: 210, experience: 11, totalPackages: 22, cover: photos.makkah, specialties: ["Hajj", "Umrah", "Luxury Umrah"], featured: false,
    description: "Premium Hajj and Umrah services with luxury Haram-side stays, private transfers, and personal pilgrimage assistance.",
    packages: [{ title: "Luxury Umrah Package", type: "Premium Umrah", duration: "12 Days", price: "$3,250", image: photos.hotelExterior }, { title: "Premium Hajj Package", type: "Hot Hajj Package", duration: "38 Days", price: "$6,100", image: photos.kaaba }],
  },
  {
    id: 6, initials: "MT", name: "Madinah Travel Services", location: "Dhaka, Bangladesh", rating: "4.8", reviews: 175, experience: 10, totalPackages: 20, cover: photos.madinahCourtyard, specialties: ["Umrah", "Ramadan Umrah"], featured: false,
    description: "Reliable year-round Umrah departures with strong Madinah support, guided visits, and responsive traveler care.",
    packages: [{ title: "Ramadan Umrah Package", type: "Ramadan Special", duration: "15 Days", price: "$2,050", image: photos.madinah }, { title: "14-Day Umrah Package", type: "Premium Umrah", duration: "14 Days", price: "$1,650", image: photos.tawaf }],
  },
];

type DirectoryAgency = typeof directoryAgencies[number];

function AgencyDirectoryHero() {
  return <><div className="directory-breadcrumb"><div className="container"><a href="/">Home</a><span>›</span><strong>Agencies</strong></div></div><section className="directory-hero"><img src={photos.madinah} alt="Al-Masjid an-Nabawi in Madinah" /><div className="directory-hero-overlay" /><div className="directory-pattern" /><div className="container directory-hero-content"><span className="hero-kicker"><span />Trusted Hajj & Umrah Agencies</span><h1>Find Your Trusted Hajj & Umrah<br /><em>Travel Agency</em></h1><p>Explore verified travel agencies, discover exclusive pilgrimage packages, and find the right travel partner for your spiritual journey.</p><form className="directory-search" onSubmit={(event) => event.preventDefault()}><Icon name="search" size={20} /><input aria-label="Search agencies" placeholder="Search agencies by name, location, or package..." /><Button type="submit">Search Agencies</Button></form></div></section></>;
}

function DirectoryPackagePreview({ item }: { item: DirectoryAgency["packages"][number] }) {
  return <div className="directory-package-preview"><img src={item.image} alt={item.title} /><div><span>{item.type}</span><strong>{item.title}</strong><small><Icon name="clock" size={11} />{item.duration}</small></div><p><small>From</small><strong>{item.price}</strong></p></div>;
}

function DirectoryAgencyCard({ agency, featured = false, view = "grid" }: { agency: DirectoryAgency; featured?: boolean; view?: "grid" | "list" }) {
  const [liked, setLiked] = useState(false);
  return <article className={`directory-card ${featured ? "directory-card-featured" : ""} ${view === "list" ? "directory-card-list" : ""}`}><div className="directory-cover"><img src={agency.cover} alt={`${agency.name} Hajj and Umrah services`} /><div /><span className="directory-verified"><Icon name="shield" size={12} />Verified Agency</span>{featured && <span className="directory-featured-label">Featured Partner</span>}<button className={`heart ${liked ? "liked" : ""}`} onClick={() => setLiked(!liked)} aria-label={`Save ${agency.name}`}><Icon name="heart" size={18} /></button></div><div className="directory-card-body"><div className="directory-identity"><span className="directory-logo">{agency.initials}<i><Icon name="check" size={10} /></i></span><div><h3>{agency.name}<i><Icon name="check" size={9} /></i></h3><p><Icon name="location" size={13} />{agency.location}</p><span><Rating score={agency.rating} /><small>{agency.reviews} reviews</small></span></div></div><p className="directory-description">{agency.description}</p><div className="directory-specialties">{agency.specialties.map((item) => <span key={item}>{item}</span>)}</div><div className="directory-packages"><div><strong>Featured Packages</strong><small>Handpicked pilgrimages</small></div>{agency.packages.map((item) => <DirectoryPackagePreview item={item} key={item.title} />)}</div><div className="directory-stats"><span><Icon name="compass" size={16} /><strong>{agency.totalPackages}</strong><small>Packages</small></span><span><Icon name="clock" size={16} /><strong>{agency.experience} yrs</strong><small>Experience</small></span><span><Icon name="star" size={16} /><strong>{agency.rating}/5</strong><small>Rating</small></span></div><div className="directory-actions"><Button onClick={() => { navigateTo("/agencies/al-noor-hajj-umrah"); }}>Explore Agency <Icon name="arrow" size={15} /></Button><Button variant="secondary">View Packages</Button></div></div></article>;
}

function AgencyDirectoryFilters({ close }: { close?: () => void }) {
  return <aside className="directory-filters"><div className="directory-filter-head"><div><span className="eyebrow">Refine agencies</span><h2>Filters</h2></div>{close && <button onClick={close}>×</button>}</div><FilterGroup title="Agency Location" options={["Dhaka", "Chattogram", "Sylhet", "Other Bangladesh Cities", "Overseas"]} /><FilterGroup title="Agency Specialization" options={["Hajj", "Umrah", "Hajj & Umrah", "Ramadan Umrah", "Family Umrah", "VIP Umrah"]} /><FilterGroup title="Agency Rating" options={["5 Stars", "4+ Stars", "3+ Stars"]} /><FilterGroup title="Verification" options={["Verified Agencies Only"]} /><FilterGroup title="Package Type" options={["Economy", "Standard", "Premium", "VIP"]} /><div className="filter-actions"><Button onClick={close}>Apply Filters</Button><Button variant="ghost">Reset Filters</Button></div></aside>;
}

function PartnerStats() {
  const stats = [["shield", "250+", "Travel Agencies"], ["compass", "1,200+", "Hajj & Umrah Packages"], ["plane", "50+", "Departure Cities"], ["people", "25,000+", "Travelers"]] as const;
  return <section className="partner-stats"><div className="container"><div><span className="eyebrow">Built on trust</span><h2>A Growing Network of Travel Partners</h2><small>Illustrative marketplace figures</small></div><div>{stats.map(([icon, value, label]) => <article key={label}><span><Icon name={icon} size={22} /></span><strong>{value}</strong><small>{label}</small></article>)}</div></div></section>;
}

function AgencyRegistrationCTA() {
  return <section className="agency-registration"><div className="agency-registration-pattern" /><div className="container"><span className="eyebrow">For pilgrimage professionals</span><h2>Grow Your Hajj & Umrah<br />Business with Hajj Solutions</h2><p>Join our travel marketplace, showcase your pilgrimage packages, and connect with travelers planning their spiritual journeys.</p><div><Button>Register Your Agency <Icon name="arrow" size={16} /></Button><Button variant="light">Learn More</Button></div></div></section>;
}

function AgenciesListingPage({ dark, toggleTheme }: { dark: boolean; toggleTheme: () => void }) {
  const categories = ["All Agencies", "Hajj Agencies", "Umrah Agencies", "Hajj & Umrah Agencies", "Premium Agencies", "Economy Packages", "Ramadan Umrah"];
  const [category, setCategory] = useState("All Agencies");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filterOpen, setFilterOpen] = useState(false);
  return <div className="app agencies-listing-page"><Header dark={dark} toggleTheme={toggleTheme} active="Agencies" /><main><AgencyDirectoryHero /><section className="directory-categories"><div className="container">{categories.map((item, index) => <button className={category === item ? "active" : ""} onClick={() => setCategory(item)} key={item}><Icon name={index === 0 ? "grid" : index % 2 ? "people" : "compass"} size={16} />{item}</button>)}</div></section><section className="section featured-directory"><div className="container"><SectionHeading eyebrow="Preferred pilgrimage partners" title="Featured Travel Agencies" text="Discover trusted travel agencies offering dedicated Hajj and Umrah services." action="View all agencies" /><div className="featured-directory-grid">{directoryAgencies.slice(0, 3).map((agency) => <DirectoryAgencyCard agency={agency} featured key={agency.id} />)}</div></div></section><PartnerStats /><section className="section all-agencies-section"><div className="container"><div className="directory-list-head"><div><span className="eyebrow">Find the right travel partner</span><h2>Explore All Agencies</h2><p>Find Hajj and Umrah travel agencies that match your preferences.</p></div><strong>120 Travel Agencies</strong></div><div className="directory-mobile-filters"><Button variant="secondary" onClick={() => setFilterOpen(true)}><Icon name="sliders" size={17} />Filters</Button><span>120 agencies</span></div><div className="directory-layout"><AgencyDirectoryFilters /><div className="directory-results"><div className="listing-toolbar"><div><span>Sort by</span><select><option>Recommended</option><option>Highest Rated</option><option>Most Packages</option><option>Newest Agencies</option></select></div><div><button className={view === "grid" ? "active" : ""} onClick={() => setView("grid")}><Icon name="grid" size={17} /></button><button className={view === "list" ? "active" : ""} onClick={() => setView("list")}><Icon name="list" size={18} /></button></div></div><div className={`directory-grid ${view === "list" ? "list-view" : ""}`}>{directoryAgencies.map((agency) => <DirectoryAgencyCard agency={agency} view={view} key={agency.id} />)}</div><div className="pagination directory-pagination"><button disabled>Previous</button><button className="active">1</button><button>2</button><button>3</button><span>…</span><button>20</button><button>Next</button><label>Show <select><option>12</option><option>24</option><option>48</option></select></label></div></div></div></div></section><AgencyRegistrationCTA /><Newsletter /></main><Footer />{filterOpen && <div className="filter-drawer"><button className="drawer-backdrop" aria-label="Close filters" onClick={() => setFilterOpen(false)} /><div><AgencyDirectoryFilters close={() => setFilterOpen(false)} /></div></div>}</div>;
}

const profilePackages = [
  { name: "Premium Hajj Package 2027", type: "Hajj", duration: "25 Days", price: "$5,200", hotel: "5-Star", badge: "Premium", image: photos.kaaba },
  { name: "Economy Hajj Package 2027", type: "Hajj", duration: "30 Days", price: "$3,800", hotel: "3-Star", badge: "Best Value", image: photos.pilgrims },
  { name: "Ramadan Umrah Package", type: "Ramadan Umrah", duration: "14 Days", price: "$2,400", hotel: "4-Star", badge: "Ramadan Special", image: photos.madinah },
  { name: "Family Umrah Package", type: "Umrah", duration: "10 Days", price: "$1,850", hotel: "4-Star", badge: "Family", image: photos.tawaf },
];

function AgencyProfileHero() {
  const [share, setShare] = useState(false);
  return <><div className="profile-breadcrumb"><div className="container"><a href="/">Home</a><span>›</span><a href="/agencies">Agencies</a><span>›</span><strong>Al Noor Hajj & Umrah</strong></div></div><section className="profile-hero"><div className="container"><div className="profile-cover"><img src={photos.kaaba} alt="The Holy Kaaba and Masjid al-Haram" /><div /></div><div className="profile-heading"><span className="profile-logo">AN<i><Icon name="check" size={12} /></i></span><div className="profile-title"><span className="profile-verified"><Icon name="shield" size={12} />Verified Agency</span><h1>Al Noor Hajj & Umrah</h1><p><Icon name="location" size={14} />Dhaka, Bangladesh <i /> <Rating score="4.9" /> <span>248 reviews</span></p><p>Trusted Hajj and Umrah services with personalized pilgrimage experiences and dedicated support.</p></div><div className="profile-actions"><Button onClick={() => document.querySelector("#inquiry")?.scrollIntoView({ behavior: "smooth" })}><Icon name="mail" size={16} />Contact Agency</Button><Button variant="secondary" onClick={() => document.querySelector("#agency-packages")?.scrollIntoView({ behavior: "smooth" })}>View Packages</Button><div><Button variant="ghost" onClick={() => setShare(!share)}><Icon name="arrow" size={16} />Share Profile</Button>{share && <div className="profile-share-menu"><strong>Share agency profile</strong><button onClick={() => setShare(false)}>Copy profile link</button><button onClick={() => setShare(false)}>Share by email</button></div>}</div></div></div></div></section></>;
}

function ProfileStats() {
  const stats = [["clock", "12+", "Years of Experience"], ["people", "1,250+", "Pilgrims Served"], ["star", "4.9", "Average Rating"], ["compass", "24", "Available Packages"]] as const;
  return <section className="profile-stats"><div className="container">{stats.map(([icon, value, label]) => <article key={label}><span><Icon name={icon} size={22} /></span><div><strong>{value}</strong><small>{label}</small></div></article>)}</div></section>;
}

function ProfilePackageCard({ item }: { item: typeof profilePackages[number] }) {
  return <article className="profile-package-card"><div><img src={item.image} alt={item.name} /><span>{item.badge}</span></div><section><small>{item.type}</small><h3>{item.name}</h3><div><span><Icon name="clock" size={14} />{item.duration}</span><span><Icon name="star" size={14} />{item.hotel} hotel</span></div><div className="profile-package-footer"><p><small>Starting from</small><strong>{item.price}</strong></p><Button variant="secondary" onClick={() => { navigateTo("/packages/premium-14-day-umrah"); }}>View Details</Button></div></section></article>;
}

function AgencyProfilePackages() {
  const [tab, setTab] = useState("All Packages");
  const filtered = tab === "All Packages" ? profilePackages : profilePackages.filter((item) => item.type === tab || (tab === "Umrah" && item.type.includes("Umrah")));
  return <section className="profile-section" id="agency-packages"><div className="profile-section-head"><div><span className="eyebrow">Pilgrimage packages from this agency</span><h2>Hajj & Umrah Packages</h2></div><div className="profile-tabs">{["All Packages", "Hajj", "Umrah", "Ramadan Umrah"].map((item) => <button className={tab === item ? "active" : ""} onClick={() => setTab(item)} key={item}>{item}</button>)}</div></div><div className="profile-package-grid">{filtered.map((item) => <ProfilePackageCard item={item} key={item.name} />)}</div><Button variant="secondary" className="profile-view-all" onClick={() => { navigateTo("/packages"); }}>View All Packages <Icon name="arrow" size={16} /></Button></section>;
}

function ProfileAbout() {
  const [expanded, setExpanded] = useState(false);
  return <section className="profile-section profile-about"><span className="eyebrow">A pilgrimage partner you can know</span><h2>About Al Noor Hajj & Umrah</h2><p>Al Noor Hajj & Umrah is a dedicated pilgrimage service provider based in Dhaka, Bangladesh. With more than 12 years of experience, the agency helps pilgrims plan their Hajj and Umrah journeys with reliable arrangements, knowledgeable support, and carefully organized travel services.</p><p>Its service philosophy centers on clear communication, respectful guidance, and practical support from the first inquiry through the pilgrim's return home.</p>{expanded && <p>Specialties include premium and economy Hajj groups, family Umrah, Ramadan departures, visa assistance, Haram-side accommodation, and guided pilgrimage coordination.</p>}<Button variant="ghost" onClick={() => setExpanded(!expanded)}>{expanded ? "Show Less" : "Read More"} <Icon name="arrow" size={15} /></Button><div className="about-pillars"><span><small>Experience</small><strong>12+ years</strong></span><span><small>Service philosophy</small><strong>Clear and respectful</strong></span><span><small>Pilgrim support</small><strong>Before, during, after</strong></span><span><small>Specialties</small><strong>Hajj · Umrah · Ramadan</strong></span></div></section>;
}

function ProfileServices() {
  const services = [["shield", "Hajj Visa Assistance", "Guidance for required pilgrimage documentation."], ["shield", "Umrah Visa Assistance", "Practical visa submission and status support."], ["plane", "Flight Booking", "Coordinated group flight arrangements."], ["star", "Hotel Accommodation", "Selected stays in Makkah and Madinah."], ["compass", "Airport Transfers", "Organized arrival and departure transport."], ["people", "Guided Pilgrimage Support", "Ritual guidance from experienced coordinators."], ["globe", "Group Travel Coordination", "Clear schedules and group communication."], ["headset", "24/7 Pilgrim Assistance", "Support throughout the active journey."]] as const;
  return <section className="profile-section"><span className="eyebrow">End-to-end pilgrimage care</span><h2>Our Services</h2><div className="profile-services">{services.map(([icon, title, text]) => <article key={title}><span><Icon name={icon} size={20} /></span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>;
}

function ProfileDestinations() {
  return <section className="profile-section"><span className="eyebrow">At the heart of every journey</span><h2>Pilgrimage Destinations</h2><div className="profile-destinations"><article><img src={photos.makkah} alt="Masjid al-Haram in Makkah" /><div><small>Saudi Arabia</small><h3>Makkah</h3><p>Perform Umrah and experience the sacred surroundings of Masjid al-Haram.</p></div></article><article><img src={photos.madinah} alt="Al-Masjid an-Nabawi in Madinah" /><div><small>Saudi Arabia</small><h3>Madinah</h3><p>Spend meaningful days close to Al-Masjid an-Nabawi with guided support.</p></div></article></div></section>;
}

function ProfileReviews() {
  const [filter, setFilter] = useState("All Reviews");
  const reviews = [["AR", "Abdullah Rahman", "Excellent Hajj Experience", "The team provided excellent support throughout our Hajj journey. The hotel arrangements and overall coordination were very smooth.", "12 Jul 2026"], ["FA", "Fatima Akter", "Well-Organized Umrah", "Our Umrah trip was well organized. The agency team was responsive and helpful whenever we needed assistance.", "18 Mar 2026"]];
  const visibleReviews = filter === "4 Stars" ? [] : reviews;
  return <section className="profile-section"><div className="profile-section-head"><div><span className="eyebrow">Experiences from verified pilgrims</span><h2>Reviews & Ratings</h2></div><div className="profile-tabs">{["All Reviews", "5 Stars", "4 Stars"].map((item) => <button className={filter === item ? "active" : ""} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div></div><div className="profile-rating-summary"><div><strong>4.9</strong><Rating score="4.9" /><small>248 total reviews</small></div><div>{[["5", 91], ["4", 7], ["3", 2], ["2", 0], ["1", 0]].map(([star, value]) => <span key={star}><small>{star} stars</small><progress max="100" value={Number(value)} /><small>{value}%</small></span>)}</div></div>{visibleReviews.length ? <div className="profile-review-list">{visibleReviews.map(([initials, name, title, text, date]) => <article key={name}><div><span>{initials}</span><div><strong>{name}</strong><small><Icon name="check" size={10} />Verified pilgrim</small></div><time>{date}</time></div><Rating score="5.0" /><h3>{title}</h3><p>{text}</p></article>)}</div> : <p className="reviews-empty">No 4-star reviews are included in this preview.</p>}<Button variant="secondary">View All Reviews</Button></section>;
}

function ProfileGallery() {
  const [active, setActive] = useState<string | null>(null);
  const images = [photos.agencyOffice, photos.pilgrimGroup, photos.kaaba, photos.madinah, photos.pilgrimTravel];
  return <section className="profile-section"><span className="eyebrow">A closer look</span><h2>Agency & Pilgrimage Gallery</h2><div className="profile-gallery">{images.map((image, index) => <button onClick={() => setActive(image)} key={image}><img src={image} alt={["Al Noor agency office", "Pilgrim group", "Makkah pilgrimage", "Madinah pilgrimage", "Pilgrimage travel arrangements"][index]} /></button>)}</div>{active && <div className="gallery-modal"><button className="gallery-close" onClick={() => setActive(null)}>×</button><img src={active} alt="Agency gallery enlarged view" /><span>Agency & Pilgrimage Gallery</span></div>}</section>;
}

function ContactSidebar() {
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent) { event.preventDefault(); setSent(true); }
  return <div className="profile-sidebar"><aside className="profile-contact"><span className="eyebrow">Speak with a pilgrimage advisor</span><h2>Contact This Agency</h2><div className="contact-lines"><p><span><Icon name="headset" size={17} /></span><small>Phone number</small><strong>+880 1700-000000</strong></p><p><span><Icon name="mail" size={17} /></span><small>Email address</small><strong>info@alnoorhajj.com</strong></p><p><span><Icon name="location" size={17} /></span><small>Office address</small><strong>Dhaka, Bangladesh</strong></p><p><span><Icon name="globe" size={17} /></span><small>Website</small><strong>www.alnoorhajj.com</strong></p><p><span><Icon name="clock" size={17} /></span><small>Office hours</small><strong>Sat–Thu, 9 AM–6 PM</strong></p></div><Button onClick={() => { window.location.href = "tel:+8801700000000"; }}><Icon name="headset" size={16} />Call Now</Button><Button variant="secondary" onClick={() => { window.location.href = "mailto:info@alnoorhajj.com"; }}><Icon name="mail" size={16} />Send Email</Button><Button variant="ghost" onClick={() => document.querySelector("#inquiry")?.scrollIntoView({ behavior: "smooth" })}>Send Inquiry <Icon name="arrow" size={16} /></Button></aside><section className="profile-trust"><h3>Why Choose This Agency?</h3>{[["shield", "Verified Agency"], ["people", "Experienced Pilgrimage Team"], ["tag", "Transparent Package Information"], ["headset", "Dedicated Pilgrim Support"]].map(([icon, text]) => <p key={text}><span><Icon name={icon as IconName} size={15} /></span>{text}</p>)}</section><form className="profile-inquiry" id="inquiry" onSubmit={submit}><span className="eyebrow">Tell us about your journey</span><h2>Send an Inquiry</h2>{sent ? <div className="inquiry-success"><span><Icon name="check" size={20} /></span><h3>Inquiry received</h3><p>Thank you. An agency representative will contact you shortly.</p><Button variant="secondary" onClick={() => setSent(false)}>Send Another</Button></div> : <><label>Full Name *<input required placeholder="Your full name" /></label><label>Email Address *<input required type="email" placeholder="name@example.com" /></label><label>Phone Number *<input required placeholder="+880" /></label><div><label>Interested In *<select required><option>Umrah</option><option>Hajj</option></select></label><label>Number of Pilgrims *<select required><option>1</option><option>2</option><option>3</option><option>4+</option></select></label></div><label>Preferred Travel Date<input type="date" /></label><label>Message<textarea rows={4} placeholder="Tell us about your pilgrimage plans..." /></label><Button type="submit">Submit Inquiry <Icon name="arrow" size={16} /></Button></>}</form></div>;
}

function SimilarAgencies() {
  const similar = [["AM", "Al Madina Travels", "Sylhet, Bangladesh", "4.8", "Family-friendly Hajj and Umrah services with attentive coordination."], ["RH", "Rahman Hajj Services", "Dhaka, Bangladesh", "4.9", "Experienced Hajj specialists offering guided premium and economy groups."], ["BP", "Barakah Pilgrimage", "Chattogram, Bangladesh", "4.7", "Thoughtful Umrah packages with clear support and selected accommodation."]];
  return <section className="section similar-agencies"><div className="container"><SectionHeading eyebrow="More trusted pilgrimage partners" title="Similar Hajj & Umrah Agencies" text="Discover other verified agencies serving pilgrims with dedicated Hajj and Umrah packages." action="View all agencies" /><div>{similar.map(([initials, name, location, rating, text]) => <article key={name}><span className="similar-logo">{initials}<i><Icon name="check" size={10} /></i></span><span className="profile-verified"><Icon name="shield" size={11} />Verified</span><h3>{name}</h3><p><Icon name="location" size={13} />{location}</p><Rating score={rating} /><p>{text}</p><Button variant="secondary">View Profile <Icon name="arrow" size={15} /></Button></article>)}</div></div></section>;
}

function AgencyProfilePage({ dark, toggleTheme }: { dark: boolean; toggleTheme: () => void }) {
  return <div className="app agency-profile-page"><Header dark={dark} toggleTheme={toggleTheme} active="Agencies" /><main><AgencyProfileHero /><ProfileStats /><div className="container profile-layout"><div className="profile-main"><ProfileAbout /><AgencyProfilePackages /><ProfileServices /><ProfileDestinations /><ProfileReviews /><ProfileGallery /></div><ContactSidebar /></div><SimilarAgencies /><Newsletter /></main><Footer /></div>;
}

const eventsDirectory = [
  { id: 1, title: "Hajj Preparation & Orientation 2027", category: "Hajj Seminar", date: "November 15, 2026", day: "15", month: "Nov", time: "10:00 AM", location: "Dhaka, Bangladesh", format: "In-person", organizer: "Al Noor Hajj & Umrah", initials: "AN", image: photos.eventHall, description: "Prepare for Hajj with clear guidance on travel, rituals, health, documentation, and practical group arrangements." },
  { id: 2, title: "Umrah Travel Guidance Seminar", category: "Umrah Seminar", date: "November 22, 2026", day: "22", month: "Nov", time: "3:00 PM", location: "Chattogram, Bangladesh", format: "In-person", organizer: "Rahman Hajj Services", initials: "RH", image: photos.madinah, description: "Understand the Umrah journey, essential preparation, accommodation, and support available to pilgrims." },
  { id: 3, title: "First-Time Pilgrim Orientation", category: "Pilgrim Orientation", date: "December 5, 2026", day: "05", month: "Dec", time: "11:00 AM", location: "Dhaka, Bangladesh", format: "In-person", organizer: "Al Madina Travels", initials: "AM", image: photos.pilgrimGroup, description: "A welcoming session for first-time pilgrims covering key rites, packing, group travel, and personal readiness." },
  { id: 4, title: "Understanding the Hajj Journey", category: "Hajj Seminar", date: "December 12, 2026", day: "12", month: "Dec", time: "8:00 PM", location: "Online", format: "Online", organizer: "Barakah Pilgrimage", initials: "BP", image: photos.kaaba, description: "A live educational overview of the Hajj journey, its sequence, sacred sites, and practical preparation." },
  { id: 5, title: "Umrah Preparation Workshop", category: "Training & Workshops", date: "December 19, 2026", day: "19", month: "Dec", time: "10:30 AM", location: "Sylhet, Bangladesh", format: "In-person", organizer: "Al Noor Hajj & Umrah", initials: "AN", image: photos.eventWorkshop, description: "A practical workshop focused on Ihram, Umrah rites, group coordination, and common pilgrim questions." },
  { id: 6, title: "Hajj Travel Documentation Session", category: "Hajj Seminar", date: "January 9, 2027", day: "09", month: "Jan", time: "2:00 PM", location: "Online", format: "Online", organizer: "Rahman Hajj Services", initials: "RH", image: photos.pilgrimTravel, description: "Learn about passports, visas, health documents, deadlines, and agency confirmation steps for Hajj." },
];

type PilgrimageEvent = typeof eventsDirectory[number];

function EventsHero() {
  return <><div className="events-breadcrumb"><div className="container"><a href="/">Home</a><span>›</span><strong>Events</strong></div></div><section className="events-hero"><img src={photos.pilgrims} alt="Pilgrims gathered near the Holy Kaaba" /><div className="events-hero-overlay" /><div className="events-hero-pattern" /><div className="container events-hero-content"><span className="hero-kicker"><span />Learn · Prepare · Journey</span><h1>Discover Hajj & Umrah Events</h1><p>Explore upcoming seminars, pilgrim orientation sessions, and educational programs to help you prepare for your spiritual journey.</p><form onSubmit={(event) => event.preventDefault()}><Icon name="search" size={19} /><input placeholder="Search events, seminars, or training..." aria-label="Search events" /><Button type="submit">Search</Button></form><Button variant="light" onClick={() => document.querySelector("#upcoming-events")?.scrollIntoView({ behavior: "smooth" })}>Explore Upcoming Events <Icon name="arrow" size={16} /></Button></div></section></>;
}

function EventOrganizer({ event }: { event: PilgrimageEvent }) {
  return <div className="event-organizer"><span>{event.initials}</span><div><small>Organized by</small><strong>{event.organizer}<i><Icon name="check" size={9} /></i></strong></div></div>;
}

function EventCard({ event, onRegister, compact = false }: { event: PilgrimageEvent; onRegister: (event: PilgrimageEvent) => void; compact?: boolean }) {
  return <article className={`event-listing-card ${compact ? "event-listing-compact" : ""}`}><div className="event-listing-image"><img src={event.image} alt={event.title} /><span className="event-date-badge"><strong>{event.day}</strong><small>{event.month}</small></span><span className="event-format">{event.format}</span></div><div className="event-listing-content"><span className="event-category">{event.category}</span><h3>{event.title}</h3><p>{event.description}</p><div className="event-listing-meta"><span><Icon name="clock" size={14} />{event.time}</span><span><Icon name="location" size={14} />{event.location}</span></div><EventOrganizer event={event} /><div className="event-listing-actions"><Button variant="secondary" onClick={() => { navigateTo(`/events/${event.id}`); }}>View Details</Button><Button onClick={() => onRegister(event)}>Register Now</Button></div></div></article>;
}

function FeaturedEvent({ onRegister }: { onRegister: (event: PilgrimageEvent) => void }) {
  const event = eventsDirectory[0];
  return <section className="featured-event-section" id="featured-event"><div className="container"><span className="eyebrow">Featured learning experience</span><article className="featured-event-card"><div className="featured-event-image"><img src={photos.eventHall} alt="Hajj preparation seminar audience" /><div /><span className="event-date-badge"><strong>15</strong><small>Nov</small></span></div><div className="featured-event-content"><div className="featured-event-labels"><span>{event.category}</span><span><i />Registration Open</span></div><h2>{event.title}</h2><p>Prepare for your upcoming Hajj journey with an informative orientation session covering travel preparation, pilgrimage procedures, essential guidance, and practical tips.</p><div className="featured-event-details"><span><Icon name="calendar" size={16} /><small>Date</small><strong>{event.date}</strong></span><span><Icon name="clock" size={16} /><small>Time</small><strong>10:00 AM – 1:00 PM</strong></span><span><Icon name="location" size={16} /><small>Location</small><strong>{event.location}</strong></span><span><Icon name="people" size={16} /><small>Format</small><strong>{event.format}</strong></span></div><EventOrganizer event={event} /><div className="featured-event-actions"><Button variant="secondary" onClick={() => { navigateTo("/events/1"); }}>View Details</Button><Button onClick={() => onRegister(event)}>Register Now <Icon name="arrow" size={16} /></Button></div></div></article></div></section>;
}

function EventsFilterBar({ search, setSearch, type, setType, date, setDate, location, setLocation, format, setFormat, clear }: { search: string; setSearch: (value: string) => void; type: string; setType: (value: string) => void; date: string; setDate: (value: string) => void; location: string; setLocation: (value: string) => void; format: string; setFormat: (value: string) => void; clear: () => void }) {
  return <div className="events-filter-bar"><label><Icon name="search" size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by event name" /></label><label><small>Event type</small><select value={type} onChange={(event) => setType(event.target.value)}><option>All Types</option><option>Hajj Seminar</option><option>Umrah Seminar</option><option>Pilgrim Orientation</option><option>Training & Workshops</option></select></label><label><small>Date</small><select value={date} onChange={(event) => setDate(event.target.value)}><option>Any Date</option><option>November 2026</option><option>December 2026</option><option>January 2027</option></select></label><label><small>Location</small><select value={location} onChange={(event) => setLocation(event.target.value)}><option>All Locations</option><option>Dhaka, Bangladesh</option><option>Chattogram, Bangladesh</option><option>Sylhet, Bangladesh</option><option>Online</option></select></label><label><small>Format</small><select value={format} onChange={(event) => setFormat(event.target.value)}><option>All Formats</option><option>In-person</option><option>Online</option></select></label><Button variant="ghost" onClick={clear}>Clear Filters</Button></div>;
}

function EventsCalendar() {
  const [month, setMonth] = useState(11);
  const [selected, setSelected] = useState(15);
  const monthName = month === 11 ? "November 2026" : "December 2026";
  const activeDates = month === 11 ? [15, 22] : [5, 12, 19];
  const blanks = month === 11 ? 6 : 1;
  const days = month === 11 ? 30 : 31;
  return <section className="section events-calendar-section"><div className="container"><SectionHeading eyebrow="Plan around your schedule" title="Explore Events by Date" text="Select a highlighted date to see available Hajj and Umrah programs." action="View full calendar" /><div className="events-calendar-layout"><div className="events-calendar"><header><button onClick={() => setMonth(month === 11 ? 12 : 11)}>‹</button><h3>{monthName}</h3><button onClick={() => setMonth(month === 11 ? 12 : 11)}>›</button></header><div className="calendar-week">{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => <span key={day}>{day}</span>)}</div><div className="calendar-days">{Array.from({ length: blanks }, (_, index) => <i key={`blank-${index}`} />)}{Array.from({ length: days }, (_, index) => index + 1).map((day) => <button className={`${activeDates.includes(day) ? "has-event" : ""} ${selected === day ? "selected" : ""}`} onClick={() => setSelected(day)} key={day}>{day}</button>)}</div></div><div className="calendar-event-list"><span className="eyebrow">Selected date</span><h3>{monthName.split(" ")[0]} {selected}, 2026</h3>{activeDates.includes(selected) ? eventsDirectory.filter((event) => event.day === String(selected).padStart(2, "0") && event.month === monthName.slice(0, 3)).map((event) => <article key={event.id}><span>{event.time}</span><div><strong>{event.title}</strong><small><Icon name="location" size={12} />{event.location}</small></div><button>View <Icon name="arrow" size={13} /></button></article>) : <div className="calendar-empty"><Icon name="calendar" size={24} /><p>No events scheduled for this date. Select a highlighted date.</p></div>}</div></div></div></section>;
}

function OnlineEvents({ onRegister }: { onRegister: (event: PilgrimageEvent) => void }) {
  const online = eventsDirectory.filter((event) => event.format === "Online");
  return <section className="section online-events"><div className="container"><SectionHeading eyebrow="Join from wherever you are" title="Online Hajj & Umrah Events" text="Live educational sessions designed to help pilgrims prepare with confidence." action="View all online events" /><div>{online.map((event) => <article key={event.id}><span className="online-icon"><Icon name="globe" size={21} /></span><div><span>Online event · Not started</span><h3>{event.title}</h3><p>{event.description}</p><small><Icon name="calendar" size={13} />{event.date} · {event.time}</small><EventOrganizer event={event} /></div><Button onClick={() => onRegister(event)}>Join Event</Button></article>)}</div></div></section>;
}

function PastEvents() {
  const past = [{ title: "Umrah Essentials Seminar", date: "September 18, 2026", organizer: "Al Noor Hajj & Umrah", image: photos.eventWorkshop }, { title: "Hajj Health & Safety Briefing", date: "August 24, 2026", organizer: "Global Hajj Services", image: photos.eventHall }, { title: "Pilgrim Family Orientation", date: "July 12, 2026", organizer: "Al Madina Travels", image: photos.pilgrimGroup }];
  return <section className="section past-events"><div className="container"><SectionHeading eyebrow="Learn from previous programs" title="Past Events" text="Browse completed Hajj and Umrah educational sessions and program highlights." action="View event archive" /><div>{past.map((event) => <article key={event.title}><div><img src={event.image} alt={event.title} /><span>Completed</span></div><section><small>{event.date}</small><h3>{event.title}</h3><p>Organized by {event.organizer}</p><Button variant="secondary">View Recap</Button></section></article>)}</div></div></section>;
}

function EventOrganizerCTA() {
  return <section className="event-organizer-cta"><div className="event-cta-pattern" /><div className="container"><span className="eyebrow">For agencies and educators</span><h2>Organize a Hajj or Umrah Event?</h2><p>Share your upcoming Hajj and Umrah seminars, orientation sessions, and educational programs with the Hajj Solutions community.</p><div><Button>Register Your Event <Icon name="arrow" size={16} /></Button><Button variant="light">Contact Us</Button></div></div></section>;
}

function EventRegistrationModal({ event, close }: { event: PilgrimageEvent; close: () => void }) {
  const [success, setSuccess] = useState(false);
  return <div className="event-modal"><button className="event-modal-backdrop" onClick={close} aria-label="Close registration" /><div className="event-modal-card"><button className="event-modal-close" onClick={close}>×</button>{success ? <div className="event-registration-success"><span><Icon name="check" size={23} /></span><h2>Registration Confirmed</h2><p>Your interest in <strong>{event.title}</strong> has been recorded. Event instructions will be sent to your email.</p><Button onClick={close}>Done</Button></div> : <><span className="eyebrow">Reserve your place</span><h2>Event Registration</h2><div className="event-modal-summary"><img src={event.image} alt="" /><div><strong>{event.title}</strong><small>{event.date} · {event.time}</small></div></div><form onSubmit={(formEvent) => { formEvent.preventDefault(); setSuccess(true); }}><label>Full Name *<input required placeholder="Your full name" /></label><label>Email Address *<input required type="email" placeholder="name@example.com" /></label><label>Phone Number *<input required placeholder="+880" /></label><label>Number of Attendees<select><option>1 attendee</option><option>2 attendees</option><option>3 attendees</option></select></label><Button type="submit">Complete Registration <Icon name="arrow" size={16} /></Button></form></>}</div></div>;
}

function EventsListingPage({ dark, toggleTheme }: { dark: boolean; toggleTheme: () => void }) {
  const categories = ["All Events", "Hajj Seminars", "Umrah Seminars", "Pilgrim Orientation", "Training & Workshops", "Online Events"];
  const [category, setCategory] = useState("All Events");
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All Types");
  const [date, setDate] = useState("Any Date");
  const [location, setLocation] = useState("All Locations");
  const [format, setFormat] = useState("All Formats");
  const [registration, setRegistration] = useState<PilgrimageEvent | null>(null);
  const filtered = eventsDirectory.filter((event) => (category === "All Events" || category === "Online Events" && event.format === "Online" || category === "Hajj Seminars" && event.category === "Hajj Seminar" || category === "Umrah Seminars" && event.category === "Umrah Seminar" || event.category === category) && (!search || event.title.toLowerCase().includes(search.toLowerCase())) && (type === "All Types" || event.category === type) && (date === "Any Date" || event.date.startsWith(date.split(" ")[0]) && event.date.endsWith(date.split(" ")[1])) && (location === "All Locations" || event.location === location) && (format === "All Formats" || event.format === format));
  const clear = () => { setSearch(""); setType("All Types"); setDate("Any Date"); setLocation("All Locations"); setFormat("All Formats"); setCategory("All Events"); };
  return <div className="app events-listing-page"><Header dark={dark} toggleTheme={toggleTheme} active="Events" /><main><EventsHero /><section className="event-categories"><div className="container">{categories.map((item, index) => <button className={category === item ? "active" : ""} onClick={() => setCategory(item)} key={item}><Icon name={index === 5 ? "globe" : index % 2 ? "people" : "calendar"} size={16} />{item}</button>)}</div></section><section className="events-filter-section"><div className="container"><EventsFilterBar search={search} setSearch={setSearch} type={type} setType={setType} date={date} setDate={setDate} location={location} setLocation={setLocation} format={format} setFormat={setFormat} clear={clear} /></div></section><FeaturedEvent onRegister={setRegistration} /><section className="section upcoming-events" id="upcoming-events"><div className="container"><SectionHeading eyebrow="Prepare through knowledge" title="Upcoming Hajj & Umrah Events" text="Find educational sessions and programs to help you prepare for your pilgrimage." action={`${filtered.length} events found`} /><div className="upcoming-events-grid">{filtered.map((event) => <EventCard event={event} onRegister={setRegistration} key={event.id} />)}</div>{!filtered.length && <div className="events-empty"><Icon name="calendar" size={28} /><h3>No events match these filters</h3><p>Clear your filters to explore all upcoming programs.</p><Button variant="secondary" onClick={clear}>Clear Filters</Button></div>}</div></section><EventsCalendar /><OnlineEvents onRegister={setRegistration} /><PastEvents /><EventOrganizerCTA /><Newsletter title={<>Stay Updated on<br />Upcoming Events</>} description="Get updates about Hajj and Umrah seminars, orientation sessions, and upcoming programs." /></main><Footer />{registration && <EventRegistrationModal event={registration} close={() => setRegistration(null)} />}</div>;
}

function EventDetailsHero({ register, share }: { register: () => void; share: () => void }) {
  return <><div className="event-detail-breadcrumb"><div className="container"><a href="/">Home</a><span>›</span><a href="/events">Events</a><span>›</span><strong>Hajj Preparation & Orientation 2027</strong></div></div><section className="event-detail-hero"><img src={photos.eventHall} alt="Hajj preparation and orientation seminar" /><div className="event-detail-overlay" /><div className="container event-detail-hero-content"><div className="event-detail-labels"><span>Hajj Seminar</span><span><i />Registration Open</span></div><h1>Hajj Preparation &<br /><em>Orientation 2027</em></h1><p>Prepare for your pilgrimage with practical guidance and expert-led orientation.</p><EventOrganizer event={eventsDirectory[0]} /><div className="event-detail-actions"><Button onClick={register}>Register Now <Icon name="arrow" size={16} /></Button><Button variant="light" onClick={share}><Icon name="arrow" size={16} />Share Event</Button></div></div></section></>;
}

function EventDetailInfoBar() {
  const info = [["calendar", "Date", "November 15, 2026"], ["clock", "Time", "10:00 AM – 1:00 PM"], ["location", "Location", "Dhaka, Bangladesh"], ["people", "Format", "In-person"]] as const;
  return <section className="event-detail-info"><div className="container">{info.map(([icon, label, value]) => <article key={label}><span><Icon name={icon} size={21} /></span><div><small>{label}</small><strong>{value}</strong></div></article>)}</div></section>;
}

function EventAbout() {
  return <section className="event-detail-card"><span className="eyebrow">Prepare with clarity</span><h2>About This Event</h2><p>Join our Hajj Preparation & Orientation 2027 session to learn about the essential steps involved in preparing for your pilgrimage. This program is designed to help prospective pilgrims understand travel preparation, pilgrimage procedures, important documentation, and practical arrangements.</p><p>The session combines structured presentations, practical examples, and an open question-and-answer period with experienced pilgrimage coordinators.</p><div className="event-about-grid"><article><span><Icon name="compass" size={18} /></span><h3>Event Objectives</h3><p>Build confidence through clear, practical Hajj preparation.</p></article><article><span><Icon name="people" size={18} /></span><h3>Who Should Attend</h3><p>First-time pilgrims, families, and anyone planning Hajj 2027.</p></article><article><span><Icon name="tag" size={18} /></span><h3>Key Topics</h3><p>Documents, packing, rituals, flights, hotels, and coordination.</p></article><article><span><Icon name="star" size={18} /></span><h3>What to Expect</h3><p>Expert-led guidance, practical checklists, and time for questions.</p></article></div></section>;
}

function EventDetailSchedule() {
  const schedule = [["10:00 AM", "Registration & Welcome", "Participant check-in", "Welcome and event introduction"], ["10:30 AM", "Hajj Preparation", "Travel preparation", "Essential documents · Packing checklist"], ["11:15 AM", "Understanding the Hajj Journey", "Overview of the pilgrimage", "Important stages · Guidance for first-time pilgrims"], ["12:00 PM", "Travel & Accommodation", "Flight arrangements", "Hotel accommodation · Group coordination"], ["12:30 PM", "Questions & Answers", "Open discussion", "Participant questions"], ["1:00 PM", "Closing", "Final announcements", "Event conclusion"]];
  return <section className="event-detail-card"><span className="eyebrow">Three hours of practical guidance</span><h2>Event Schedule</h2><div className="event-schedule">{schedule.map(([time, title, first, second], index) => <article key={time}><span className="event-schedule-icon"><Icon name={index === 0 ? "people" : index === schedule.length - 1 ? "check" : "clock"} size={17} /></span><time>{time}</time><div><h3>{title}</h3><p>{first}</p><p>{second}</p></div></article>)}</div></section>;
}

function EventLocationSection() {
  return <section className="event-detail-card"><span className="eyebrow">Plan your arrival</span><h2>Event Location</h2><div className="event-location-grid"><div className="event-map-placeholder"><div className="event-map-roads" /><span><Icon name="location" size={27} /></span><small>Dhaka, Bangladesh</small></div><div className="event-location-copy"><span><Icon name="location" size={20} /></span><h3>Hot Solutions Event Hall</h3><p>Dhaka, Bangladesh</p><div><small>Venue type</small><strong>In-person orientation hall</strong></div><div><small>Arrival guidance</small><strong>Please arrive 20 minutes early</strong></div><Button variant="secondary">Get Directions <Icon name="arrow" size={15} /></Button></div></div></section>;
}

function EventOrganizerProfile() {
  return <section className="event-detail-card event-organizer-profile"><span className="eyebrow">Organized By</span><div><span className="event-organizer-logo">AN<i><Icon name="check" size={11} /></i></span><div><span className="profile-verified"><Icon name="shield" size={11} />Verified Agency</span><h2>Al Noor Hajj & Umrah</h2><p><Icon name="location" size={13} />Dhaka, Bangladesh</p><Rating score="4.9" reviews={248} /></div></div><p>A dedicated pilgrimage service provider offering organized Hajj and Umrah journeys, educational guidance, and attentive pilgrim support.</p><Button variant="secondary" onClick={() => { navigateTo("/agencies/al-noor-hajj-umrah"); }}>View Agency Profile <Icon name="arrow" size={15} /></Button></section>;
}

function EventDetailHighlights() {
  const items = [["compass", "Hajj Preparation", "Understand practical steps for preparing physically, spiritually, and logistically."], ["shield", "Travel Documentation", "Learn which documents to prepare and when to complete agency requirements."], ["location", "Pilgrimage Procedures", "Review the key stages of Hajj and how group movement is coordinated."], ["plane", "Practical Travel Guidance", "Get useful advice for flights, luggage, accommodation, and daily routines."]] as const;
  return <section className="event-detail-card"><span className="eyebrow">Useful knowledge for every pilgrim</span><h2>What You’ll Learn</h2><div className="event-learn-grid">{items.map(([icon, title, text]) => <article key={title}><span><Icon name={icon} size={21} /></span><h3>{title}</h3><p>{text}</p></article>)}</div></section>;
}

function EventDetailFAQ() {
  const faqs = [["Who can attend this event?", "Anyone planning Hajj, including first-time pilgrims, family members, and travelers who want to understand the journey."], ["Is registration free?", "Yes. This orientation session has no registration fee, but advance registration is required."], ["Do I need to bring any documents?", "No documents are required for entry. You may bring your passport or agency checklist if you want specific guidance."], ["Can I attend if I have not booked a Hajj package?", "Yes. The educational session is open to prospective pilgrims who have not yet selected a package."], ["Will I receive event details after registering?", "Yes. The organizer will send venue instructions and important reminders after reviewing your registration."], ["Can I cancel my registration?", "Yes. Please contact the organizer if your plans change so your place can be released."]];
  const [open, setOpen] = useState(0);
  return <section className="event-detail-card"><span className="eyebrow">Before you attend</span><h2>Frequently Asked Questions</h2><div className="event-detail-faq">{faqs.map(([question, answer], index) => <article className={open === index ? "open" : ""} key={question}><button onClick={() => setOpen(open === index ? -1 : index)}><strong>{question}</strong><span>{open === index ? "−" : "+"}</span></button>{open === index && <p>{answer}</p>}</article>)}</div></section>;
}

function EventRegistrationCard({ register }: { register: () => void }) {
  return <aside className="event-registration-card"><span className="registration-open"><i />Registration Open</span><h2>Reserve Your Place</h2><p>Join this practical Hajj preparation and orientation session.</p><div><span><Icon name="calendar" size={16} /><small>Event date</small><strong>November 15, 2026</strong></span><span><Icon name="clock" size={16} /><small>Event time</small><strong>10:00 AM – 1:00 PM</strong></span><span><Icon name="location" size={16} /><small>Location</small><strong>Dhaka, Bangladesh</strong></span><span><Icon name="people" size={16} /><small>Available seats</small><strong>45 seats</strong></span></div><div className="registration-fee"><small>Registration fee</small><strong>Free</strong></div><Button onClick={register}>Register Now <Icon name="arrow" size={16} /></Button><p className="registration-note"><Icon name="shield" size={13} />Please complete the registration form to reserve your place.</p></aside>;
}

function EventDetailsRegistration({ close }: { close: () => void }) {
  const [success, setSuccess] = useState(false);
  return <div className="event-modal"><button className="event-modal-backdrop" onClick={close} aria-label="Close registration" /><div className="event-modal-card event-detail-registration"><button className="event-modal-close" onClick={close}>×</button>{success ? <div className="event-registration-success"><span><Icon name="check" size={23} /></span><h2>Registration Submitted</h2><p>Your registration has been submitted successfully. The event organizer will contact you with further details.</p><small>Your place is subject to organizer review and is not yet confirmed.</small><Button onClick={close}>Done</Button></div> : <><span className="eyebrow">Hajj Preparation & Orientation 2027</span><h2>Register for This Event</h2><p>Complete the required details below. The organizer will review your submission.</p><form onSubmit={(event) => { event.preventDefault(); setSuccess(true); }}><label>Full Name *<input required minLength={2} placeholder="Your full name" /></label><label>Email Address *<input required type="email" placeholder="name@example.com" /></label><label>Phone Number *<input required minLength={7} placeholder="+880" /></label><div><label>Number of Participants *<select required><option>1 participant</option><option>2 participants</option><option>3 participants</option><option>4 participants</option></select></label><label>Interested In *<select required><option>Hajj</option><option>Umrah</option></select></label></div><label>Message (optional)<textarea rows={4} placeholder="Any questions for the organizer?" /></label><Button type="submit">Submit Registration <Icon name="arrow" size={16} /></Button><small>Submitting this form does not guarantee a seat until the organizer confirms availability.</small></form></>}</div></div>;
}

function EventShareModal({ close }: { close: () => void }) {
  const [copied, setCopied] = useState(false);
  function copy() { navigator.clipboard?.writeText(window.location.href); setCopied(true); }
  return <div className="event-modal"><button className="event-modal-backdrop" onClick={close} aria-label="Close share dialog" /><div className="event-share-card"><button className="event-modal-close" onClick={close}>×</button><span className="eyebrow">Invite someone to prepare with you</span><h2>Share Event</h2><p>Share the Hajj Preparation & Orientation 2027 event.</p><div><button className={copied ? "copied" : ""} onClick={copy}><Icon name={copied ? "check" : "tag"} size={18} />{copied ? "Link Copied" : "Copy Link"}</button><button><strong>f</strong>Facebook</button><button><Icon name="people" size={18} />WhatsApp</button><button onClick={() => { window.location.href = "mailto:?subject=Hajj Preparation Event"; }}><Icon name="mail" size={18} />Email</button></div>{copied && <small>The event link has been copied to your clipboard.</small>}</div></div>;
}

function RelatedEventDetails() {
  const related = [eventsDirectory[1], eventsDirectory[2], eventsDirectory[5]];
  return <section className="section event-related"><div className="container"><SectionHeading eyebrow="Continue preparing" title="Related Hajj & Umrah Events" text="Explore more seminars and orientation programs designed for pilgrims." action="View all events" /><div>{related.map((event) => <article key={event.id}><div><img src={event.image} alt={event.title} /><span>{event.format}</span></div><section><span>{event.category}</span><h3>{event.title}</h3><p><Icon name="calendar" size={13} />{event.date}</p><p><Icon name="location" size={13} />{event.location}</p><EventOrganizer event={event} /><Button variant="secondary" onClick={() => { navigateTo(`/events/${event.id}`); }}>View Details <Icon name="arrow" size={15} /></Button></section></article>)}</div></div></section>;
}

function EventDetailsPage({ dark, toggleTheme }: { dark: boolean; toggleTheme: () => void }) {
  const [registration, setRegistration] = useState(false);
  const [share, setShare] = useState(false);
  return <div className="app event-details-page"><Header dark={dark} toggleTheme={toggleTheme} active="Events" /><main><EventDetailsHero register={() => setRegistration(true)} share={() => setShare(true)} /><EventDetailInfoBar /><div className="container event-detail-layout"><div className="event-detail-main"><EventAbout /><EventDetailHighlights /><EventDetailSchedule /><EventLocationSection /><EventOrganizerProfile /><EventDetailFAQ /></div><div className="event-detail-aside"><EventRegistrationCard register={() => setRegistration(true)} /></div></div><RelatedEventDetails /><Newsletter title={<>Stay Updated on<br />Hajj & Umrah Events</>} description="Receive updates about upcoming seminars, orientation sessions, and pilgrimage programs." /></main><Footer />{registration && <EventDetailsRegistration close={() => setRegistration(false)} />}{share && <EventShareModal close={() => setShare(false)} />}</div>;
}

const sacredDestinations = [
  { name: "Makkah", country: "Saudi Arabia", category: "Holy City", city: "Makkah", description: "The central destination for Hajj and Umrah, home to Masjid al-Haram and the Kaaba.", image: photos.kaaba, packages: 48 },
  { name: "Madinah", country: "Saudi Arabia", category: "Holy City", city: "Madinah", description: "A sacred city where pilgrims visit Al-Masjid an-Nabawi and other important Islamic landmarks.", image: photos.madinah, packages: 42 },
  { name: "Mina", country: "Saudi Arabia", category: "Hajj Site", city: "Makkah", description: "An important location during Hajj, where pilgrims stay during specific days of the pilgrimage.", image: photos.pilgrims, packages: 24 },
  { name: "Arafat", country: "Saudi Arabia", category: "Hajj Site", city: "Makkah", description: "A central location in the Hajj pilgrimage, associated with the Day of Arafah.", image: photos.arafat, packages: 22 },
  { name: "Muzdalifah", country: "Saudi Arabia", category: "Hajj Site", city: "Makkah", description: "A significant stop during Hajj, where pilgrims spend part of the pilgrimage journey.", image: photos.haram, packages: 18 },
  { name: "Jabal al-Nour", country: "Saudi Arabia", category: "Islamic Landmark", city: "Makkah", description: "A mountain near Makkah known for its association with the Cave of Hira.", image: photos.jabal, packages: 12 },
];

type SacredDestination = typeof sacredDestinations[number];

function DestinationsHero() {
  return <><div className="destinations-breadcrumb"><div className="container"><a href="/">Home</a><span>›</span><strong>Destinations</strong></div></div><section className="destinations-hero"><img src={photos.kaaba} alt="The Holy Kaaba and Masjid al-Haram" /><div className="destinations-hero-overlay" /><div className="destinations-hero-pattern" /><div className="container destinations-hero-content"><span className="hero-kicker"><span />Sacred Cities · Holy Sites · Pilgrimage</span><h1>Explore Hajj & Umrah<br /><em>Destinations</em></h1><p>Discover the sacred cities and important pilgrimage sites that make your Hajj and Umrah journey meaningful.</p><form onSubmit={(event) => event.preventDefault()}><Icon name="search" size={19} /><input placeholder="Search destinations or holy sites..." aria-label="Search destinations" /><select aria-label="Destination category"><option>All Categories</option><option>Holy City</option><option>Hajj Site</option><option>Islamic Landmark</option></select><Button type="submit">Search</Button></form></div></section></>;
}

function FeaturedMakkah() {
  return <section className="section featured-destination"><div className="container"><span className="eyebrow">Featured sacred destination</span><article><div className="featured-destination-image"><img src={photos.kaaba} alt="The Kaaba in Makkah" /><div /><span>Home of the Kaaba</span></div><div className="featured-destination-copy"><div><span>Holy City</span><small><Icon name="location" size={13} />Saudi Arabia</small></div><h2>Makkah</h2><p>Makkah is the holiest city in Islam and the central destination of Hajj and Umrah. Pilgrims visit Masjid al-Haram and perform the sacred rituals of pilgrimage.</p><div className="featured-destination-facts"><span><Icon name="compass" size={18} /><small>Related packages</small><strong>48 Hajj & Umrah journeys</strong></span><span><Icon name="star" size={18} /><small>Primary landmark</small><strong>Masjid al-Haram</strong></span></div><div><Button onClick={() => { navigateTo("/destinations/makkah"); }}>Explore Destination <Icon name="arrow" size={16} /></Button><Button variant="secondary" onClick={() => { navigateTo("/packages"); }}>View Packages</Button></div></div></article></div></section>;
}

function SacredDestinationCard({ item }: { item: SacredDestination }) {
  return <article className="sacred-destination-card"><div><img src={item.image} alt={`${item.name}, ${item.country}`} /><span>{item.category}</span><small>{item.packages} packages</small></div><section><p><Icon name="location" size={13} />{item.country}</p><h3>{item.name}</h3><p>{item.description}</p><Button variant="secondary" onClick={() => { navigateTo(`/destinations/${item.name.toLowerCase().replaceAll(" ", "-")}`); }}>Explore Destination <Icon name="arrow" size={15} /></Button></section></article>;
}

function DestinationFilterPanel({ search, setSearch, category, setCategory, city, setCity, clear, open, toggle }: { search: string; setSearch: (value: string) => void; category: string; setCategory: (value: string) => void; city: string; setCity: (value: string) => void; clear: () => void; open: boolean; toggle: () => void }) {
  return <div className={`destination-filter-panel ${open ? "open" : ""}`}><button className="destination-filter-toggle" onClick={toggle}><Icon name="sliders" size={17} />Search & Filters <Icon name="chevron" size={14} /></button><div><label><Icon name="search" size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search destination name" /></label><label><small>Destination category</small><select value={category} onChange={(event) => setCategory(event.target.value)}><option>All Categories</option><option>Holy City</option><option>Hajj Site</option><option>Islamic Landmark</option><option>Mosque</option></select></label><label><small>City</small><select value={city} onChange={(event) => setCity(event.target.value)}><option>All Cities</option><option>Makkah</option><option>Madinah</option></select></label><Button variant="ghost" onClick={clear}>Clear Filters</Button></div></div>;
}

function SacredSites({ city, sites }: { city: string; sites: { name: string; description: string; image: string }[] }) {
  return <section className={`section sacred-sites sacred-sites-${city.toLowerCase()}`}><div className="container"><SectionHeading eyebrow={`${city} pilgrimage landmarks`} title={`Important Sites in ${city}`} text={`Explore significant places pilgrims encounter in and around ${city}.`} action="View all sites" /><div>{sites.map((site) => <article key={site.name}><div><img src={site.image} alt={site.name} /></div><section><h3>{site.name}</h3><p>{site.description}</p><Button variant="ghost">Learn More <Icon name="arrow" size={14} /></Button></section></article>)}</div></div></section>;
}

function PackagesByDestination() {
  const panels = [{ name: "Makkah Packages", image: photos.makkah, description: "Explore pilgrimage packages centered around Makkah and Masjid al-Haram.", links: ["Hajj Packages", "Umrah Packages", "Ramadan Umrah Packages"] }, { name: "Madinah Packages", image: photos.madinah, description: "Find journeys that include meaningful time and accommodation in Madinah.", links: ["Umrah Packages", "Ramadan Umrah Packages", "Packages with Madinah Accommodation"] }];
  return <section className="section destination-packages"><div className="container"><SectionHeading eyebrow="Find the right sacred journey" title="Find Packages by Destination" text="Compare trusted Hajj and Umrah packages based on the places included in your itinerary." action="View all packages" /><div>{panels.map((panel) => <article key={panel.name}><img src={panel.image} alt={panel.name} /><div className="destination-package-shade" /><section><h3>{panel.name}</h3><p>{panel.description}</p><div>{panel.links.map((link) => <a href="/packages" key={link}><Icon name="arrow" size={13} />{link}</a>)}</div><Button onClick={() => { navigateTo("/packages"); }}>Explore Packages</Button></section></article>)}</div></div></section>;
}

function DestinationConfidenceBanner() {
  return <section className="destination-confidence"><img src={photos.madinahCourtyard} alt="Pilgrims at Al-Masjid an-Nabawi" /><div /><div className="container"><span className="eyebrow">Prepare with trusted information</span><h2>Plan Your Pilgrimage<br />with Confidence</h2><p>Explore important pilgrimage destinations and learn about the places included in your Hajj or Umrah journey.</p><Button onClick={() => { navigateTo("/packages"); }}>Explore Hajj & Umrah Packages <Icon name="arrow" size={16} /></Button></div></section>;
}

function PilgrimGuides() {
  const guides = [{ title: "Hajj Preparation Guide", text: "Understand essential preparation, sacred sites, and the sequence of the Hajj journey.", image: photos.pilgrims }, { title: "Umrah Travel Guide", text: "Prepare for Makkah and Madinah with practical guidance for a meaningful Umrah.", image: photos.tawaf }, { title: "Important Places in Makkah and Madinah", text: "Learn about the holy mosques and significant landmarks included in pilgrimage itineraries.", image: photos.madinah }];
  return <section className="section pilgrim-guides"><div className="container"><SectionHeading eyebrow="Learn before you travel" title="Travel Guides for Pilgrims" text="Useful destination knowledge to support your Hajj and Umrah preparation." action="View all guides" /><div>{guides.map((guide) => <article key={guide.title}><div><img src={guide.image} alt={guide.title} /><span>Pilgrim Guide</span></div><section><h3>{guide.title}</h3><p>{guide.text}</p><Button variant="secondary">Read Guide <Icon name="arrow" size={14} /></Button></section></article>)}</div></div></section>;
}

function DestinationsListingPage({ dark, toggleTheme }: { dark: boolean; toggleTheme: () => void }) {
  const categories = ["All Destinations", "Makkah", "Madinah", "Holy Sites", "Pilgrimage Landmarks"];
  const [tab, setTab] = useState("All Destinations");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [city, setCity] = useState("All Cities");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const filtered = sacredDestinations.filter((item) => (!search || item.name.toLowerCase().includes(search.toLowerCase())) && (category === "All Categories" || item.category === category) && (city === "All Cities" || item.city === city) && (tab === "All Destinations" || tab === "Makkah" && item.city === "Makkah" || tab === "Madinah" && item.city === "Madinah" || tab === "Holy Sites" && ["Holy City", "Hajj Site"].includes(item.category) || tab === "Pilgrimage Landmarks" && item.category === "Islamic Landmark"));
  const clear = () => { setSearch(""); setCategory("All Categories"); setCity("All Cities"); setTab("All Destinations"); };
  const makkahSites = [{ name: "Masjid al-Haram", description: "The sacred mosque surrounding the Kaaba and the central place of Hajj and Umrah.", image: photos.makkah }, { name: "Kaaba", description: "The sacred House toward which Muslims face in prayer and around which pilgrims perform Tawaf.", image: photos.kaaba }, { name: "Mina", description: "A key Hajj site where pilgrims stay during designated days of the pilgrimage.", image: photos.pilgrims }, { name: "Arafat", description: "The site of the essential standing on the Day of Arafah during Hajj.", image: photos.arafat }, { name: "Muzdalifah", description: "A significant Hajj stop between Arafat and Mina.", image: photos.haram }, { name: "Jabal al-Nour", description: "A mountain near Makkah associated with the Cave of Hira.", image: photos.jabal }];
  const madinahSites = [{ name: "Al-Masjid an-Nabawi", description: "The Prophet's Mosque and the central sacred landmark of Madinah.", image: photos.madinah }, { name: "Quba Mosque", description: "A historically significant mosque visited by many pilgrims in Madinah.", image: photos.quba }, { name: "Mount Uhud", description: "A landmark north of Madinah associated with important Islamic history.", image: photos.jabal }, { name: "Qiblatain Mosque", description: "A historic Madinah mosque associated with the change of the direction of prayer.", image: photos.madinahMosque }];
  return <div className="app destinations-listing-page"><Header dark={dark} toggleTheme={toggleTheme} active="Destinations" /><main><DestinationsHero /><section className="destination-categories"><div className="container">{categories.map((item, index) => <button className={tab === item ? "active" : ""} onClick={() => setTab(item)} key={item}><Icon name={index < 3 ? "location" : "compass"} size={16} />{item}</button>)}</div></section><FeaturedMakkah /><section className="section explore-destinations"><div className="container"><SectionHeading eyebrow="Sacred places of the pilgrimage" title="Explore Sacred Destinations" text="Discover holy cities, Hajj sites, and meaningful Islamic landmarks." action={`${filtered.length} destinations`} /><DestinationFilterPanel search={search} setSearch={setSearch} category={category} setCategory={setCategory} city={city} setCity={setCity} clear={clear} open={filtersOpen} toggle={() => setFiltersOpen(!filtersOpen)} /><div className="sacred-destination-grid">{filtered.map((item) => <SacredDestinationCard item={item} key={item.name} />)}</div>{!filtered.length && <div className="destinations-empty"><Icon name="location" size={27} /><h3>No destinations match your search</h3><Button variant="secondary" onClick={clear}>Clear Filters</Button></div>}</div></section><SacredSites city="Makkah" sites={makkahSites} /><SacredSites city="Madinah" sites={madinahSites} /><PackagesByDestination /><DestinationConfidenceBanner /><PilgrimGuides /><Newsletter title={<>Get Updates for<br />Your Pilgrimage</>} description="Receive useful Hajj and Umrah travel information, destination guides, and package updates." /></main><Footer /></div>;
}

function DestinationDetailHero({ share }: { share: () => void }) {
  return <><div className="destination-detail-breadcrumb"><div className="container"><a href="/">Home</a><span>›</span><a href="/destinations">Destinations</a><span>›</span><strong>Makkah</strong></div></div><section className="destination-detail-hero"><img src={photos.kaaba} alt="The Holy Kaaba and Masjid al-Haram in Makkah" /><div className="destination-detail-overlay" /><div className="destination-detail-pattern" /><div className="container destination-detail-hero-content"><div className="destination-detail-labels"><span>Holy City</span><span><Icon name="location" size={12} />Saudi Arabia</span><span>Home of the Kaaba</span></div><h1>Discover <em>Makkah</em></h1><p>Explore the holiest city in Islam and learn about the sacred sites at the heart of the Hajj and Umrah journey.</p><div><Button onClick={() => { navigateTo("/packages"); }}>Explore Packages <Icon name="arrow" size={16} /></Button><Button variant="light" onClick={() => document.querySelector("#makkah-gallery")?.scrollIntoView({ behavior: "smooth" })}><Icon name="grid" size={16} />View Gallery</Button><Button variant="light" onClick={share}><Icon name="arrow" size={16} />Share Destination</Button></div></div></section></>;
}

function DestinationOverview() {
  const info = [["Country", "Saudi Arabia"], ["Region", "Makkah Province"], ["Significance", "Holiest city in Islam"], ["Main Pilgrimage", "Hajj and Umrah"], ["Main Landmark", "Masjid al-Haram"]];
  return <section className="section destination-overview"><div className="container"><div><span className="eyebrow">The heart of the pilgrimage</span><h2>About Makkah</h2><p>Makkah is the holiest city in Islam and the central destination of Hajj and Umrah. Located in Saudi Arabia, the city is home to Masjid al-Haram and the Kaaba. Millions of Muslims visit Makkah to perform pilgrimage and worship.</p><p>The sacred city is central to the rites of Hajj and Umrah, while nearby sites including Mina, Arafat, and Muzdalifah form important parts of the Hajj journey.</p><Button variant="secondary">Read Destination Guide <Icon name="arrow" size={15} /></Button></div><aside><div className="destination-overview-image"><img src={photos.makkah} alt="Masjid al-Haram in Makkah" /><span><Icon name="location" size={14} />Makkah, Saudi Arabia</span></div><div>{info.map(([label, value]) => <p key={label}><small>{label}</small><strong>{value}</strong></p>)}</div></aside></div></section>;
}

function DestinationReligiousSites() {
  const sites = [{ name: "Masjid al-Haram", image: photos.makkah, text: "The sacred mosque surrounding the Kaaba and the central place of Hajj and Umrah." }, { name: "Kaaba", image: photos.kaaba, text: "The sacred House around which pilgrims perform Tawaf during Hajj and Umrah." }, { name: "Mina", image: photos.pilgrims, text: "A key Hajj site where pilgrims stay during designated days of the pilgrimage." }, { name: "Mount Arafat", image: photos.arafat, text: "The site of the essential standing on the Day of Arafah during Hajj." }, { name: "Muzdalifah", image: photos.haram, text: "A significant Hajj stop between Arafat and Mina where pilgrims spend part of the night." }, { name: "Jabal al-Nour", image: photos.jabal, text: "A mountain near Makkah known for its association with the Cave of Hira." }];
  return <section className="section destination-detail-sites"><div className="container"><SectionHeading eyebrow="Sacred landmarks and Hajj sites" title="Important Places in Makkah" text="Learn about places that hold significance within the Hajj and Umrah journey." action="View all places" /><div>{sites.map((site) => <article key={site.name}><div><img src={site.image} alt={site.name} /><span><Icon name="location" size={13} />Makkah</span></div><section><h3>{site.name}</h3><p>{site.text}</p><Button variant="ghost">Learn More <Icon name="arrow" size={14} /></Button></section></article>)}</div></div></section>;
}

function DestinationDetailGallery() {
  const [active, setActive] = useState<string | null>(null);
  const images = [photos.kaaba, photos.makkah, photos.haram, photos.tawaf, photos.jabal, photos.pilgrims];
  return <section className="section destination-detail-gallery-section" id="makkah-gallery"><div className="container"><SectionHeading eyebrow="See the sacred city" title="Explore Makkah Gallery" text="Authentic views of Masjid al-Haram, the Kaaba, pilgrims, and nearby Hajj sites." action="24 photos" /><div className="destination-detail-gallery">{images.map((image, index) => <button onClick={() => setActive(image)} key={image}><img src={image} alt={["The Holy Kaaba", "Masjid al-Haram", "Makkah pilgrimage landscape", "Pilgrims performing Tawaf", "Jabal al-Nour", "Pilgrims during Hajj"][index]} />{index === images.length - 1 && <span>+18 photos</span>}</button>)}<Button variant="light" onClick={() => setActive(images[0])}><Icon name="grid" size={15} />View All Photos</Button></div></div>{active && <div className="gallery-modal"><button className="gallery-close" onClick={() => setActive(null)}>×</button><img src={active} alt="Makkah gallery enlarged view" /><span>Explore Makkah Gallery</span></div>}</section>;
}

function DestinationPackages() {
  const [tab, setTab] = useState("All Packages");
  const filtered = tab === "All Packages" ? profilePackages : profilePackages.filter((item) => item.type === tab || tab === "Umrah" && item.type.includes("Umrah"));
  return <section className="section destination-detail-packages"><div className="container"><div className="destination-package-head"><div><span className="eyebrow">Journeys featuring the holy city</span><h2>Hajj & Umrah Packages in Makkah</h2><p>Compare dedicated pilgrimage packages from verified agencies.</p></div><div className="profile-tabs">{["All Packages", "Hajj", "Umrah", "Ramadan Umrah"].map((item) => <button className={tab === item ? "active" : ""} onClick={() => setTab(item)} key={item}>{item}</button>)}</div></div><div className="destination-detail-package-grid">{filtered.map((item) => <ProfilePackageCard item={item} key={item.name} />)}</div><Button variant="secondary" className="destination-view-packages" onClick={() => { navigateTo("/packages"); }}>View All Packages <Icon name="arrow" size={15} /></Button></div></section>;
}

function PilgrimTravelInfo() {
  const info = [["plane", "Getting to Makkah", "Pilgrims commonly travel through Saudi Arabia's international airports and continue by road or rail, depending on their itinerary."], ["star", "Accommodation", "Pilgrimage packages may include a range of hotel accommodation near Masjid al-Haram, subject to the selected category."], ["compass", "Local Transportation", "Transportation options depend on the confirmed travel arrangement, group schedule, and pilgrimage season."], ["shield", "Pilgrim Preparation", "Prepare valid travel documents, comfortable footwear, essential medication, and practical personal items."]] as const;
  return <section className="section pilgrim-travel-info"><div className="container"><SectionHeading eyebrow="Useful information before you travel" title="Pilgrim Travel Information" text="General guidance to help you understand common arrangements for a journey to Makkah." action="Read full guide" /><div>{info.map(([icon, title, text]) => <article key={title}><span><Icon name={icon} size={22} /></span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>;
}

function NearbyPilgrimageSites() {
  const places = [{ name: "Mina", image: photos.pilgrims, text: "A central Hajj site used during designated days of the pilgrimage." }, { name: "Arafat", image: photos.arafat, text: "The location of the essential standing on the Day of Arafah." }, { name: "Muzdalifah", image: photos.haram, text: "A significant stage of the Hajj journey between Arafat and Mina." }, { name: "Madinah", image: photos.madinah, text: "The sacred city of Al-Masjid an-Nabawi, included in many pilgrimage itineraries." }];
  return <section className="section nearby-sites"><div className="container"><SectionHeading eyebrow="Continue beyond the holy mosque" title="Explore Nearby Pilgrimage Sites" text="Discover other places included in Hajj journeys and extended Umrah itineraries." action="View all destinations" /><div>{places.map((place) => <article key={place.name}><img src={place.image} alt={place.name} /><div /><section><h3>{place.name}</h3><p>{place.text}</p><Button variant="light" onClick={() => { navigateTo(`/destinations/${place.name.toLowerCase()}`); }}>Explore Destination</Button></section></article>)}</div></div></section>;
}

function MakkahAgencies() {
  const items = [["AN", "Al Noor Hajj & Umrah", "Dhaka, Bangladesh", "4.9", "Organized Hajj and Umrah packages with attentive pilgrim support."], ["AM", "Al Madina Travels", "Sylhet, Bangladesh", "4.8", "Family-focused pilgrimage journeys with clear guidance and accommodation."], ["RH", "Rahman Hajj Services", "Chattogram, Bangladesh", "4.8", "Experienced Hajj coordinators offering premium and economy groups."]];
  return <section className="section makkah-agencies"><div className="container"><SectionHeading eyebrow="Verified pilgrimage partners" title="Agencies Offering Packages in Makkah" text="Connect with agencies providing dedicated Hajj and Umrah services." action="View all agencies" /><div>{items.map(([initials, name, location, rating, text]) => <article key={name}><span className="similar-logo">{initials}<i><Icon name="check" size={10} /></i></span><span className="profile-verified"><Icon name="shield" size={11} />Verified</span><h3>{name}</h3><p><Icon name="location" size={13} />{location}</p><Rating score={rating} reviews={186} /><p>{text}</p><div><Button onClick={() => { navigateTo("/agencies/al-noor-hajj-umrah"); }}>View Profile</Button><Button variant="secondary" onClick={() => { navigateTo("/packages"); }}>View Packages</Button></div></article>)}</div></div></section>;
}

function MakkahJourneyBanner() {
  return <section className="makkah-journey-banner"><img src={photos.makkah} alt="Masjid al-Haram in Makkah" /><div /><div className="container"><span className="eyebrow">Take the next step</span><h2>Plan Your Journey<br />to Makkah</h2><p>Explore pilgrimage packages and find an agency to help organize your Hajj or Umrah journey.</p><div><Button onClick={() => { navigateTo("/packages"); }}>Explore Hajj Packages</Button><Button variant="light" onClick={() => { navigateTo("/packages"); }}>Explore Umrah Packages</Button></div></div></section>;
}

function MakkahFAQ() {
  const faqs = [["Why is Makkah important for Hajj and Umrah?", "Makkah is home to Masjid al-Haram and the Kaaba. The rites of Hajj and Umrah center on worship in and around the sacred city."], ["What are the main pilgrimage sites in Makkah?", "Important places include Masjid al-Haram, the Kaaba, Mina, Arafat, Muzdalifah, and other sites connected with the pilgrimage."], ["How can I find Hajj and Umrah packages?", "Use the package section on this page or visit the package listing to compare verified agency offerings by category and price."], ["Can I visit Makkah during Ramadan?", "Umrah journeys are offered during Ramadan. Availability, entry requirements, and arrangements depend on confirmed agency packages."], ["Where can I find accommodation information?", "Package cards and agency details provide accommodation categories. Final hotel information should be confirmed directly with the travel agency."]];
  const [open, setOpen] = useState(0);
  return <section className="section makkah-faq"><div className="container"><div><span className="eyebrow">Helpful destination guidance</span><h2>Frequently Asked Questions About Makkah</h2><p>Concise answers to common questions from pilgrims planning Hajj or Umrah.</p></div><div>{faqs.map(([question, answer], index) => <article className={open === index ? "open" : ""} key={question}><button onClick={() => setOpen(open === index ? -1 : index)}><strong>{question}</strong><span>{open === index ? "−" : "+"}</span></button>{open === index && <p>{answer}</p>}</article>)}</div></div></section>;
}

function MakkahGuides() {
  const guides = [{ title: "Complete Umrah Preparation Guide", text: "Prepare your documents, essentials, and understanding of the Umrah journey.", image: photos.tawaf }, { title: "Hajj Travel Checklist", text: "A practical checklist for travel preparation, packing, health, and group coordination.", image: photos.pilgrims }, { title: "Important Places in Makkah", text: "Learn about Masjid al-Haram and the significant sites surrounding the holy city.", image: photos.kaaba }];
  return <section className="section makkah-guides"><div className="container"><SectionHeading eyebrow="Prepare with trusted information" title="Guides for Your Makkah Journey" text="Practical reading for pilgrims preparing to visit the holy city." action="View all guides" /><div>{guides.map((guide) => <article key={guide.title}><div><img src={guide.image} alt={guide.title} /><span>Travel Guide</span></div><section><h3>{guide.title}</h3><p>{guide.text}</p><Button variant="secondary">Read Guide <Icon name="arrow" size={14} /></Button></section></article>)}</div></div></section>;
}

function DestinationShareModal({ close }: { close: () => void }) {
  const [copied, setCopied] = useState(false);
  return <div className="event-modal"><button className="event-modal-backdrop" onClick={close} aria-label="Close share dialog" /><div className="event-share-card"><button className="event-modal-close" onClick={close}>×</button><span className="eyebrow">Share a sacred destination</span><h2>Share Makkah</h2><p>Share this Makkah destination guide with another pilgrim.</p><div><button className={copied ? "copied" : ""} onClick={() => { navigator.clipboard?.writeText(window.location.href); setCopied(true); }}><Icon name={copied ? "check" : "tag"} size={18} />{copied ? "Link Copied" : "Copy Link"}</button><button><strong>f</strong>Facebook</button><button><Icon name="people" size={18} />WhatsApp</button><button onClick={() => { window.location.href = "mailto:?subject=Discover Makkah"; }}><Icon name="mail" size={18} />Email</button></div>{copied && <small>The destination link has been copied.</small>}</div></div>;
}

function DestinationDetailsPage({ dark, toggleTheme }: { dark: boolean; toggleTheme: () => void }) {
  const [share, setShare] = useState(false);
  return <div className="app destination-details-page"><Header dark={dark} toggleTheme={toggleTheme} active="Destinations" /><main><DestinationDetailHero share={() => setShare(true)} /><DestinationOverview /><DestinationReligiousSites /><DestinationDetailGallery /><DestinationPackages /><PilgrimTravelInfo /><NearbyPilgrimageSites /><MakkahAgencies /><MakkahJourneyBanner /><MakkahFAQ /><MakkahGuides /><Newsletter title={<>Stay Informed for<br />Your Pilgrimage</>} description="Get Hajj and Umrah travel guides, destination updates, and package information." /></main><Footer />{share && <DestinationShareModal close={() => setShare(false)} />}</div>;
}

const guideDirectory = [
  { id: 1, name: "Abdul Rahman", specialization: "Hajj & Umrah Guidance", experience: 12, languages: ["Bengali", "Arabic", "English"], location: "Makkah, Saudi Arabia", rating: "4.9", reviews: 186, image: photos.guideMan, intro: "Experienced in pilgrimage preparation, group coordination, and practical guidance for pilgrims." },
  { id: 2, name: "Mohammad Yusuf", specialization: "Hajj Guidance", experience: 9, languages: ["Bengali", "Arabic"], location: "Makkah, Saudi Arabia", rating: "4.8", reviews: 142, image: photos.guide1, intro: "Supports Hajj groups with ritual guidance, sacred-site orientation, and daily coordination." },
  { id: 3, name: "Ayesha Karim", specialization: "Umrah Guidance", experience: 7, languages: ["Bengali", "English", "Arabic"], location: "Madinah, Saudi Arabia", rating: "4.9", reviews: 98, image: photos.guideWoman, intro: "Provides thoughtful Umrah preparation and guidance for women, families, and first-time pilgrims." },
  { id: 4, name: "Ibrahim Hassan", specialization: "Pilgrim Orientation", experience: 11, languages: ["Arabic", "English", "Urdu"], location: "Makkah, Saudi Arabia", rating: "4.7", reviews: 121, image: photos.guide4, intro: "Leads clear orientation sessions covering pilgrimage procedures, preparation, and travel readiness." },
  { id: 5, name: "Omar Faruk", specialization: "Group Pilgrimage", experience: 6, languages: ["Bengali", "Arabic", "English"], location: "Dhaka, Bangladesh", rating: "4.8", reviews: 76, image: photos.guide3, intro: "Coordinates pilgrimage groups before departure and provides practical support throughout travel." },
  { id: 6, name: "Khalid Mahmoud", specialization: "Hajj & Umrah Guidance", experience: 14, languages: ["Arabic", "English", "Urdu"], location: "Madinah, Saudi Arabia", rating: "5.0", reviews: 203, image: photos.guide2, intro: "A senior pilgrimage guide with extensive knowledge of Makkah, Madinah, and group support." },
];

type DirectoryGuide = typeof guideDirectory[number];

function GuidesHero() {
  return <><div className="guides-breadcrumb"><div className="container"><a href="/">Home</a><span>›</span><strong>Guides</strong></div></div><section className="guides-hero"><img src={photos.pilgrimGroup} alt="Pilgrims receiving guidance near Makkah" /><div className="guides-hero-overlay" /><div className="guides-hero-pattern" /><div className="container guides-hero-content"><span className="hero-kicker"><span />Knowledge · Guidance · Support</span><h1>Find Your Hajj & Umrah<br /><em>Guide</em></h1><p>Connect with experienced pilgrimage guides who can help you prepare for and navigate your spiritual journey.</p><form onSubmit={(event) => event.preventDefault()}><Icon name="search" size={19} /><input placeholder="Search guides by name, language, or expertise..." aria-label="Search guides" /><Button type="submit">Search Guides</Button></form><Button variant="light" onClick={() => document.querySelector("#all-guides")?.scrollIntoView({ behavior: "smooth" })}>Explore Guides <Icon name="arrow" size={15} /></Button></div></section></>;
}

function FeaturedGuide({ contact }: { contact: (guide: DirectoryGuide) => void }) {
  const guide = guideDirectory[0];
  return <section className="section featured-guide"><div className="container"><span className="eyebrow">Featured pilgrimage expert</span><article><div className="featured-guide-image"><img src={guide.image} alt={guide.name} /><div /><span><Icon name="shield" size={12} />Verified Guide</span></div><div className="featured-guide-content"><span>Hajj & Umrah Guidance</span><h2>{guide.name}</h2><p>{guide.intro}</p><div className="featured-guide-details"><span><Icon name="clock" size={17} /><small>Experience</small><strong>12 Years</strong></span><span><Icon name="globe" size={17} /><small>Languages</small><strong>Bengali, Arabic, English</strong></span><span><Icon name="location" size={17} /><small>Location</small><strong>{guide.location}</strong></span><span><Icon name="star" size={17} /><small>Traveler rating</small><strong>4.9 · 186 reviews</strong></span></div><div><Button onClick={() => { navigateTo("/guides/abdul-rahman"); }}>View Profile <Icon name="arrow" size={16} /></Button><Button variant="secondary" onClick={() => contact(guide)}>Contact Guide</Button></div></div></article></div></section>;
}

function GuideCard({ guide, contact }: { guide: DirectoryGuide; contact: (guide: DirectoryGuide) => void }) {
  return <article className="guide-directory-card"><div className="guide-directory-image"><img src={guide.image} alt={`${guide.name}, pilgrimage guide`} /><span><Icon name="shield" size={11} />Verified Guide</span></div><section><span>{guide.specialization}</span><h3>{guide.name}</h3><p>{guide.intro}</p><div className="guide-directory-info"><span><Icon name="clock" size={14} /><small>Experience</small><strong>{guide.experience} Years</strong></span><span><Icon name="globe" size={14} /><small>Languages</small><strong>{guide.languages.join(", ")}</strong></span><span><Icon name="location" size={14} /><small>Location</small><strong>{guide.location}</strong></span></div><div className="guide-directory-rating"><Rating score={guide.rating} reviews={guide.reviews} /></div><div className="guide-directory-actions"><Button onClick={() => { navigateTo(`/guides/${guide.name.toLowerCase().replaceAll(" ", "-")}`); }}>View Profile</Button><Button variant="secondary" onClick={() => contact(guide)}>Contact</Button></div></section></article>;
}

function GuideFilterPanel({ search, setSearch, specialization, setSpecialization, language, setLanguage, experience, setExperience, location, setLocation, clear, open, toggle }: { search: string; setSearch: (value: string) => void; specialization: string; setSpecialization: (value: string) => void; language: string; setLanguage: (value: string) => void; experience: string; setExperience: (value: string) => void; location: string; setLocation: (value: string) => void; clear: () => void; open: boolean; toggle: () => void }) {
  return <div className={`guide-filter-panel ${open ? "open" : ""}`}><button className="guide-filter-toggle" onClick={toggle}><Icon name="sliders" size={17} />Search & Filters <Icon name="chevron" size={14} /></button><div><label><Icon name="search" size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name or keyword" /></label><label><small>Specialization</small><select value={specialization} onChange={(event) => setSpecialization(event.target.value)}><option>All Specializations</option><option>Hajj Guidance</option><option>Umrah Guidance</option><option>Pilgrim Orientation</option><option>Group Pilgrimage</option><option>Hajj & Umrah Guidance</option></select></label><label><small>Language</small><select value={language} onChange={(event) => setLanguage(event.target.value)}><option>All Languages</option><option>Bengali</option><option>Arabic</option><option>English</option><option>Urdu</option><option>Hindi</option></select></label><label><small>Experience</small><select value={experience} onChange={(event) => setExperience(event.target.value)}><option>Any Experience</option><option>1–3 years</option><option>4–7 years</option><option>8–10 years</option><option>10+ years</option></select></label><label><small>Location</small><select value={location} onChange={(event) => setLocation(event.target.value)}><option>All Locations</option><option>Makkah, Saudi Arabia</option><option>Madinah, Saudi Arabia</option><option>Dhaka, Bangladesh</option></select></label><Button variant="ghost" onClick={clear}>Clear Filters</Button></div></div>;
}

function GuideExpertise({ apply }: { apply: (value: string) => void }) {
  const expertise = [["compass", "Hajj Guidance", "Help pilgrims understand Hajj preparation, sacred sites, and procedures."], ["location", "Umrah Guidance", "Support pilgrims with Umrah preparation and practical guidance."], ["shield", "Pilgrim Orientation", "Provide preparation sessions and clear information before travel."], ["people", "Group Pilgrimage", "Assist with group coordination and general pilgrimage guidance."]] as const;
  return <section className="section guide-expertise"><div className="container"><SectionHeading eyebrow="Find the right kind of support" title="Find Guides by Expertise" text="Explore pilgrimage guides based on the type of guidance you need." action="Browse all expertise" /><div>{expertise.map(([icon, title, text]) => <article key={title}><span><Icon name={icon} size={22} /></span><h3>{title}</h3><p>{text}</p><Button variant="ghost" onClick={() => apply(title)}>Explore Guides <Icon name="arrow" size={14} /></Button></article>)}</div></div></section>;
}

function GuideLanguages({ apply }: { apply: (value: string) => void }) {
  const languages = [["Bengali", "18 guides"], ["Arabic", "26 guides"], ["English", "22 guides"], ["Urdu", "12 guides"], ["Hindi", "8 guides"]];
  return <section className="section guide-languages"><div className="container"><SectionHeading eyebrow="Communicate with confidence" title="Find a Guide Who Speaks Your Language" text="Choose a language to discover guides who can support you clearly." action="All languages" /><div>{languages.map(([language, count]) => <button onClick={() => apply(language)} key={language}><span>{language.slice(0, 2).toUpperCase()}</span><div><strong>{language}</strong><small>{count}</small></div><Icon name="arrow" size={15} /></button>)}</div></div></section>;
}

function BecomeGuideCTA({ register }: { register: () => void }) {
  return <section className="become-guide"><img src={photos.madinahCourtyard} alt="Pilgrims at Al-Masjid an-Nabawi" /><div /><div className="container"><span className="eyebrow">Share your pilgrimage experience</span><h2>Are You a Hajj or<br />Umrah Guide?</h2><p>Join the Hajj Solutions guide directory and help pilgrims discover your experience and services.</p><div><Button onClick={register}>Register as a Guide <Icon name="arrow" size={16} /></Button><Button variant="light">Learn More</Button></div></div></section>;
}

function GuideFAQ() {
  const faqs = [["How can I find a Hajj or Umrah guide?", "Use the directory search and filters to compare guides by specialization, language, experience, and location."], ["What information is available on a guide profile?", "Profiles can include experience, languages, location, specialization, reviews, and contact options."], ["Can I contact a guide directly?", "Yes. Use the Contact button to send an inquiry through the directory."], ["What does the Verified Guide badge mean?", "It indicates that the platform has reviewed the guide's submitted profile information. It is not a guarantee of a specific outcome."], ["Can I filter guides by language?", "Yes. Select a language in the filter bar or choose one of the language cards."], ["How can I register as a guide?", "Use the Register as a Guide action and submit your experience and contact information for review."]];
  const [open, setOpen] = useState(0);
  return <section className="section guide-faq"><div className="container"><div><span className="eyebrow">Using the guide directory</span><h2>Frequently Asked Questions</h2><p>Helpful answers about searching, contacting, and registering as a guide.</p></div><div>{faqs.map(([question, answer], index) => <article className={open === index ? "open" : ""} key={question}><button onClick={() => setOpen(open === index ? -1 : index)}><strong>{question}</strong><span>{open === index ? "−" : "+"}</span></button>{open === index && <p>{answer}</p>}</article>)}</div></div></section>;
}

function GuideContactModal({ guide, close }: { guide: DirectoryGuide; close: () => void }) {
  const [sent, setSent] = useState(false);
  return <div className="event-modal"><button className="event-modal-backdrop" onClick={close} aria-label="Close contact form" /><div className="event-modal-card guide-contact-modal"><button className="event-modal-close" onClick={close}>×</button>{sent ? <div className="event-registration-success"><span><Icon name="check" size={23} /></span><h2>Inquiry Sent</h2><p>Your inquiry has been sent to {guide.name}. You will be contacted if the guide is available.</p><Button onClick={close}>Done</Button></div> : <><div className="guide-modal-profile"><img src={guide.image} alt={guide.name} /><div><span className="eyebrow">Contact verified guide</span><h2>{guide.name}</h2><p>{guide.specialization}</p></div></div><form onSubmit={(event) => { event.preventDefault(); setSent(true); }}><label>Full Name *<input required placeholder="Your full name" /></label><label>Email Address *<input required type="email" placeholder="name@example.com" /></label><label>Phone Number<input placeholder="+880" /></label><label>Guidance Needed<select><option>Hajj Guidance</option><option>Umrah Guidance</option><option>Pilgrim Orientation</option><option>Group Guidance</option></select></label><label>Message *<textarea required rows={4} placeholder="Tell the guide about your pilgrimage needs..." /></label><Button type="submit">Send Inquiry <Icon name="arrow" size={16} /></Button></form></>}</div></div>;
}

function GuideRegistrationModal({ close }: { close: () => void }) {
  const [sent, setSent] = useState(false);
  return <div className="event-modal"><button className="event-modal-backdrop" onClick={close} aria-label="Close guide registration" /><div className="event-modal-card guide-contact-modal"><button className="event-modal-close" onClick={close}>×</button>{sent ? <div className="event-registration-success"><span><Icon name="check" size={23} /></span><h2>Profile Submitted</h2><p>Your guide registration has been submitted for review. The directory team will contact you with next steps.</p><Button onClick={close}>Done</Button></div> : <><span className="eyebrow">Join the pilgrimage guide directory</span><h2>Register as a Guide</h2><form onSubmit={(event) => { event.preventDefault(); setSent(true); }}><label>Full Name *<input required placeholder="Your full name" /></label><label>Email Address *<input required type="email" placeholder="name@example.com" /></label><label>Primary Specialization<select><option>Hajj Guidance</option><option>Umrah Guidance</option><option>Pilgrim Orientation</option><option>Group Pilgrimage</option></select></label><label>Years of Experience<input required type="number" min="1" placeholder="Years" /></label><label>Languages Spoken *<input required placeholder="Bengali, Arabic, English" /></label><Button type="submit">Submit for Review <Icon name="arrow" size={16} /></Button></form></>}</div></div>;
}

function GuidesListingPage({ dark, toggleTheme }: { dark: boolean; toggleTheme: () => void }) {
  const categories = ["All Guides", "Hajj Guides", "Umrah Guides", "Group Guides", "Arabic-Speaking Guides", "Bengali-Speaking Guides"];
  const [tab, setTab] = useState("All Guides");
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("All Specializations");
  const [language, setLanguage] = useState("All Languages");
  const [experience, setExperience] = useState("Any Experience");
  const [location, setLocation] = useState("All Locations");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [contact, setContact] = useState<DirectoryGuide | null>(null);
  const [register, setRegister] = useState(false);
  function experienceMatch(years: number) { if (experience === "Any Experience") return true; if (experience === "1–3 years") return years <= 3; if (experience === "4–7 years") return years >= 4 && years <= 7; if (experience === "8–10 years") return years >= 8 && years <= 10; return years > 10; }
  const filtered = guideDirectory.filter((guide) => (!search || `${guide.name} ${guide.specialization} ${guide.languages.join(" ")}`.toLowerCase().includes(search.toLowerCase())) && (specialization === "All Specializations" || guide.specialization === specialization) && (language === "All Languages" || guide.languages.includes(language)) && experienceMatch(guide.experience) && (location === "All Locations" || guide.location === location) && (tab === "All Guides" || tab === "Hajj Guides" && guide.specialization.includes("Hajj") || tab === "Umrah Guides" && guide.specialization.includes("Umrah") || tab === "Group Guides" && guide.specialization === "Group Pilgrimage" || tab === "Arabic-Speaking Guides" && guide.languages.includes("Arabic") || tab === "Bengali-Speaking Guides" && guide.languages.includes("Bengali")));
  const clear = () => { setSearch(""); setSpecialization("All Specializations"); setLanguage("All Languages"); setExperience("Any Experience"); setLocation("All Locations"); setTab("All Guides"); };
  const applySpecialization = (value: string) => { setSpecialization(value); document.querySelector("#all-guides")?.scrollIntoView({ behavior: "smooth" }); };
  const applyLanguage = (value: string) => { setLanguage(value); document.querySelector("#all-guides")?.scrollIntoView({ behavior: "smooth" }); };
  return <div className="app guides-listing-page"><Header dark={dark} toggleTheme={toggleTheme} active="Guides" /><main><GuidesHero /><section className="guide-categories"><div className="container">{categories.map((item, index) => <button className={tab === item ? "active" : ""} onClick={() => setTab(item)} key={item}><Icon name={index < 3 ? "people" : "globe"} size={16} />{item}</button>)}</div></section><FeaturedGuide contact={setContact} /><section className="section all-guides-section" id="all-guides"><div className="container"><SectionHeading eyebrow="Pilgrimage experience you can explore" title="Explore Hajj & Umrah Guides" text="Find guides with experience and expertise suited to your pilgrimage needs." action={`${filtered.length} guides found`} /><GuideFilterPanel search={search} setSearch={setSearch} specialization={specialization} setSpecialization={setSpecialization} language={language} setLanguage={setLanguage} experience={experience} setExperience={setExperience} location={location} setLocation={setLocation} clear={clear} open={filtersOpen} toggle={() => setFiltersOpen(!filtersOpen)} /><div className="guide-directory-grid">{filtered.map((guide) => <GuideCard guide={guide} contact={setContact} key={guide.id} />)}</div>{!filtered.length && <div className="guides-empty"><Icon name="people" size={28} /><h3>No guides match these filters</h3><p>Clear the filters to browse all pilgrimage guides.</p><Button variant="secondary" onClick={clear}>Clear Filters</Button></div>}</div></section><GuideExpertise apply={applySpecialization} /><GuideLanguages apply={applyLanguage} /><BecomeGuideCTA register={() => setRegister(true)} /><GuideFAQ /><Newsletter title={<>Stay Updated for<br />Your Pilgrimage</>} description="Get helpful Hajj and Umrah guides, travel tips, and pilgrimage updates." /></main><Footer />{contact && <GuideContactModal guide={contact} close={() => setContact(null)} />}{register && <GuideRegistrationModal close={() => setRegister(false)} />}</div>;
}

function GuideProfileHero({ contact, share }: { contact: () => void; share: () => void }) {
  return <><div className="guide-profile-breadcrumb"><div className="container"><a href="/">Home</a><span>›</span><a href="/guides">Guides</a><span>›</span><strong>Abdul Rahman</strong></div></div><section className="guide-profile-hero"><div className="container"><div className="guide-profile-portrait"><img src={photos.guideMan} alt="Abdul Rahman, Hajj and Umrah guide" /><span><Icon name="shield" size={12} />Verified Guide</span></div><div className="guide-profile-intro"><span className="eyebrow">Experienced pilgrimage support</span><h1>Abdul Rahman</h1><h2>Hajj & Umrah Guide</h2><p>An experienced pilgrimage guide specializing in Hajj and Umrah preparation, group coordination, and practical guidance for pilgrims.</p><div className="guide-profile-rating"><Rating score="4.9" reviews={186} /><span>Excellent</span></div><div className="guide-profile-facts"><span><Icon name="location" size={17} /><small>Location</small><strong>Makkah, Saudi Arabia</strong></span><span><Icon name="clock" size={17} /><small>Experience</small><strong>12 Years</strong></span><span><Icon name="globe" size={17} /><small>Languages</small><strong>Bengali, Arabic, English</strong></span></div><div className="guide-profile-actions"><Button onClick={contact}><Icon name="headset" size={16} />Contact Guide</Button><Button variant="secondary" onClick={contact}><Icon name="mail" size={16} />Send Inquiry</Button><Button variant="ghost" onClick={share}><Icon name="arrow" size={16} />Share Profile</Button></div></div></div></section></>;
}

function GuideProfileStats() {
  const stats = [["clock", "12+", "Years of Experience"], ["people", "186", "Pilgrim Reviews"], ["star", "4.9", "Average Rating"], ["globe", "3", "Languages"]] as const;
  return <section className="guide-profile-stats"><div className="container">{stats.map(([icon, value, label]) => <article key={label}><span><Icon name={icon} size={21} /></span><div><strong>{value}</strong><small>{label}</small></div></article>)}</div></section>;
}

function GuideProfileAbout() {
  const [more, setMore] = useState(false);
  return <section className="guide-profile-card"><span className="eyebrow">Professional pilgrimage support</span><h2>About Abdul Rahman</h2><p>Abdul Rahman is an experienced Hajj and Umrah guide with 12 years of experience supporting pilgrims. He specializes in pilgrimage preparation, group coordination, and practical guidance for visitors traveling to Makkah and Madinah.</p><p>He helps pilgrims understand the stages of their journey, prepare for travel, and navigate important pilgrimage arrangements.</p>{more && <p>His approach emphasizes clear explanation, respectful communication, patient group support, and practical preparation before and during the pilgrimage.</p>}<Button variant="ghost" onClick={() => setMore(!more)}>{more ? "Show Less" : "Read More"} <Icon name="arrow" size={14} /></Button><div className="guide-background-grid"><span><small>Professional background</small><strong>Hajj and Umrah group guidance</strong></span><span><small>Areas of expertise</small><strong>Preparation · Orientation · Coordination</strong></span><span><small>Experience summary</small><strong>12 years supporting pilgrims</strong></span><span><small>Support approach</small><strong>Clear, patient, practical guidance</strong></span></div></section>;
}

function GuideProfileExpertise() {
  const items = [["compass", "Hajj Guidance", "Guidance on Hajj preparation and pilgrimage procedures."], ["location", "Umrah Guidance", "Practical information for pilgrims preparing for Umrah."], ["shield", "Pilgrim Orientation", "Pre-travel orientation and preparation sessions."], ["people", "Group Pilgrimage", "General support for organized pilgrimage groups."]] as const;
  return <section className="guide-profile-card"><span className="eyebrow">Knowledge for the sacred journey</span><h2>Areas of Expertise</h2><div className="guide-profile-expertise">{items.map(([icon, title, text]) => <article key={title}><span><Icon name={icon} size={20} /></span><h3>{title}</h3><p>{text}</p></article>)}</div></section>;
}

function GuideProfileLanguages() {
  return <section className="guide-profile-card guide-profile-languages"><span className="eyebrow">Clear and comfortable communication</span><h2>Languages Spoken</h2><div>{[["BE", "Bengali", "Native proficiency"], ["AR", "Arabic", "Professional proficiency"], ["EN", "English", "Professional proficiency"]].map(([initials, language, level]) => <span key={language}><i>{initials}</i><strong>{language}</strong><small>{level}</small></span>)}</div></section>;
}

function GuideExperienceTimeline() {
  const items = [["2014–Present", "Hajj & Umrah Guide", "Supporting pilgrims with preparation and general pilgrimage guidance.", "Assisting with group coordination and travel orientation."], ["2018–Present", "Pilgrim Orientation", "Conducting preparation sessions for Hajj and Umrah groups.", "Explaining travel requirements and pilgrimage procedures."]];
  return <section className="guide-profile-card"><span className="eyebrow">A record of pilgrimage support</span><h2>Experience & Background</h2><div className="guide-experience-timeline">{items.map(([date, title, first, second]) => <article key={title}><span><Icon name="clock" size={17} /></span><time>{date}</time><div><h3>{title}</h3><p><Icon name="check" size={11} />{first}</p><p><Icon name="check" size={11} />{second}</p></div></article>)}</div></section>;
}

function GuideProfileServices({ contact }: { contact: () => void }) {
  const services = [["compass", "Hajj Preparation Guidance", "Practical preparation and an overview of Hajj procedures."], ["location", "Umrah Preparation Guidance", "Clear information about Umrah rites and travel readiness."], ["shield", "Pilgrim Orientation Sessions", "Pre-travel sessions covering documents, packing, and expectations."], ["people", "Group Pilgrimage Support", "General coordination support for organized pilgrim groups."], ["star", "Makkah Site Guidance", "Context and orientation for important pilgrimage locations."], ["globe", "Madinah Site Guidance", "General guidance for significant sites in and around Madinah."]] as const;
  return <section className="guide-profile-card"><span className="eyebrow">Ways this guide can support you</span><h2>Guide Services</h2><div className="guide-profile-services">{services.map(([icon, title, text]) => <article key={title}><span><Icon name={icon} size={19} /></span><h3>{title}</h3><p>{text}</p><Button variant="ghost" onClick={contact}>Contact Guide <Icon name="arrow" size={13} /></Button></article>)}</div></section>;
}

function GuideProfileReviews() {
  const [filter, setFilter] = useState("All Reviews");
  const reviews = [["AR", "Abdullah Rahman", "Helpful Hajj Guidance", "Abdul Rahman provided helpful guidance throughout our Hajj preparation. His explanations were clear, and he was supportive during our journey.", "October 2026"], ["FA", "Fatima Akter", "Excellent Umrah Support", "The orientation was informative, and the guidance helped us understand what to expect during our Umrah journey.", "September 2026"]];
  const visible = filter === "4 Stars" ? [] : reviews;
  return <section className="guide-profile-card"><div className="guide-profile-section-head"><div><span className="eyebrow">Feedback from verified pilgrims</span><h2>Reviews from Pilgrims</h2></div><div className="profile-tabs">{["All Reviews", "5 Stars", "4 Stars"].map((item) => <button className={filter === item ? "active" : ""} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div></div><div className="guide-review-summary"><div><strong>4.9</strong><Rating score="4.9" /><small>186 total reviews</small></div><div>{[["5", 90], ["4", 8], ["3", 2], ["2", 0], ["1", 0]].map(([star, value]) => <span key={star}><small>{star} stars</small><progress max="100" value={Number(value)} /><small>{value}%</small></span>)}</div></div>{visible.length ? <div className="guide-profile-review-list">{visible.map(([initials, name, title, text, date]) => <article key={name}><div><span>{initials}</span><div><strong>{name}</strong><small><Icon name="check" size={10} />Verified pilgrim</small></div><time>{date}</time></div><Rating score="5.0" /><h3>{title}</h3><p>{text}</p></article>)}</div> : <p className="reviews-empty">No 4-star reviews are included in this preview.</p>}<Button variant="secondary">View All Reviews</Button></section>;
}

function GuideProfileGallery() {
  const images = [photos.guideMan, photos.eventWorkshop, photos.eventHall, photos.kaaba, photos.madinah, photos.pilgrimGroup];
  const [active, setActive] = useState<number | null>(null);
  const move = (direction: number) => setActive((current) => current === null ? 0 : (current + direction + images.length) % images.length);
  return <section className="guide-profile-card"><span className="eyebrow">Pilgrimage guidance in practice</span><h2>Guide Gallery</h2><div className="guide-profile-gallery">{images.map((image, index) => <button onClick={() => setActive(index)} key={image}><img src={image} alt={["Abdul Rahman portrait", "Pilgrim orientation session", "Group guidance session", "Guidance in Makkah", "Pilgrimage guidance in Madinah", "Pilgrim group support"][index]} /></button>)}</div>{active !== null && <div className="guide-gallery-lightbox"><button className="gallery-close" onClick={() => setActive(null)}>×</button><button className="gallery-prev" onClick={() => move(-1)}>‹</button><img src={images[active]} alt="Guide gallery enlarged view" /><button className="gallery-next" onClick={() => move(1)}>›</button><span>{active + 1} / {images.length}</span></div>}</section>;
}

function GuideProfileFAQ() {
  const faqs = [["What services does this guide provide?", "Abdul Rahman offers Hajj and Umrah preparation, pilgrim orientation, group support, and general sacred-site guidance."], ["Can I contact the guide before my pilgrimage?", "Yes. Use the inquiry form to describe your plans and preferred contact method."], ["Which languages does the guide speak?", "Abdul Rahman speaks Bengali, Arabic, and English."], ["Does the guide provide Hajj and Umrah orientation?", "Yes. Pilgrim orientation is one of the guide's listed areas of expertise."], ["How can I submit an inquiry?", "Select Contact Guide or Send Inquiry, complete the required details, and submit the form for the guide to review."]];
  const [open, setOpen] = useState(0);
  return <section className="guide-profile-card"><span className="eyebrow">Before you get in touch</span><h2>Frequently Asked Questions</h2><div className="guide-profile-faq">{faqs.map(([question, answer], index) => <article className={open === index ? "open" : ""} key={question}><button onClick={() => setOpen(open === index ? -1 : index)}><strong>{question}</strong><span>{open === index ? "−" : "+"}</span></button>{open === index && <p>{answer}</p>}</article>)}</div></section>;
}

function GuideProfileSidebar({ contact }: { contact: () => void }) {
  return <aside className="guide-profile-sidebar"><img src={photos.guideMan} alt="Abdul Rahman" /><span className="profile-verified"><Icon name="shield" size={11} />Verified Guide</span><h2>Abdul Rahman</h2><p><Icon name="location" size={13} />Makkah, Saudi Arabia</p><div><span><small>Languages</small><strong>Bengali, Arabic, English</strong></span><span><small>Specialization</small><strong>Hajj & Umrah Guidance</strong></span></div><Button onClick={contact}><Icon name="headset" size={16} />Contact Guide</Button><Button variant="secondary" onClick={contact}><Icon name="mail" size={16} />Send Inquiry</Button><p className="guide-sidebar-note">Contact the guide to discuss your pilgrimage guidance needs.</p></aside>;
}

function GuideProfileInquiry({ close }: { close: () => void }) {
  const [sent, setSent] = useState(false);
  return <div className="event-modal"><button className="event-modal-backdrop" onClick={close} aria-label="Close inquiry" /><div className="event-modal-card guide-contact-modal"><button className="event-modal-close" onClick={close}>×</button>{sent ? <div className="event-registration-success"><span><Icon name="check" size={23} /></span><h2>Inquiry Submitted</h2><p>Your inquiry has been submitted successfully. The guide will contact you using your preferred contact method.</p><Button onClick={close}>Done</Button></div> : <><span className="eyebrow">Contact Abdul Rahman</span><h2>Send an Inquiry</h2><form onSubmit={(event) => { event.preventDefault(); setSent(true); }}><label>Full Name *<input required minLength={2} placeholder="Your full name" /></label><label>Email Address *<input required type="email" placeholder="name@example.com" /></label><label>Phone Number *<input required minLength={7} placeholder="+880" /></label><div className="guide-inquiry-row"><label>Interested In *<select required><option>Hajj</option><option>Umrah</option></select></label><label>Number of Pilgrims *<select required><option>1</option><option>2</option><option>3</option><option>4+</option></select></label></div><label>Preferred Contact Method<select><option>Phone</option><option>Email</option></select></label><label>Message *<textarea required rows={4} placeholder="Tell Abdul Rahman about your guidance needs..." /></label><Button type="submit">Submit Inquiry <Icon name="arrow" size={16} /></Button></form></>}</div></div>;
}

function GuideShareModal({ close }: { close: () => void }) {
  const [copied, setCopied] = useState(false);
  return <div className="event-modal"><button className="event-modal-backdrop" onClick={close} aria-label="Close share dialog" /><div className="event-share-card"><button className="event-modal-close" onClick={close}>×</button><span className="eyebrow">Share a pilgrimage guide</span><h2>Share Profile</h2><p>Share Abdul Rahman’s guide profile with another pilgrim.</p><div><button className={copied ? "copied" : ""} onClick={() => { navigator.clipboard?.writeText(window.location.href); setCopied(true); }}><Icon name={copied ? "check" : "tag"} size={18} />{copied ? "Link Copied" : "Copy Profile Link"}</button><button><Icon name="people" size={18} />WhatsApp</button><button><strong>f</strong>Facebook</button><button onClick={() => { window.location.href = "mailto:?subject=Hajj and Umrah Guide"; }}><Icon name="mail" size={18} />Email</button></div>{copied && <small>The profile link has been copied.</small>}</div></div>;
}

function RelatedGuideProfiles({ contact }: { contact: (guide: DirectoryGuide) => void }) {
  return <section className="section related-guide-profiles"><div className="container"><SectionHeading eyebrow="More pilgrimage experts" title="You May Also Explore" text="Discover other verified guides with Hajj, Umrah, and orientation experience." action="View all guides" /><div>{guideDirectory.slice(1, 4).map((guide) => <GuideCard guide={guide} contact={contact} key={guide.id} />)}</div></div></section>;
}

function GuideProfilePage({ dark, toggleTheme }: { dark: boolean; toggleTheme: () => void }) {
  const [inquiry, setInquiry] = useState(false);
  const [share, setShare] = useState(false);
  const [relatedContact, setRelatedContact] = useState<DirectoryGuide | null>(null);
  return <div className="app guide-profile-page"><Header dark={dark} toggleTheme={toggleTheme} active="Guides" /><main><GuideProfileHero contact={() => setInquiry(true)} share={() => setShare(true)} /><GuideProfileStats /><div className="container guide-profile-layout"><div className="guide-profile-main"><GuideProfileAbout /><GuideProfileExpertise /><GuideProfileLanguages /><GuideExperienceTimeline /><GuideProfileServices contact={() => setInquiry(true)} /><GuideProfileReviews /><GuideProfileGallery /><GuideProfileFAQ /></div><div className="guide-profile-aside"><GuideProfileSidebar contact={() => setInquiry(true)} /></div></div><RelatedGuideProfiles contact={setRelatedContact} /><Newsletter title={<>Stay Updated for<br />Your Pilgrimage</>} description="Receive Hajj and Umrah guides, travel tips, and pilgrimage updates." /></main><Footer />{inquiry && <GuideProfileInquiry close={() => setInquiry(false)} />}{share && <GuideShareModal close={() => setShare(false)} />}{relatedContact && <GuideContactModal guide={relatedContact} close={() => setRelatedContact(null)} />}</div>;
}

const journalArticles = [
  { id: 1, category: "UMRAH GUIDE", tab: "Umrah Guides", title: "A Step-by-Step Guide to Performing Umrah", description: "Understand the essential stages of Umrah, from Ihram to completing Tawaf and Sa’i.", date: "September 12, 2026", read: "7 min read", image: photos.tawaf },
  { id: 2, category: "HAJJ PREPARATION", tab: "Preparation Tips", title: "What to Pack for Your Hajj Journey", description: "A practical packing checklist covering essential clothing, documents, personal items, and travel necessities.", date: "September 08, 2026", read: "6 min read", image: photos.hajjPacking },
  { id: 3, category: "TRAVEL INFORMATION", tab: "Travel Information", title: "Understanding Your Journey Between Makkah and Madinah", description: "Learn about the journey between the two holy cities and what pilgrims should consider when planning their itinerary.", date: "September 02, 2026", read: "5 min read", image: photos.madinah },
  { id: 4, category: "UMRAH GUIDE", tab: "Umrah Guides", title: "A First-Time Pilgrim’s Guide to Umrah", description: "Helpful information for first-time pilgrims, including preparation, essential items, and what to expect.", date: "August 25, 2026", read: "8 min read", image: photos.pilgrims },
  { id: 5, category: "RITUALS & GUIDANCE", tab: "Rituals & Guidance", title: "Understanding Ihram: Essential Information for Pilgrims", description: "Learn about Ihram, its purpose, and important considerations before beginning your pilgrimage.", date: "August 18, 2026", read: "6 min read", image: photos.ihram },
  { id: 6, category: "HAJJ GUIDE", tab: "Hajj Guides", title: "How to Prepare for the Days of Hajj", description: "Explore practical ways to organize your schedule, prepare your essentials, and understand the main stages of Hajj.", date: "August 10, 2026", read: "9 min read", image: photos.arafat },
];

type JournalArticle = typeof journalArticles[number];

function BlogEditorialHero({ search, setSearch }: { search: string; setSearch: (value: string) => void }) {
  return <><div className="blog-breadcrumb"><div className="container"><a href="/">Home</a><span>›</span><strong>Blog</strong></div></div><section className="blog-editorial-hero"><div className="blog-editorial-pattern" /><div className="container"><span className="eyebrow">Hajj Solutions Journal</span><h1>Insights for Your<br /><em>Sacred Journey</em></h1><p>Explore practical Hajj and Umrah guides, preparation tips, and helpful insights to make your pilgrimage more meaningful and organized.</p><form onSubmit={(event) => event.preventDefault()}><Icon name="search" size={19} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search articles, guides, and tips" /><Button type="submit"><Icon name="search" size={16} />Search</Button></form></div></section></>;
}

function FeaturedJournalArticle() {
  return <section className="section journal-featured"><div className="container"><article><div className="journal-featured-image"><img src={photos.kaaba} alt="Pilgrims near the Kaaba preparing for Umrah" /><span>Featured Story</span></div><div className="journal-featured-copy"><span>Umrah Guide</span><h2>Your Complete Guide to Preparing for Umrah</h2><p>From planning your journey to understanding the essential rituals, explore the key steps to prepare for a smooth and meaningful Umrah experience.</p><div className="journal-author"><span>HS</span><div><strong>Hajj Solutions Editorial Team</strong><small>September 18, 2026 · 8 min read</small></div></div><Button onClick={() => { navigateTo("/blog/complete-guide-preparing-for-umrah"); }}>Read Full Article <Icon name="arrow" size={16} /></Button></div></article></div></section>;
}

function JournalArticleCard({ article }: { article: JournalArticle }) {
  return <article className="journal-card"><div><img src={article.image} alt={article.title} /><span>{article.category}</span></div><section><div><span>{article.date}</span><i /> <span>{article.read}</span></div><h3>{article.title}</h3><p>{article.description}</p><a href={`/blog/${article.title.toLowerCase().replaceAll(" ", "-").replaceAll("’", "")}`}>Read Article <Icon name="arrow" size={15} /></a></section></article>;
}

function JournalNewsletter() {
  const [subscribed, setSubscribed] = useState(false);
  return <section className="journal-newsletter"><div className="journal-newsletter-accent" /><div className="container"><div><span className="eyebrow">Thoughtful guidance, delivered</span><h2>Stay Informed for Your Sacred Journey</h2><p>Receive useful Hajj and Umrah guides, preparation tips, and important updates directly in your inbox.</p></div><form onSubmit={(event) => { event.preventDefault(); setSubscribed(true); }}><div><Icon name="mail" size={18} /><input required type="email" placeholder="Enter your email address" /><Button type="submit">{subscribed ? "Subscribed" : "Subscribe"} <Icon name={subscribed ? "check" : "arrow"} size={15} /></Button></div><small>{subscribed ? "Thank you. Pilgrimage insights will be sent to your inbox." : "By subscribing, you agree to receive updates from Hajj Solutions."}</small></form></div></section>;
}

function BlogListingPage({ dark, toggleTheme }: { dark: boolean; toggleTheme: () => void }) {
  const categories = ["All Articles", "Hajj Guides", "Umrah Guides", "Preparation Tips", "Travel Information", "Rituals & Guidance", "Pilgrim Stories"];
  const [category, setCategory] = useState("All Articles");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const filtered = journalArticles.filter((article) => (category === "All Articles" || article.tab === category) && (!search || `${article.title} ${article.description} ${article.category}`.toLowerCase().includes(search.toLowerCase())));
  return <div className="app blog-listing-page"><Header dark={dark} toggleTheme={toggleTheme} active="Blog" /><main><BlogEditorialHero search={search} setSearch={setSearch} /><FeaturedJournalArticle /><section className="journal-categories"><div className="container">{categories.map((item) => <button className={category === item ? "active" : ""} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div></section><section className="section journal-grid-section"><div className="container"><div className="journal-grid-heading"><div><span className="eyebrow">Latest from the journal</span><h2>Hajj & Umrah Articles</h2><p>Practical guidance and thoughtful insights for every stage of your pilgrimage.</p></div><strong>{filtered.length} articles</strong></div>{filtered.length ? <div className="journal-grid">{filtered.map((article) => <JournalArticleCard article={article} key={article.id} />)}</div> : <div className="journal-empty"><Icon name="search" size={27} /><h3>No articles match your search</h3><p>Try another search or select All Articles.</p><Button variant="secondary" onClick={() => { setSearch(""); setCategory("All Articles"); }}>Clear Search</Button></div>}<div className="journal-pagination"><button disabled={page === 1} onClick={() => setPage(Math.max(1, page - 1))}>Previous</button>{[1, 2, 3].map((item) => <button className={page === item ? "active" : ""} onClick={() => setPage(item)} key={item}>{item}</button>)}<span>…</span><button className={page === 8 ? "active" : ""} onClick={() => setPage(8)}>8</button><button onClick={() => setPage(Math.min(8, page + 1))}>Next</button></div></div></section><JournalNewsletter /></main><Footer /></div>;
}

function ArticleShareControls({ compact = false }: { compact?: boolean }) {
  const [copied, setCopied] = useState(false);
  return <div className={`article-share-controls ${compact ? "compact" : ""}`}><span>{compact ? "Share" : "Share this article"}</span><button aria-label="Share on Facebook"><strong>f</strong></button><button aria-label="Share on LinkedIn"><strong>in</strong></button><button className={copied ? "copied" : ""} onClick={() => { navigator.clipboard?.writeText(window.location.href); setCopied(true); }}><Icon name={copied ? "check" : "tag"} size={14} />{!compact && (copied ? "Copied" : "Copy link")}</button></div>;
}

function ArticleHeader() {
  return <><div className="article-breadcrumb"><div className="container"><a href="/">Home</a><span>›</span><a href="/blog">Blog</a><span>›</span><a href="/blog">Umrah Guides</a><span>›</span><strong>Your Complete Guide to Preparing for Umrah</strong></div></div><header className="article-header"><div className="container"><span className="article-category">Umrah Guide</span><h1>Your Complete Guide to<br />Preparing for Umrah</h1><p>Everything you need to know before beginning your Umrah journey, from planning and packing to understanding the essential rituals.</p><div className="article-header-bottom"><div className="article-author"><span>HS</span><div><strong>Hajj Solutions Editorial Team</strong><small>September 18, 2026 · 8 min read</small></div></div><ArticleShareControls compact /></div></div></header></>;
}

function ArticleCover() {
  return <figure className="article-cover container"><img src={photos.kaaba} alt="Pilgrims performing Tawaf at Masjid al-Haram" /><figcaption>Pilgrims performing Tawaf at Masjid al-Haram</figcaption></figure>;
}

const articleSections = [
  ["understanding-umrah", "Understanding Umrah"],
  ["planning", "When to Plan Your Journey"],
  ["documents", "Essential Travel Documents"],
  ["packing", "What to Pack"],
  ["rituals", "Understanding the Rituals"],
  ["health", "Health and Personal Preparation"],
  ["checklist", "Final Checklist"],
];

function ArticleTableOfContents({ active, setActive }: { active: string; setActive: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  return <aside className={`article-toc ${open ? "open" : ""}`}><button className="article-toc-toggle" onClick={() => setOpen(!open)}><span>In This Article</span><Icon name="chevron" size={14} /></button><h3>In This Article</h3><nav>{articleSections.map(([id, label], index) => <a className={active === id ? "active" : ""} href={`#${id}`} onClick={() => { setActive(id); setOpen(false); }} key={id}><span>{String(index + 1).padStart(2, "0")}</span>{label}</a>)}</nav></aside>;
}

function ArticleChecklist({ items }: { items: string[] }) {
  return <div className="article-checklist">{items.map((item) => <span key={item}><i><Icon name="check" size={12} /></i>{item}</span>)}</div>;
}

function ArticleBody({ setActive }: { setActive: (value: string) => void }) {
  const documents = ["Valid passport", "Required visa or travel authorization", "Flight tickets", "Hotel booking confirmation", "Emergency contact information", "Copies of important documents"];
  const personal = ["Comfortable footwear", "Appropriate clothing", "Personal hygiene items", "Regular personal medications, if applicable", "Reusable water bottle"];
  const travel = ["Passport and travel documents", "Phone and charger", "Small travel bag", "Prayer essentials", "Copies of important documents"];
  const rituals = [["01", "Ihram", "Enter the sacred state with the appropriate intention and prescribed clothing before crossing the relevant boundary."], ["02", "Tawaf", "Circumambulate the Kaaba seven times, beginning from the appropriate starting point."], ["03", "Sa’i", "Walk between Safa and Marwah seven times as part of completing the Umrah rites."], ["04", "Halq or Taqsir", "Conclude Umrah by shaving or shortening the hair according to the applicable guidance."]];
  return <article className="article-body"><p className="article-lead">Preparing for Umrah involves more than arranging a flight and hotel. Thoughtful planning can help pilgrims approach the journey with clarity, practical readiness, and space for meaningful worship.</p><section id="understanding-umrah" onMouseEnter={() => setActive("understanding-umrah")}><span className="article-section-number">01</span><h2>Understanding Umrah</h2><p>Umrah is an Islamic pilgrimage to Makkah that includes specific rites performed in and around Masjid al-Haram. Unlike Hajj, which takes place during designated days, Umrah can generally be performed at different times of the year, subject to current travel requirements and arrangements.</p><p>The main rites include entering Ihram, performing Tawaf around the Kaaba, completing Sa’i between Safa and Marwah, and concluding with Halq or Taqsir.</p></section><section id="planning" onMouseEnter={() => setActive("planning")}><span className="article-section-number">02</span><h2>When to Plan Your Journey</h2><p>Begin by considering your preferred travel dates, the duration of your stay, accommodation in Makkah and Madinah, and transportation between important locations. Seasonal demand and package availability may influence your options.</p><p>Review every confirmed arrangement carefully, including flights, hotel locations, airport transfers, and the support provided by your selected agency.</p><aside className="article-tip"><span><Icon name="compass" size={20} /></span><div><strong>Planning Tip</strong><p>Plan your journey early and confirm your travel arrangements before departure.</p></div></aside></section><section id="documents" onMouseEnter={() => setActive("documents")}><span className="article-section-number">03</span><h2>Essential Travel Documents</h2><p>Keep your documents organized, accessible, and protected throughout the journey. Confirm current requirements directly with your agency and the relevant authorities.</p><ArticleChecklist items={documents} /></section><section id="packing" onMouseEnter={() => setActive("packing")}><span className="article-section-number">04</span><h2>What to Pack</h2><p>Pack thoughtfully and keep luggage manageable. Prioritize practical items that support comfort, organization, and regular worship.</p><div className="article-packing-grid"><div><span><Icon name="people" size={19} /></span><h3>Personal Essentials</h3><ArticleChecklist items={personal} /></div><div><span><Icon name="plane" size={19} /></span><h3>Travel Essentials</h3><ArticleChecklist items={travel} /></div></div></section><figure className="article-inline-image"><img src={photos.ihram} alt="White garments prepared for pilgrimage" /><figcaption>Prepare essential clothing and travel items before departure.</figcaption></figure><section id="rituals" onMouseEnter={() => setActive("rituals")}><span className="article-section-number">05</span><h2>Understanding the Rituals</h2><p>Learn the sequence and general purpose of each rite before departure. Seek qualified religious guidance for detailed questions and personal circumstances.</p><div className="article-rituals">{rituals.map(([number, title, text]) => <div key={title}><span>{number}</span><section><h3>{title}</h3><p>{text}</p></section></div>)}</div></section><section id="health" onMouseEnter={() => setActive("health")}><span className="article-section-number">06</span><h2>Health and Personal Preparation</h2><p>Prepare gradually for regular walking, stay hydrated, organize personal medication, and keep important belongings secure. Comfortable footwear and a manageable daily bag can make movement easier.</p><p>Follow applicable travel, vaccination, and health guidance from official sources and your travel provider.</p><aside className="article-note"><Icon name="shield" size={19} /><div><strong>Important Note</strong><p>Check current travel and health requirements before departure.</p></div></aside></section><section id="checklist" onMouseEnter={() => setActive("checklist")}><span className="article-section-number">07</span><h2>Final Checklist</h2><p>Complete one final review before leaving home so that essential arrangements are easy to access during your journey.</p><div className="article-final-checklist"><h3>Before You Depart</h3><ArticleChecklist items={["Confirm travel documents", "Review accommodation details", "Prepare essential belongings", "Understand the main rituals", "Save emergency contact details"]} /></div></section><div className="article-footer-actions"><ArticleShareControls /><div>{["Umrah Guide", "Umrah Preparation", "Pilgrimage Tips", "Makkah"].map((tag) => <a href="/blog" key={tag}>{tag}</a>)}</div></div></article>;
}

function ArticleAuthorCard() {
  return <section className="article-author-card"><span>HS</span><div><small>Written by</small><h3>Hajj Solutions Editorial Team</h3><p>Our editorial team shares practical information and helpful resources for Hajj and Umrah pilgrims.</p><a href="/blog">View All Articles <Icon name="arrow" size={14} /></a></div></section>;
}

function ContinueReading() {
  const related = [journalArticles[1], journalArticles[0], journalArticles[2]];
  return <section className="section continue-reading"><div className="container"><SectionHeading eyebrow="More from the journal" title="Continue Reading" text="Explore more helpful guides for your pilgrimage." action="View all articles" /><div>{related.map((article) => <JournalArticleCard article={article} key={article.id} />)}</div></div></section>;
}

function BlogDetailsPage({ dark, toggleTheme }: { dark: boolean; toggleTheme: () => void }) {
  const [active, setActive] = useState("understanding-umrah");
  return <div className="app blog-details-page"><Header dark={dark} toggleTheme={toggleTheme} active="Blog" /><main><ArticleHeader /><ArticleCover /><div className="container article-layout"><ArticleTableOfContents active={active} setActive={setActive} /><div><ArticleBody setActive={setActive} /><ArticleAuthorCard /></div></div><ContinueReading /><JournalNewsletter /></main><Footer /></div>;
}

function ContactHero() {
  return <><div className="contact-breadcrumb"><div className="container"><TextLink href="/">Home</TextLink><span>›</span><strong>Contact</strong></div></div><section className="contact-hero"><div className="contact-hero-pattern" /><div className="container"><div><span className="eyebrow">Get in Touch</span><Title as="h1">We're Here to Help<br />With Your <em>Pilgrimage</em></Title><p>Have questions about Hajj or Umrah packages? Our team is ready to help you find the information you need and guide you through your next steps.</p></div><div className="contact-hero-visual"><img src={photos.madinahCourtyard} alt="Pilgrims at Al-Masjid an-Nabawi" /><span><Icon name="headset" size={20} />Pilgrimage support</span></div></div></section></>;
}

function ContactInformationCards() {
  const cards = [
    { icon: "mail" as IconName, title: "Email Us", description: "Send us your questions and inquiries.", detail: "info@hotsolutions.com", action: "Send an Email", onClick: () => { window.location.href = "mailto:info@hotsolutions.com"; } },
    { icon: "headset" as IconName, title: "Call Us", description: "Speak with our team for assistance.", detail: "+1 (000) 000-0000", action: "Call Now", onClick: () => { window.location.href = "tel:+10000000000"; } },
    { icon: "location" as IconName, title: "Our Office", description: "Connect with our team for more information.", detail: "Office address to be added", action: "View Location", onClick: () => document.querySelector("#contact-form")?.scrollIntoView({ behavior: "smooth" }) },
  ];
  return <section className="contact-info-cards"><div className="container">{cards.map((card) => <article key={card.title}><span><Icon name={card.icon} size={21} /></span><Title as="h3">{card.title}</Title><p>{card.description}</p><strong>{card.detail}</strong><Button variant="ghost" onClick={card.onClick}>{card.action} <Icon name="arrow" size={14} /></Button></article>)}</div></section>;
}

function MainContactForm() {
  const [success, setSuccess] = useState(false);
  return <section className="contact-form-card" id="contact-form"><span className="eyebrow">Tell us how we can help</span><Title as="h2">Send Us a Message</Title><p>Complete the form below, and our team will get back to you.</p>{success ? <div className="contact-success"><span><Icon name="check" size={22} /></span><Title as="h3">Message Received</Title><p>Thank you for contacting Hot Solutions. Your message has been received.</p><small>This prototype form is not connected to a live backend.</small><Button variant="secondary" onClick={() => setSuccess(false)}>Send Another Message</Button></div> : <form onSubmit={(event) => { event.preventDefault(); setSuccess(true); }}><div className="contact-form-row"><label>Full Name *<TextInput required minLength={2} placeholder="Enter your full name" /></label><label>Email Address *<TextInput required type="email" placeholder="name@example.com" /></label></div><div className="contact-form-row"><label>Phone Number<TextInput type="tel" placeholder="+1 (000) 000-0000" /></label><label>Inquiry Type *<SelectInput required defaultValue=""><option value="" disabled>Select inquiry type</option><option>Hajj Package Inquiry</option><option>Umrah Package Inquiry</option><option>Agency Inquiry</option><option>Booking Assistance</option><option>Partnership Opportunity</option><option>General Inquiry</option></SelectInput></label></div><label>Subject *<TextInput required placeholder="What can we help you with?" /></label><label>Message *<TextArea required minLength={10} rows={6} placeholder="Share the details of your inquiry..." /></label><label className="contact-consent"><TextInput required type="checkbox" /><span /><p>I agree to the privacy policy and consent to being contacted regarding my inquiry.</p></label><Button type="submit">Send Message <Icon name="arrow" size={16} /></Button></form>}</section>;
}

function ContactSupportCard() {
  return <aside className="contact-support-card"><div><img src={photos.kaaba} alt="Pilgrims near the Holy Kaaba" /><div /><span><Icon name="shield" size={13} />Hajj & Umrah support</span></div><section><span className="eyebrow">Explore with confidence</span><Title as="h2">Need Help Planning Your Pilgrimage?</Title><p>Whether you're exploring Hajj or Umrah packages or need help understanding your options, we're here to assist.</p><ul><li><Icon name="check" size={12} />Compare verified pilgrimage packages</li><li><Icon name="check" size={12} />Explore trusted Hajj and Umrah agencies</li><li><Icon name="check" size={12} />Review package details and inclusions</li></ul><Button onClick={() => { navigateTo("/packages"); }}>Explore Packages <Icon name="arrow" size={16} /></Button></section></aside>;
}

function ContactFAQ() {
  const faqs = [
    ["How can I find Hajj and Umrah packages?", "Visit the Packages page to search and compare Hajj and Umrah options by category, departure city, duration, and agency."],
    ["Can I contact an agency directly?", "Agency profile pages include contact and inquiry options. Availability and response times depend on the individual agency."],
    ["Can I get help choosing a package?", "Yes. Use this contact form and select Hajj Package Inquiry, Umrah Package Inquiry, or Booking Assistance so the team can understand your question."],
    ["How can I ask about a specific package?", "Include the package name and agency in your message, or use the contact option available on the package details page."],
    ["How do I contact Hot Solutions for booking assistance?", "Select Booking Assistance in the inquiry form and provide the relevant package details. This prototype does not submit to a live support system."],
    ["How can a travel agency contact Hot Solutions?", "Select Partnership Opportunity or Agency Inquiry and provide your organization details. Partnership policies can be shared after review."],
  ];
  const [open, setOpen] = useState(0);
  return <section className="section contact-faq"><div className="container"><div><span className="eyebrow">Helpful answers</span><Title as="h2">Frequently Asked Questions</Title><p>Find answers to common questions about contacting Hot Solutions.</p></div><div>{faqs.map(([question, answer], index) => <article className={open === index ? "open" : ""} key={question}><Button variant="ghost" className="contact-faq-trigger" onClick={() => setOpen(open === index ? -1 : index)}><strong>{question}</strong><span>{open === index ? "−" : "+"}</span></Button>{open === index && <p>{answer}</p>}</article>)}</div></div></section>;
}

function ContactCTA() {
  return <section className="contact-cta"><div className="contact-cta-pattern" /><div className="container"><span className="eyebrow">Take the next step</span><Title as="h2">Ready to Start Planning<br />Your Pilgrimage?</Title><p>Explore Hajj and Umrah packages and discover options that suit your travel needs.</p><div><Button onClick={() => { navigateTo("/packages"); }}>Explore Packages <Icon name="arrow" size={16} /></Button><Button variant="light" onClick={() => { navigateTo("/agencies"); }}>Browse Agencies</Button></div></div></section>;
}

function ContactPage({ dark, toggleTheme }: { dark: boolean; toggleTheme: () => void }) {
  return <div className="app contact-page"><Header dark={dark} toggleTheme={toggleTheme} active="Contact" /><main><ContactHero /><ContactInformationCards /><section className="section main-contact"><div className="container"><MainContactForm /><ContactSupportCard /></div></section><ContactFAQ /><ContactCTA /></main><Footer /></div>;
}

function AboutSectionIntro({ eyebrow, title, text, centered = false }: { eyebrow: string; title: string; text?: string; centered?: boolean }) {
  return <div className={`about-section-intro ${centered ? "centered" : ""}`}><span className="eyebrow">{eyebrow}</span><Title as="h2">{title}</Title>{text && <p>{text}</p>}</div>;
}

function AboutHero() {
  return <section className="about-hero"><div className="about-pattern" /><div className="container"><div className="about-hero-copy"><span className="eyebrow">About Hot Solutions</span><Title as="h1">Making Your Sacred<br /><em>Journey Easier</em></Title><p>Hot Solutions is a dedicated Hajj and Umrah marketplace designed to help pilgrims explore packages, discover travel agencies, and find useful information for their pilgrimage.</p><div><Button onClick={() => { navigateTo("/packages"); }}>Explore Packages <Icon name="arrow" size={16} /></Button><Button variant="secondary" onClick={() => { navigateTo("/contact"); }}>Contact Us</Button></div></div><div className="about-hero-media"><img src={photos.tawaf} alt="Pilgrims gathered around the Holy Kaaba in Makkah" /><div className="about-hero-seal"><Icon name="compass" size={23} /><span>Sacred journeys<br /><strong>Made clearer</strong></span></div></div></div></section>;
}

function WhoWeAre() {
  return <section className="section about-who"><div className="container"><div className="about-who-media"><img src={photos.pilgrims} alt="Pilgrims walking near the Holy Kaaba in Makkah" /><span><strong>Hajj & Umrah</strong><small>A focused pilgrimage marketplace</small></span></div><div><AboutSectionIntro eyebrow="Our purpose" title="Who We Are" /><p>Hot Solutions brings Hajj and Umrah travel information together in one convenient platform. We help visitors explore pilgrimage packages, compare available options, and discover agencies offering services related to their journey.</p><div className="about-who-note"><Icon name="compass" size={20} /><p>Agency profiles give travel providers a place to present their Hajj and Umrah services for potential pilgrims to explore.</p></div></div></div></section>;
}

function MissionVision() {
  const cards = [
    { icon: "compass" as IconName, eyebrow: "Our Mission", title: "Clarity for Every Pilgrim", text: "Make it easier for pilgrims to discover Hajj and Umrah packages and access useful information when planning their sacred journey." },
    { icon: "globe" as IconName, eyebrow: "Our Vision", title: "A More Accessible Marketplace", text: "Build a trusted and accessible platform where pilgrims can explore pilgrimage options and connect with relevant travel agencies." },
  ];
  return <section className="section about-mission"><div className="container">{cards.map((card) => <article key={card.eyebrow}><div className="about-card-icon"><Icon name={card.icon} size={23} /></div><span className="eyebrow">{card.eyebrow}</span><Title as="h3">{card.title}</Title><p>{card.text}</p></article>)}</div></section>;
}

function WhatWeDo() {
  const services = [
    { icon: "grid" as IconName, title: "Hajj Packages", text: "Explore Hajj packages and review available travel options." },
    { icon: "moon" as IconName, title: "Umrah Packages", text: "Discover Umrah packages for different travel needs and preferences." },
    { icon: "people" as IconName, title: "Agency Discovery", text: "Browse travel agencies and learn more about their pilgrimage services." },
    { icon: "tag" as IconName, title: "Pilgrimage Guides", text: "Access helpful articles and practical information for preparing for Hajj and Umrah." },
  ];
  return <section className="section about-services"><div className="container"><AboutSectionIntro eyebrow="A focused platform" title="What We Do" text="A single place to explore the information, packages, agencies, and resources relevant to Hajj and Umrah." centered /><div className="about-card-grid">{services.map((service, index) => <article key={service.title}><small>0{index + 1}</small><div className="about-card-icon"><Icon name={service.icon} size={22} /></div><Title as="h3">{service.title}</Title><p>{service.text}</p></article>)}</div></div></section>;
}

function HowItWorks() {
  const steps = [
    ["Explore", "Browse available Hajj and Umrah packages."],
    ["Compare", "Review package details, services, and available options."],
    ["Discover Agencies", "Explore agency profiles and find relevant service information."],
    ["Plan Your Journey", "Contact the relevant agency to ask questions and discuss your travel plans."],
  ];
  return <section className="section about-process"><div className="about-pattern" /><div className="container"><AboutSectionIntro eyebrow="How Hot Solutions works" title="Your Journey Starts Here" text="Move from initial research to an informed conversation with a relevant pilgrimage agency." centered /><div className="about-steps">{steps.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><Title as="h3">{title}</Title><p>{text}</p></article>)}</div><p className="about-process-note">Package availability and travel arrangements are provided and managed by the relevant travel agencies.</p></div></section>;
}

function WhyExplore() {
  const benefits = [
    { icon: "compass" as IconName, title: "Dedicated Hajj & Umrah Platform", text: "Focused information for pilgrimage planning." },
    { icon: "search" as IconName, title: "Package Discovery", text: "Browse available pilgrimage packages in one place." },
    { icon: "people" as IconName, title: "Agency Profiles", text: "Explore agency information and their listed services." },
    { icon: "tag" as IconName, title: "Helpful Resources", text: "Read guides and practical articles about Hajj and Umrah." },
  ];
  return <section className="section about-benefits"><div className="container"><AboutSectionIntro eyebrow="Made for exploration" title="A Convenient Way to Explore Pilgrimage Options" text="Practical tools and information to support the early stages of your Hajj or Umrah planning." /><div className="about-benefit-grid">{benefits.map((benefit) => <article key={benefit.title}><div className="about-card-icon"><Icon name={benefit.icon} size={20} /></div><div><Title as="h3">{benefit.title}</Title><p>{benefit.text}</p></div></article>)}</div></div></section>;
}

function OurValues() {
  const values = [
    ["Transparency", "Present package and agency information clearly so visitors can make informed decisions."],
    ["Accessibility", "Make pilgrimage-related information easier to discover and navigate."],
    ["Respect", "Treat the significance of Hajj and Umrah with care and respect."],
    ["Continuous Improvement", "Keep improving the platform to make it more useful for pilgrims and agencies."],
  ];
  return <section className="section about-values"><div className="about-pattern" /><div className="container"><AboutSectionIntro eyebrow="Our values" title="What Guides Us" text="Principles that shape how we present pilgrimage information and build the marketplace." centered /><div>{values.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><Title as="h3">{title}</Title><p>{text}</p></article>)}</div></div></section>;
}

function AboutVisualStatement() {
  return <section className="about-visual"><img src={photos.haram} alt="Pilgrims surrounding the Holy Kaaba at Masjid al-Haram" /><div /><div className="container"><span className="eyebrow">Plan with clarity</span><Title as="h2">“A meaningful journey begins<br />with the right information.”</Title></div></section>;
}

function AboutCTA() {
  return <section className="contact-cta about-cta"><div className="contact-cta-pattern" /><div className="container"><div><span className="eyebrow">Begin your exploration</span><Title as="h2">Explore Your Hajj or<br />Umrah Options</Title><p>Discover pilgrimage packages, explore agencies, and find helpful resources to plan your journey.</p></div><div><Button onClick={() => { navigateTo("/packages"); }}>Browse Packages <Icon name="arrow" size={16} /></Button><Button variant="light" onClick={() => { navigateTo("/contact"); }}>Contact Us</Button></div></div></section>;
}

function AboutPage({ dark, toggleTheme }: { dark: boolean; toggleTheme: () => void }) {
  return <div className="app about-page"><Header dark={dark} toggleTheme={toggleTheme} active="About Us" /><main><AboutHero /><WhoWeAre /><MissionVision /><WhatWeDo /><HowItWorks /><WhyExplore /><OurValues /><AboutVisualStatement /><AboutCTA /></main><Footer /></div>;
}

type FAQItem = { id: string; question: string; answer: string };
type FAQGroup = { id: string; label: string; icon: IconName; items: FAQItem[] };

const faqGroups: FAQGroup[] = [
  {
    id: "general",
    label: "General Questions",
    icon: "compass",
    items: [
      { id: "what-is-hot-solutions", question: "What is Hot Solutions?", answer: "Hot Solutions is a marketplace focused on Hajj and Umrah. It helps visitors explore pilgrimage packages, discover travel agencies, and find useful information for planning their journey." },
      { id: "what-can-i-do", question: "What can I do on Hot Solutions?", answer: "You can browse Hajj and Umrah packages, explore agency profiles, read pilgrimage guides, and find information to help you plan your journey." },
      { id: "operate-trips", question: "Does Hot Solutions operate Hajj and Umrah trips directly?", answer: "Hot Solutions provides a platform for discovering packages and agencies. For specific travel arrangements and services, contact the relevant agency directly." },
    ],
  },
  {
    id: "hajj",
    label: "Hajj Packages",
    icon: "grid",
    items: [
      { id: "find-hajj", question: "How can I find Hajj packages?", answer: "Visit the Packages section and explore the available Hajj packages. You can open a package to review its details and the agency offering it." },
      { id: "check-hajj", question: "What information should I check before choosing a Hajj package?", answer: "Review the package details, included services, travel dates, accommodation information, and the agency's contact information. Confirm any important details directly with the agency." },
      { id: "compare-hajj", question: "Can I compare different Hajj packages?", answer: "You can explore multiple package listings and review their details to understand the available options. Contact the relevant agencies if you need clarification." },
    ],
  },
  {
    id: "umrah",
    label: "Umrah Packages",
    icon: "moon",
    items: [
      { id: "find-umrah", question: "How can I find an Umrah package?", answer: "Browse the Umrah packages in the Packages section. Open any listing to review its available details and agency information." },
      { id: "umrah-year", question: "Are Umrah packages available throughout the year?", answer: "Availability depends on the travel agency and its listed travel dates. Contact the agency to confirm current availability." },
      { id: "ramadan-umrah", question: "Can I find Ramadan Umrah packages?", answer: "You can look for Ramadan-related Umrah packages in the available listings. Confirm travel dates, inclusions, and availability directly with the agency." },
    ],
  },
  {
    id: "agencies",
    label: "Agencies",
    icon: "people",
    items: [
      { id: "find-agency", question: "How can I find a travel agency?", answer: "Visit the Agencies section to explore agency profiles and learn about their Hajj and Umrah services." },
      { id: "contact-agency", question: "Can I contact an agency directly?", answer: "Check the agency's profile or package details for available contact information and inquiry options." },
      { id: "list-packages", question: "How can a travel agency list its packages?", answer: "Agencies interested in listing packages can contact Hot Solutions to ask about the available onboarding process." },
    ],
  },
  {
    id: "booking",
    label: "Booking & Inquiries",
    icon: "mail",
    items: [
      { id: "book-package", question: "How do I book a Hajj or Umrah package?", answer: "Explore the package listings, review the details, and contact the agency offering the package to discuss booking arrangements." },
      { id: "confirm-availability", question: "Can Hot Solutions confirm package availability?", answer: "Package availability may change. Contact the agency directly to confirm the latest dates, prices, and availability." },
      { id: "package-questions", question: "Who should I contact if I have questions about a package?", answer: "Contact the agency responsible for the package. For questions about the Hot Solutions platform, use the Contact page." },
    ],
  },
  {
    id: "platform",
    label: "Account & Platform",
    icon: "globe",
    items: [
      { id: "platform-help", question: "How can I get help using Hot Solutions?", answer: "Visit the Contact page and send your question to the Hot Solutions team." },
      { id: "report-information", question: "How can I report incorrect package information?", answer: "Contact the Hot Solutions team and include the package name and details of the information that needs to be reviewed." },
      { id: "learn-more", question: "How can I learn more about Hajj and Umrah?", answer: "Visit the Blog section to explore guides, preparation tips, and other pilgrimage-related information." },
    ],
  },
];

function FAQHero({ query, setQuery }: { query: string; setQuery: (value: string) => void }) {
  return <section className="faq-page-hero"><div className="faq-page-pattern" /><div className="container"><div className="faq-page-hero-copy"><span className="eyebrow">Help Center</span><Title as="h1">Frequently Asked<br /><em>Questions</em></Title><p>Find helpful answers about Hajj and Umrah packages, travel agencies, and how to use Hot Solutions.</p><div className="faq-search"><Icon name="search" size={20} /><TextInput type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search for a question..." aria-label="Search frequently asked questions" />{query && <Button variant="ghost" onClick={() => setQuery("")}>Clear</Button>}</div></div><div className="faq-hero-visual"><Image src={photos.faqHero} alt="Pilgrims surrounding the Holy Kaaba at Masjid al-Haram" /><div /><span><Icon name="headset" size={19} /><small>Answers for your<br /><strong>pilgrimage journey</strong></small></span></div></div></section>;
}

function FAQCategoryNav({ active, onChange }: { active: string; onChange: (id: string) => void }) {
  return <nav className="faq-category-nav" aria-label="FAQ categories">{faqGroups.map((group) => <Button key={group.id} variant={active === group.id ? "primary" : "secondary"} className={active === group.id ? "active" : ""} onClick={() => onChange(group.id)}><Icon name={group.icon} size={17} /><span>{group.label}</span></Button>)}</nav>;
}

function FAQHelpCard() {
  return <aside className="faq-help-card"><span><Icon name="headset" size={22} /></span><Title as="h3">Still Have Questions?</Title><p>Can't find the answer you're looking for? Our team is here to help.</p><Button onClick={() => { navigateTo("/contact"); }}>Contact Us <Icon name="arrow" size={14} /></Button><Button variant="secondary" onClick={() => { navigateTo("/packages"); }}>Browse Packages</Button></aside>;
}

function FAQAccordion({ items, openId, setOpenId, showCategory }: { items: Array<FAQItem & { category?: string }>; openId: string | null; setOpenId: (id: string | null) => void; showCategory: boolean }) {
  return <div className="faq-page-accordion">{items.map((item) => <article className={openId === item.id ? "open" : ""} key={item.id}><Button variant="ghost" className="faq-page-trigger" onClick={() => setOpenId(openId === item.id ? null : item.id)}><span>{showCategory && <small>{item.category}</small>}<strong>{item.question}</strong></span><span>{openId === item.id ? "−" : "+"}</span></Button><div className="faq-page-answer"><p>{item.answer}</p></div></article>)}</div>;
}

function FAQEmptyState() {
  return <div className="faq-empty"><span><Icon name="search" size={29} /></span><Title as="h3">No matching questions found</Title><p>Try a different keyword or contact our team for assistance.</p><Button onClick={() => { navigateTo("/contact"); }}>Contact Us <Icon name="arrow" size={14} /></Button></div>;
}

function FAQContent({ query, setQuery }: { query: string; setQuery: (value: string) => void }) {
  const [active, setActive] = useState("general");
  const [openId, setOpenId] = useState<string | null>("what-is-hot-solutions");
  const search = query.trim().toLowerCase();
  const selected = faqGroups.find((group) => group.id === active) ?? faqGroups[0];
  const searchResults = faqGroups.flatMap((group) => group.items.map((item) => ({ ...item, category: group.label }))).filter((item) => `${item.question} ${item.answer}`.toLowerCase().includes(search));
  const items = search ? searchResults : selected.items;
  const changeCategory = (id: string) => { setActive(id); setQuery(""); setOpenId(faqGroups.find((group) => group.id === id)?.items[0]?.id ?? null); };
  return <section className="section faq-page-content"><div className="container"><aside className="faq-page-sidebar"><FAQCategoryNav active={active} onChange={changeCategory} /><FAQHelpCard /></aside><div className="faq-page-main"><div className="faq-page-heading"><span className="eyebrow">{search ? "Search results" : "Browse by topic"}</span><Title as="h2">{search ? `Results for “${query.trim()}”` : selected.label}</Title><p>{items.length} {items.length === 1 ? "answer" : "answers"} available</p></div>{items.length ? <FAQAccordion items={items} openId={openId} setOpenId={setOpenId} showCategory={Boolean(search)} /> : <FAQEmptyState />}</div></div></section>;
}

function FAQPageCTA() {
  return <section className="contact-cta faq-page-cta"><div className="contact-cta-pattern" /><div className="container"><span className="eyebrow">Continue your journey</span><Title as="h2">Need Help Planning<br />Your Pilgrimage?</Title><p>Explore Hajj and Umrah packages or connect with our team for assistance.</p><div><Button onClick={() => { navigateTo("/packages"); }}>Explore Packages <Icon name="arrow" size={16} /></Button><Button variant="light" onClick={() => { navigateTo("/contact"); }}>Contact Us</Button></div></div></section>;
}

function FAQPage({ dark, toggleTheme }: { dark: boolean; toggleTheme: () => void }) {
  const [query, setQuery] = useState("");
  return <div className="app faq-page"><Header dark={dark} toggleTheme={toggleTheme} active="FAQ" /><main><FAQHero query={query} setQuery={setQuery} /><FAQContent query={query} setQuery={setQuery} /><FAQPageCTA /></main><Footer /></div>;
}

function HomePage({ dark, toggleTheme }: { dark: boolean; toggleTheme: () => void }) {
  const [packageTab, setPackageTab] = useState("All Packages");
  const visibleHomePackages = packages.filter((item) => packageTab === "All Packages"
    || (packageTab === "Hajj" && item.badge.includes("Hajj"))
    || (packageTab === "Umrah" && item.badge.includes("Umrah"))
    || item.badge.includes(packageTab));
  return (
    <div className="app">
      <Header dark={dark} toggleTheme={toggleTheme} />
      <main>
        <Hero tab={packageTab} onTabChange={setPackageTab} />
        <BenefitsBar />
        <section className="section packages-section" id="packages"><div className="container"><SectionHeading eyebrow="Pilgrimage packages selected for you" title="Featured Hajj & Umrah Packages" text="Verified Hajj and Umrah packages from pilgrimage agencies you can trust." action="View all packages" />{visibleHomePackages.length ? <div className="package-grid">{visibleHomePackages.map((item, index) => <PackageCard item={item} index={index} key={item.title} />)}</div> : <PackagesEmpty reset={() => setPackageTab("All Packages")} />}</div></section>
        <Destinations /><Agencies /><Events /><WhyChoose /><Guides /><Blog /><Newsletter />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  const [dark, setDark] = useState(false);
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);
  useEffect(() => {
    let completionTimer: number | undefined;

    const completeNavigation = () => {
      setPath(window.location.pathname);
      window.scrollTo({ top: 0, behavior: "auto" });
      document.documentElement.classList.remove("page-is-leaving");
      document.documentElement.classList.add("page-is-entering");
      window.clearTimeout(completionTimer);
      completionTimer = window.setTimeout(() => {
        document.documentElement.classList.remove("page-is-entering", "page-is-loading");
        if (window.location.hash) document.querySelector(window.location.hash)?.scrollIntoView();
      }, 340);
    };

    const handleHistoryNavigation = () => {
      document.documentElement.classList.add("page-is-leaving", "page-is-loading");
      window.setTimeout(completeNavigation, 120);
    };

    const handleInternalLink = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target instanceof Element ? event.target.closest("a") : null;
      if (!target || target.target === "_blank" || target.hasAttribute("download")) return;
      const href = target.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search && url.hash) return;
      event.preventDefault();
      navigateTo(url.href);
    };

    window.addEventListener(ROUTE_CHANGE_EVENT, completeNavigation);
    window.addEventListener("popstate", handleHistoryNavigation);
    document.addEventListener("click", handleInternalLink, true);
    return () => {
      window.clearTimeout(completionTimer);
      window.removeEventListener(ROUTE_CHANGE_EVENT, completeNavigation);
      window.removeEventListener("popstate", handleHistoryNavigation);
      document.removeEventListener("click", handleInternalLink, true);
    };
  }, []);
  const toggleTheme = () => setDark(!dark);
  let page: ReactNode;
  if (path.startsWith("/packages/")) page = <PackageDetailsPage dark={dark} toggleTheme={toggleTheme} />;
  else if (path.startsWith("/agencies/")) page = <AgencyProfilePage dark={dark} toggleTheme={toggleTheme} />;
  else if (path === "/agencies") page = <AgenciesListingPage dark={dark} toggleTheme={toggleTheme} />;
  else if (path.startsWith("/events/")) page = <EventDetailsPage dark={dark} toggleTheme={toggleTheme} />;
  else if (path === "/events") page = <EventsListingPage dark={dark} toggleTheme={toggleTheme} />;
  else if (path.startsWith("/destinations/")) page = <DestinationDetailsPage dark={dark} toggleTheme={toggleTheme} />;
  else if (path === "/destinations") page = <DestinationsListingPage dark={dark} toggleTheme={toggleTheme} />;
  else if (path.startsWith("/guides/")) page = <GuideProfilePage dark={dark} toggleTheme={toggleTheme} />;
  else if (path === "/guides") page = <GuidesListingPage dark={dark} toggleTheme={toggleTheme} />;
  else if (path.startsWith("/blog/")) page = <BlogDetailsPage dark={dark} toggleTheme={toggleTheme} />;
  else if (path === "/blog") page = <BlogListingPage dark={dark} toggleTheme={toggleTheme} />;
  else if (path === "/contact") page = <ContactPage dark={dark} toggleTheme={toggleTheme} />;
  else if (path === "/about") page = <AboutPage dark={dark} toggleTheme={toggleTheme} />;
  else if (path === "/faq") page = <FAQPage dark={dark} toggleTheme={toggleTheme} />;
  else page = path === "/packages" ? <PackagesPage dark={dark} toggleTheme={toggleTheme} /> : <HomePage dark={dark} toggleTheme={toggleTheme} />;
  return <><PageTransitionLayer /><div className="route-stage" key={path}>{page}</div></>;
}

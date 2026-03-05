import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#ede7e3",
  primary: "#16697a",
  secondary: "#489fb5",
  tertiary: "#82c0cc",
  accent: "#ffa62b",
  white: "#ffffff",
  textDark: "#1a1a1a",
  textMuted: "#6b6b6b",
  cardBg: "#ffffff",
  overlay: "rgba(22, 105, 122, 0.08)",
};

const ALEX_AVATAR = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs>
    <clipPath id="circle"><circle cx="100" cy="100" r="100"/></clipPath>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#82c0cc"/>
      <stop offset="100%" stop-color="#489fb5"/>
    </linearGradient>
    <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f4c9a8"/>
      <stop offset="100%" stop-color="#e8b090"/>
    </linearGradient>
    <linearGradient id="hair" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#5c3a1e"/>
      <stop offset="100%" stop-color="#3d2512"/>
    </linearGradient>
    <linearGradient id="shirt" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#16697a"/>
      <stop offset="100%" stop-color="#0d4a56"/>
    </linearGradient>
    <linearGradient id="beanie" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffa62b"/>
      <stop offset="100%" stop-color="#e8901a"/>
    </linearGradient>
  </defs>
  <g clip-path="url(#circle)">
    <!-- Background -->
    <rect width="200" height="200" fill="url(#bg)"/>
    <!-- Shirt / body -->
    <ellipse cx="100" cy="215" rx="72" ry="55" fill="url(#shirt)"/>
    <!-- Neck -->
    <rect x="85" y="140" width="30" height="25" rx="6" fill="url(#skin)"/>
    <!-- Head -->
    <ellipse cx="100" cy="105" rx="48" ry="52" fill="url(#skin)"/>
    <!-- Ears -->
    <ellipse cx="53" cy="108" rx="9" ry="12" fill="#e8b090"/>
    <ellipse cx="53" cy="108" rx="5" ry="7" fill="#dca080"/>
    <ellipse cx="147" cy="108" rx="9" ry="12" fill="#e8b090"/>
    <ellipse cx="147" cy="108" rx="5" ry="7" fill="#dca080"/>
    <!-- Beard -->
    <path d="M62 115 Q62 155 100 165 Q138 155 138 115 Z" fill="url(#hair)" opacity="0.9"/>
    <!-- Mustache -->
    <path d="M78 118 Q88 128 100 120 Q112 128 122 118 Q112 125 100 126 Q88 125 78 118Z" fill="#3d2512"/>
    <!-- Eyes -->
    <ellipse cx="82" cy="100" rx="6" ry="6.5" fill="white"/>
    <ellipse cx="118" cy="100" rx="6" ry="6.5" fill="white"/>
    <ellipse cx="83" cy="101" rx="3.5" ry="4" fill="#3d2512"/>
    <ellipse cx="119" cy="101" rx="3.5" ry="4" fill="#3d2512"/>
    <circle cx="84" cy="99.5" r="1.3" fill="white"/>
    <circle cx="120" cy="99.5" r="1.3" fill="white"/>
    <!-- Eyebrows -->
    <path d="M72 91 Q82 85 92 90" stroke="#3d2512" stroke-width="2.8" fill="none" stroke-linecap="round"/>
    <path d="M108 90 Q118 85 128 91" stroke="#3d2512" stroke-width="2.8" fill="none" stroke-linecap="round"/>
    <!-- Nose -->
    <path d="M97 105 Q100 115 103 105" stroke="#d4976e" stroke-width="2" fill="none" stroke-linecap="round"/>
    <!-- Hair sides -->
    <path d="M52 100 Q48 70 65 58 L58 105 Z" fill="url(#hair)"/>
    <path d="M148 100 Q152 70 135 58 L142 105 Z" fill="url(#hair)"/>
    <!-- Hair top / messy bun top -->
    <path d="M58 85 Q60 45 100 38 Q140 45 142 85 Q130 55 100 50 Q70 55 58 85Z" fill="url(#hair)"/>
    <!-- Beanie -->
    <path d="M54 82 Q56 52 100 44 Q144 52 146 82 Q135 62 100 56 Q65 62 54 82Z" fill="url(#beanie)"/>
    <path d="M52 84 Q52 78 54 74 L146 74 Q148 78 148 84 Z" fill="#e8901a"/>
    <!-- Beanie fold line -->
    <path d="M54 79 L146 79" stroke="#ffa62b" stroke-width="2" opacity="0.5"/>
    <!-- Glasses - round wire frames -->
    <circle cx="82" cy="100" r="14" stroke="#1a1a1a" stroke-width="2.2" fill="none"/>
    <circle cx="118" cy="100" r="14" stroke="#1a1a1a" stroke-width="2.2" fill="none"/>
    <path d="M96 100 Q100 103 104 100" stroke="#1a1a1a" stroke-width="2" fill="none"/>
    <line x1="68" y1="98" x2="53" y2="96" stroke="#1a1a1a" stroke-width="2"/>
    <line x1="132" y1="98" x2="147" y2="96" stroke="#1a1a1a" stroke-width="2"/>
    <!-- Subtle smile in beard -->
    <path d="M90 138 Q100 144 110 138" stroke="#2d1a0b" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.4"/>
  </g>
</svg>`)}`;

const CHARITIES = {
  trending: [
    { id: 1, name: "Paws of Hope", category: "Animal Welfare", img: "🐾", raised: "$124K", goal: "$200K", progress: 62, description: "Rescuing and rehoming shelter dogs across the Southeast" },
    { id: 2, name: "Ocean Guardians", category: "Environment", img: "🌊", raised: "$89K", goal: "$150K", progress: 59, description: "Protecting marine ecosystems and coastal communities" },
    { id: 3, name: "Meals That Matter", category: "Hunger Relief", img: "🍲", raised: "$201K", goal: "$250K", progress: 80, description: "Providing nutritious meals to families in food deserts" },
    { id: 4, name: "Books for All", category: "Education", img: "📚", raised: "$56K", goal: "$100K", progress: 56, description: "Building libraries in underserved communities" },
    { id: 5, name: "Green Tomorrow", category: "Climate Action", img: "🌱", raised: "$178K", goal: "$300K", progress: 59, description: "Planting trees and restoring natural habitats" },
  ],
  nearby: [
    { id: 6, name: "Greenville Food Bank", category: "Hunger Relief", img: "🥫", raised: "$45K", goal: "$80K", progress: 56, description: "Fighting hunger in the Upstate South Carolina region" },
    { id: 7, name: "Habitat Upstate", category: "Housing", img: "🏠", raised: "$312K", goal: "$500K", progress: 62, description: "Building affordable homes for families in Greenville County" },
    { id: 8, name: "SC Animal Rescue", category: "Animal Welfare", img: "🐕", raised: "$28K", goal: "$60K", progress: 47, description: "Saving abandoned pets across South Carolina" },
    { id: 9, name: "Upstate STEM", category: "Education", img: "🔬", raised: "$67K", goal: "$120K", progress: 56, description: "Bringing STEM education to rural SC schools" },
  ],
  supported: [
    { id: 10, name: "Red Cross Disaster Relief", category: "Disaster Relief", img: "🏥", raised: "$1.2M", goal: "$2M", progress: 60, description: "Providing emergency assistance during natural disasters", lastDonation: "Feb 12, 2026", totalGiven: "$150" },
    { id: 11, name: "Code for Kids", category: "Education", img: "💻", raised: "$93K", goal: "$150K", progress: 62, description: "Teaching coding skills to underprivileged youth", lastDonation: "Jan 28, 2026", totalGiven: "$75" },
    { id: 12, name: "Clean Water Now", category: "Water Access", img: "💧", raised: "$445K", goal: "$600K", progress: 74, description: "Bringing clean water to communities worldwide", lastDonation: "Dec 15, 2025", totalGiven: "$200" },
  ],
};

const CAUSE_CHARITIES = {
  "Hurricane Jesse": [
    { name: "Red Cross Hurricane Relief", rating: "98%", img: "🏥", raised: "$4.2M", goal: "$10M", progress: 42, impact: "Providing shelter, food, and medical care to 12,000+ displaced families" },
    { name: "Direct Relief", rating: "96%", img: "💊", raised: "$2.8M", goal: "$5M", progress: 56, impact: "Delivering emergency medical supplies to affected hospitals and clinics" },
    { name: "Team Rubicon", rating: "94%", img: "🛠️", raised: "$1.1M", goal: "$3M", progress: 37, impact: "Deploying veteran-led disaster response teams for debris removal and rescue" },
    { name: "All Hands and Hearts", rating: "93%", img: "🏗️", raised: "$890K", goal: "$2M", progress: 45, impact: "Rebuilding homes and schools in the hardest-hit communities" },
    { name: "World Central Kitchen", rating: "95%", img: "🍲", raised: "$3.5M", goal: "$6M", progress: 58, impact: "Serving hot meals to first responders and evacuated residents" },
  ],
  "Pediatric Leukemia": [
    { name: "St. Jude Children's Research", rating: "97%", img: "🏥", raised: "$8.1M", goal: "$15M", progress: 54, impact: "Funding cutting-edge treatments so families never receive a bill" },
    { name: "Leukemia & Lymphoma Society", rating: "95%", img: "🔬", raised: "$5.4M", goal: "$10M", progress: 54, impact: "Investing in research that has tripled survival rates since 1960" },
    { name: "Alex's Lemonade Stand", rating: "96%", img: "🍋", raised: "$2.2M", goal: "$4M", progress: 55, impact: "Funding pediatric cancer research grants across 150 institutions" },
    { name: "Children's Cancer Research Fund", rating: "93%", img: "🧬", raised: "$1.7M", goal: "$3M", progress: 57, impact: "Pioneering immunotherapy trials specifically for childhood leukemia" },
    { name: "Ronald McDonald House", rating: "94%", img: "🏠", raised: "$3.3M", goal: "$5M", progress: 66, impact: "Providing free housing for families during their child's treatment" },
  ],
  "Wildfires": [
    { name: "California Fire Foundation", rating: "96%", img: "🔥", raised: "$3.8M", goal: "$8M", progress: 48, impact: "Providing emotional and financial assistance to fire victims and firefighters" },
    { name: "American Red Cross Wildfire Relief", rating: "95%", img: "🏥", raised: "$5.2M", goal: "$10M", progress: 52, impact: "Operating shelters and distributing emergency supplies in evacuation zones" },
    { name: "One Tree Planted", rating: "94%", img: "🌲", raised: "$1.9M", goal: "$4M", progress: 48, impact: "Reforesting fire-damaged land with native species for long-term recovery" },
    { name: "Wildland Firefighter Foundation", rating: "97%", img: "👨‍🚒", raised: "$1.2M", goal: "$2.5M", progress: 48, impact: "Supporting injured firefighters and families of fallen heroes" },
    { name: "National Wildlife Federation", rating: "93%", img: "🦌", raised: "$2.6M", goal: "$5M", progress: 52, impact: "Rehabilitating wildlife habitats destroyed by wildfire" },
  ],
};

const CAUSE_VOLUNTEERS = {
  "Hurricane Jesse": [
    { charity: "Red Cross Hurricane Relief", img: "🏥", needs: [
      { task: "Delivering emergency supplies", icon: "📦", openings: 24 },
      { task: "Shelter setup & management", icon: "🏕️", openings: 12 },
    ]},
    { charity: "Team Rubicon", img: "🛠️", needs: [
      { task: "Debris clearing & cleanup", icon: "🧹", openings: 35 },
      { task: "Search & rescue support", icon: "🔦", openings: 8 },
    ]},
    { charity: "All Hands and Hearts", img: "🏗️", needs: [
      { task: "Home rebuilding assistance", icon: "🔨", openings: 18 },
      { task: "Community meal preparation", icon: "🍲", openings: 15 },
    ]},
    { charity: "World Central Kitchen", img: "🍲", needs: [
      { task: "Meal prep & distribution", icon: "🥘", openings: 40 },
      { task: "Supply truck loading", icon: "🚚", openings: 10 },
    ]},
    { charity: "SC Animal Rescue", img: "🐕", needs: [
      { task: "Sheltering displaced animals", icon: "🐾", openings: 22 },
      { task: "Pet reunion & transport", icon: "🚗", openings: 9 },
    ]},
  ],
  "Pediatric Leukemia": [
    { charity: "St. Jude Children's Research", img: "🏥", needs: [
      { task: "Writing letters to patients", icon: "✉️", openings: 50 },
      { task: "Family meal delivery", icon: "🍽️", openings: 14 },
    ]},
    { charity: "Ronald McDonald House", img: "🏠", needs: [
      { task: "Visiting families & patients", icon: "💛", openings: 20 },
      { task: "Cooking meals for families", icon: "👩‍🍳", openings: 12 },
    ]},
    { charity: "Leukemia & Lymphoma Society", img: "🔬", needs: [
      { task: "Fundraiser event setup", icon: "🎪", openings: 16 },
      { task: "Patient transportation assistance", icon: "🚗", openings: 8 },
    ]},
    { charity: "Alex's Lemonade Stand", img: "🍋", needs: [
      { task: "Community outreach & tabling", icon: "📋", openings: 25 },
      { task: "Care package assembly", icon: "🎁", openings: 30 },
    ]},
    { charity: "Children's Cancer Research Fund", img: "🧬", needs: [
      { task: "Hospital playroom volunteers", icon: "🧸", openings: 10 },
      { task: "Delivering meals to families", icon: "🍲", openings: 18 },
    ]},
  ],
  "Wildfires": [
    { charity: "California Fire Foundation", img: "🔥", needs: [
      { task: "Delivering emergency supplies", icon: "📦", openings: 30 },
      { task: "Evacuee check-in assistance", icon: "📋", openings: 15 },
    ]},
    { charity: "American Red Cross Wildfire Relief", img: "🏥", needs: [
      { task: "Shelter staffing & support", icon: "🏕️", openings: 28 },
      { task: "Supply sorting & distribution", icon: "🧤", openings: 20 },
    ]},
    { charity: "One Tree Planted", img: "🌲", needs: [
      { task: "Tree planting & reforestation", icon: "🌱", openings: 45 },
      { task: "Soil prep & land clearing", icon: "🪴", openings: 18 },
    ]},
    { charity: "Wildland Firefighter Foundation", img: "👨‍🚒", needs: [
      { task: "Firefighter family meal delivery", icon: "🍽️", openings: 12 },
      { task: "Equipment cleaning & sorting", icon: "🧹", openings: 10 },
    ]},
    { charity: "National Wildlife Federation", img: "🦌", needs: [
      { task: "Sheltering displaced animals", icon: "🐾", openings: 22 },
      { task: "Debris clearing from habitats", icon: "🛠️", openings: 16 },
    ]},
  ],
};

const PROFILE_DATA = {
  name: "Alex",
  memberSince: "March 2024",
  totalDonated: 1425,
  hoursVolunteered: 48,
  activeDonations: 3,
  causeBreakdown: [
    { cause: "Education", amount: 475, color: COLORS.primary },
    { cause: "Disaster Relief", amount: 400, color: COLORS.accent },
    { cause: "Water Access", amount: 300, color: COLORS.secondary },
    { cause: "Animal Welfare", amount: 250, color: COLORS.tertiary },
  ],
  recentActivity: [
    { type: "donation", desc: "Red Cross Disaster Relief", amount: "$50", date: "Feb 12" },
    { type: "volunteer", desc: "Code for Kids Workshop", hours: "4 hrs", date: "Feb 8" },
    { type: "donation", desc: "Code for Kids", amount: "$25", date: "Jan 28" },
    { type: "donation", desc: "Clean Water Now", amount: "$100", date: "Dec 15" },
    { type: "volunteer", desc: "Greenville Food Bank", hours: "6 hrs", date: "Dec 10" },
  ],
  recurringDonations: [
    { charity: "Red Cross Disaster Relief", amount: "$25/mo", since: "Aug 2024" },
    { charity: "Code for Kids", amount: "$15/mo", since: "Nov 2024" },
    { charity: "Clean Water Now", amount: "$20/mo", since: "Jan 2025" },
  ],
};

// ============= Animated number counter =============
function AnimatedNumber({ value, prefix = "", suffix = "", duration = 1200 }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = Date.now();
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(tick);
          };
          tick();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration]);

  return <span ref={ref}>{prefix}{display.toLocaleString()}{suffix}</span>;
}

// ============= Charity Card =============
function CharityCard({ charity, onSelect, delay = 0 }) {
  const categoryColors = {
    "Animal Welfare": "#e8735a",
    "Environment": "#4caf50",
    "Hunger Relief": "#ff9800",
    "Education": "#5c6bc0",
    "Climate Action": "#66bb6a",
    "Housing": "#8d6e63",
    "Disaster Relief": "#ef5350",
    "Water Access": "#29b6f6",
  };

  return (
    <div
      onClick={() => onSelect(charity)}
      style={{
        minWidth: 200,
        maxWidth: 200,
        background: COLORS.white,
        borderRadius: 16,
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: "0 2px 12px rgba(22,105,122,0.08)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        animation: `slideUp 0.5s ease ${delay}ms both`,
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(22,105,122,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(22,105,122,0.08)";
      }}
    >
      <div style={{
        height: 110,
        background: `linear-gradient(135deg, ${COLORS.tertiary}40, ${COLORS.secondary}30)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 48,
        position: "relative",
      }}>
        {charity.img}
        <span style={{
          position: "absolute",
          top: 8,
          right: 8,
          background: categoryColors[charity.category] || COLORS.primary,
          color: COLORS.white,
          fontSize: 10,
          fontWeight: 600,
          padding: "3px 8px",
          borderRadius: 20,
          fontFamily: "'DM Sans', sans-serif",
        }}>
          {charity.category}
        </span>
      </div>
      <div style={{ padding: "12px 14px 14px" }}>
        <div style={{
          fontFamily: "'Nunito', sans-serif",
          fontWeight: 800,
          fontSize: 15,
          color: COLORS.textDark,
          marginBottom: 6,
          lineHeight: 1.2,
        }}>
          {charity.name}
        </div>
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 12,
          color: COLORS.textMuted,
          marginBottom: 10,
          lineHeight: 1.4,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>
          {charity.description}
        </div>
        <div style={{
          height: 5,
          background: "#eee",
          borderRadius: 10,
          overflow: "hidden",
          marginBottom: 6,
        }}>
          <div style={{
            height: "100%",
            width: `${charity.progress}%`,
            background: `linear-gradient(90deg, ${COLORS.secondary}, ${COLORS.accent})`,
            borderRadius: 10,
            transition: "width 1s ease",
          }} />
        </div>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 11,
          color: COLORS.textMuted,
        }}>
          <span><strong style={{ color: COLORS.primary }}>{charity.raised}</strong> raised</span>
          <span>{charity.progress}%</span>
        </div>
      </div>
    </div>
  );
}

// ============= Charity Detail Modal =============
function CharityDetail({ charity, onClose }) {
  const [donationAmount, setDonationAmount] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const amounts = [10, 25, 50, 100];

  if (!charity) return null;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 100,
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      animation: "fadeIn 0.3s ease",
    }}>
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(4px)",
        }}
      />
      <div style={{
        position: "relative",
        width: "100%",
        maxWidth: 420,
        maxHeight: "85vh",
        background: COLORS.white,
        borderRadius: "24px 24px 0 0",
        overflow: "auto",
        animation: "slideFromBottom 0.4s ease",
      }}>
        {showConfirm ? (
          <div style={{ padding: 32, textAlign: "center" }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
            <h2 style={{
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 800,
              fontSize: 24,
              color: COLORS.primary,
              marginBottom: 8,
            }}>Thank you!</h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              color: COLORS.textMuted,
              fontSize: 15,
              lineHeight: 1.6,
              marginBottom: 24,
            }}>
              Your ${donationAmount} donation to {charity.name} will make a real difference.
            </p>
            <button
              onClick={onClose}
              style={{
                background: COLORS.primary,
                color: COLORS.white,
                border: "none",
                borderRadius: 14,
                padding: "14px 40px",
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 700,
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div style={{
              height: 180,
              background: `linear-gradient(135deg, ${COLORS.tertiary}50, ${COLORS.secondary}40)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 72,
              position: "relative",
            }}>
              {charity.img}
              <button
                onClick={onClose}
                style={{
                  position: "absolute",
                  top: 14,
                  right: 14,
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.8)",
                  border: "none",
                  fontSize: 18,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: COLORS.textDark,
                }}
              >
                ✕
              </button>
            </div>
            <div style={{ padding: "20px 24px 32px" }}>
              <span style={{
                display: "inline-block",
                background: `${COLORS.secondary}20`,
                color: COLORS.primary,
                fontSize: 12,
                fontWeight: 600,
                padding: "4px 12px",
                borderRadius: 20,
                fontFamily: "'DM Sans', sans-serif",
                marginBottom: 10,
              }}>
                {charity.category}
              </span>
              <h2 style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 800,
                fontSize: 24,
                color: COLORS.textDark,
                margin: "0 0 8px",
              }}>
                {charity.name}
              </h2>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                color: COLORS.textMuted,
                lineHeight: 1.6,
                marginBottom: 20,
              }}>
                {charity.description}
              </p>

              <div style={{
                background: `${COLORS.bg}`,
                borderRadius: 14,
                padding: 16,
                marginBottom: 20,
              }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 8,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                }}>
                  <span style={{ color: COLORS.textMuted }}>Progress</span>
                  <span style={{ fontWeight: 700, color: COLORS.primary }}>{charity.raised} of {charity.goal}</span>
                </div>
                <div style={{
                  height: 8,
                  background: "#ddd",
                  borderRadius: 10,
                  overflow: "hidden",
                }}>
                  <div style={{
                    height: "100%",
                    width: `${charity.progress}%`,
                    background: `linear-gradient(90deg, ${COLORS.secondary}, ${COLORS.accent})`,
                    borderRadius: 10,
                    transition: "width 1.2s ease",
                  }} />
                </div>
              </div>

              <p style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 700,
                fontSize: 15,
                color: COLORS.textDark,
                marginBottom: 12,
              }}>
                Choose an amount
              </p>
              <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
                {amounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setDonationAmount(amt)}
                    style={{
                      flex: 1,
                      padding: "12px 0",
                      borderRadius: 12,
                      border: donationAmount === amt ? `2px solid ${COLORS.accent}` : `2px solid #e0e0e0`,
                      background: donationAmount === amt ? `${COLORS.accent}15` : COLORS.white,
                      fontFamily: "'Nunito', sans-serif",
                      fontWeight: 700,
                      fontSize: 16,
                      color: donationAmount === amt ? COLORS.accent : COLORS.textDark,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    ${amt}
                  </button>
                ))}
              </div>

              <button
                onClick={() => donationAmount && setShowConfirm(true)}
                style={{
                  width: "100%",
                  padding: "16px",
                  borderRadius: 14,
                  border: "none",
                  background: donationAmount
                    ? `linear-gradient(135deg, ${COLORS.accent}, #ff8c00)`
                    : "#ccc",
                  color: COLORS.white,
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 800,
                  fontSize: 17,
                  cursor: donationAmount ? "pointer" : "default",
                  transition: "all 0.3s ease",
                  boxShadow: donationAmount ? `0 4px 20px ${COLORS.accent}40` : "none",
                }}
              >
                {donationAmount ? `Donate $${donationAmount}` : "Select an amount"}
              </button>

              <div style={{
                display: "flex",
                gap: 10,
                marginTop: 12,
              }}>
                <button style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: 12,
                  border: `2px solid ${COLORS.primary}20`,
                  background: "transparent",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: 13,
                  color: COLORS.primary,
                  cursor: "pointer",
                }}>
                  🕐 Volunteer
                </button>
                <button style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: 12,
                  border: `2px solid ${COLORS.primary}20`,
                  background: "transparent",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: 13,
                  color: COLORS.primary,
                  cursor: "pointer",
                }}>
                  🔗 Share
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ============= Horizontal Scroll Section =============
function CardSection({ title, charities, onSelect }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        marginBottom: 14,
      }}>
        <h2 style={{
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 800,
            fontSize: 19,
            color: COLORS.textDark,
            margin: 0,
          }}>
            {title}
          </h2>
        <span style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          fontWeight: 600,
          color: COLORS.secondary,
          cursor: "pointer",
        }}>
          See all →
        </span>
      </div>
      <div style={{
        display: "flex",
        gap: 14,
        overflowX: "auto",
        padding: "0 20px 8px",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        WebkitOverflowScrolling: "touch",
      }}>
        {charities.map((c, i) => (
          <CharityCard key={c.id} charity={c} onSelect={onSelect} delay={i * 80} />
        ))}
      </div>
    </div>
  );
}

// ============= Profile Screen =============
function ProfileScreen() {
  const maxAmount = Math.max(...PROFILE_DATA.causeBreakdown.map(c => c.amount));

  return (
    <div style={{
      padding: "0 0 100px",
      animation: "fadeIn 0.4s ease",
    }}>
      {/* Profile header */}
      <div style={{
        background: `linear-gradient(160deg, ${COLORS.primary}, ${COLORS.secondary})`,
        padding: "32px 24px 40px",
        borderRadius: "0 0 32px 32px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 30% 20%, ${COLORS.tertiary}30 0%, transparent 60%)`,
        }} />
        <div style={{
          position: "relative",
          width: 80,
          height: 80,
          borderRadius: "50%",
          margin: "0 auto 12px",
          border: `3px solid ${COLORS.white}`,
          boxShadow: `0 4px 20px rgba(0,0,0,0.15)`,
          overflow: "hidden",
        }}>
          <img src={ALEX_AVATAR} alt="Alex" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <h2 style={{
          fontFamily: "'Nunito', sans-serif",
          fontWeight: 800,
          fontSize: 24,
          color: COLORS.white,
          margin: "0 0 4px",
          position: "relative",
        }}>
          {PROFILE_DATA.name}
        </h2>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          color: "rgba(255,255,255,0.75)",
          margin: 0,
          position: "relative",
        }}>
          Doing good since {PROFILE_DATA.memberSince}
        </p>
      </div>

      {/* Impact stats */}
      <div style={{
        display: "flex",
        gap: 12,
        padding: "0 20px",
        marginTop: -20,
        position: "relative",
        zIndex: 2,
      }}>
        {[
          { label: "Donated", value: PROFILE_DATA.totalDonated, prefix: "$", icon: "💝" },
          { label: "Volunteered", value: PROFILE_DATA.hoursVolunteered, suffix: " hrs", icon: "⏰" },
          { label: "Active", value: PROFILE_DATA.activeDonations, icon: "🔄" },
        ].map((stat, i) => (
          <div key={i} style={{
            flex: 1,
            background: COLORS.white,
            borderRadius: 16,
            padding: "16px 10px",
            textAlign: "center",
            boxShadow: "0 4px 16px rgba(22,105,122,0.1)",
          }}>
            <div style={{ fontSize: 22, marginBottom: 4 }}>{stat.icon}</div>
            <div style={{
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 800,
              fontSize: 22,
              color: COLORS.primary,
            }}>
              <AnimatedNumber value={stat.value} prefix={stat.prefix || ""} suffix={stat.suffix || ""} />
            </div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              color: COLORS.textMuted,
              fontWeight: 500,
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Giving breakdown */}
      <div style={{ padding: "24px 20px 0" }}>
        <h3 style={{
          fontFamily: "'Nunito', sans-serif",
          fontWeight: 800,
          fontSize: 17,
          color: COLORS.textDark,
          marginBottom: 16,
        }}>
          Where your giving goes
        </h3>
        <div style={{
          background: COLORS.white,
          borderRadius: 16,
          padding: 18,
          boxShadow: "0 2px 12px rgba(22,105,122,0.06)",
        }}>
          {PROFILE_DATA.causeBreakdown.map((cause, i) => (
            <div key={i} style={{ marginBottom: i < PROFILE_DATA.causeBreakdown.length - 1 ? 14 : 0 }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 6,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
              }}>
                <span style={{ color: COLORS.textDark, fontWeight: 600 }}>{cause.cause}</span>
                <span style={{ color: COLORS.textMuted }}>${cause.amount}</span>
              </div>
              <div style={{
                height: 8,
                background: "#f0f0f0",
                borderRadius: 10,
                overflow: "hidden",
              }}>
                <div style={{
                  height: "100%",
                  width: `${(cause.amount / maxAmount) * 100}%`,
                  background: cause.color,
                  borderRadius: 10,
                  transition: "width 1s ease",
                  animation: `growBar 1s ease ${i * 150}ms both`,
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recurring donations */}
      <div style={{ padding: "24px 20px 0" }}>
        <h3 style={{
          fontFamily: "'Nunito', sans-serif",
          fontWeight: 800,
          fontSize: 17,
          color: COLORS.textDark,
          marginBottom: 16,
        }}>
          Recurring donations
        </h3>
        {PROFILE_DATA.recurringDonations.map((rd, i) => (
          <div key={i} style={{
            background: COLORS.white,
            borderRadius: 14,
            padding: "14px 16px",
            marginBottom: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 2px 8px rgba(22,105,122,0.05)",
          }}>
            <div>
              <div style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 700,
                fontSize: 14,
                color: COLORS.textDark,
                marginBottom: 2,
              }}>
                {rd.charity}
              </div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                color: COLORS.textMuted,
              }}>
                Since {rd.since}
              </div>
            </div>
            <div style={{
              background: `${COLORS.accent}15`,
              color: COLORS.accent,
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 800,
              fontSize: 14,
              padding: "6px 14px",
              borderRadius: 10,
            }}>
              {rd.amount}
            </div>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <div style={{ padding: "24px 20px 0" }}>
        <h3 style={{
          fontFamily: "'Nunito', sans-serif",
          fontWeight: 800,
          fontSize: 17,
          color: COLORS.textDark,
          marginBottom: 16,
        }}>
          Recent activity
        </h3>
        {PROFILE_DATA.recentActivity.map((act, i) => (
          <div key={i} style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "12px 0",
            borderBottom: i < PROFILE_DATA.recentActivity.length - 1 ? "1px solid #f0ece8" : "none",
          }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: act.type === "donation" ? `${COLORS.accent}15` : `${COLORS.tertiary}30`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              flexShrink: 0,
            }}>
              {act.type === "donation" ? "💝" : "🤝"}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 700,
                fontSize: 14,
                color: COLORS.textDark,
              }}>
                {act.desc}
              </div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                color: COLORS.textMuted,
              }}>
                {act.date}
              </div>
            </div>
            <div style={{
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 700,
              fontSize: 14,
              color: act.type === "donation" ? COLORS.accent : COLORS.secondary,
            }}>
              {act.amount || act.hours}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============= Side Menu =============
function SideMenu({ isOpen, onClose }) {
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 200,
      pointerEvents: isOpen ? "auto" : "none",
    }}>
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.35)",
          opacity: isOpen ? 1 : 0,
          transition: "opacity 0.3s ease",
          backdropFilter: isOpen ? "blur(4px)" : "none",
        }}
      />
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: 280,
        background: COLORS.white,
        transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        padding: "48px 24px",
        boxShadow: isOpen ? "4px 0 24px rgba(0,0,0,0.1)" : "none",
      }}>
        <div style={{
          fontFamily: "'Nunito', sans-serif",
          fontWeight: 800,
          fontSize: 26,
          color: COLORS.primary,
          marginBottom: 36,
        }}>
          Do Good
        </div>
        {[
          { icon: "🏠", label: "Home" },
          { icon: "❤️", label: "Favorites" },
          { icon: "📊", label: "Impact Report" },
          { icon: "🧾", label: "Tax documents" },
          { icon: "⚙️", label: "Settings" },
          { icon: "❓", label: "Help & FAQ" },
        ].map((item, i) => (
          <div
            key={i}
            onClick={onClose}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "14px 8px",
              borderRadius: 12,
              cursor: "pointer",
              transition: "background 0.2s",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15,
              fontWeight: 500,
              color: COLORS.textDark,
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = `${COLORS.primary}08`}
            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
          >
            <span style={{ fontSize: 20 }}>{item.icon}</span>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============= Good Job (Wrapped-style) Screen =============
function GoodJobScreen() {
  const [slide, setSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [animKey, setAnimKey] = useState(0);
  const totalSlides = 6;

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setSlide(prev => {
        if (prev >= totalSlides - 1) {
          setAutoPlay(false);
          return prev;
        }
        return prev + 1;
      });
      setAnimKey(k => k + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  const goTo = (i) => { setSlide(i); setAnimKey(k => k + 1); };
  const replay = () => { setSlide(0); setAnimKey(k => k + 1); setAutoPlay(true); };

  const gradients = [
    `linear-gradient(135deg, ${COLORS.primary}, #1a8a6e)`,
    `linear-gradient(135deg, ${COLORS.accent}, #e8501a)`,
    `linear-gradient(135deg, #5c6bc0, ${COLORS.primary})`,
    `linear-gradient(135deg, ${COLORS.secondary}, #2d8a5e)`,
    `linear-gradient(135deg, #e8501a, ${COLORS.accent})`,
    `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
  ];

  const slideStyle = {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 28px 100px",
    textAlign: "center",
    color: COLORS.white,
  };

  const bigNum = {
    fontFamily: "'Nunito', sans-serif",
    fontWeight: 900,
    color: COLORS.white,
    lineHeight: 1.1,
    margin: "0 0 8px",
  };

  const subText = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 15,
    color: "rgba(255,255,255,0.8)",
    lineHeight: 1.5,
    maxWidth: 300,
  };

  const label = {
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 600,
    fontSize: 13,
    color: "rgba(255,255,255,0.6)",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: 12,
  };

  const statRow = (icon, value, desc, delay = 0) => (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 14,
      background: "rgba(255,255,255,0.12)",
      borderRadius: 16,
      padding: "14px 18px",
      marginBottom: 10,
      width: "100%",
      maxWidth: 320,
      animation: `slideUp 0.6s ease ${delay}ms both`,
    }}>
      <span style={{ fontSize: 28 }}>{icon}</span>
      <div style={{ textAlign: "left" }}>
        <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 20, color: COLORS.white }}>{value}</div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.7)" }}>{desc}</div>
      </div>
    </div>
  );

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 300,
      background: "#000",
      maxWidth: 420,
      margin: "0 auto",
    }}>
      <style>{`
        @keyframes gjScaleIn {
          0% { transform: scale(0.5); opacity: 0; }
          60% { transform: scale(1.08); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes gjFadeUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes gjCountUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes gjPulseGlow {
          0%, 100% { box-shadow: 0 0 40px rgba(255,166,43,0.3); }
          50% { box-shadow: 0 0 80px rgba(255,166,43,0.6); }
        }
        @keyframes gjConfetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-60px) rotate(360deg); opacity: 0; }
        }
        @keyframes gjSlideIn {
          from { transform: translateX(60px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes gjGlobe {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {/* Background gradient */}
      <div key={`bg-${slide}`} style={{
        position: "absolute",
        inset: 0,
        background: gradients[slide],
        transition: "background 0.8s ease",
      }}>
        {/* Decorative circles */}
        <div style={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.04)",
          top: -80,
          right: -100,
        }} />
        <div style={{
          position: "absolute",
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.04)",
          bottom: 60,
          left: -60,
        }} />
      </div>

      {/* Close button */}
      <button
        onClick={() => {
          const event = new CustomEvent("closeGoodJob");
          window.dispatchEvent(event);
        }}
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          zIndex: 310,
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.15)",
          border: "none",
          color: COLORS.white,
          fontSize: 18,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(4px)",
        }}
      >
        ✕
      </button>

      {/* Progress dots */}
      <div style={{
        position: "absolute",
        top: 20,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        gap: 6,
        zIndex: 310,
      }}>
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === slide ? 24 : 8,
              height: 8,
              borderRadius: 4,
              background: i === slide ? COLORS.white : "rgba(255,255,255,0.3)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.4s ease",
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Tap zones for manual navigation */}
      <div style={{ position: "absolute", inset: 0, zIndex: 305, display: "flex" }}>
        <div style={{ flex: 1 }} onClick={() => slide > 0 && goTo(slide - 1)} />
        <div style={{ flex: 1 }} onClick={() => slide < totalSlides - 1 && goTo(slide + 1)} />
      </div>

      {/* ===== SLIDE 0: Intro ===== */}
      {slide === 0 && (
        <div key={`s0-${animKey}`} style={slideStyle}>
          <div style={{
            fontSize: 72,
            marginBottom: 24,
            animation: "gjScaleIn 0.8s ease both",
          }}>
            🎉
          </div>
          <h1 style={{
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 900,
            fontSize: 42,
            color: COLORS.white,
            margin: "0 0 12px",
            animation: "gjFadeUp 0.7s ease 0.3s both",
            lineHeight: 1.1,
          }}>
            Good job,<br />Alex!
          </h1>
          <p style={{
            ...subText,
            fontSize: 17,
            animation: "gjFadeUp 0.7s ease 0.6s both",
          }}>
            Let's look at all the good you did in 2025
          </p>
        </div>
      )}

      {/* ===== SLIDE 1: Financial giving ===== */}
      {slide === 1 && (
        <div key={`s1-${animKey}`} style={slideStyle}>
          <div style={{ ...label, animation: "gjFadeUp 0.5s ease both" }}>Your generosity in 2025</div>
          <div style={{
            animation: "gjCountUp 0.7s ease 0.2s both",
          }}>
            <div style={{ ...bigNum, fontSize: 56 }}>$1,425</div>
            <div style={{ ...subText, fontSize: 13, marginBottom: 6 }}>donated by you</div>
          </div>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(255,255,255,0.12)",
            borderRadius: 14,
            padding: "12px 20px",
            margin: "8px 0 20px",
            animation: "gjFadeUp 0.6s ease 0.5s both",
          }}>
            <span style={{ fontSize: 22 }}>🏢</span>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 18 }}>+ $712 employer match</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.7)" }}>Your company doubled your impact</div>
            </div>
          </div>
          <div style={{
            ...bigNum,
            fontSize: 40,
            animation: "gjScaleIn 0.6s ease 0.8s both",
            color: COLORS.accent,
            textShadow: "0 2px 20px rgba(255,166,43,0.4)",
          }}>
            $2,137
          </div>
          <div style={{
            ...subText,
            fontSize: 13,
            marginBottom: 28,
            animation: "gjFadeUp 0.5s ease 1s both",
          }}>
            total impact
          </div>
          <div style={{
            background: "rgba(255,255,255,0.1)",
            borderRadius: 16,
            padding: "14px 22px",
            maxWidth: 300,
            animation: "gjFadeUp 0.6s ease 1.3s both",
            border: "1px solid rgba(255,255,255,0.15)",
          }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.9)", lineHeight: 1.5 }}>
              ⭐ This puts you in the <strong style={{ color: COLORS.accent }}>top 20%</strong> of donors to animal causes in your region
            </div>
          </div>
        </div>
      )}

      {/* ===== SLIDE 2: Real-world impact ===== */}
      {slide === 2 && (
        <div key={`s2-${animKey}`} style={slideStyle}>
          <div style={{ ...label, animation: "gjFadeUp 0.5s ease both" }}>Your money at work</div>
          <h2 style={{
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 800,
            fontSize: 24,
            color: COLORS.white,
            margin: "0 0 28px",
            animation: "gjFadeUp 0.6s ease 0.2s both",
          }}>
            Here's what $2,137 did
          </h2>
          {statRow("🍽️", "854 meals", "Served to families in need", 300)}
          {statRow("🐾", "12 animals", "Rescued and rehomed", 450)}
          {statRow("💧", "430 bottles", "Of clean water delivered to firefighters", 600)}
          {statRow("📚", "65 books", "Donated to underserved schools", 750)}
          {statRow("🏠", "3 families", "Helped with emergency housing", 900)}
        </div>
      )}

      {/* ===== SLIDE 3: Hours volunteered ===== */}
      {slide === 3 && (
        <div key={`s3-${animKey}`} style={slideStyle}>
          <div style={{ ...label, animation: "gjFadeUp 0.5s ease both" }}>Time is the greatest gift</div>
          <div style={{
            width: 140,
            height: 140,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
            animation: "gjScaleIn 0.8s ease 0.2s both, gjPulseGlow 3s ease infinite 1s",
            border: "2px solid rgba(255,255,255,0.15)",
          }}>
            <div>
              <div style={{ ...bigNum, fontSize: 52 }}>48</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.7)" }}>hours</div>
            </div>
          </div>
          <h2 style={{
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 800,
            fontSize: 22,
            color: COLORS.white,
            margin: "0 0 16px",
            animation: "gjFadeUp 0.6s ease 0.5s both",
          }}>
            volunteered across 3 organizations
          </h2>
          <div style={{
            display: "flex",
            gap: 12,
            animation: "gjFadeUp 0.6s ease 0.8s both",
          }}>
            {[
              { icon: "🤝", label: "Code for Kids", hrs: "22 hrs" },
              { icon: "🥫", label: "Food Bank", hrs: "16 hrs" },
              { icon: "🏗️", label: "Habitat", hrs: "10 hrs" },
            ].map((v, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.1)",
                borderRadius: 14,
                padding: "14px 10px",
                textAlign: "center",
                flex: 1,
                animation: `gjSlideIn 0.5s ease ${800 + i * 150}ms both`,
              }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{v.icon}</div>
                <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 14 }}>{v.hrs}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.6)", marginTop: 2 }}>{v.label}</div>
              </div>
            ))}
          </div>
          <p style={{
            ...subText,
            marginTop: 20,
            animation: "gjFadeUp 0.5s ease 1.3s both",
          }}>
            That's like 6 full workdays spent making the world better 💪
          </p>
        </div>
      )}

      {/* ===== SLIDE 4: Global community ===== */}
      {slide === 4 && (
        <div key={`s4-${animKey}`} style={slideStyle}>
          <div style={{ ...label, animation: "gjFadeUp 0.5s ease both" }}>You're part of something huge</div>
          <div style={{
            fontSize: 64,
            marginBottom: 20,
            animation: "gjScaleIn 0.8s ease 0.2s both",
          }}>
            🌍
          </div>
          <h2 style={{
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 800,
            fontSize: 22,
            color: COLORS.white,
            margin: "0 0 28px",
            animation: "gjFadeUp 0.6s ease 0.4s both",
          }}>
            Together, Do-Gooders worldwide gave
          </h2>
          <div style={{
            animation: "gjCountUp 0.7s ease 0.7s both",
            marginBottom: 8,
          }}>
            <div style={{ ...bigNum, fontSize: 52 }}>$48.2M</div>
            <div style={{ ...subText, fontSize: 14, marginBottom: 24 }}>donated across 142 countries</div>
          </div>
          <div style={{
            animation: "gjCountUp 0.7s ease 1s both",
            marginBottom: 8,
          }}>
            <div style={{ ...bigNum, fontSize: 48 }}>1.2M hours</div>
            <div style={{ ...subText, fontSize: 14, marginBottom: 24 }}>volunteered by 380,000 people</div>
          </div>
          <div style={{
            background: "rgba(255,255,255,0.1)",
            borderRadius: 16,
            padding: "14px 22px",
            maxWidth: 300,
            animation: "gjFadeUp 0.6s ease 1.5s both",
            border: "1px solid rgba(255,255,255,0.15)",
          }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.9)", lineHeight: 1.5 }}>
              Your $2,137 and 48 hours helped make this possible. Every act of kindness ripples outward. 🌊
            </div>
          </div>
        </div>
      )}

      {/* ===== SLIDE 5: Final / Share ===== */}
      {slide === 5 && (
        <div key={`s5-${animKey}`} style={slideStyle}>
          <div style={{
            fontSize: 56,
            marginBottom: 20,
            animation: "gjScaleIn 0.8s ease both",
          }}>
            💛
          </div>
          <h1 style={{
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 900,
            fontSize: 34,
            color: COLORS.white,
            margin: "0 0 12px",
            animation: "gjFadeUp 0.6s ease 0.3s both",
            lineHeight: 1.2,
          }}>
            The world is better because of you, Alex
          </h1>
          <p style={{
            ...subText,
            fontSize: 16,
            marginBottom: 40,
            animation: "gjFadeUp 0.6s ease 0.6s both",
          }}>
            Keep doing good in 2026
          </p>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            width: "100%",
            maxWidth: 300,
            animation: "gjFadeUp 0.6s ease 0.9s both",
            position: "relative",
            zIndex: 320,
          }}>
            <button
              onClick={(e) => { e.stopPropagation(); replay(); }}
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: 16,
                border: "2px solid rgba(255,255,255,0.3)",
                background: "rgba(255,255,255,0.1)",
                color: COLORS.white,
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 800,
                fontSize: 17,
                cursor: "pointer",
                backdropFilter: "blur(4px)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.2)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
            >
              🔄 Replay
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); }}
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: 16,
                border: "none",
                background: COLORS.white,
                color: COLORS.primary,
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 800,
                fontSize: 17,
                cursor: "pointer",
                boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.03)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
            >
              📤 Share my year of good
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ============= Main App =============
export default function DoGoodApp() {
  const [activeTab, setActiveTab] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCharity, setSelectedCharity] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCause, setSelectedCause] = useState(null);
  const [causeStep, setCauseStep] = useState("help"); // "help" | "charities" | "volunteer" | "amount" | "frequency" | "payment" | "confirmed"
  const [causeDonation, setCauseDonation] = useState({ amount: null, frequency: "one-time", charity: null });
  const [showGoodJob, setShowGoodJob] = useState(false);

  useEffect(() => {
    const handler = () => { setShowGoodJob(false); setActiveTab("home"); };
    window.addEventListener("closeGoodJob", handler);
    return () => window.removeEventListener("closeGoodJob", handler);
  }, []);

  const filteredCharities = (list) => {
    if (!searchQuery) return list;
    return list.filter(c =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div style={{
      width: "100%",
      maxWidth: 420,
      margin: "0 auto",
      background: COLORS.bg,
      minHeight: "100vh",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'DM Sans', sans-serif",
      borderLeft: `1px solid #ddd`,
      borderRight: `1px solid #ddd`,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        ::-webkit-scrollbar { display: none; }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideFromBottom {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }

        @keyframes growBar {
          from { width: 0; }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        input::placeholder {
          color: #a0a0a0;
        }
      `}</style>

      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 20px 12px",
        position: "sticky",
        top: 0,
        background: COLORS.bg,
        zIndex: 50,
        borderBottom: "1px solid rgba(22,105,122,0.06)",
      }}>
        <button
          onClick={() => setMenuOpen(true)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 4,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <div style={{ width: 22, height: 2.5, background: COLORS.primary, borderRadius: 2 }} />
          <div style={{ width: 16, height: 2.5, background: COLORS.primary, borderRadius: 2 }} />
          <div style={{ width: 22, height: 2.5, background: COLORS.primary, borderRadius: 2 }} />
        </button>

        <div style={{
          fontFamily: "'Nunito', sans-serif",
          fontWeight: 900,
          fontSize: 22,
          color: COLORS.primary,
          letterSpacing: -0.5,
        }}>
          Do Good
        </div>

        {/* Spacer to keep title centered */}
        <div style={{ width: 38 }} />
      </div>

      <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {selectedCause ? (
        <div style={{
          padding: "40px 20px 80px",
          animation: "fadeIn 0.35s ease",
          minHeight: "80vh",
        }}>
          {/* Back button */}
          <button
            onClick={() => {
              if (causeStep === "help" || causeStep === "confirmed") {
                setSelectedCause(null);
                setCauseStep("help");
                setCauseDonation({ amount: null, frequency: "one-time", charity: null });
              } else if (causeStep === "charities") setCauseStep("help");
              else if (causeStep === "volunteer") setCauseStep("help");
              else if (causeStep === "amount") setCauseStep("charities");
              else if (causeStep === "frequency") setCauseStep("amount");
              else if (causeStep === "payment") setCauseStep("frequency");
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              color: COLORS.secondary,
              padding: 0,
              marginBottom: 28,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            {causeStep === "confirmed" ? "← Home" : "← Back"}
          </button>

          {/* Cause title - always visible */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 6,
          }}>
            <span style={{
              fontSize: 12,
              background: `${COLORS.secondary}18`,
              color: COLORS.primary,
              padding: "4px 12px",
              borderRadius: 20,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
            }}>
              {selectedCause}
            </span>
          </div>

          {/* ========= STEP: How can you help? ========= */}
          {causeStep === "help" && (
            <div style={{ animation: "fadeIn 0.35s ease" }}>
              <h2 style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 800,
                fontSize: 26,
                color: COLORS.textDark,
                margin: "16px 0 8px",
              }}>
                How can you help?
              </h2>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                color: COLORS.textMuted,
                marginBottom: 32,
              }}>
                Choose how you'd like to make a difference
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { label: "Donate", icon: "💝", desc: "Make a one-time or recurring donation", action: () => setCauseStep("charities") },
                  { label: "Volunteer", icon: "🤝", desc: "Give your time and skills", action: () => setCauseStep("volunteer") },
                  { label: "Fundraise", icon: "📣", desc: "Start a campaign for this cause" },
                  { label: "Attend an event", icon: "🎟️", desc: "Find local events supporting this cause" },
                ].map((option, i) => (
                  <button
                    key={i}
                    onClick={option.action || undefined}
                    style={{
                      width: "100%",
                      padding: "20px 22px",
                      borderRadius: 16,
                      border: "none",
                      background: `linear-gradient(135deg, ${COLORS.tertiary}40, ${COLORS.secondary}28)`,
                      fontFamily: "'Nunito', sans-serif",
                      fontWeight: 800,
                      fontSize: 18,
                      color: COLORS.primary,
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      textAlign: "left",
                      animation: `slideUp 0.4s ease ${i * 80}ms both`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `linear-gradient(135deg, ${COLORS.secondary}50, ${COLORS.tertiary}50)`;
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = `0 4px 16px ${COLORS.secondary}30`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = `linear-gradient(135deg, ${COLORS.tertiary}40, ${COLORS.secondary}28)`;
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <span style={{ fontSize: 24 }}>{option.icon}</span>
                    <div>
                      <div>{option.label}</div>
                      <div style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 500,
                        fontSize: 12,
                        color: COLORS.textMuted,
                        marginTop: 2,
                      }}>
                        {option.desc}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ========= STEP: Choose a charity ========= */}
          {causeStep === "charities" && (
            <div style={{ animation: "fadeIn 0.35s ease" }}>
              <h2 style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 800,
                fontSize: 26,
                color: COLORS.textDark,
                margin: "16px 0 8px",
              }}>
                Most impactful charities
              </h2>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                color: COLORS.textMuted,
                marginBottom: 24,
              }}>
                These organizations are making the biggest difference for {selectedCause.toLowerCase()} relief
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {(CAUSE_CHARITIES[selectedCause] || []).map((charity, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setCauseDonation(d => ({ ...d, charity: charity.name }));
                      setCauseStep("amount");
                    }}
                    style={{
                      width: "100%",
                      padding: "16px 18px",
                      borderRadius: 16,
                      border: `2px solid ${COLORS.tertiary}25`,
                      background: COLORS.white,
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                      textAlign: "left",
                      animation: `slideUp 0.4s ease ${i * 70}ms both`,
                      display: "flex",
                      gap: 14,
                      alignItems: "flex-start",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = COLORS.secondary;
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = `0 6px 20px ${COLORS.secondary}18`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = `${COLORS.tertiary}25`;
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div style={{
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      background: `linear-gradient(135deg, ${COLORS.tertiary}35, ${COLORS.secondary}25)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 24,
                      flexShrink: 0,
                    }}>
                      {charity.img}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 4,
                      }}>
                        <span style={{
                          fontFamily: "'Nunito', sans-serif",
                          fontWeight: 800,
                          fontSize: 15,
                          color: COLORS.textDark,
                        }}>{charity.name}</span>
                        <span style={{
                          background: `${COLORS.primary}12`,
                          color: COLORS.primary,
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 700,
                          fontSize: 11,
                          padding: "3px 8px",
                          borderRadius: 8,
                          flexShrink: 0,
                          marginLeft: 8,
                        }}>
                          ★ {charity.rating}
                        </span>
                      </div>
                      <p style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 12,
                        color: COLORS.textMuted,
                        lineHeight: 1.4,
                        margin: "0 0 10px",
                      }}>
                        {charity.impact}
                      </p>
                      <div style={{
                        height: 5,
                        background: "#eee",
                        borderRadius: 10,
                        overflow: "hidden",
                        marginBottom: 4,
                      }}>
                        <div style={{
                          height: "100%",
                          width: `${charity.progress}%`,
                          background: `linear-gradient(90deg, ${COLORS.secondary}, ${COLORS.accent})`,
                          borderRadius: 10,
                        }} />
                      </div>
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 11,
                        color: COLORS.textMuted,
                      }}>
                        <span><strong style={{ color: COLORS.primary }}>{charity.raised}</strong> raised</span>
                        <span>Goal: {charity.goal}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ========= STEP: Volunteer opportunities ========= */}
          {causeStep === "volunteer" && (
            <div style={{ animation: "fadeIn 0.35s ease" }}>
              <h2 style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 800,
                fontSize: 26,
                color: COLORS.textDark,
                margin: "16px 0 8px",
              }}>
                Volunteer opportunities
              </h2>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                color: COLORS.textMuted,
                marginBottom: 24,
              }}>
                Organizations with open needs this week for {selectedCause.toLowerCase()} relief
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {(CAUSE_VOLUNTEERS[selectedCause] || []).map((org, i) => (
                  <div
                    key={i}
                    style={{
                      background: COLORS.white,
                      borderRadius: 18,
                      overflow: "hidden",
                      boxShadow: "0 2px 12px rgba(22,105,122,0.07)",
                      animation: `slideUp 0.4s ease ${i * 70}ms both`,
                    }}
                  >
                    {/* Org header */}
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "14px 16px 10px",
                      borderBottom: `1px solid ${COLORS.tertiary}18`,
                    }}>
                      <div style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        background: `linear-gradient(135deg, ${COLORS.tertiary}35, ${COLORS.secondary}25)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 20,
                        flexShrink: 0,
                      }}>
                        {org.img}
                      </div>
                      <div style={{
                        fontFamily: "'Nunito', sans-serif",
                        fontWeight: 800,
                        fontSize: 15,
                        color: COLORS.textDark,
                      }}>
                        {org.charity}
                      </div>
                    </div>

                    {/* Volunteer needs */}
                    <div style={{ padding: "6px 0" }}>
                      {org.needs.map((need, j) => (
                        <button
                          key={j}
                          style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            padding: "12px 16px",
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            transition: "background 0.2s ease",
                            borderBottom: j < org.needs.length - 1 ? `1px solid ${COLORS.bg}` : "none",
                            textAlign: "left",
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = `${COLORS.primary}05`; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                        >
                          <span style={{ fontSize: 22, flexShrink: 0 }}>{need.icon}</span>
                          <div style={{ flex: 1 }}>
                            <div style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontWeight: 600,
                              fontSize: 14,
                              color: COLORS.textDark,
                              marginBottom: 2,
                            }}>
                              {need.task}
                            </div>
                            <div style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: 12,
                              color: COLORS.textMuted,
                            }}>
                              {need.openings} openings this week
                            </div>
                          </div>
                          <div style={{
                            background: need.openings >= 20 ? `${COLORS.accent}15` : `${COLORS.secondary}15`,
                            color: need.openings >= 20 ? COLORS.accent : COLORS.secondary,
                            fontFamily: "'Nunito', sans-serif",
                            fontWeight: 800,
                            fontSize: 13,
                            padding: "5px 12px",
                            borderRadius: 10,
                            flexShrink: 0,
                          }}>
                            Sign up
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========= STEP: Choose amount ========= */}
          {causeStep === "amount" && (
            <div style={{ animation: "fadeIn 0.35s ease" }}>
              <h2 style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 800,
                fontSize: 26,
                color: COLORS.textDark,
                margin: "16px 0 8px",
              }}>
                Choose an amount
              </h2>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                color: COLORS.textMuted,
                marginBottom: 32,
              }}>
                Every dollar to {causeDonation.charity} makes a difference
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                {[10, 25, 50, 100].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setCauseDonation(d => ({ ...d, amount: amt }))}
                    style={{
                      padding: "22px 0",
                      borderRadius: 16,
                      border: causeDonation.amount === amt ? `2.5px solid ${COLORS.accent}` : `2px solid ${COLORS.tertiary}35`,
                      background: causeDonation.amount === amt ? `${COLORS.accent}12` : COLORS.white,
                      fontFamily: "'Nunito', sans-serif",
                      fontWeight: 800,
                      fontSize: 24,
                      color: causeDonation.amount === amt ? COLORS.accent : COLORS.textDark,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      boxShadow: causeDonation.amount === amt ? `0 4px 16px ${COLORS.accent}20` : "0 2px 8px rgba(0,0,0,0.04)",
                    }}
                  >
                    ${amt}
                  </button>
                ))}
              </div>

              {/* Custom amount */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 32,
              }}>
                <span style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 800,
                  fontSize: 20,
                  color: COLORS.textDark,
                }}>$</span>
                <input
                  type="number"
                  placeholder="Other amount"
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (val > 0) setCauseDonation(d => ({ ...d, amount: val }));
                  }}
                  style={{
                    flex: 1,
                    padding: "14px 16px",
                    borderRadius: 14,
                    border: `2px solid ${COLORS.tertiary}35`,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 16,
                    color: COLORS.textDark,
                    outline: "none",
                    background: COLORS.white,
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = COLORS.secondary;
                    setCauseDonation(d => ({ ...d, amount: null }));
                  }}
                  onBlur={(e) => { e.target.style.borderColor = `${COLORS.tertiary}35`; }}
                />
              </div>

              <button
                onClick={() => causeDonation.amount && setCauseStep("frequency")}
                style={{
                  width: "100%",
                  padding: "18px",
                  borderRadius: 16,
                  border: "none",
                  background: causeDonation.amount ? `linear-gradient(135deg, ${COLORS.accent}, #ff8c00)` : "#ccc",
                  color: COLORS.white,
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 800,
                  fontSize: 17,
                  cursor: causeDonation.amount ? "pointer" : "default",
                  transition: "all 0.3s ease",
                  boxShadow: causeDonation.amount ? `0 4px 20px ${COLORS.accent}40` : "none",
                }}
              >
                {causeDonation.amount ? `Continue with $${causeDonation.amount}` : "Select an amount"}
              </button>
            </div>
          )}

          {/* ========= STEP: Frequency ========= */}
          {causeStep === "frequency" && (
            <div style={{ animation: "fadeIn 0.35s ease" }}>
              <h2 style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 800,
                fontSize: 26,
                color: COLORS.textDark,
                margin: "16px 0 8px",
              }}>
                How often?
              </h2>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                color: COLORS.textMuted,
                marginBottom: 32,
              }}>
                Recurring donations create lasting impact
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                {[
                  { value: "one-time", label: "One-time", sublabel: `$${causeDonation.amount} today`, icon: "💝" },
                  { value: "monthly", label: "Monthly", sublabel: `$${causeDonation.amount}/month`, icon: "🔄" },
                  { value: "quarterly", label: "Quarterly", sublabel: `$${causeDonation.amount} every 3 months`, icon: "📅" },
                ].map((freq, i) => (
                  <button
                    key={freq.value}
                    onClick={() => setCauseDonation(d => ({ ...d, frequency: freq.value }))}
                    style={{
                      width: "100%",
                      padding: "18px 22px",
                      borderRadius: 16,
                      border: causeDonation.frequency === freq.value ? `2.5px solid ${COLORS.primary}` : `2px solid ${COLORS.tertiary}35`,
                      background: causeDonation.frequency === freq.value ? `${COLORS.primary}08` : COLORS.white,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      textAlign: "left",
                      animation: `slideUp 0.35s ease ${i * 60}ms both`,
                    }}
                  >
                    <span style={{ fontSize: 24 }}>{freq.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontFamily: "'Nunito', sans-serif",
                        fontWeight: 800,
                        fontSize: 17,
                        color: causeDonation.frequency === freq.value ? COLORS.primary : COLORS.textDark,
                      }}>{freq.label}</div>
                      <div style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 500,
                        fontSize: 13,
                        color: COLORS.textMuted,
                        marginTop: 2,
                      }}>{freq.sublabel}</div>
                    </div>
                    <div style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      border: causeDonation.frequency === freq.value ? `6px solid ${COLORS.primary}` : `2px solid #ccc`,
                      transition: "all 0.2s ease",
                    }} />
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCauseStep("payment")}
                style={{
                  width: "100%",
                  padding: "18px",
                  borderRadius: 16,
                  border: "none",
                  background: `linear-gradient(135deg, ${COLORS.accent}, #ff8c00)`,
                  color: COLORS.white,
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 800,
                  fontSize: 17,
                  cursor: "pointer",
                  boxShadow: `0 4px 20px ${COLORS.accent}40`,
                }}
              >
                Continue
              </button>
            </div>
          )}

          {/* ========= STEP: Payment ========= */}
          {causeStep === "payment" && (
            <div style={{ animation: "fadeIn 0.35s ease" }}>
              <h2 style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 800,
                fontSize: 26,
                color: COLORS.textDark,
                margin: "16px 0 8px",
              }}>
                Payment details
              </h2>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                color: COLORS.textMuted,
                marginBottom: 28,
              }}>
                Your donation is secure and tax-deductible
              </p>

              {/* Summary card */}
              <div style={{
                background: `${COLORS.primary}08`,
                borderRadius: 16,
                padding: 18,
                marginBottom: 28,
                border: `1.5px solid ${COLORS.primary}15`,
              }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 8,
                }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.textMuted }}>Charity</span>
                  <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 14, color: COLORS.primary }}>{causeDonation.charity}</span>
                </div>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 8,
                }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.textMuted }}>Cause</span>
                  <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 14, color: COLORS.primary }}>{selectedCause}</span>
                </div>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 8,
                }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.textMuted }}>Amount</span>
                  <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 14, color: COLORS.primary }}>${causeDonation.amount}</span>
                </div>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: COLORS.textMuted }}>Frequency</span>
                  <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 14, color: COLORS.primary, textTransform: "capitalize" }}>{causeDonation.frequency}</span>
                </div>
              </div>

              {/* Mock payment form */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}>
                {[
                  { label: "Cardholder name", placeholder: "Alex Johnson" },
                  { label: "Card number", placeholder: "4242 4242 4242 4242" },
                ].map((field, i) => (
                  <div key={i}>
                    <label style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 13,
                      fontWeight: 600,
                      color: COLORS.textDark,
                      display: "block",
                      marginBottom: 6,
                    }}>{field.label}</label>
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      style={{
                        width: "100%",
                        padding: "14px 16px",
                        borderRadius: 12,
                        border: `2px solid ${COLORS.tertiary}35`,
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 15,
                        color: COLORS.textDark,
                        outline: "none",
                        background: COLORS.white,
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) => { e.target.style.borderColor = COLORS.secondary; }}
                      onBlur={(e) => { e.target.style.borderColor = `${COLORS.tertiary}35`; }}
                    />
                  </div>
                ))}
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <label style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 13,
                      fontWeight: 600,
                      color: COLORS.textDark,
                      display: "block",
                      marginBottom: 6,
                    }}>Expiry</label>
                    <input
                      type="text"
                      placeholder="MM / YY"
                      style={{
                        width: "100%",
                        padding: "14px 16px",
                        borderRadius: 12,
                        border: `2px solid ${COLORS.tertiary}35`,
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 15,
                        color: COLORS.textDark,
                        outline: "none",
                        background: COLORS.white,
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) => { e.target.style.borderColor = COLORS.secondary; }}
                      onBlur={(e) => { e.target.style.borderColor = `${COLORS.tertiary}35`; }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 13,
                      fontWeight: 600,
                      color: COLORS.textDark,
                      display: "block",
                      marginBottom: 6,
                    }}>CVC</label>
                    <input
                      type="text"
                      placeholder="123"
                      style={{
                        width: "100%",
                        padding: "14px 16px",
                        borderRadius: 12,
                        border: `2px solid ${COLORS.tertiary}35`,
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 15,
                        color: COLORS.textDark,
                        outline: "none",
                        background: COLORS.white,
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) => { e.target.style.borderColor = COLORS.secondary; }}
                      onBlur={(e) => { e.target.style.borderColor = `${COLORS.tertiary}35`; }}
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => setCauseStep("confirmed")}
                style={{
                  width: "100%",
                  padding: "18px",
                  borderRadius: 16,
                  border: "none",
                  background: `linear-gradient(135deg, ${COLORS.accent}, #ff8c00)`,
                  color: COLORS.white,
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 800,
                  fontSize: 17,
                  cursor: "pointer",
                  boxShadow: `0 4px 20px ${COLORS.accent}40`,
                }}
              >
                Donate ${causeDonation.amount}
              </button>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11,
                color: COLORS.textMuted,
                textAlign: "center",
                marginTop: 12,
              }}>
                🔒 Secured with 256-bit encryption. This is a prototype — no real payment will be processed.
              </p>
            </div>
          )}

          {/* ========= STEP: Confirmation ========= */}
          {causeStep === "confirmed" && (
            <div style={{
              animation: "fadeIn 0.5s ease",
              textAlign: "center",
              paddingTop: 32,
            }}>
              <div style={{
                width: 90,
                height: 90,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${COLORS.accent}20, ${COLORS.accent}40)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 44,
                margin: "0 auto 24px",
                animation: "pulse 2s ease infinite",
              }}>
                🎉
              </div>
              <h2 style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 800,
                fontSize: 28,
                color: COLORS.primary,
                marginBottom: 10,
              }}>
                You're amazing!
              </h2>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 16,
                color: COLORS.textMuted,
                lineHeight: 1.6,
                marginBottom: 32,
                maxWidth: 300,
                marginLeft: "auto",
                marginRight: "auto",
              }}>
                Your <strong style={{ color: COLORS.accent }}>${causeDonation.amount}</strong>{" "}
                {causeDonation.frequency !== "one-time" ? `${causeDonation.frequency} ` : ""}
                donation to <strong style={{ color: COLORS.primary }}>{causeDonation.charity}</strong> for {selectedCause.toLowerCase()} relief will make a real difference.
              </p>

              {/* Impact card */}
              <div style={{
                background: COLORS.white,
                borderRadius: 16,
                padding: 20,
                marginBottom: 28,
                boxShadow: "0 2px 12px rgba(22,105,122,0.08)",
                textAlign: "left",
              }}>
                <div style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 700,
                  fontSize: 14,
                  color: COLORS.textDark,
                  marginBottom: 12,
                }}>
                  Your impact
                </div>
                {[
                  { icon: "🍽️", text: `Provides ${Math.round(causeDonation.amount / 2.5)} meals to families in need` },
                  { icon: "📦", text: `Delivers ${Math.round(causeDonation.amount / 10)} emergency supply kits` },
                  { icon: "🏥", text: "Supports first responders on the ground" },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "8px 0",
                    borderBottom: i < 2 ? "1px solid #f0ece8" : "none",
                  }}>
                    <span style={{ fontSize: 18 }}>{item.icon}</span>
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 13,
                      color: COLORS.textMuted,
                      lineHeight: 1.4,
                    }}>{item.text}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  setSelectedCause(null);
                  setCauseStep("help");
                  setCauseDonation({ amount: null, frequency: "one-time", charity: null });
                }}
                style={{
                  width: "100%",
                  padding: "18px",
                  borderRadius: 16,
                  border: "none",
                  background: COLORS.primary,
                  color: COLORS.white,
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 800,
                  fontSize: 17,
                  cursor: "pointer",
                  marginBottom: 12,
                }}
              >
                Back to Home
              </button>
              <button
                onClick={() => {
                  setSelectedCause(null);
                  setCauseStep("help");
                  setCauseDonation({ amount: null, frequency: "one-time", charity: null });
                  setActiveTab("profile");
                }}
                style={{
                  width: "100%",
                  padding: "16px",
                  borderRadius: 16,
                  border: `2px solid ${COLORS.primary}20`,
                  background: "transparent",
                  color: COLORS.primary,
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: 15,
                  cursor: "pointer",
                }}
              >
                View my profile
              </button>
            </div>
          )}
        </div>
      ) : activeTab === "home" ? (
        <div style={{ paddingBottom: 80 }}>
          {/* Search bar */}
          <div style={{ padding: "12px 20px 20px" }}>
            <div style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}>
              <span style={{
                position: "absolute",
                left: 16,
                fontSize: 16,
                color: COLORS.textMuted,
                pointerEvents: "none",
              }}>
                🔍
              </span>
              <input
                type="text"
                placeholder="Describe the cause you want to support"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "14px 16px 14px 44px",
                  borderRadius: 16,
                  border: `2px solid ${COLORS.tertiary}40`,
                  background: COLORS.white,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  color: COLORS.textDark,
                  outline: "none",
                  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = COLORS.secondary;
                  e.target.style.boxShadow = `0 0 0 4px ${COLORS.secondary}15`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = `${COLORS.tertiary}40`;
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
          </div>

          {/* Quick filter tags */}
          <div style={{
            display: "flex",
            gap: 8,
            padding: "0 20px 20px",
            overflowX: "auto",
          }}>
            {["🐾 Animals", "🌍 Environment", "📚 Education", "🍲 Hunger", "🏥 Health", "🏠 Housing"].map((tag, i) => (
              <button
                key={i}
                onClick={() => setSearchQuery(tag.split(" ")[1])}
                style={{
                  flexShrink: 0,
                  padding: "8px 16px",
                  borderRadius: 24,
                  border: `1.5px solid ${COLORS.tertiary}50`,
                  background: searchQuery === tag.split(" ")[1] ? COLORS.primary : `${COLORS.white}`,
                  color: searchQuery === tag.split(" ")[1] ? COLORS.white : COLORS.primary,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap",
                }}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Trending causes */}
          <div style={{ marginBottom: 28 }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "0 20px",
              marginBottom: 14,
            }}>
              <h2 style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 800,
                fontSize: 19,
                color: COLORS.textDark,
                margin: 0,
              }}>
                Trending now
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "0 20px" }}>
              {[
                { label: "Hurricane Jesse", icon: "🌀" },
                { label: "Pediatric Leukemia", icon: "🎗️" },
                { label: "Wildfires", icon: "🔥" },
              ].map((cause, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedCause(cause.label)}
                  style={{
                    width: "100%",
                    padding: "18px 20px",
                    borderRadius: 14,
                    border: "none",
                    background: `linear-gradient(135deg, ${COLORS.tertiary}45, ${COLORS.secondary}30)`,
                    fontFamily: "'Nunito', sans-serif",
                    fontWeight: 800,
                    fontSize: 17,
                    color: COLORS.primary,
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    animation: `slideUp 0.4s ease ${i * 80}ms both`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `linear-gradient(135deg, ${COLORS.secondary}50, ${COLORS.tertiary}50)`;
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = `0 4px 16px ${COLORS.secondary}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = `linear-gradient(135deg, ${COLORS.tertiary}45, ${COLORS.secondary}30)`;
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <span style={{ fontSize: 22 }}>{cause.icon}</span>
                  {cause.label}
                </button>
              ))}
            </div>
          </div>
          <CardSection
            title="Near me"
            charities={filteredCharities(CHARITIES.nearby)}
            onSelect={setSelectedCharity}
          />
          <CardSection
            title="Recently supported"
            charities={filteredCharities(CHARITIES.supported)}
            onSelect={setSelectedCharity}
          />
        </div>
      ) : (
        <ProfileScreen />
      )}

      {/* Bottom nav */}
      <div style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: 420,
        background: COLORS.white,
        borderTop: "1px solid #eee",
        display: "flex",
        justifyContent: "space-around",
        padding: "10px 0 20px",
        zIndex: 60,
      }}>
        {[
          { id: "home", label: "Home", svgPath: "M341.8 72.6C329.5 61.2 310.5 61.2 298.3 72.6L74.3 280.6C64.7 289.6 61.5 303.5 66.3 315.7C71.1 327.9 82.8 336 96 336L112 336L112 512C112 547.3 140.7 576 176 576L464 576C499.3 576 528 547.3 528 512L528 336L544 336C557.2 336 569 327.9 573.8 315.7C578.6 303.5 575.4 289.5 565.8 280.6L341.8 72.6zM304 384L336 384C362.5 384 384 405.5 384 432L384 528L256 528L256 432C256 405.5 277.5 384 304 384z" },
          { id: "goodjob", label: "Good Job", svgPath: "M311.6 95C297.5 75.5 274.9 64 250.9 64C209.5 64 176 97.5 176 138.9L176 141.3C176 205.7 258 274.7 298.2 304.6C311.2 314.3 328.7 314.3 341.7 304.6C381.9 274.6 463.9 205.7 463.9 141.3L463.9 138.9C463.9 97.5 430.4 64 389 64C365 64 342.4 75.5 328.3 95L320 106.7L311.6 95zM141.3 405.5L98.7 448L64 448C46.3 448 32 462.3 32 480L32 544C32 561.7 46.3 576 64 576L384.5 576C413.5 576 441.8 566.7 465.2 549.5L591.8 456.2C609.6 443.1 613.4 418.1 600.3 400.3C587.2 382.5 562.2 378.7 544.4 391.8L424.6 480L312 480C298.7 480 288 469.3 288 456C288 442.7 298.7 432 312 432L384 432C401.7 432 416 417.7 416 400C416 382.3 401.7 368 384 368L231.8 368C197.9 368 165.3 381.5 141.3 405.5z" },
          { id: "profile", label: "Profile", svgPath: "M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => { 
              if (tab.id === "goodjob") { setShowGoodJob(true); } 
              else { setActiveTab(tab.id); setSelectedCause(null); setShowGoodJob(false); }
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              opacity: 1,
              transition: "all 0.2s ease",
              position: "relative",
            }}
          >
            {activeTab === tab.id && (
              <div style={{
                position: "absolute",
                top: -10,
                width: 20,
                height: 3,
                borderRadius: 2,
                background: COLORS.accent,
              }} />
            )}
            <svg viewBox="0 0 640 640" style={{
              width: 20,
              height: 20,
              fill: activeTab === tab.id ? COLORS.accent : COLORS.primary,
              transition: "fill 0.2s ease",
            }}>
              <path d={tab.svgPath} />
            </svg>
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              fontWeight: 600,
              color: activeTab === tab.id ? COLORS.accent : COLORS.primary,
            }}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      {/* Charity detail modal */}
      {selectedCharity && (
        <CharityDetail
          charity={selectedCharity}
          onClose={() => setSelectedCharity(null)}
        />
      )}

      {/* Good Job wrapped experience */}
      {showGoodJob && <GoodJobScreen />}
    </div>
  );
}

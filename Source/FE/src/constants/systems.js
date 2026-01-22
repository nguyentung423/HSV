import { Database, Network, Monitor, Smartphone, Utensils } from "lucide-react";

// System configuration - Single source of truth
export const systemConfig = {
  "hvs-umea": {
    icon: Database,
    name: "HVS-UMEA",
    color: "#A855F7",
    glowColor: "rgba(168, 85, 247, 0.5)",
  },
  "hvs-kios": {
    icon: Network,
    name: "HVS-KIOS",
    color: "#06B6D4",
    glowColor: "rgba(6, 182, 212, 0.5)",
  },
  "hvs-food": {
    icon: Utensils,
    name: "HVS-FOOD",
    color: "#10B981",
    glowColor: "rgba(16, 185, 129, 0.5)",
  },
  "hvs-gate": {
    icon: Monitor,
    name: "HVS-GATE",
    color: "#F59E0B",
    glowColor: "rgba(245, 158, 11, 0.5)",
  },
  "hvs-kios-lite": {
    icon: Smartphone,
    name: "HVS-KIOS LITE",
    color: "#EC4899",
    glowColor: "rgba(236, 72, 153, 0.5)",
  },
};

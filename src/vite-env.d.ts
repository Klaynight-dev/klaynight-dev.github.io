/// <reference types="svelte" />
/// <reference types="vite/client" />

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.jpeg" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "@getpapillon/papicons" {
  export function Papicons(props: { name: string; size?: number; className?: string }): any;
}

declare module "lucide-svelte" {
  export const Sliders: any;
  export const CheckSquare: any;
  export const Layers: any;
  export const Mail: any;
  export const Eye: any;
  export const Github: any;
  export const FileText: any;
  export const MapPin: any;
  export const Sparkles: any;
  export const Quote: any;
  export const Phone: any;
  export const Calendar: any;
  export const ExternalLink: any;
  export const Briefcase: any;
  export const ArrowRight: any;
  export const ArrowLeft: any;
  export const ChevronDown: any;
  export const ChevronUp: any;
  export const ChevronRight: any;
  export const ChevronLeft: any;
  export const Plus: any;
  export const Minus: any;
  export const Trash: any;
  export const Pen: any;
  export const AlertCircle: any;
  export const Info: any;
  export const Bell: any;
  export const Clock: any;
  export const User: any;
  export const Globe: any;
  export const Shield: any;
  export const Database: any;
  export const Cpu: any;
  export const Grid: any;
  export const Star: any;
  export const Heart: any;
  export const Moon: any;
  export const Sun: any;
  export const HelpCircle: any;
}


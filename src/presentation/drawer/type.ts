export interface DrapwerProps {
  open: boolean;
  redirectTo: (link: string) => void;
  isSelected: (link: string) => boolean;
}

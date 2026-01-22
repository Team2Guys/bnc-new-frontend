export interface Option {
  label: string;
  value: string;
}
export interface CustomSelectProps {
  options: Option[];
  value: string | null;
  onChange: (option: Option) => void;
  instanceId: string;
  className?: string;
}

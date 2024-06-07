export interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  $status?: boolean;
  width: string;
  height: string;
  margin?: string;
  padding?: string;
  radius?: string;
  disabled?: boolean;
  type?: string;
  backgroundColor?: string;
  color?: string;
  fontSize?: number;
  name?: string;
  isCursor?: boolean;
}

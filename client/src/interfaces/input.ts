export interface InputProps {
  width: string;
  height: string;
  defaultString?: string;
  $type?: string;
  $radius?: string;
  name?: string;
  $dropType?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  $isRequired?: boolean;
}

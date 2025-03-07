type Props = {
  isDisabled: boolean;
  handleClick: () => void;
  label: string;
};

export const Button = ({ isDisabled, handleClick, label }: Props) => (
  <button disabled={isDisabled} onClick={handleClick}>
    {label}
  </button>
);

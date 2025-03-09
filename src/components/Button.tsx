type Props = {
  isDisabled?: boolean;
  handleClick: () => void;
  label: string;
  type?: 'button' | 'submit' | 'reset';
};

export const Button = ({
  isDisabled = false,
  handleClick,
  label,
  ...props
}: Props) => (
  <button disabled={isDisabled} onClick={handleClick} {...props}>
    {label}
  </button>
);

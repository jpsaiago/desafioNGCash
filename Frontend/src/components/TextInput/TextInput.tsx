interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
}

export function TextInput({
  className,
  value,
  onChange,
  isError,
  ...props
}: Props) {
  return (
    <div className={className}>
      <input
        value={value}
        onChange={onChange}
        {...props}
        className={`${
          isError ? "border-red-600" : "border-black"
        }  rounded-md font-montserrat font-semibold h-full
        border-2 shadow-bold-sm w-full py-1 pl-2 pr-10`}
      />
    </div>
  );
}

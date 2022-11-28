interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...props }: Props) {
  return (
    <div className={className}>
      <input
        {...props}
        className="border-black rounded-md font-montserrat font-semibold h-full
        border-2 shadow-bold-sm w-full py-1 px-2  "
      />
    </div>
  );
}

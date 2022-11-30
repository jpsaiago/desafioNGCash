interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

export function TextInput({ className, state, setState, ...props }: Props) {
  function handleInput(e: React.FormEvent<HTMLInputElement>) {
    setState(e.currentTarget.value);
  }

  return (
    <div className={className}>
      <input
        onChange={handleInput}
        value={state}
        {...props}
        className="border-black rounded-md font-montserrat font-semibold h-full
        border-2 shadow-bold-sm w-full py-1 px-2  "
      />
    </div>
  );
}

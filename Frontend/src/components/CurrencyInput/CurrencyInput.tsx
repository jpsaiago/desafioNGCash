interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  setState: React.Dispatch<React.SetStateAction<string>>;
  state: string;
}

export function CurrencyInput({ className, setState, state, ...props }: Props) {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "narrowSymbol",
  });
  let formattedInput = "";

  function handleInput(e: React.KeyboardEvent<HTMLInputElement>) {
    //Remove last digit with backspace
    if (e.key == "Backspace") {
      setState(state.slice(0, -1));
    }
    if (!/\d/.test(e.key)) {
      return;
    }
    //Avoid 0 as initial input
    if (state == "" && e.key == "0") {
      return;
    }
    //Concatenate typed digit
    setState(state + e.key);
  }
  //Couple input value to state and format it
  if (state) {
    formattedInput = formatter.format(Number(state) / 100);
  }
  return (
    <div className={className}>
      <input
        {...props}
        value={formattedInput}
        onKeyDown={handleInput}
        className="border-black rounded-md font-montserrat font-semibold h-full
        border-2 shadow-bold-sm w-full py-1 px-2"
      />
    </div>
  );
}

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export function CurrencyInput({ className, setValue, value, ...props }: Props) {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "narrowSymbol",
  });

  function handleInput(e: React.KeyboardEvent<HTMLInputElement>) {
    //Remove last digit with backspace
    if (e.key == "Backspace") {
      setValue(value.slice(0, -1));
    }
    if (!/\d/.test(e.key)) {
      return;
    }
    //Avoid 0 as initial input
    if (value == "" && e.key == "0") {
      return;
    }
    //Concatenate typed digit
    setValue(value + e.key);
  }
  //Couple displayed value to state and format it, divided by 100 to represent cents
  let formattedInput = "";
  if (value) {
    formattedInput = formatter.format(Number(value) / 100);
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

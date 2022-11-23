import LoadIndicator from "../Helper/LoadIndicator";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  isLoading?: boolean;
  bgColor: string;
}

export function FormButton({
  text,
  className,
  bgColor,
  isLoading,
  ...props
}: Props) {
  if (!isLoading) {
    return (
      <div className={className}>
        <button
          {...props}
          className={`${bgColor} transition-colors border-black rounded-md font-montserrat font-bold
        border-2 shadow-bold-sm text-lg w-full h-full py-1 px-2 focus:outline-none
        disabled:(opacity-50 h-10 w-full cursor-default)
        `}
        >
          <p>{text}</p>
        </button>
      </div>
    );
  }
  return (
    <div className={className}>
      <button
        {...props}
        disabled
        className="bg-black border-black rounded-md font-montserrat font-bold h-full border-2 shadow-bold-sm text-lg w-full py-1 px-2 transition-colors relative focus:outline-none"
      >
        <LoadIndicator />
      </button>
    </div>
  );
}

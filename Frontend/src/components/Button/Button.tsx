import { AiOutlineLoading } from "react-icons/ai";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  bgColor: string;
}

export function Button({
  value,
  className,
  bgColor,
  isLoading,
  children,
  ...props
}: Props) {
  if (isLoading) {
    return (
      <div className={`${className} flex`}>
        <button
          {...props}
          disabled
          className="bg-black  border-black rounded-md cursor-default flex h-full border-2
          shadow-bold-sm w-full justify-center items-center "
        >
          <AiOutlineLoading
            className="animate-spin"
            fill="white"
            size="1.6rem"
          />
        </button>
      </div>
    );
  }
  return (
    <div className={className}>
      <button
        {...props}
        className={`${bgColor} transition-colors border-black rounded-md font-montserrat font-bold
      border-2 flex shadow-bold-sm text-lg w-full h-full py-1 px-2 focus:outline-none justify-center items-center
      disabled:( h-full w-full cursor-default filter brightness-75)
      `}
      >
        {children}
        <p>{value}</p>
      </button>
    </div>
  );
}

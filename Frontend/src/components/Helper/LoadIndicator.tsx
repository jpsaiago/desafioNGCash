import spinner from "../../assets/spinner.svg";

interface Props {
  height?: string;
  width?: string;
}
export default function LoadIndicator({}: Props) {
  return <img src={spinner} alt="" className="h-full w-full animate-spin" />;
}

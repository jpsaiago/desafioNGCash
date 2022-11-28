interface Props {
  height?: string;
  width?: string;
}
export default function LoadIndicator({}: Props) {
  return (
    <svg
      width="164"
      height="164"
      viewBox="0 0 164 164"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full animate-spin"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M82 144C116.242 144 144 116.242 144 82C144 47.7583 116.242 20 82 20C47.7583 20 20 47.7583 20 82C20 116.242 47.7583 144 82 144ZM82 164C127.287 164 164 127.287 164 82C164 36.7127 127.287 0 82 0C36.7127 0 0 36.7127 0 82C0 127.287 36.7127 164 82 164Z"
        fill="white"
        fillOpacity="0.35"
      />
      <path
        d="M33.9678 121.206L18.4735 133.854C6.92639 119.724 0 101.671 0 82C0 62.329 6.92651 44.2758 18.4736 30.1463L33.9678 42.7935C25.2371 53.4769 20 67.1268 20 82C20 96.8732 25.2371 110.523 33.9678 121.206Z"
        fill="white"
      />
    </svg>
  );
}

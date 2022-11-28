interface Props {
  fill: string;
  className: string;
}

export function DownArrow({ fill, className }: Props) {
  return (
    <div className={className}>
      <svg
        width="38"
        height="38"
        viewBox="0 0 38 38"
        fill={fill}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19 0.5C20.3807 0.5 21.5 1.61929 21.5 3V16.9645L25.2322 13.2322C26.2085 12.2559 27.7915 12.2559 28.7678 13.2322C29.7441 14.2085 29.7441 15.7915 28.7678 16.7678L20.7678 24.7678C19.7915 25.7441 18.2085 25.7441 17.2322 24.7678L9.23223 16.7678C8.25592 15.7915 8.25592 14.2085 9.23223 13.2322C10.2085 12.2559 11.7915 12.2559 12.7678 13.2322L16.5 16.9645V3C16.5 1.61929 17.6193 0.5 19 0.5ZM0.5 35C0.5 33.6193 1.61929 32.5 3 32.5H35C36.3807 32.5 37.5 33.6193 37.5 35C37.5 36.3807 36.3807 37.5 35 37.5H3C1.61929 37.5 0.5 36.3807 0.5 35Z"
          fill="black"
        />
      </svg>
    </div>
  );
}

interface LoaderProps {
  className?: string;
}

function Loader({ className }: LoaderProps) {
  return (
    <span className={`loading loading-spinner loading-sm ${className}`}></span>
  );
}

export default Loader;

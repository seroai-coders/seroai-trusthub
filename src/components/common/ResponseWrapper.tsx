import React, { PropsWithChildren } from "react";
import Loader from "../ui/Loader";

interface ResponseWrapperProps {
  error?: string | unknown;
  isLoading?: boolean;
  isEmpty?: boolean;
}

const ResponseWrapper: React.FC<PropsWithChildren<ResponseWrapperProps>> = ({
  error = "",
  isLoading = false,
  isEmpty = false,
  children,
}) => {
  if (isLoading) return <Loader className="m-8" />;
  if (error) return <div>{error as string}</div>;
  if (isEmpty) return <div>No Data Found</div>;
  return children;
};

export default ResponseWrapper;

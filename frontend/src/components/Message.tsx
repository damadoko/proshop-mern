import React from "react";
import { Alert, AlertProps } from "react-bootstrap";

export const Message = ({
  children,
  variant = "info",
}: React.PropsWithChildren<Pick<AlertProps, "variant">>) => {
  return <Alert variant={variant}>{children}</Alert>;
};

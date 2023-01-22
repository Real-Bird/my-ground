import Popper from "@mui/material/Popper";
import Box from "@mui/material/Box";

interface ErrorMsgBubbleProps {
  error: string;
  anchorEl: HTMLElement;
}

export const ErrorMessageBubble = ({
  error,
  anchorEl,
}: ErrorMsgBubbleProps) => {
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  return (
    <Popper
      id={id}
      open={open}
      anchorEl={anchorEl}
      nonce
      onResize={() => {}}
      onResizeCapture={() => {}}
    >
      <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>{error}</Box>
    </Popper>
  );
};

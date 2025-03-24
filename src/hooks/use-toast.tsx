
import { toast as sonnerToast } from "sonner";

// Create a wrapper around sonnerToast with the expected methods
const toast = {
  success: (message: string) => sonnerToast.success(message),
  error: (message: string) => sonnerToast.error(message),
  info: (message: string) => sonnerToast.info(message),
  warning: (message: string) => sonnerToast.warning(message),
};

export { toast, sonnerToast };

export type ToastProps = React.ComponentProps<typeof sonnerToast>;

export const useToast = () => {
  return {
    toast,
  };
};


import { toast as sonnerToast } from "sonner";

export { toast as sonnerToast };

export const toast = sonnerToast;

export type ToastProps = React.ComponentProps<typeof sonnerToast>;

export const useToast = () => {
  return {
    toast: sonnerToast,
  };
};

import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
}

export const LoginDialog = ({ open, onClose }: LoginDialogProps) => {
  const router = useRouter();

  const handleContinue = () => {
    onClose();
    router.push("/login");
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Inicia sesión</AlertDialogTitle>
          <AlertDialogDescription>
            Para agregar un producto al carrito debes iniciar sesión.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleContinue}>Continuar </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

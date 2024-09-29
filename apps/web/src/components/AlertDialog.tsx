import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { FC } from "react";
import { SpinnerCircularFixed } from "spinners-react";

interface AlertDialogProps {
  action: string;
  title: string;
  description: string;
  onclick: () => {};
  disabled: boolean;
  classname: string;
}

const AlertDialogDemo: FC<AlertDialogProps> = ({
  action,
  title,
  description,
  onclick,
  disabled,
  classname,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className={classname}>{action}</button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onclick} disabled={disabled}>
            {disabled ? (
              <div className="flex items-center gap-1">
                <SpinnerCircularFixed size={20} />
                <p className="text-sm">Loading</p>
              </div>
            ) : (
              "Continue"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogDemo;

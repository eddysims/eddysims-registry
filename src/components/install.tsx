import { InstallClient } from "./install-client";

type InstallProps = {
  component: string;
};

export function Install({ component }: InstallProps) {
  return <InstallClient />
}
import { ManagerLayout } from "@/layouts";
import { Manager } from "@/components";

export default function Index() {
  const path = "/";

  return (
    <ManagerLayout>
      <Manager path={path} />
    </ManagerLayout>
  );
}

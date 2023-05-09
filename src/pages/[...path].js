import { ManagerLayout } from "@/layouts";
import { Manager } from "@/components";

export const getServerSideProps = ({ params }) => {
  const path = `/${params.path.join("/")}`;

  return { props: { path } };
};

export default function Path({ path }) {
  return (
    <ManagerLayout>
      <Manager path={path} />
    </ManagerLayout>
  );
}

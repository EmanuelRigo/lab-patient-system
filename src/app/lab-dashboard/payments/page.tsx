import GenericList from "@/components/generics/GenericList";
import GenericCard from "@/components/generics/GenericCard";
import paymentApi from "@/services/payment.api";
import { Payment } from "../../../../types/payment.types";

const Page = async () => {
  const payments = await paymentApi.getAll();

  return (
    <div className="text-black h-full overflow-y-auto flex flex-col">
      <GenericList<Payment>
        items={payments}
        getKey={(p) => p._id!}
        emptyMessage="No hay pacientes registrados."
        className="scrollbar-hidden overflow-y-auto"
        Card={({ data }) => (
          <GenericCard<Payment>
            item={data}
            id="_id"
            title="method"
            fields={["amount"]}
            basePath="lab-dashboard/patients"
          />
        )}
      />
    </div>
  );
};

export default Page;

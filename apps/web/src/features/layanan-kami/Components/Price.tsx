import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const Price = () => {
  return (
    <div className="py-10">
      <div className="mx-auto max-w-7xl space-y-6 p-6 text-center">
        <h2 className="text-3xl font-bold text-[#37bae3]">Price</h2>
        <p className="mt-2 text-lg text-neutral-600">
          Enjoy comprehensive services with a single transparent price for all
          types of laundry.
        </p>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <Card>
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src="/laundry2.png"
                alt="Whoosh Laundry Logo"
                fill
                className="rounded-t-md object-cover"
              />
            </div>

            <CardHeader>
              <CardTitle className="text-left text-xl text-neutral-600">
                Laundry Service
              </CardTitle>
              <CardDescription className="text-left">
                This price applies to all types of services, including washing,
                dry cleaning, and ironing. We ensure that every item receives
                the best care and attention so that your clothes remain durable
                and comfortable to wear.
              </CardDescription>
              <h2 className="text-right text-xl font-semibold text-[#37bae3]">
                Rp 4,000/kg
              </h2>
            </CardHeader>
          </Card>

          <Card>
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src="/image.png"
                alt="Whoosh Laundry Logo"
                fill
                className="rounded-t-md object-cover"
              />
            </div>

            <CardHeader>
              <CardTitle className="text-left text-xl text-neutral-600">
                Delivery Service
              </CardTitle>
              <CardDescription className="text-left">
                Convenient pickup and delivery directly to your home with fast
                and efficient service. We use a scheduled and timely delivery
                fleet, ensuring that your experience with FreshNest Laundry is
                always satisfying.
              </CardDescription>
              <h2 className="text-right text-xl font-semibold text-[#37bae3]">
                Rp 3,000/km
              </h2>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Price;

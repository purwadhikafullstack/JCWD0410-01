import { LayoutGridDemo } from "@/components/Grid";
import { Badge } from "@/components/ui/badge";

const Services = () => {
  return (
    <div className="bg-[#e5f9ff]">
      <div className="mx-auto max-w-7xl space-y-8 px-6 py-20 text-neutral-800">
        <div className="space-y-4">
          <Badge># Our Services</Badge>
          <h3 className="text-4xl font-semibold">
            Comprehensive Laundry Solutions for Your Everyday Needs
          </h3>
          <p className="text-neutral-500">
            At FreshNest Laundry, we take care of your garments from start to
            finish. From convenient pickup and delivery to premium washing,
            drying, ironing, and packing services — we ensure your clothes are
            treated with the utmost care and precision.
          </p>
        </div>
        <LayoutGridDemo />
      </div>
    </div>
  );
};

export default Services;

import Marquee from "react-fast-marquee";
import ReviewCard from "./ReviewCard";
import { Badge } from "@/components/ui/badge";

const Review = () => {
  return (
    <div className="bg-[#fbfbfb]">
      <div className="mx-auto flex flex-col gap-10 rounded-md py-20 text-neutral-800">
        <div className="mx-auto max-w-7xl space-y-4 px-6 text-center">
          <Badge className="text-center">Our Testimonials</Badge>
          <h3 className="text-center text-3xl font-semibold md:text-4xl">
            What Our Customers Say
          </h3>
          <p>
            At FreshNest Laundry, we take pride in delivering exceptional
            service, and our satisfied customers can attest to that. Whether
            it's our quick delivery, precise ironing, or delicate handling of
            garments, hear what our happy clients have to say about their
            experience with us."
          </p>
        </div>

        <div className="space-y-10">
          <Marquee className="flex">
            <ReviewCard
              image="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              name="Rizky"
              review="Layanan cepat dan pakaian jadi bersih sempurna. Sangat puas! ✨👌"
            />
            <ReviewCard
              image="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              name="Maya"
              review="FreshNest benar-benar menjaga kualitas cucian saya. Sangat direkomendasikan! 💯🧺"
            />
            <ReviewCard
              image="https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              name="Andi"
              review="Prosesnya mudah dan hasilnya luar biasa. Pakaian tetap segar. 🌟👕"
            />
            <ReviewCard
              image="https://images.unsplash.com/photo-1544725176-7c40e5a2c9b8?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              name="Siti"
              review="Layanan profesional dengan harga yang terjangkau. Pasti akan kembali. 👍😊"
            />
            <ReviewCard
              image="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              name="Budi"
              review="Pelayanan cepat dan hasilnya bersih. FreshNest adalah pilihan terbaik! 🏆💧"
            />
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default Review;

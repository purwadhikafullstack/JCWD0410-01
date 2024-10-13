import Marquee from "react-fast-marquee";
import ReviewCard from "./ReviewCard";

const Review = () => {
  return (
    <div className="bg-white py-10">
      <h1 className="pt-10 text-center text-3xl font-semibold text-[#37bae3] md:text-4xl">
        Testimoni dari Pelanggan Kami
      </h1>
      <div className="mx-auto max-w-7xl space-y-10 px-6 md:py-10">
        <div className="grid">
          <Marquee className="flex">
            <ReviewCard
              image="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              name="Rizky"
              review='"Layanan cepat dan pakaian jadi bersih sempurna. Sangat puas! ✨👌"'
            />
            <ReviewCard
              image="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              name="Maya"
              review='"FreshNest benar-benar menjaga kualitas cucian saya. Sangat direkomendasikan! 💯🧺"'
            />
            <ReviewCard
              image="https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              name="Andi"
              review='"Prosesnya mudah dan hasilnya luar biasa. Pakaian tetap segar. 🌟👕"'
            />
            <ReviewCard
              image="https://images.unsplash.com/photo-1544725176-7c40e5a2c9b8?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              name="Siti"
              review='"Layanan profesional dengan harga yang terjangkau. Pasti akan kembali. 👍😊"'
            />
            <ReviewCard
              image="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              name="Budi"
              review='"Pelayanan cepat dan hasilnya bersih. FreshNest adalah pilihan terbaik! 🏆💧"'
            />
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default Review;

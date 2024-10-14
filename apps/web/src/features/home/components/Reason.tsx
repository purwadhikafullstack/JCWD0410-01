import ReasonItem from "./ReasonItem";

const reasonData = [
  {
    src: "/pesan.svg",
    alt: "Pesan Mudah",
    title: "Kemudahan Pesan & Akses Cepat",
    description:
      "Dengan kemudahan akses, Anda bisa datang langsung ke outlet laundry terdekat atau memesan layanan secara online melalui website, kapan saja sesuai kebutuhan Anda.",
  },
  {
    src: "/pickup.svg",
    alt: "Jemput Pakaian",
    title: "Jemput Pakaian Sesuai Jadwal Anda",
    description:
      "Hemat waktu dan tenaga. Kami siap menjemput pakaian Anda sesuai waktu yang Anda pilih, memberi Anda kebebasan untuk tetap produktif tanpa repot.",
  },
  {
    src: "/delivery.svg",
    alt: "Pengantaran",
    title: "Pengantaran Langsung ke Rumah",
    description:
      "Kami tak hanya mencuci dengan teliti, tapi juga memastikan pakaian Anda diantar langsung ke depan pintu rumah Anda. Pilih layanan Express untuk pengiriman lebih cepat saat Anda membutuhkannya.",
  },
];

const Reason = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl space-y-20 px-6 py-10 md:py-20">
        <h1 className="text-center text-3xl font-semibold text-[#37bae3] md:text-4xl">
          Mengapa Memilih Kami
        </h1>
        <div className="grid grid-cols-1 gap-20 md:grid-cols-3">
          {reasonData.map((item, index) => (
            <ReasonItem
              key={index}
              src={item.src}
              alt={item.alt}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reason;

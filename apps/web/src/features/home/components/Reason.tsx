import Image from "next/image";

const Reason = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl space-y-20 px-4 py-10 md:py-20">
        <h1 className="text-center text-3xl font-semibold text-[#37bae3] md:text-4xl">
          Mengapa Memilih Kami
        </h1>
        <div className="grid grid-cols-1 gap-20 md:grid-cols-3">
          <div className="flex flex-col items-center gap-6">
            <div className="relative h-40 w-40 overflow-hidden">
              <Image
                src="/pesan.svg"
                alt="Whoosh Laundry Logo"
                fill
                className="object-contain"
              />
            </div>

            <h2 className="text-xl text-[#37bae3]">
              Kemudahan Pesan & Akses Cepat
            </h2>
            <p className="text-center text-sm text-neutral-500">
              Dengan kemudahan akses, Anda bisa datang langsung ke outlet
              laundry terdekat atau memesan layanan secara online melalui
              website, kapan saja sesuai kebutuhan Anda.
            </p>
          </div>
          <div className="flex flex-col items-center gap-6">
            <div className="relative h-40 w-40 overflow-hidden">
              <Image
                src="/pickup.svg"
                alt="Whoosh Laundry Logo"
                fill
                className="object-contain"
              />
            </div>

            <h2 className="text-xl text-[#37bae3]">
              Jemput Pakaian Sesuai Jadwal Anda
            </h2>
            <p className="text-center text-sm text-neutral-500">
              Hemat waktu dan tenaga. Kami siap menjemput pakaian Anda sesuai
              waktu yang Anda pilih, memberi Anda kebebasan untuk tetap
              produktif tanpa repot.
            </p>
          </div>
          <div className="flex flex-col items-center gap-6">
            <div className="relative h-40 w-40 overflow-hidden">
              <Image
                src="/delivery.svg"
                alt="Whoosh Laundry Logo"
                fill
                className="object-contain"
              />
            </div>

            <h2 className="text-xl text-[#37bae3]">
              Pengantaran Langsung ke Rumah
            </h2>
            <p className="text-center text-sm text-neutral-500">
              Kami tak hanya mencuci dengan teliti, tapi juga memastikan pakaian
              Anda diantar langsung ke depan pintu rumah Anda. Pilih layanan
              Express untuk pengiriman lebih cepat saat Anda membutuhkannya.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reason;

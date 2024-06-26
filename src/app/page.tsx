import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex w-full -mt-20 gap-20 flex-col md:flex-row">
        <img src="fire.jpg" alt="fire man" />
        <div className="w-1/2 flex flex-col justify-center">
          <h2 className="text-5xl text-white font-bold">Entrena con</h2>
          <h1 className="text-7xl font-bold hollow-text">Power Training</h1>
        </div>
      </div>
      <div className="flex w-full -mt-20 gap-20 flex-col md:flex-row">
        <div className="w-1/2 flex flex-col justify-center">
          <h2 className="text-5xl text-white font-bold">
            Disfruta de los mejores planes
          </h2>
        </div>
        <img src="female.png" alt="fire man" />
      </div>
    </main>
  );
}

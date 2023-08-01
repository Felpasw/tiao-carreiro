import Image from 'next/image';

export default function displayContent(): JSX.Element {
  return (
    <div className="bg-[#ffff] w-full h-full my-5 items-center flex flex-row justify-between">
      <div className="m-10  relative self-center sm:w-[300px] sm:h-[200px] w-[200px] h-[100px] ">
        <Image src="/logo.png" alt="Imagem logo do Tião Carreiro" className="aspect-ratio: 1 / 1" fill />
      </div>
      <h1 className="text-black self-center sm:text-2xl w-[10%]  mr-16">Discografia</h1>
    </div>
  );
}

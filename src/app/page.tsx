import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="mx-auto px-4">
        <div>
          <div className="font-bold my-3">Natural Language Processing(NLP)</div>
          <div className="text-base text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est ipsa
            nostrum et alias. Recusandae animi sapiente at ducimus dolores
            aliquid quam aspernatur odio et, esse in inventore corrupti ea alias
            architecto, dolorum quis rerum suscipit dolor. Optio nobis mollitia
            hic.
          </div>
        </div>
        <div className="flex gap-4 my-4 justify-end">
          <button className="bg-slate-300 text-slate-900 text-sm px-3 py-1 border rounded-md font-bold ">
            EDIT
          </button>

          <button className="bg-red-500 text-white text-sm px-3 py-1 border rounded-md font-bold ">
            DELETE
          </button>
        </div>
      </div>
    </>
  );
}

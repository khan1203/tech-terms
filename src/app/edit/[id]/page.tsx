export default function editPage() {
  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold my-8 ">Update The Term</h2>
        <form action="" className="flex gap-3 flex-col">
          <input
            type="text"
            name="term"
            placeholder="Term"
            className="py-1 px-4 border rounded-md bg-slate-200 text-base "
          />
          <textarea
            name="interpretation"
            id="interpretation"
            rows={4}
            placeholder="Write it's interpretation here..."
            className="py-1 px-4 border rounded-md resize-none bg-slate-200 text-base"
          ></textarea>

          <button className="bg-black text-white mt-5 px-4 py-1 rounded-md cursor-pointer font-bold">
            Update Term
          </button>
        </form>
      </div>
    </div>
  );
}

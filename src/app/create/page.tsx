"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function CreatePage() {
  const [formData, setFormData] = useState({ term: "", interpretation: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    // console.log(formData);
  };

  const handleSubmit = async (e : React.FormEvent) => {
    e.preventDefault();

    if(!formData.term || !formData.interpretation){
      setError("Please fillup all the fields");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/interpretations",{
        method: "POST",
        headers:{
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if(!response.ok){
        throw new Error("Failed to create interpretation");
      }

      router.push("/");

    } catch (error) {
      console.log(error);
      setError("Something went wrong. Please try again.");
    }finally{
      setIsLoading(false);
    }
  }

  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold my-8 ">Add New Term</h2>
        <form onSubmit={handleSubmit} action="" className="flex gap-3 flex-col">
          <input
            type="text"
            name="term"
            placeholder="Term"
            value={formData.term}
            className="py-1 px-4 border rounded-md bg-slate-200 text-base "
            onChange={handleInputChange}
          />
          <textarea
            name="interpretation"
            id="interpretation"
            rows={4}
            placeholder="Write it's interpretation here..."
            value={formData.interpretation}
            className="py-1 px-4 border rounded-md resize-none bg-slate-200 text-base"
            onChange={handleInputChange}
          ></textarea>

          <button
            className="bg-black text-white mt-5 px-4 py-1 rounded-md cursor-pointer font-bold"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add term"}
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}

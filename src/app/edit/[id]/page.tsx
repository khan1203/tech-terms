"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export default function editPage({ params }: { params: { id: string } }) {
  const [formData, setFormData] = useState({ term: "", interpretation: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/interpretations/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch interpretation");
        }

        const data = await response.json();
        console.log(data);
        setFormData({
          term: data.interpretation.term,
          interpretation: data.interpretation.interpretation,
        });
      } catch (error) {
        setError("Failed to load interpretation.");
      }
    };

    fetchData();
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.term || !formData.interpretation) {
      setError("Please fill in all the fields");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`/api/interpretations/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update interpretation");
      }

      router.push("/");
    } catch (error) {
      console.log(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold my-8 ">Update The Term</h2>
        <form onSubmit={handleSubmit} action="" className="flex gap-3 flex-col">
          <input
            type="text"
            name="term"
            placeholder="Term"
            value={formData.term}
            onChange={handleInputChange}
            className="py-1 px-4 border rounded-md bg-slate-200 text-base "
          />
          <textarea
            name="interpretation"
            id="interpretation"
            rows={4}
            placeholder="Write it's interpretation here..."
            value={formData.interpretation}
            onChange={handleInputChange}
            className="py-1 px-4 border rounded-md resize-none bg-slate-200 text-base"
          ></textarea>

          <button className="bg-black text-white mt-5 px-4 py-1 rounded-md cursor-pointer font-bold">
            {isLoading ? "Updating..." : "Update Interpretation"}
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}

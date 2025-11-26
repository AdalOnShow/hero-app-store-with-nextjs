"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import PrimaryBtn from "@/components/PrimaryBtn";
import Heading from "@/components/Heading";

const AddApp = () => {
  const router = useRouter();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleAddApp = async (e) => {
    e.preventDefault();
    setLoading(true);

    const title = e.target.title.value;
    const companyName = e.target.companyName.value;
    const size = parseFloat(e.target.size.value);
    const image = e.target.image.value;
    const description = e.target.description.value;

    if (!image.startsWith("http")) {
      toast.error("Invalid image URL!");
      setLoading(false);
      return;
    }

    const newApp = {
      title,
      companyName,
      size,
      image,
      description,
      createdBy: user?.email || "unknown",
      createdAt: new Date().toISOString(),
      downloads: 0,
      reviews: 0,
      ratingAvg: 0,
    };

    try {
      const res = await fetch("https://hero-apps-server-khaki.vercel.app/apps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newApp),
      });

      const data = await res.json();

      if (data.insertedId) {
        toast.success("App added successfully!");
        e.target.reset();
        router.push("/apps");
      }
    } catch (err) {
      toast.error(err?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-11/12 mx-auto pb-10">
      <Heading title="Add A New" highlight="App" />

      <form
        onSubmit={handleAddApp}
        className="max-w-xl mx-auto flex flex-col bg-gray-900 rounded-lg p-8 shadow-sm space-y-4"
      >
        <div>
          <label className="text-white">App Title</label>
          <input required name="title" className="add-form-input" type="text" placeholder="App title" />
        </div>

        <div>
          <label className="text-white">Company Name</label>
          <input required name="companyName" className="add-form-input" type="text" placeholder="Company name" />
        </div>

        <div>
          <label className="text-white">App Size (MB)</label>
          <input
            required
            name="size"
            type="number"
            min="1"
            className="add-form-input"
            placeholder="Eg. 200"
          />
        </div>

        <div>
          <label className="text-white">Image URL</label>
          <input
            required
            name="image"
            className="add-form-input"
            type="text"
            placeholder="https://example.com/image.png"
          />
        </div>

        <div>
          <label className="text-white">Description</label>
          <textarea
            required
            name="description"
            className="add-form-input"
            placeholder="Write the app description..."
          />
        </div>

        <PrimaryBtn submit>
          {loading ? (
            <>
              <span className="loading loading-spinner" /> Creating...
            </>
          ) : (
            "Create"
          )}
        </PrimaryBtn>
      </form>
    </div>
  );
};

export default AddApp;

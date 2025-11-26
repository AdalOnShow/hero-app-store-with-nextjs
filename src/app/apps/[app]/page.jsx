/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useMemo, useState } from "react";
import { BiDownload } from "react-icons/bi";
import { FaStar } from "react-icons/fa6";
import { MdReviews } from "react-icons/md";
import ReviewChart from "@/components/ReviewChart";
import NotFound from "@/components/NotFound";
import { formatNumber } from "@/utils/utils";
import { useParams } from "next/navigation";

export default function AppDetails() {
  const { app: id } = useParams();
  console.log(id)
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch single app
  useEffect(() => {
    fetch(`https://hero-apps-server-khaki.vercel.app/apps/${id}`)
      .then((res) => res.json())
      .then((data) => setApp(data))
      .catch(() => setApp(null))
      .finally(() => setLoading(false));
  }, [id]);

  // Loading state to avoid hydration mismatch
  if (loading) {
    return (
      <div className="w-11/12 mx-auto py-20 text-center text-2xl text-primary">
        Loading...
      </div>
    );
  }

  // If not found after loading
  if (!app) return <NotFound message="App not found" />;

  const {
    image,
    title,
    companyName,
    description,
    size,
    reviews,
    ratingAvg,
    downloads,
    ratings,
  } = app;

  const finalRatings = useMemo(() => {
    if (!ratings) return [];
    return [...ratings].reverse();
  }, [ratings]);

  return (
    <div className="w-11/12 mx-auto space-y-5 py-20">

      {/* Title */}
      <h1 className="text-primary text-3xl font-bold">{title}</h1>

      {/* Image + Info */}
      <div className="flex lg:flex-row flex-col gap-5 items-stretch">
        <div className="flex-1">
          <img src={image} className="rounded-xl shadow-2xl h-full" alt={title} />
        </div>

        <div className="flex-2">
          <div className="space-y-3 border-b-2 pb-4 border-secondary">
            <p>
              Developed by{" "}
              <span className="text-secondary font-medium">{companyName}</span>
            </p>
          </div>

          <div className="py-5 flex justify-between items-center">
            <div className="stats stats-horizontal">

              <div className="stat">
                <div className="stat-figure text-secondary">
                  <BiDownload size={48} />
                </div>
                <div className="stat-title">Downloads</div>
                <div className="stat-value">{formatNumber(downloads)}</div>
              </div>

              <div className="stat">
                <div className="stat-figure text-secondary">
                  <FaStar size={48} />
                </div>
                <div className="stat-title">Average Rating</div>
                <div className="stat-value">{ratingAvg}</div>
              </div>

              <div className="stat">
                <div className="stat-figure text-secondary">
                  <MdReviews size={48} />
                </div>
                <div className="stat-title">Total Reviews</div>
                <div className="stat-value">{reviews}</div>
              </div>

            </div>
          </div>

          {/* Install button with no logic */}
          <button className="btn shadow-xl btn-xl bg-success text-white">
            Install Now ({size}MB)
          </button>
        </div>
      </div>

      <div className="divider"></div>

      {/* Ratings Chart */}
      <h2 className="text-4xl font-bold text-primary mb-5">Ratings</h2>
      <ReviewChart ratings={finalRatings} />

      <div className="divider"></div>

      {/* Description */}
      <h2 className="text-4xl font-bold text-primary mb-5">Description</h2>
      <div className="text-justify space-y-3 opacity-60">
        {description?.split("\n").map((text, idx) => (
          <p key={idx}>{text}</p>
        ))}
      </div>

    </div>
  );
}

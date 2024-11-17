"use client";
import { useEffect, useState, use } from "react";
import { fetchActorDetails } from '@/app/hooks/useActorDetails';
import MovieCard from "@/app/_components/MovieCard";

export default function ActorDetailsPage({ params }) {
  const { actorId } = use(params);

  const [actor, setActor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (actorId) {
      fetchActorDetails(actorId)
        .then((data) => {
          setActor(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [actorId]);

  if (!actor) return <p>No data available for this actor.</p>;

  return (
    <div className="bg-black-8 text-white ">
      <div className="flex flex-col md:flex-row items-center gap-10">
        <img
          src={`https://image.tmdb.org/t/p/w300/${actor.profile_path}`}
          alt={actor.name}
          className="w-55 h-60 rounded-lg border border-black-15"
        />
        <div>
          <h1 className="text-3xl font-bold mb-4">{actor.name}</h1>
          <p className="text-white mb-2">Nationality: <span className="text-gray-60"> {actor.place_of_birth}</span></p>
          <p className="text-white mb-6">Biography: <span className="text-gray-60">{actor.biography}</span></p>
        </div>
      </div>
      <h2 className="text-[27px] md:text-4xl font-bold mb-6 mt-10">Known For</h2>
<div className="grid grid-cols-auto gap-4">
{(actor.movie_credits?.cast.slice(0, 10) || []).map((movie) => (
    <MovieCard movie={movie} key={movie.id} /> 
  ))}
      </div>
    </div>
  );
}
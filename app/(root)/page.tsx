import SearchForm from "@/app/Components/SearchForm";
import StartupCard from "../Components/StartupCards";
import { StartupTypeCard } from "../Components/StartupCards";
import { STARTUPS_QUERY } from "@/lib/queries";
import { client } from "@/sanity/lib/client";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

export default async function Home({searchParams}: {searchParams: Promise<{query?: string}>}) {



  const query = (await searchParams).query;

  const params = { search: query || null };
 
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

  return (
    <>
    <section className="pink_container">
      <h1 className="heading">PITCH YOUR STARTUP, <br /> GET FUNDED</h1>
      <p className="sub-heading !max-w-3xl">
        We are a platform that helps startups pitch their ideas to investors and get funded.
      </p>
      <SearchForm query={query} />
    </section>
    <section className="section_container">
      <p className="text-30-semibold">
        {query ? `Showing results for "${query}"` : 'Showing all startups'}
      </p>
      <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>


    </section>

    <SanityLive />

    </>
  );
}

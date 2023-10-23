import Card from "../components/Card";
import PrincipalBanner from "../components/PrincipalBanner";
import { useLayoutEffect } from "react";

function Home() {

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  });

  return (
    <>
    <PrincipalBanner />
    <div className="flex flex-col  gap-7 min-h-screen p-10 bg-background">
      <h1 className="text-primary text-2xl font-bold justify-center flex">Featured</h1>
      <span className="h-[1px] w-full bg-secondary opacity-25"></span>
      <div className="featured-services flex flex-wrap justify-around mt-5">
        <Card />
      </div>
    </div>
    </>
  )
}

export default Home
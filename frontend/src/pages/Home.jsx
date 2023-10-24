import { Outlet } from "react-router-dom";
import Card from "../components/common/Card";
import PrincipalBanner from "../components/common/PrincipalBanner";

function Home() {

  return (
    <>
    <PrincipalBanner />
    <div className="flex flex-col  gap-7 min-h-screen p-10 bg-background">
      <h1 className="text-primary text-2xl font-bold justify-center flex">Featured</h1>
      <span className="h-[1px] w-full bg-secondary opacity-25"></span>
      <div className="featured-services flex flex-wrap justify-around mt-5 gap-[-20px]">
        <Card img="testPhoto.jpg" title={"Animation Studio"} description={"Complete animation studio, includes editing"} />
        <Card img="https://crehana-blog.imgix.net/media/filer_public/78/d5/78d5f21a-c41b-4bac-9a03-7279a1120436/estudios-de-animacion.jpg" title={"Edit with pros"} description={"Complete animation studio, includes editing"} />
        <Card img="https://p0.pxfuel.com/preview/776/92/48/video-production-shoot-record.jpg" title={"Photo Studio"} description={"Complete animation studio, includes editing"} />
      </div>
      <Outlet />
    </div>

    
    </>
  )
}

export default Home
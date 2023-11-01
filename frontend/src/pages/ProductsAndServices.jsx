import Card from "../components/common/Card";

function ProductsAndServices() {
  return (
    <div className="flex flex-col justify-around gap-5 min-h-[130vh] bg-white md:max-lg:flex">
        <div className="card-container flex justify-around gap-4 flex-col items-center overflow-auto">
        <Card
                img="testPhoto.jpg"
                title={"Animation Studio"}
                description={"Step into the captivating world of animation with GloCast Animation Studio. Our studio is a hub for creativity, where artists and animators come together to craft imaginative, compelling, and visually stunning animated content. From 2D to 3D animation, we offer a cutting-edge, fully-equipped environment to bring your ideas to life. Whether you're a seasoned animator or just starting your journey, GloCast is the canvas for your dreams. Our team of experienced animators and state-of-the-art technology ensures that your projects soar to new heights. Join us at GloCast Animation Studio and embark on a mesmerizing animation adventure."}
                price={789}
              />

      <Card
                img="https://p0.pxfuel.com/preview/776/92/48/video-production-shoot-record.jpg"
                title={"Photo Studio"}
                description={"Discover the perfect space to bring your creative vision to life at GloCast Photo Studio. Our state-of-the-art studios provide photographers, filmmakers, and artists with a versatile and well-equipped environment to capture stunning visuals. With top-notch lighting, props, and backdrops, GloCast is your go-to destination for professional photography and videography needs. Whether you're a seasoned pro or just starting out, our studios are designed to inspire and elevate your projects. Make your next shoot exceptional at GloCast Photo Studio Rentals."}
                price={999}
              />
      
      <Card
                  img="https://crehana-blog.imgix.net/media/filer_public/78/d5/78d5f21a-c41b-4bac-9a03-7279a1120436/estudios-de-animacion.jpg"
                  title={"Edit with pros"}
                  description={"Elevate your editing skills with GloCast's Editing Course. Whether you're a novice looking to dive into the world of post-production or a seasoned pro aiming to refine your craft, our comprehensive course has you covered. Explore the art of video and photo editing in a hands-on, interactive learning environment. Our expert instructors will guide you through the latest industry-standard software and techniques, empowering you to bring your creative vision to life. Join us at GloCast and unlock your potential in the world of editing, turning your projects into visual masterpieces."}
                  price={1990}
                />

      <Card
                img="testPhoto.jpg"
                title={"Animation Studio"}
                description={"Step into the captivating world of animation with GloCast Animation Studio. Our studio is a hub for creativity, where artists and animators come together to craft imaginative, compelling, and visually stunning animated content. From 2D to 3D animation, we offer a cutting-edge, fully-equipped environment to bring your ideas to life. Whether you're a seasoned animator or just starting your journey, GloCast is the canvas for your dreams. Our team of experienced animators and state-of-the-art technology ensures that your projects soar to new heights. Join us at GloCast Animation Studio and embark on a mesmerizing animation adventure."}
                price={789}
              />
        </div>
      
        <div className="flex md:flex-row justify-around gap-4 flex-col items-center pb-8 overflow-auto">
        <Card
                img="https://p0.pxfuel.com/preview/776/92/48/video-production-shoot-record.jpg"
                title={"Photo Studio"}
                description={"Discover the perfect space to bring your creative vision to life at GloCast Photo Studio. Our state-of-the-art studios provide photographers, filmmakers, and artists with a versatile and well-equipped environment to capture stunning visuals. With top-notch lighting, props, and backdrops, GloCast is your go-to destination for professional photography and videography needs. Whether you're a seasoned pro or just starting out, our studios are designed to inspire and elevate your projects. Make your next shoot exceptional at GloCast Photo Studio Rentals."}
                price={999}
              />
      
      <Card
                  img="https://crehana-blog.imgix.net/media/filer_public/78/d5/78d5f21a-c41b-4bac-9a03-7279a1120436/estudios-de-animacion.jpg"
                  title={"Edit with pros"}
                  description={"Elevate your editing skills with GloCast's Editing Course. Whether you're a novice looking to dive into the world of post-production or a seasoned pro aiming to refine your craft, our comprehensive course has you covered. Explore the art of video and photo editing in a hands-on, interactive learning environment. Our expert instructors will guide you through the latest industry-standard software and techniques, empowering you to bring your creative vision to life. Join us at GloCast and unlock your potential in the world of editing, turning your projects into visual masterpieces."}
                  price={1990}
                />

      <Card
                img="https://p0.pxfuel.com/preview/776/92/48/video-production-shoot-record.jpg"
                title={"Photo Studio"}
                description={"Discover the perfect space to bring your creative vision to life at GloCast Photo Studio. Our state-of-the-art studios provide photographers, filmmakers, and artists with a versatile and well-equipped environment to capture stunning visuals. With top-notch lighting, props, and backdrops, GloCast is your go-to destination for professional photography and videography needs. Whether you're a seasoned pro or just starting out, our studios are designed to inspire and elevate your projects. Make your next shoot exceptional at GloCast Photo Studio Rentals."}
                price={999}
              />
      
      <Card
                  img="https://crehana-blog.imgix.net/media/filer_public/78/d5/78d5f21a-c41b-4bac-9a03-7279a1120436/estudios-de-animacion.jpg"
                  title={"Edit with pros"}
                  description={"Elevate your editing skills with GloCast's Editing Course. Whether you're a novice looking to dive into the world of post-production or a seasoned pro aiming to refine your craft, our comprehensive course has you covered. Explore the art of video and photo editing in a hands-on, interactive learning environment. Our expert instructors will guide you through the latest industry-standard software and techniques, empowering you to bring your creative vision to life. Join us at GloCast and unlock your potential in the world of editing, turning your projects into visual masterpieces."}
                  price={1990}
                />
        </div>
      
      </div>
  )
}

export default ProductsAndServices
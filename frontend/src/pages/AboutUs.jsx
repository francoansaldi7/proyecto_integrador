/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import aboutUsAnimation from "../aboutUsAnimation.json";

function AboutUs() {
  return (
    <section className="bg-white dark:bg-gray-900">
    <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-40 hidden lg:mt-0 lg:col-span-5 lg:flex">
            <Lottie animationData={aboutUsAnimation} />
        </div>    

        <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="text-primary max-w-2xl mb-4 mt-16 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Our Story</h1>
            <p className="max-w-2xl mb-6 mt-10 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Welcome to GloCast, your one-stop destination to unlock your content creation potential. We exist to make your visual dreams come true, whether you're looking for professional photographers, studio rentals, or top-notch photography equipment.
            At GloCast, we believe in the power of visual storytelling. We are a passionate team of photographers and videographers dedicated to capturing moments, emotions, and memories in their most authentic and beautiful form. Our mission is to turn your special occasions into unforgettable stories that will be cherished for generations.
            We invite you to join us on a visual journey through life's most beautiful moments. We are committed to turning your cherished memories into works of art that will be treasured for a lifetime. Let us capture the magic; your story deserves nothing less.</p>

            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400"><Link to="#section3"><button className="hover:text-primary underline">Contact</button></Link> us today to discuss how we can be a part of your next event or project.</p>

        </div>            
    </div>
</section>
  )
}

export default AboutUs
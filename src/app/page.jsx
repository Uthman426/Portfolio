import Image from "next/image";
import HeroTyping from "@/Components/Typewriterloop";
import StatsBar from "@/Components/Workstats";
import ProjectsSection from "@/Components/Project-section";
import About from "@/Components/About";
import ContactSection from "@/Components/contact";

export default function Home() {
  return (
      <div className="bg-black w-full ">
        <section id="home">

        <div className="border-b-1 border-white mx-auto w-[90%] mb-15" >
         <HeroTyping /> 
         <StatsBar /> 
         </div>
         </section>
         <section id="about" className="scroll-mt-20">
          <div className="border-b-1 border-white mx-auto w-[90%] mb-10">
            <About />
          </div >
           
         </section>
         <section id="projects" className="scroll-mt-20">
          <div className="border-b-1 border-white mx-auto w-[90%] mb-10">
           <ProjectsSection />  
           </div>
           
         </section>
         <section id="contact" className="scroll-mt-20">
          <div className="border-b-1 border-white mx-auto w-[90%] mb-20">
         <ContactSection />
         </div>
         </section>
         <section>
          <div className="text-lg:text-base text-center text-gray-500 pb-2">
            AUTH-MERN @ 2025. <span className="text-gray-600">ALL RIGHTS RESERVED</span> 
          </div>
         </section>
         
      </div>
  );
}

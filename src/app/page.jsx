import Image from "next/image";
import HeroTyping from "@/Components/Typewriterloop";
import StatsBar from "@/Components/Workstats";
import ProjectsSection from "@/Components/Project-section";
import About from "@/Components/About";
import ContactSection from "@/Components/contact";

export default function Home() {
  return (
      <div className="bg-black">
        <section>

        <div className="border-b-1 border-white mx-auto w-[90%] mb-20">
         <HeroTyping /> 
         <StatsBar /> 
         </div>
         </section>
         <section>
          <div className="border-b-1 border-white mx-auto w-[90%] mb-20">
            <About />
          </div >
           
         </section>
         <section>
          <div className="border-b-1 border-white mx-auto w-[90%] mb-20">
           <ProjectsSection />  
           </div>
           
         </section>
         <section>
         <ContactSection />
         </section>
         
      </div>
  );
}

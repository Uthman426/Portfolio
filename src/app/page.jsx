import Image from "next/image";
import HeroTyping from "@/Components/Typewriterloop";
import StatsBar from "@/Components/Workstats";
import ProjectsSection from "@/Components/Project-section";

export default function Home() {
  return (
      <div className="bg-black">
        <section>

        
         <HeroTyping /> 
         <StatsBar /> 
         </section>
         <section>

         </section>
         <section>
           <ProjectsSection />  
         </section>
         
      </div>
  );
}

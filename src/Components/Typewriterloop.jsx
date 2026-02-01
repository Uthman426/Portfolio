"use client";

import { useEffect, useState } from "react";

const words = [
    "Uthman Adeoye Olaleke",
    "A Software Developer",
    "A Full Stack Web Developer",
];

export default function HeroTyping() {
    const [wordIndex, setWordIndex] = useState(0);
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    // Speeds (ms)
    const typingSpeed = 80;
    const deletingSpeed = 45;
    const pauseAfterTyped = 1000; // wait when a word finishes typing
    const pauseAfterDeleted = 250; // wait after clearing before next word

    useEffect(() => {
        const currentWord = words[wordIndex];

        let timeout;

        // Finished typing the full word -> pause, then start deleting
        if (!isDeleting && text === currentWord) {
            timeout = setTimeout(() => setIsDeleting(true), pauseAfterTyped);
        }
        // Finished deleting -> move to next word
        else if (isDeleting && text === "") {
            timeout = setTimeout(() => {
                setIsDeleting(false);
                setWordIndex((prev) => (prev + 1) % words.length);
            }, pauseAfterDeleted);
        }
        // Typing / deleting in progress
        else {
            timeout = setTimeout(() => {
                const nextText = isDeleting
                    ? currentWord.slice(0, text.length - 1) // delete from right to left
                    : currentWord.slice(0, text.length + 1); // type from left to right

                setText(nextText);
            }, isDeleting ? deletingSpeed : typingSpeed);
        }

        return () => clearTimeout(timeout);
    }, [text, isDeleting, wordIndex]);

    return (
        <div className="mx-auto pt-15 pl-2 w-[90%] lg:pt-16">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20">
                <div className="w-full lg:w-[60%]">
                    <h1 className="text-3xl font-semibold bg-gradient-to-tr
                            from-blue-700 via-orange-700 to-blue-700
                            bg-clip-text text-transparent">Hello i'm
                    </h1>
                    <div className="h-12 mb-3">
                        <p className="text-white text-3xl sm:mb-2 lg:text-4xl font-bold">{text}</p>
                    </div>

                    <p className="text-gray-400 text-base sm:text-lg lg:text-xl mb-10 lg:mb-14 leading-relaxed">Unleash the power of cutting-edge technology, seamless design,
                        and user-friendly interfaces. Elevate your online presence
                        with a developer who not only understands the language of
                        the web but also speaks the language of your brand.</p>

                    <div className="flex flex-wrap gap-4 ">

                        <button 
                        
                        className="
                            px-6 py-3 rounded-full text-white font-medium
                            bg-gradient-to-tl
                            from-blue-700 via-orange-700 to-blue-700
                          ">
                            Hire Me
                        </button>

                        <a href="/UTHMAN_ADEOYE_OLALEKE_CV.pdf" download className="inline-block">
                <span
            className="inline-flex p-[2px] rounded-full
            bg-gradient-to-tl from-blue-700 via-orange-700 to-blue-700"
          >
            <span className="px-7 py-3 rounded-full bg-black text-white font-medium">
              Download CV
            </span>
          </span>
        </a> 
 </div>
                </div>


                <div className="w-full lg:w-[40%] flex justify-center lg:justify-end">
                    <div >
                        <div className="rounded-full bg-[#1b263a] p-6 sm:p-8"><img src="/images/portfolio-img1.webp" className="rounded-full w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 object-cover" alt="my profile image" /></div>
                    </div>
                </div>

            </div>
        </div>
    );
}

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
        <div className="mx-auto pt-15 pl-2 w-[90%]">
            <div className="flex gap-20">
                <div className="w-[60%]">
                    <h1 className="text-3xl font-semibold bg-gradient-to-tr
                            from-blue-700 via-orange-700 to-blue-700
                            bg-clip-text text-transparent">Hello i'm 
                            </h1>
                            <div className="h-12 mb-3">
                                <p className="text-white text-3xl font-bold">{text}</p>
                            </div>
                    
                    <p className="text-gray-400 text-xl p-0 mb-15">Unleash the power of cutting-edge technology, seamless design,
                        and user-friendly interfaces. Elevate your online presence
                        with a developer who not only understands the language of
                        the web but also speaks the language of your brand.</p>

                    <div className="flex gap-5 ">
                        <button className="
  px-6 py-3 rounded-full text-white font-medium
  bg-gradient-to-tl
  from-blue-700 via-orange-700 to-blue-700
">
                            Hire Me
                        </button>

                        <button className="border-5 rounded-full bg-gradient-to-tl
  from-blue-700 via-orange-700 to-blue-700">
                            Download CV
                        </button>

                    </div>
                </div>
                <div>
                    <div >
                        <div className="rounded-[50%] bg-blue-300 h-70 w-60 p-5"><img src="/images/portfolio-img1.webp" className="rounded-full h-60" alt="my profile image" /></div>
                    </div>
                </div>

            </div>
        </div>
    );
}

"use client";
import React, { useEffect, useRef, useState } from 'react';
import { PiBriefcaseThin, PiFolderStarThin, PiGraduationCapThin } from 'react-icons/pi';
import PageLayout from '@/components/PageLayout';
import PhotoFrame from '@/components/subcomponents/PhotoFrame';
import typewriter from '@/components/subcomponents/Typewriter';

const Home = () => {
  const canvasTextRef = useRef(null);
  const [animationPlayed, setAnimationPlayed] = useState(false);

  useEffect(() => {
    const hasAnimationPlayed = sessionStorage.getItem('homeAnimationPlayed');

    if (!hasAnimationPlayed) {
      typewriter(
        canvasTextRef.current,
        "Hi there! I'm Nafis, aka DethCubeHax, a software engineer in the making.",
        50,
        0
      );

      const timer = setTimeout(() => {
        setAnimationPlayed(true);
        sessionStorage.setItem('homeAnimationPlayed', 'true');
      }, 4000);

      return () => {
        clearTimeout(timer);
      };
    } else {
      setAnimationPlayed(true);
    }
  }, []);

  return (
    <PageLayout title="Nafis Ul Islam">
      <div className="flex flex-col items-center">
        <PhotoFrame image="/Nafis.jpg" />
        <div ref={canvasTextRef} className="mt-6 text-center text-white text-2xl sm:text-3xl font-montserrat font-extralight">
          {animationPlayed ? "Hi there! I'm Nafis, aka DethCubeHax, a software engineer in the making." : ""}
        </div>
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8 text-center font-montserrat font-extralight text-sm sm:text-2xl">
          <a className="flex flex-col items-center text-white no-underline m-4 sm:m-8 hover:text-highlight transition duration-300" href="/projects">
            <PiFolderStarThin className="w-12 h-12 sm:w-16 sm:h-16 mb-2 hover:text-highlight transition duration-300" />
            I do projects.
          </a>
          <a className="flex flex-col items-center text-white no-underline m-4 sm:m-8 hover:text-highlight transition duration-300" href="/research">
            <PiGraduationCapThin className="w-12 h-12 sm:w-16 sm:h-16 mb-2 hover:text-highlight transition duration-300" />
            I do research.
          </a>
          <a className="col-span-2 sm:col-span-1 flex flex-col items-center text-white no-underline m-4 sm:m-8 hover:text-highlight transition duration-300" href="/work">
            <PiBriefcaseThin className="w-12 h-12 sm:w-16 sm:h-16 mb-2 hover:text-highlight transition duration-300" />
            I do work.
          </a>
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;

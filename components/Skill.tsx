"use client";

import { motion } from "framer-motion";
import React from "react";

type Props = {
  directionLeft?: boolean;
};

const Skill = ({ directionLeft }: Props) => {
  return (
    <div className="group relative flex cursor-pointer">
      <motion.img
        className="rounded-full boreder border-gray-500 object-cover w-24 h-24 md:w-28 md:h-28 xl:h-32 xl:w-32 filter group-hover:grayscale transition duration-300 ease-in-out"
        src="https://www.drupal.org/files/project-images/screenshot_361.png"
        alt="Tailwind CSS"
        initial={{ x: directionLeft ? -200 : 200, opacity: 0 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      />

      <div className="absolute opacity-0 group-hover:opacity-80 transition ease-in-out duration-300 group-hover:bg-white w-24 h-24 md:w-28 md:h-28 xl:h-32 xl:w-32 rounded-full z-0">
        <div className="flex items-center justify-center h-full">
          <p className="text-3xl font-bold opacity-100 text-black">100%</p>
        </div>
      </div>
    </div>
  );
};

export default Skill;

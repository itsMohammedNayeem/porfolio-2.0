"use client";

import { motion } from "framer-motion";
import React from "react";
import { Skill } from "@/typings";
import { urlFor } from "@/sanity";

type Props = {
  skill: Skill;
  directionLeft?: boolean;
};

const Skill = ({ skill, directionLeft }: Props) => {
  return (
    <div className="group relative flex cursor-pointer">
      <motion.img
        className="rounded-full object-cover w-14 h-14 md:w-18 md:h-18 lg:w-20 lg:h-20 xl:h-24 xl:w-24 filter group-hover:grayscale transition duration-300 ease-in-out"
        src={urlFor(skill.image).url()}
        alt="Tailwind CSS"
        initial={{ x: directionLeft ? -200 : 200, opacity: 0 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      />

      <div className="absolute opacity-0 group-hover:opacity-80 transition ease-in-out duration-300 group-hover:bg-white w-14 h-14 md:w-18 md:h-18 lg:w-20 lg:h-20 xl:h-24 xl:w-24 rounded-full z-0">
        <div className="flex items-center justify-center h-full">
          <p className="text-sm lg:text-3xl font-bold opacity-100 text-black">
            {skill.progress}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default Skill;

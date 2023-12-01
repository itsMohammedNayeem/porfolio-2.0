"use client";
import { urlFor } from "@/sanity";
import { Project } from "@/typings";
import { motion } from "framer-motion";
import React from "react";

type Props = { projects: Project[] };

const Projects = ({ projects }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen flex relative flex-col overflow-hidden text-left md:flex-row max-w-full justify-evenly mx-auto items-center z-0"
    >
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
        Projects
      </h3>

      <div className="relative w-full flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-20 scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-sun">
        {projects?.map((project, i) => (
          <div
            key={i}
            className="w-screen flex-shrink-0 snap-center flex flex-col space-y-5 items-center justify-center p-20 md:p-44 h-screen"
          >
            <motion.img
              initial={{ opacity: 0, y: -300 }}
              transition={{ duration: 1.2 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              src={urlFor(project?.image).url()}
              alt=""
            />

            <div className="space-y-10 px-0 md:px-10 max-w-6xl">
              <h4 className="text-4xl font-semibold text-center">
                <span className="underline decoration-sun">
                  Case study {i + 1} of {projects.length}:
                </span>{" "}
                {project.title}
              </h4>

              {project?.technologies?.length > 0 && (
                <div className="flex items-center space-x-2 justify-center">
                  {project.technologies.map((technology) => (
                    <img
                      key={technology._id}
                      className="h-10 w-10 rounded-full"
                      src={urlFor(technology.image).url()}
                      alt={technology.title}
                    />
                  ))}
                </div>
              )}

              <p className="text-lg text-center md:text-left">
                {project.summary}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full absolute top-[30%] bg-sun/10 left-0 h-[500px] -skew-y-12" />
    </motion.div>
  );
};

export default Projects;

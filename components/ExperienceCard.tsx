import { motion } from "framer-motion";
import React from "react";

type Props = {};

const ExperienceCard = (props: Props) => {
  return (
    <article className="flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 w-[500px] md:w-[600px] xl:w-[900px] snap-center bg-[#292929] p-10 hover:opacity-100 opacity-40 transition-opacity duration-200 cursor-pointer overflow-hidden">
      <motion.img
        initial={{ y: -100, opacity: 0 }}
        transition={{ duration: 1.2 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        src="https://logowik.com/content/uploads/images/amazon6707.jpg"
        className="w-32 h-32 rounded-full xl:w-[200px] xl:h-[200px] object-cover object-center"
        alt="Amazon"
      />

      <div className="px-0 md:px-10">
        <h4 className="text-4xl font-light">Amazon</h4>
        <p className="font-bold text-2xl mt-1">Software Engineer</p>
        <p className="uppercase py-5 text-gray-300">2020 - Present</p>

        <div className="flex space-x-2 my-2">
          <img
            src="https://live.staticflickr.com/8065/8220185645_dd4c773717.jpg"
            className="w-10 h-10 rounded-full "
            alt="React"
          />
          <img
            src="https://live.staticflickr.com/8065/8220185645_dd4c773717.jpg"
            className="w-10 h-10 rounded-full "
            alt="React"
          />
          <img
            src="https://live.staticflickr.com/8065/8220185645_dd4c773717.jpg"
            className="w-10 h-10 rounded-full "
            alt="React"
          />
        </div>

        <ul className="list-disc space-y-4 ml-5 text-lg">
          <li>Worked on the Amazon.com website.</li>
          <li>Worked on the Amazon.com website.</li>
          <li>Worked on the Amazon.com website.</li>
          <li>Worked on the Amazon.com website.</li>
          <li>Worked on the Amazon.com website.</li>
        </ul>
      </div>
    </article>
  );
};

export default ExperienceCard;

import { useState } from "react";
import { motion } from "framer-motion";

export default function FortuneCookie() {
  const [fortuneMessage, setFortuneMessage] = useState<string>("");

  function fortune() {
    const randomIndex = Math.floor(Math.random() * fortunes.length);
    const selectedFortune = fortunes[randomIndex];
    setFortuneMessage(selectedFortune);
  }

  return (
    <div
      className="flex flex-col justify-center items-center p-4 gap-4 cursor-pointer"
      onClick={fortune}
    >
      <img src="/images/misc/clover-full.png" className="w-[100px]" />
      {fortuneMessage && (
        <motion.p
          key={fortuneMessage}
          className="text-primary font-primary text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          "{fortuneMessage}"
        </motion.p>
      )}
    </div>
  );
}

const fortunes = [
  "Code today, conquer tomorrow.",
  "Bugs make you better.",
  "Errors teach, they don’t defeat.",
  "You build worlds, one line at a time.",
  "Fail today, grow tomorrow.",
  "Crashes don’t stop you.",
  "Code with heart, fight with passion.",
  "Your creativity is unstoppable.",
  "Small tasks, big dreams.",
  "Success is progress.",
];

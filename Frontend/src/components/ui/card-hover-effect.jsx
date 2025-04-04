import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "react-router-dom";
import { useState } from "react";

export const HoverEffect = ({ items, className }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 gap-", // added gap
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          to={item?.link}
          key={item?.link}
          className="relative group block p-4 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="relative w-full h-full">
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 w-full h-full bg-slate-200 dark:bg-slate-800/80 rounded-3xl z-0 shadow-lg backdrop-blur-md"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0, scale: 1 }}
                  animate={{
                    opacity: 1,
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 1,
                    transition: { duration: 0.2, delay: 0.1 },
                  }}
                />
              )}
            </AnimatePresence>

            {/* Card on top */}
            <div className="relative z-10">
              <Card className="p-2">
                <div className="p-2 min-h-[260px]">{item.component}</div>
                {/* {item.component ? (
                  item.component
                ) : (
                  <>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </>
                )} */}
              </Card>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

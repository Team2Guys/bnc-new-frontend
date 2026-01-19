import React, { ReactNode } from "react";

interface CardDataStatsProps {
  title: string;
  total: string;
  rate?: string;
  levelUp?: boolean;
  levelDown?: boolean;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  children,
}) => {
  return (
    <div className="relative group rounded-3xl p-[2px] bg-gradient-to-r from-primary via-secondary to-white shadow-xl overflow-hidden transition-all duration-700 hover:scale-105 hover:rotate-[1deg] hover:shadow-[0_0_40px_rgba(0,0,0,0.25)]">
      {/* Animated Border Glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary via-secondary to-white blur-xl opacity-60 group-hover:opacity-90 animate-[borderMove_6s_linear_infinite]" />

      {/* Inner Card */}
      <div className="relative z-10 rounded-3xl bg-white/95 dark:bg-[#0f0f0f]/95 backdrop-blur-xl px-8 py-10 flex flex-col items-center text-center border border-white/20">
        
        {/* Icon Area */}
        <div className="relative mb-6 flex items-center justify-center">
          {/* Outer Glow Ring */}
          <div className="absolute h-28 w-28 rounded-full bg-gradient-to-r from-primary via-secondary to-white opacity-30 blur-xl animate-ping" />
          {/* Icon Circle */}
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-secondary/50 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
            {/* Shine effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/30 to-transparent opacity-40" />
            {children}
          </div>
        </div>

        {/* Stats */}
        <h4 className="text-5xl font-extrabold dark:text-white tracking-wide drop-shadow-md">
          {total}
        </h4>
        <p className="mt-3 text-lg font-medium dark:text-white">
          {title}
        </p>

        {/* Bottom Neon Gradient Line */}
        <div className="mt-6 h-2 w-28 rounded-full bg-gradient-to-r from-primary via-secondary to-white shadow-[0_0_20px_rgba(0,0,0,0.25)]" />
      </div>
    </div>
  );
};

export default CardDataStats;

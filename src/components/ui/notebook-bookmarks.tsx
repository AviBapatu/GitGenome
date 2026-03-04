"use client";

import { motion } from "framer-motion";

export type BookmarkTab = "profile" | "summary" | "genome" | "evidence" | "mutations";

export interface BookmarkConfig {
  id: BookmarkTab;
  label: string;
  emoji: string;
  color: string;
  bgColor: string;
  textColor: string;
}

const BOOKMARKS: BookmarkConfig[] = [
  {
    id: "profile",
    label: "Profile",
    emoji: "📋",
    color: "from-violet-100 to-violet-50",
    bgColor: "bg-violet-100",
    textColor: "text-violet-900"
  },
  {
    id: "summary",
    label: "Summary",
    emoji: "🧬",
    color: "from-yellow-100 to-yellow-50",
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-900"
  },
  {
    id: "genome",
    label: "Genome",
    emoji: "🧠",
    color: "from-blue-100 to-blue-50",
    bgColor: "bg-blue-100",
    textColor: "text-blue-900"
  },
  {
    id: "evidence",
    label: "Evidence",
    emoji: "🔬",
    color: "from-green-100 to-green-50",
    bgColor: "bg-green-100",
    textColor: "text-green-900"
  },
  {
    id: "mutations",
    label: "Mutations",
    emoji: "☢️",
    color: "from-red-100 to-red-50",
    bgColor: "bg-red-100",
    textColor: "text-red-900"
  }
];

interface NotebookBookmarksProps {
  activeTab: BookmarkTab;
  onTabChange: (tab: BookmarkTab) => void;
}

export function NotebookBookmarks({ activeTab, onTabChange }: NotebookBookmarksProps) {
  return (
    <div className="relative w-full">
      {/* Bookmarks Container */}
      <div className="flex gap-2 px-8 md:px-12 pt-2 relative z-20">
        {BOOKMARKS.map((bookmark) => {
          const isActive = activeTab === bookmark.id;

          return (
            <motion.button
              key={bookmark.id}
              onClick={() => onTabChange(bookmark.id)}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              transition={{ duration: 0.2 }}
              className={`
                relative flex flex-col items-center justify-center
                px-3 md:px-4 pt-3 md:pt-4 pb-2
                rounded-t-lg
                font-patrick font-bold text-sm md:text-base
                transition-all duration-300
                ${isActive ? bookmark.bgColor : "bg-slate-200"}
                ${isActive ? bookmark.textColor : "text-slate-600"}
                border-l-2 border-r-2 border-t-2
                ${isActive ? "border-slate-400" : "border-slate-300"}
                shadow-md
                hover:shadow-lg
                active:shadow-sm
                cursor-pointer
              `}
            >
              {/* Bookmark Sticker Effect */}
              <div className={`absolute inset-0 rounded-t-lg opacity-30 pointer-events-none
                bg-gradient-to-b ${bookmark.color}`}
              />

              {/* Hand-drawn rotation for visual variety */}
              <div
                className="relative z-10 flex flex-col items-center gap-1"
                style={{
                  transform: `rotate(${bookmark.id === "genome" ? "-2deg" :
                      bookmark.id === "evidence" ? "1deg" :
                        bookmark.id === "mutations" ? "-1deg" :
                          "0deg"
                    })`
                }}
              >
                <span className="text-lg md:text-xl">{bookmark.emoji}</span>
                <span className="text-xs md:text-sm leading-tight whitespace-nowrap">
                  {bookmark.label}
                </span>
              </div>

              {/* Active indicator - subtle glow */}
              {isActive && (
                <motion.div
                  layoutId="bookmark-active"
                  className="absolute inset-0 rounded-t-lg pointer-events-none"
                  style={{
                    boxShadow: "inset 0 2px 0 rgba(255,255,255,0.5), inset 0 -2px 0 rgba(0,0,0,0.1)"
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Notebook edge - connects bookmarks to content */}
      <div className="h-1 bg-slate-300 relative z-10" />
    </div>
  );
}

export function getBookmarkConfig(id: BookmarkTab): BookmarkConfig {
  return BOOKMARKS.find(b => b.id === id) || BOOKMARKS[0];
}

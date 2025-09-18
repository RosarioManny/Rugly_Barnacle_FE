import React from 'react';
import { StickerSmileIcon, RoundRugIcon, StarIcon, BrushIcon, MugIcon, KeyboardIcon, MirrorIcon } from "../../ui/icons-svgs/SvgIcons";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const categoryIcons: Record<string, React.FC<any>> = {
  'All items': StarIcon,
  'Custom rugs': BrushIcon,
  'Rugs': RoundRugIcon,
  'Mug rugs': MugIcon,
  'Wrist rugs': KeyboardIcon,
  'Mirror rugs': MirrorIcon,
  'Stickers & more': StickerSmileIcon,
};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory
}) => {
  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex gap-4 pb-2">
        {['all', ...categories].map((category) => {
          const displayName = category === 'all' ? 'All items' : category;
          const Icon = categoryIcons[displayName] || StarIcon;
          
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category === 'all' ? 'all' : category)}
              className={`flex flex-col items-center px-4 py-2 rounded-lg transition-all min-w-[80px] ${
                selectedCategory === category
                  ? 'bg-majorelle text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border'
              }`}
              aria-label={`Filter by ${displayName}`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium whitespace-nowrap">
                {displayName}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
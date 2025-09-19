import React from 'react';
import { RoundRugIcon, StarIcon, BrushIcon, MugIcon, KeyboardIcon, MirrorIcon, BagIcon } from "../../ui/icons-svgs/SvgIcons";

interface CategoryFilterProps {
  categories: string[];  // < - Array of available categories from products
  selectedCategory: string;  // < - Currently selected category
  setSelectedCategory: (category: string) => void; // < - Function to update selection
}

const categoryIcons: Record<string, React.FC<any>> = {
  'All items': StarIcon,
  'Custom rug': BrushIcon,
  'Rug': RoundRugIcon,
  'Mug rug': MugIcon,
  'Wrist rug': KeyboardIcon,
  'Mirror rug': MirrorIcon,
  'Bag Chains': BagIcon,
};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory
}) => {
  // console.log('Available categories:', categories);
  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex gap-4 p-4">
        {['all', ...categories].map((category) => { // < - Creates an Array that starts with 'all' then spreads the categories map. 
          const displayName = category === 'all' ? 'All items' : category;
          const Icon = categoryIcons[displayName] || StarIcon;
          
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category === 'all' ? 'all' : category)}
              className={`flex flex-col items-center px-4 py-2 rounded-lg transition-all min-w-[80px] ${
                selectedCategory === category
                  ? 'bg-majorelle text-fleece shadow-md'
                  : 'bg-white text-space_cadet hover:outline-2 hover:text-majorelle hover:outline-majorelle'
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
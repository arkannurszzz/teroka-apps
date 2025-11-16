import { Utensils, Coffee, Wrench, Shirt, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui';

type Category = 'semua' | 'makanan' | 'minuman' | 'jasa' | 'fashion';

interface CategoryTabsProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const categoryConfig: Record<
  Category,
  { label: string; icon: React.ComponentType<{ className?: string }> }
> = {
  semua: { label: 'Semua', icon: List },
  makanan: { label: 'Makanan', icon: Utensils },
  minuman: { label: 'Minuman', icon: Coffee },
  jasa: { label: 'Jasa', icon: Wrench },
  fashion: { label: 'Fashion', icon: Shirt },
};

export default function CategoryTabs({
  selectedCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  return (
    <Container className="py-4 sm:py-6">
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-2">
        {Object.entries(categoryConfig).map(([key, { label, icon: Icon }]) => {
          const isActive = selectedCategory === key;
          return (
            <Button
              key={key}
              variant={isActive ? 'default' : 'outline'}
              size="sm"
              onClick={() => onCategoryChange(key as Category)}
              className={`
                rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm 
                flex items-center gap-1 sm:gap-2 font-medium transition-all whitespace-nowrap
                ${isActive
                  ? 'bg-red-600 hover:bg-red-700 text-white shadow-md'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
              {label}
            </Button>
          );
        })}
      </div>
    </Container>
  );
}
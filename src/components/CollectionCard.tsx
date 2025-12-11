import { Button } from '@/components/ui/button'
import { type Collection } from '@/lib/supabase'

interface CollectionCardProps {
  collection: Collection
  onViewProducts: (collectionId: string) => void
}

export const CollectionCard = ({ collection, onViewProducts }: CollectionCardProps) => {
  return (
    <div className="group cursor-pointer" onClick={() => onViewProducts(collection.id)}>
      <div className="aspect-[4/5] bg-secondary/30 overflow-hidden mb-4">
        {collection.image ? (
          <img 
            src={collection.image} 
            alt={collection.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No image
          </div>
        )}
      </div>
      
      <div className="text-center">
        <h3 className="font-serif text-2xl mb-2 tracking-editorial group-hover:text-muted-foreground transition-colors">
          {collection.name}
        </h3>
        
        {collection.description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {collection.description}
          </p>
        )}
        
        <Button 
          variant="ghost" 
          className="uppercase tracking-widest text-xs hover:bg-transparent group-hover:underline"
          onClick={(e) => {
            e.stopPropagation();
            onViewProducts(collection.id);
          }}
        >
          Explore
        </Button>
      </div>
    </div>
  )
}
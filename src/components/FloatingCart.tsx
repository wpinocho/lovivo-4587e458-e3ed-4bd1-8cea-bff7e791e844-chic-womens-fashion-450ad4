import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/CartContext"
import { useCartUI } from "@/components/CartProvider"

export const FloatingCart = () => {
  const { getTotalItems } = useCart()
  const { openCart } = useCartUI()
  const totalItems = getTotalItems()

  if (totalItems === 0) return null

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Button
        onClick={openCart}
        className="h-16 w-16 rounded-none bg-foreground hover:bg-foreground/90 shadow-2xl transition-all hover:scale-105"
        size="icon"
      >
        <div className="relative">
          <ShoppingCart className="h-6 w-6 text-background" />
          {totalItems > 0 && (
            <span className="absolute -top-3 -right-3 bg-accent text-foreground text-xs font-medium h-6 w-6 flex items-center justify-center">
              {totalItems > 99 ? '99+' : totalItems}
            </span>
          )}
        </div>
      </Button>
    </div>
  )
}
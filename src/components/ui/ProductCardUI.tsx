import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { HeadlessProductCard } from "@/components/headless/HeadlessProductCard"
import type { Product } from "@/lib/supabase"

/**
 * EDITABLE UI COMPONENT - ProductCardUI
 * 
 * Editorial-chic product card with minimal design and elegant typography.
 */

interface ProductCardUIProps {
  product: Product
}

export const ProductCardUI = ({ product }: ProductCardUIProps) => {
  return (
    <HeadlessProductCard product={product}>
      {(logic) => (
        <div className="group">
          <Link to={`/products/${logic.product.slug}`} className="block">
            <div className="aspect-[3/4] bg-secondary/30 mb-4 overflow-hidden relative">
              {(logic.matchingVariant?.image || (logic.product.images && logic.product.images.length > 0)) ? (
                <img
                  src={(logic.matchingVariant?.image as any) || logic.product.images![0]}
                  alt={logic.product.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  No image
                </div>
              )}

              {/* Badges */}
              {(logic.discountPercentage || logic.product.featured || !logic.inStock) && (
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {logic.discountPercentage && (
                    <span className="bg-foreground text-background text-xs px-3 py-1 uppercase tracking-widest font-medium">
                      Sale
                    </span>
                  )}
                  {logic.product.featured && (
                    <span className="bg-accent text-foreground text-xs px-3 py-1 uppercase tracking-widest font-medium">
                      New
                    </span>
                  )}
                  {!logic.inStock && (
                    <span className="bg-muted text-muted-foreground text-xs px-3 py-1 uppercase tracking-widest font-medium">
                      Sold Out
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-xl tracking-editorial line-clamp-2 group-hover:text-muted-foreground transition-colors">
                {logic.product.title}
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-sm tracking-wide">
                  {logic.formatMoney(logic.currentPrice)}
                </span>
                {logic.currentCompareAt && logic.currentCompareAt > logic.currentPrice && (
                  <span className="text-sm text-muted-foreground line-through tracking-wide">
                    {logic.formatMoney(logic.currentCompareAt)}
                  </span>
                )}
              </div>
            </div>
          </Link>

          {logic.hasVariants && logic.options && (
            <div className="mt-4 space-y-3">
              {logic.options.map((opt) => (
                <div key={opt.id}>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    {opt.name}: {logic.selected[opt.name] || 'Select'}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {opt.values.filter(val => logic.isOptionValueAvailable(opt.name, val)).map((val) => {
                      const isSelected = logic.selected[opt.name] === val
                      const swatch = opt.name.toLowerCase() === 'color' ? opt.swatches?.[val] : undefined

                      if (swatch) {
                        return (
                          <button
                            key={val}
                            type="button"
                            onClick={() => logic.handleOptionChange(opt.name, val)}
                            title={`${opt.name}: ${val}`}
                            className={`h-8 w-8 border transition-all ${
                              isSelected ? 'ring-2 ring-foreground ring-offset-2' : 'hover:ring-1 ring-muted-foreground'
                            }`}
                            style={{ backgroundColor: swatch }}
                            aria-label={`${opt.name}: ${val}`}
                          />
                        )
                      }

                      return (
                        <button
                          key={val}
                          type="button"
                          onClick={() => logic.handleOptionChange(opt.name, val)}
                          className={`border px-3 py-1 text-xs uppercase tracking-widest transition-all ${
                            isSelected 
                              ? 'border-foreground bg-foreground text-background' 
                              : 'border-border bg-background hover:border-foreground'
                          }`}
                          aria-pressed={isSelected}
                          aria-label={`${opt.name}: ${val}`}
                        >
                          {val}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          <Button
            variant="outline"
            className="w-full mt-4 btn-editorial-outline"
            onClick={() => {
              logic.onAddToCartSuccess()
              logic.handleAddToCart()
            }}
            disabled={!logic.canAddToCart}
          >
            {logic.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      )}
    </HeadlessProductCard>
  )
}
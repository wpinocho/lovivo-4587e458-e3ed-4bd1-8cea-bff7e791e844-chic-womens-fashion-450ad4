import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { HeadlessNewsletter } from '@/components/headless/HeadlessNewsletter';
import { Mail } from 'lucide-react';

/**
 * EDITABLE UI COMPONENT - NewsletterSection
 * 
 * Editorial-style newsletter subscription section.
 */

export const NewsletterSection = () => {
  return (
    <HeadlessNewsletter>
      {(logic) => (
        <section className="bg-secondary/30 py-24 border-y">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {logic.success ? (
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="bg-foreground/5 rounded-full p-4">
                    <Mail className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="font-serif text-4xl tracking-editorial">
                  Welcome to the Community
                </h3>
                <p className="text-muted-foreground">
                  Thank you for subscribing. You'll be the first to know about new arrivals and exclusive offers.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="font-serif text-4xl md:text-5xl tracking-editorial">
                    Join Our Circle
                  </h3>
                  <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                    Subscribe for exclusive access to new collections, styling insights, and special offers.
                  </p>
                </div>
                
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    logic.handleSubscribe();
                  }}
                  className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
                >
                  <Input 
                    type="email"
                    placeholder="Enter your email"
                    value={logic.email}
                    onChange={(e) => logic.setEmail(e.target.value)}
                    disabled={logic.isSubmitting}
                    className="flex-1 border-foreground/20 focus:border-foreground"
                    required
                  />
                  <Button 
                    type="submit"
                    disabled={logic.isSubmitting}
                    className="btn-editorial sm:w-auto"
                  >
                    {logic.isSubmitting ? 'Subscribing...' : 'Subscribe'}
                  </Button>
                </form>
                
                {logic.error && (
                  <p className="text-sm text-destructive">
                    {logic.error}
                  </p>
                )}
              </div>
            )}
          </div>
        </section>
      )}
    </HeadlessNewsletter>
  );
};
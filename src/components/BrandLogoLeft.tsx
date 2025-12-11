export const BrandLogoLeft = () => {
  return (
    <a href="/" aria-label="Home" className="flex items-center">
      <img 
        src="https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/4587e458-e3ed-4bd1-8cea-bff7e791e844/logo.jpg" 
        alt="FEMME"
        className="h-10 w-10 object-contain" 
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          e.currentTarget.parentElement!.innerHTML = '<span class="text-2xl font-serif tracking-editorial">FEMME</span>';
        }}
      />
      <span className="ml-3 text-2xl font-serif tracking-editorial">FEMME</span>
    </a>
  )
}
import { useOutletContext } from 'react-router-dom';
import ShopSection from '@/components/sections/ShopSection';
import { ShopItem } from '@/data/shopData';
import { useStore } from '@/store/appStore';

interface OutletCtx {
  onAddToCart: (item: ShopItem) => void;
  cartIds: string[];
}

export default function ShopPage() {
  const { onAddToCart, cartIds } = useOutletContext<OutletCtx>();
  const { products } = useStore();

  return (
    <div className="pt-[88px]">
      <ShopSection onAddToCart={onAddToCart} cartIds={cartIds} products={products} />
    </div>
  );
}

import { useStore } from '@/store/appStore';
import NewsSection from '@/components/sections/NewsSection';

export default function NewsPage() {
  const { news } = useStore();
  return (
    <div className="pt-[88px]">
      <NewsSection news={news} />
    </div>
  );
}

import { useNavigate } from 'react-router-dom';
import HeroSection from '@/components/sections/HeroSection';

export default function HomePage() {
  const navigate = useNavigate();

  const handleNavigate = (section: string) => {
    if (section === 'home') navigate('/');
    else navigate(`/${section}`);
  };

  return <HeroSection onNavigate={handleNavigate} />;
}

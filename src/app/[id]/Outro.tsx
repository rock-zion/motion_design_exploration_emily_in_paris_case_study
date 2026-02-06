import parse from 'html-react-parser';
import { useTheme } from '@/contexts/ThemeContext';
import BubbleButton from '@/components/buttons/BubbleButton';

const Outro = () => {
  const { theme } = useTheme();

  return (
    <div className='h-[60vh] max-md:h-[100vh] flex flex-col items-center justify-center gap-8'>
      {parse(theme.outro.text)}
      <BubbleButton variant='out' size='xl'>
        View Experiences
      </BubbleButton>
    </div>
  );
};

export default Outro;

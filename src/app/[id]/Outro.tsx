import parse from 'html-react-parser';
import { useTheme } from '@/contexts/ThemeContext';
import BubbleButton from '@/components/buttons/BubbleButton';

const Outro = () => {
  const { theme } = useTheme();

  return (
    <div className='h-[70vh] flex flex-col items-center justify-center gap-8'>
      <div className='w-[70vw] max-w-[1260px] max-md:w-[95vw] flex justify-center'>
        {parse(theme.outro.text)}
      </div>

      <BubbleButton variant='out' size='xl'>
        View Experiences
      </BubbleButton>
    </div>
  );
};

export default Outro;

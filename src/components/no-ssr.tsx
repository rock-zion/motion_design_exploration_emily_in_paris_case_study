import { ReactNode } from 'react';

interface NoSSRProps {
  children?: ReactNode;
}

export default function NoSSR({ children }: NoSSRProps) {
  return <>{children}</>;
}

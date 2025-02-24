import { ReactNode } from 'react';

const Marquee = ({
  children,
  speed = 10
}: {
  children: ReactNode;
  speed?: number;
}) => {
  return (
    <div className="marquee-container">
      <div
        className="marquee-content"
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
      </div>
    </div>
  );
};

export default Marquee;

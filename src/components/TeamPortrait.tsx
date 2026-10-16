import React, { useState } from 'react';

interface TeamPortraitProps {
  name: string;
  image: string;
}

export const TeamPortrait: React.FC<TeamPortraitProps> = ({ name, image }) => {
  const [failed, setFailed] = useState(false);
  return image && !failed ? (
    <img src={image} alt={name} loading="lazy"
      onError={() => setFailed(true)}
      style={/\/jenita agnes\.jpe?g$/.test(decodeURIComponent(image)) ? { objectPosition: 'center 52%' } : undefined}
      className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 group-active:grayscale-0 group-hover:scale-105 transition-[transform,filter] duration-500" />
  ) : (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-950/60 to-[#100a20]" aria-hidden="true">
      <span className="text-5xl font-bold text-purple-300">{name.split(' ').map(part => part[0]).slice(0, 2).join('')}</span>
    </div>
  );
};

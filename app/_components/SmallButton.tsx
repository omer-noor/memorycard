'use client';
import { useRouter } from 'next/navigation';

function SmallButton({
  link,
  children,
  classNames,
  onClick
}: React.PropsWithChildren<{
    classNames?: string;
    link?: string;
    onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void; 
}>) {    
  const router = useRouter();
  const linkHref = link ?? "/";  
  const className = classNames ?? "";

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event);
    } else if (link) {
      router.push(linkHref);
    }
  };

  return (
    <button className={`text-xs w-1/10 p-1 m-1 h-min rounded-md no-underline ${className}`} onClick={handleClick}>       
      {children}
    </button>
  );
}

export default SmallButton;

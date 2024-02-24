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
    onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void; // Allow onClick to optionally receive an event argument
}>) {    
  const router = useRouter();
  const linkHref = link ?? "/";  
  const className = classNames ?? "";

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event); // Pass the event to onClick if it's provided
    } else if (link) {
      router.push(linkHref); // Navigate to the provided link if no onClick is provided
    }
  };

  return (
    <button className={`text-xs w-1/10 p-1 m-1 h-min rounded-md no-underline ${className}`} onClick={handleClick}>       
      {children}
    </button>
  );
}

export default SmallButton;

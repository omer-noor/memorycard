'use client';
import { useRouter } from 'next/navigation';

function SmallButton({
  link,
  children,
  classNames
}: React.PropsWithChildren<{
    classNames?: string;
    link?:string;
}>) {    
  const router = useRouter();
  const linkHref = link ?? "/"  
  const className = classNames ?? ""
  return (
    <button className={`text-xs w-1/10 p-1 m-1 h-min rounded-md no-underline ${className}`}  onClick={() => router.push(linkHref)}>       
      {children}
    </button>
  );
}

export default SmallButton;
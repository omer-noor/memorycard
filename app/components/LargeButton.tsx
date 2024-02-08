'use client';
import { useRouter } from 'next/navigation';

function LargeButton({
  link,
  children,
  classNames,
  color,
}: React.PropsWithChildren<{
    classNames?: string;
    link?:string;
    color?:string;
}>) {
  const buttonColor = color ?? "red"
  const router = useRouter();
  const linkHref = link ?? "/"  
  const className = classNames ?? ""
  return (
    <button className={`text-sm p-2 h-min m-1 rounded-md no-underline bg-${buttonColor}-700 hover:bg-${buttonColor}-500 ${className}`}  onClick={() => router.push(linkHref)}>       
      {children}
    </button>
  );
}

export default LargeButton;
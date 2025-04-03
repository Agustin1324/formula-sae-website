import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
  text: string;
  className?: string;
  height?: string;
}

export const ImagePlaceholder = ({ 
  text, 
  className,
  height = "h-[300px]"
}: ImagePlaceholderProps) => {
  return (
    <div 
      className={cn(
        "relative bg-white/5 rounded-lg overflow-hidden border border-white/10",
        height,
        className
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-center p-4">
        {text}
      </div>
    </div>
  );
};

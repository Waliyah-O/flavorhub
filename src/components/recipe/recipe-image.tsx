"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface RecipeImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  fallbackSrc?: string;
}

export function RecipeImage({
  src,
  alt,
  fill = true,
  width,
  height,
  className,
  fallbackSrc = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop", // Generic food fallback
}: RecipeImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      className={cn("object-cover", className)}
      onError={handleError}
      unoptimized // Only if using external URLs without Next.js config
    />
  );
}

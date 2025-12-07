"use client";

import { useState } from "react";
import Image from "next/image";
import ImageLoader from "./ImageLoader";

type ImageWithLoaderProps =
  | {
      src: string;
      alt: string;
      fill?: false;
      width: number;
      height: number;
      sizes?: string;
      style?: React.CSSProperties;
      className?: string;
      unoptimized?: boolean;
    }
  | {
      src: string;
      alt: string;
      fill: true;
      width?: number;
      height?: number;
      sizes?: string;
      style?: React.CSSProperties;
      className?: string;
      unoptimized?: boolean;
    };

export default function ImageWithLoader(props: ImageWithLoaderProps) {
  const {
    src,
    alt,
    fill = false,
    width,
    height,
    sizes,
    style,
    className,
    unoptimized,
  } = props;

  const [loading, setLoading] = useState(true);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: fill ? "100%" : width,
        height: fill ? "100%" : height,
        ...style,
        overflow: "hidden",
      }}
    >
      {loading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(0,0,0,0.05)",
            zIndex: 10,
          }}
        >
          <ImageLoader />
        </div>
      )}

      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        sizes={sizes}
        unoptimized={unoptimized}
        onLoadingComplete={() => setLoading(false)}
        style={{
          objectFit: "cover", // 🚀 FIX STRETCHING
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}

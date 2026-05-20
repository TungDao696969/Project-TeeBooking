export const imageLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export const getImageUrl = (url?: string | null) => {
  if (!url) {
    return "/images/no-image.png";
  }

  return url;
};

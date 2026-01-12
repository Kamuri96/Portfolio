"use client";

const imageLoader = ({ src }: { src: string }) => {
  return process.env.NODE_ENV === "production" ? "/Portfolio" + src : src;
};

export default imageLoader;

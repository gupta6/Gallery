import React, { useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

import { Spinner } from "./Spinner";
import { useFetch } from "../hooks/useFetch";
import style from "./Card.module.css";

export type CardProps = {
  type: string;
  title: string;
  position: number;
  index: number;
  moveCard: (dragIndex: number, dropIndex: number) => void;
  setOverlayImg: (src: string) => void;
};

type APIResponse = {
  id: string;
  url: string;
  width: number;
  height: number;
};

export const Card: React.FC<CardProps> = ({
  title,
  index,
  moveCard,
  setOverlayImg,
}) => {
  const { data, isLoading, fetchData } = useFetch<APIResponse[]>(
    "https://api.thecatapi.com/v1/images/search?mime_types=gif"
  );
  const ref = useRef<HTMLDivElement>(null);
  const [, dragRef] = useDrag({
    type: "item",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: "item",
    drop: (item: { index: number }) => {
      const dropIndex = index;
      const dragIndex = item.index;
      moveCard(dragIndex, dropIndex);
    },
  });

  const dragDropRef = dragRef(dropRef(ref));

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = () => {
    if (isLoading || !data?.length) return;
    setOverlayImg(data[0]?.url);
  };

  return (
    <div
      className={style.container}
      ref={dragDropRef as React.LegacyRef<HTMLDivElement>}
      onClick={handleClick}
    >
      <h2>{title}</h2>
      {isLoading && <Spinner />}
      {!isLoading && (
        <figure className={style.image}>
          <img src={data?.[0]?.url} alt={title} />
        </figure>
      )}
    </div>
  );
};

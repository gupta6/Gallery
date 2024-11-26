import React, { useCallback, useEffect, useRef, useState } from "react";
import { Card, Overlay, Spinner } from "../components";
import { CardProps } from "../components/Card";
import { useFetch } from "../hooks/useFetch";
import { getTimeElapsed } from "../utils/helpers";

import style from "./Gallery.module.css";

export const Gallery: React.FC = () => {
  const [cardData, setCardData] = useState<CardProps[]>([]);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [timeElapsed, setTimeElapsed] = useState<string>("");
  const [overlayImg, setOverlayImg] = useState("");
  const {
    data: fetchedResponse,
    isLoading: isDataLoading,
    fetchData: getData,
  } = useFetch<{data: CardProps[]}>("/api/data");
  const {
    data: savedResponse,
    isLoading: isDataSaving,
    fetchData: postData,
  } = useFetch<string>("/api/data");

  useEffect(() => {
    if (!savedResponse) return;

    // Save last time only if data saved successfully
    const now = new Date().getTime(); // Current time in milliseconds
    localStorage.setItem("last-saved", JSON.stringify(now));
  }, [savedResponse]);

  useEffect(() => { // Call API only if cards data is not available in local-storage
    const data = localStorage.getItem('cards');
    if(data){
      const parsedData = JSON.parse(data);
      setCardData(parsedData);
    }
    else{
      getData();
    }
  }, []);

  useEffect(() => { // Set cards data to local state 
    if (!fetchedResponse?.data) return;
    setCardData(fetchedResponse.data);
  }, [fetchedResponse]);

  const moveCard = useCallback(
    (dragIndex: number, dropIndex: number) => {
      const cards = [...cardData];
      const dragCardPosition =  cards[dragIndex].position;
      cards[dragIndex].position = cards[dropIndex].position;
      cards[dropIndex].position = dragCardPosition;
      cards.sort((a, b) => a.position-b.position);
      setCardData(cards);
      localStorage.setItem("cards", JSON.stringify(cards)); // save data to local-storage
      saveDataToBackend(cards); // Call function to save data to backend
    },
    [cardData]
  );

  const saveDataToBackend = useCallback((cards: CardProps[]) => {
    // Ensure API is called after 5 seconds
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      setOverlayImg("");
      const lastSaved = localStorage.getItem("last-saved");
      if (lastSaved) {
        const prevTime = JSON.parse(lastSaved); // last-saved time
        const currentTime = new Date().getTime(); // current time
        setTimeElapsed(getTimeElapsed(prevTime, currentTime)); // Get eplased time
      }
      postData({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cards),
      });
    }, 5000); 
  }, []);

  return (
    <div className={style.container}>
      {!isDataSaving &&
        cardData?.map((cardDetails: CardProps, index: number) => (
          <div className={style.card} key={cardDetails.type}>
            <Card
              {...cardDetails}
              index={index}
              moveCard={moveCard}
              setOverlayImg={setOverlayImg}
            />
          </div>
        ))}
      {(isDataSaving || isDataLoading) && (
        <div>
          {timeElapsed && `Last saved ${timeElapsed} ago.`}
          <Spinner/>
        </div>
      )}
      <Overlay isVisible={!!overlayImg} onClose={() => setOverlayImg("")}>
        <figure>
          <img src={overlayImg} width={250} height={250} />
        </figure>
      </Overlay>
    </div>
  );
};

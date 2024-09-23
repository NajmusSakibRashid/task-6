"use client";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import ToolBarHeader from "@/app/components/toolbarheader";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Loading from "@/app/components/loading";

const Page = () => {
  const socket = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const socketServerUrl = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL;
    // console.log(socketServerUrl);

    socket.current = io(socketServerUrl);

    socket.current.on("connect", () => {
      setLoading(false);
      console.log("connected to server");
    });

    socket.current.on("drawing", (data) => {
      ref.current.loadPaths(data);
    });

    socket.current.on("disconnect", () => {
      console.log("disconnected from server");
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  const customPrevArrow = (onClickHandler, hasPrev) =>
    hasPrev && (
      <button
        className="bg-red-300 p-4 absolute top-1/2 translate-y--1/2 left-3 z-10"
        onClick={onClickHandler}
      >
        <FaChevronLeft />
      </button>
    );

  const customNextArrow = (onClickHandler, hasNext) =>
    hasNext && (
      <button
        className="bg-red-300 p-4 absolute top-1/2 translate-y--1/2 right-3 z-10"
        onClick={onClickHandler}
      >
        <FaChevronRight />
      </button>
    );
  const [saved, setSaved] = useState(false);
  const ref = useRef(null);

  return (
    <>
      {loading && <Loading />}
      <ToolBarHeader ref={ref} savedState={[saved, setSaved]} />
      <Carousel
        renderArrowPrev={customPrevArrow}
        renderArrowNext={customNextArrow}
        showThumbs={false}
      >
        <div className="w-screen h-screen p-5">
          <ReactSketchCanvas
            className="!border-[1px] border-black rouned-md"
            strokeColor="black"
            strokeWidth={3}
            ref={ref}
            onStroke={(data) => {
              socket.current.emit("drawing", data);
            }}
          />
        </div>
        <div className="w-screen h-screen p-5">
          <ReactSketchCanvas
            className="!border-[1px] border-black rouned-md"
            strokeColor="black"
            strokeWidth={3}
          />
        </div>
      </Carousel>
    </>
  );
};

export default Page;

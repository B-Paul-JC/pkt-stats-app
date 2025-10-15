import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { Outlet, useParams } from "react-router";
import React, { useState, useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const { sid } = useParams();

  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    function handleMove(e: MouseEvent | TouchEvent) {
      if (!sid) {
        let x = 0,
          y = 0;
        if ("touches" in e && e.touches.length > 0) {
          x = e.touches[0].clientX;
          y = e.touches[0].clientY;
        } else if ("clientX" in e) {
          x = (e as MouseEvent).clientX;
          y = (e as MouseEvent).clientY;
        }
        setPos({ x, y });
      } else {
        const { x, y } = window.localStorage.getItem("last-coords")
          ? JSON.parse(window.localStorage.getItem("last-coords")!)
          : { x: 0, y: 0 };
        setPos({ x, y });
      }
    }
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
    };
  }, [sid]);

  const scale = sid ? 100 : 0.1;

  const floatingStyle: React.CSSProperties = {
    position: "fixed",
    left: pos.x,
    top: pos.y,
    transform: `translate(-50%, -50%) scale(${scale})`,
    transition: "transform 0.2s",
    pointerEvents: "none",
    zIndex: 1,
  };

  return (
    <>
      <Welcome />
      <div style={floatingStyle}>
        <div className="w-10 h-10 md:w-15 md:h-15 rounded-full bg-indigo-500 opacity-100"></div>
      </div>
      <Outlet />
    </>
  );
}

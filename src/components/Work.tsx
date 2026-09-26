import { useEffect, useRef, useState } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";

const projects = [
  {
    name: "Quantivo",
    category: "Full Stack Web App",
    tools: "Next.js, TradingView APIs, MongoDB",
    image: "/images/quantivo.png",
    link: "https://github.com/addymistrel/quantivo.git",
  },
  {
    name: "MX-CARD Agent",
    category: "AI Agent / CLI Tool",
    tools: "Python, LLMs, MCP, Agentic AI",
    image: "/images/mxcard.png",
    link: "https://github.com/addymistrel/quantivo.git",
  },
  {
    name: "Grabway",
    category: "Ride-Sharing Web App",
    tools: "React, Firebase, MongoDB, Google Maps",
    image: "/images/grabway.png",
    link: "https://github.com/addymistrel/GrabWay.git",
  },
  {
    name: "Railway Rakes Scheduler",
    category: "Machine Learning Web App",
    tools: "React, Django, ML, MongoDB",
    image: "/images/irrss.png",
    link: "https://github.com/Abhinav-2004/SIH-React-Railways.git",
  },
  {
    name: "Homeify",
    category: "E-Commerce Web App",
    tools: "React, Express, MongoDB, Node.js",
    image: "/images/homeify.png",
    link: "https://github.com/addymistrel/Homeify.git",
  },
  {
    name: "i-Clean",
    category: "Waste Management Platform",
    tools: "React, Firebase, Tailwind, Mapbox",
    image: "/images/carrent.png",
    link: "https://github.com/addymistrel/i-Clean-Final",
  },
  {
    name: "Notes & Assignments",
    category: "Static Website",
    tools: "HTML, CSS, Bootstrap",
    image: "/images/jobit.png",
    link: "https://github.com/addymistrel/NotesAndAssignments.github.io",
  },
  {
    name: "Volume Control",
    category: "Computer Vision Tool",
    tools: "Python, OpenCV, MediaPipe",
    image: "/images/tripguide.png",
    link: "https://github.com/addymistrel/Volume-Control",
  },
];

const Work = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);
  const [thumbWidth, setThumbWidth] = useState(0);
  const [thumbLeft, setThumbLeft] = useState(0);

  const updateThumb = () => {
    const scrollEl = scrollRef.current;
    const trackEl = trackRef.current;
    if (!scrollEl || !trackEl) return;

    const { scrollWidth, clientWidth, scrollLeft } = scrollEl;
    const trackWidth = trackEl.clientWidth;
    const width = Math.max((clientWidth / scrollWidth) * trackWidth, 60);
    const maxThumbLeft = trackWidth - width;
    const maxScrollLeft = scrollWidth - clientWidth;
    const left =
      maxScrollLeft > 0 ? (scrollLeft / maxScrollLeft) * maxThumbLeft : 0;

    setThumbWidth(width);
    setThumbLeft(left);
  };

  useEffect(() => {
    updateThumb();
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    scrollEl.addEventListener("scroll", updateThumb);
    window.addEventListener("resize", updateThumb);
    return () => {
      scrollEl.removeEventListener("scroll", updateThumb);
      window.removeEventListener("resize", updateThumb);
    };
  }, []);

  const handleThumbPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartScrollRef.current = scrollRef.current?.scrollLeft ?? 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleThumbPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const scrollEl = scrollRef.current;
    const trackEl = trackRef.current;
    if (!scrollEl || !trackEl) return;

    const { scrollWidth, clientWidth } = scrollEl;
    const trackWidth = trackEl.clientWidth;
    const maxScrollLeft = scrollWidth - clientWidth;
    const scrollableTrack = trackWidth - thumbWidth;
    const deltaX = e.clientX - dragStartXRef.current;
    const scrollDelta =
      scrollableTrack > 0 ? (deltaX / scrollableTrack) * maxScrollLeft : 0;

    scrollEl.scrollLeft = dragStartScrollRef.current + scrollDelta;
  };

  const handleThumbPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const scrollEl = scrollRef.current;
    const trackEl = trackRef.current;
    if (!scrollEl || !trackEl || e.target !== trackEl) return;

    const rect = trackEl.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const { scrollWidth, clientWidth } = scrollEl;
    scrollEl.scrollLeft = ratio * (scrollWidth - clientWidth);
  };

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-scroll" ref={scrollRef}>
          <div className="work-flex">
            {projects.map((project, index) => (
              <div className="work-box" key={project.name}>
                <div className="work-info">
                  <div className="work-title">
                    <h3>0{index + 1}</h3>

                    <div>
                      <h4>{project.name}</h4>
                      <p>{project.category}</p>
                    </div>
                  </div>
                  <h4>Tools and features</h4>
                  <p>{project.tools}</p>
                </div>
                <WorkImage
                  image={project.image}
                  alt={project.name}
                  link={project.link}
                />
              </div>
            ))}
          </div>
        </div>
        <div
          className="work-scrollbar-track"
          ref={trackRef}
          onClick={handleTrackClick}
        >
          <div
            className="work-scrollbar-thumb"
            style={{
              width: thumbWidth,
              transform: `translateX(${thumbLeft}px)`,
            }}
            onPointerDown={handleThumbPointerDown}
            onPointerMove={handleThumbPointerMove}
            onPointerUp={handleThumbPointerUp}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Work;

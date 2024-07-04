"use client";

import Image from "next/image";
import { useState } from "react";
import ModalVideo from "react-modal-video";
import welcomeimage from '../../../public/welcome-image-header.png'
const Video = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <section className="relative z-10">
      <div className="container mt-0 pt-0 px-5">
     

        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="mx-auto max-w-[790px] border-4 overflow-hidden rounded-box"
              data-wow-delay=".15s"
            >
              <div className="mt-0 pt-0 relative aspect-[77/40] items-center justify-center">
              {/* <video src="/demo.mp4"  /> */}
                <Image src={welcomeimage} alt="video image" width={1000} height={1000} />
                <div className="absolute right-0 top-0 flex h-full w-full items-center justify-center">
                  <button
                    aria-label="video play button"
                    onClick={() => setOpen(true)}
                    className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-white bg-opacity-75 text-primary transition hover:bg-opacity-100"
                  >
                    <svg
                      width="16"
                      height="18"
                      viewBox="0 0 16 18"
                      className="fill-current"
                    >
                      <path d="M15.5 8.13397C16.1667 8.51888 16.1667 9.48112 15.5 9.86602L2 17.6603C1.33333 18.0452 0.499999 17.564 0.499999 16.7942L0.5 1.20577C0.5 0.43597 1.33333 -0.0451549 2 0.339745L15.5 8.13397Z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

   

      <div className="absolute bottom-0 left-0 right-0 z-[-1] h-full w-full bg-[url(/images/video/shape.svg)] bg-cover bg-center bg-no-repeat"></div>
    </section>
  );
};

export default Video;
import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { Loader2 } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  autoPlay?: boolean;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, autoPlay = true, className }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }

      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });
      
      hlsRef.current = hls;
      hls.loadSource(src);
      hls.attachMedia(video);
      
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (autoPlay) video.play().catch(e => console.warn("Autoplay failed", e));
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.warn("Network error, trying to recover...");
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.warn("Media error, trying to recover...");
              hls.recoverMediaError();
              break;
            default:
              hls.destroy();
              break;
          }
        }
      });

    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS support (Safari/iOS)
      video.src = src;
      if (autoPlay) {
        video.addEventListener('loadedmetadata', () => {
          video.play().catch(e => console.warn("Autoplay failed", e));
        });
      }
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, [src, autoPlay]);

  return (
    <div className={`relative bg-black overflow-hidden group ${className}`}>
       {!src && (
         <div className="absolute inset-0 flex items-center justify-center text-slate-500">
            <Loader2 className="animate-spin mr-2" /> 等待播放源...
         </div>
       )}
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        controls
        playsInline
      />
    </div>
  );
};

export default VideoPlayer;
import { useState } from 'react';
import YouTube from 'react-youtube';
import { Play, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';

export default function VideoPlayer({ youtubeId, title }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      modestbranding: 1,
      rel: 0,
    },
  };

  return (
    <>
      <Button
        variant="primary"
        size="lg"
        onClick={() => setIsPlaying(true)}
        className="gap-2"
      >
        <Play className="w-5 h-5 fill-white" />
        Watch Trailer : {title}
      </Button>

      <AnimatePresence>
        {isPlaying && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPlaying(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
            />

            {/* Video Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-5xl aspect-video"
              >
                <button
                  onClick={() => setIsPlaying(false)}
                  className="absolute -top-12 right-0 p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>

                <div className="rounded-xl overflow-hidden shadow-2xl">
                  <YouTube
                    videoId={youtubeId}
                    opts={opts}
                    className="w-full h-full"
                  />
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

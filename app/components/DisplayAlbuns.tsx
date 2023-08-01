import EditAlbumAndTrack from './EditAlbumAndTrack';
import { useState } from 'react';
import { AlbumAndTracks, Track } from '@/lib/@types/types';
import { secondsToMinutes } from '@/lib/utils/secondsToMinutes';
import { PiPencilSimpleLineDuotone } from 'react-icons/pi';
import { motion } from 'framer-motion';
import { ButtonVariable } from '@/lib/animationVariables';

export default function DisplayAlbuns(props: { data: AlbumAndTracks[] }): JSX.Element {
  const [element, setElement] = useState(null as AlbumAndTracks | null);
  console.log(props.data);
  return (
    <>
      <EditAlbumAndTrack album={element} onClose={() => setElement(null)} />
      <div className="bg-white/50 w-full h-full rounded-md m-5 p-12">
        {props.data.map((album: AlbumAndTracks) => (
          <div className="flex flex-col w-full h-full ">
            <div className="flex flex-row ">
              <h1 className="self-start text-black text-lg mx-2">
                <b>
                  {album.name}, {album.year}
                </b>
              </h1>
              <motion.button
                variants={ButtonVariable}
                whileHover="whileHover"
                className=" text-white border-2 border-solid bg-neutral-600/80 p-1 flex gap-2 items-center rounded-md "
                onClick={() => setElement(album)}
              >
                Editar
                <PiPencilSimpleLineDuotone />
              </motion.button>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row justify-around">
                <b className="text-black text-center w-full">N</b>
                <b className="text-black text-center w-full">Título</b>
                <b className="text-black text-center w-full">Duração</b>
              </div>
              {album.tracks.map((track: Track) => (
                <div className="flex flex-row justify-around">
                  <h6 className="text-black text-center w-full">{track.number}</h6>
                  <h6 className="text-black text-center w-full">{track.title}</h6>
                  <h6 className="text-black text-center w-full">{secondsToMinutes(track.duration)}</h6>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

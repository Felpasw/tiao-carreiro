import { AlbumAndTracks, Track } from '@/lib/@types/types';
import { useReducer, useState } from 'react';
import { GrClose } from 'react-icons/gr';
import Image from 'next/image';
import { secondsToMinutes } from '@/lib/utils/secondsToMinutes';
import { toast } from 'react-toastify';
import { albumAPI } from '@/lib/axiosConfig';
import { AnimatePresence, motion } from 'framer-motion';

import { ButtonVariable, inputTrackVariable, modalVariables } from '@/lib/animationVariables';
import { AiOutlineDelete } from 'react-icons/ai';
import { RiMenuAddFill } from 'react-icons/ri';

type TrackAction =
  | { type: 'SET_DURATION'; payload: number }
  | { type: 'SET_TITLE'; payload: string }
  | { type: 'SET_NUMBER'; payload: number };

const trackReducer = (state: Track, action: TrackAction): Track => {
  switch (action.type) {
    case 'SET_DURATION':
      return { ...state, duration: action.payload };
    case 'SET_TITLE':
      return { ...state, title: action.payload };
    case 'SET_NUMBER':
      return { ...state, number: action.payload };
    default:
      return state;
  }
};

const initialState: Track = {
  duration: 0,
  title: '',
  number: 0,
};

export default function EditAlbumAndTrack(props: { album: AlbumAndTracks | null; onClose: () => void }) {
  const [isVisible, setIsvisible] = useState(false);
  const [state, dispatch] = useReducer(trackReducer, initialState);
  if (!props.album) return null;

  const handleAddTrack = async () => {
    const track = { ...state, album_id: props.album?.id };
    await albumAPI
      .post('/track', track)
      .then((response) => {
        toast.success('Sucesso ao adicionar a Track!');
        props.onClose();
      })
      .catch(() => {
        toast.error('Erro ao adicionar a track!');
      });
  };

  const handleRemoveAlbum = async (id: string) => {
    await albumAPI
      .delete(`/album/${id}`)
      .then((response) => {
        toast.success('O álbum foi deletado com sucesso!');
        props.onClose();
      })
      .catch((error) => {
        toast.error('Ocorreu um erro ao deletar o álbum!');
        props.onClose();
      });
  };

  const handleRemoveTrack = async (id: string) => {
    await albumAPI
      .delete(`/track/${id}`)
      .then((response) => {
        toast.success('A track foi deletada com sucesso!');
        props.onClose();
      })
      .catch((error) => {
        toast.error('Ocorreu um erro ao deletar a track!');
        props.onClose();
      });
  };

  return (
    <div className="fixed backdrop-blur-sm h-full w-full bg-black/50 flex justify-center overflow-scroll ">
      <AnimatePresence>
        <motion.div
          variants={modalVariables}
          exit="exit"
          initial="initial"
          animate="animate"
          className="flex flex-col bg-white rounded-xl items-center text-black relative lg:w-[40%] w-full text-sm h-fit p-12 m-10 sm:m-24"
        >
          <motion.div
            whileTap={{
              scale: 1.1,
            }}
            onClick={props.onClose}
            className="cursor-pointer border-solid z-10 absolute top-2 right-2 border-2 rounded-full border-neutral-600"
          >
            <GrClose />
          </motion.div>
          <Image src="/logo.png" alt="Imagem logo do Tião Carreiro" width={300} height={200} />
          <b className="text-2xl">
            {props.album.name}, {props.album.year}
          </b>
          <div className="w-full">
            <div className="flex flex-col justify-between items-center">
              {props.album.tracks.map((element: Track) => (
                <div className="flex flex-row items-center  w-full p-2">
                  <h6 className="text-center w-full  h-full text-lg">{element.number}</h6>
                  <h6 className=" text-center w-full  h-full text-lg">{element.title} </h6>
                  <h6 className=" text-center w-full h-full text-lg">{secondsToMinutes(element.duration)}</h6>
                  <motion.button
                    variants={ButtonVariable}
                    whileHover="whileHover"
                    className="border border-solid w-[30%] p-1 rounded-md px-3 bg-neutral-600/80 text-white flex items-center gap-2"
                    onClick={() => element.id && handleRemoveTrack(element.id.toString())}
                  >
                    Remover <AiOutlineDelete />
                  </motion.button>
                </div>
              ))}
            </div>
            <div className=" flex justify-center w-full">
              <motion.button
                variants={ButtonVariable}
                whileHover="whileHover"
                className="border-solid rounded-md bg-neutral-600/80 text-white sm:w-[30%] p-1 flex gap-2 items-center my-5 mx-3"
                onClick={() => props.album?.id && handleRemoveAlbum(props.album?.id.toString())}
              >
                Remover album <AiOutlineDelete />
              </motion.button>
              {!isVisible && (
                <motion.button
                  variants={ButtonVariable}
                  whileHover="whileHover"
                  onClick={() => setIsvisible(!isVisible)}
                  className="border  border-solid my-5 p-1 rounded-md bg-neutral-600/80 text-white w-[40%] flex items-center gap-2 justify-center"
                >
                  Adicionar nova track <RiMenuAddFill />
                </motion.button>
              )}
            </div>
            {isVisible && (
              <motion.div
                variants={inputTrackVariable}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col p-8 mb-12"
              >
                <label htmlFor="duration">Duração:</label>
                <input
                  className="border border-solid  shadow-lg rounded-md "
                  type="number"
                  value={state.duration}
                  onChange={(e) => dispatch({ type: 'SET_DURATION', payload: parseInt(e.target.value) })}
                  placeholder="Duração"
                />
                <label htmlFor="duration">Título:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="border border-solid  shadow-lg rounded-md"
                  onChange={(e) => dispatch({ type: 'SET_TITLE', payload: e.target.value })}
                  placeholder="Título"
                  value={state.title}
                />
                <label htmlFor="duration">Número da faixa:</label>
                <input
                  type="number"
                  id="number"
                  className="border border-solid shadow-lg rounded-md"
                  onChange={(e) => dispatch({ type: 'SET_NUMBER', payload: parseInt(e.target.value) })}
                  placeholder="Número da faixa"
                  value={state.number}
                />
                <div className="flex flex-row my-5">
                  <motion.button
                    variants={ButtonVariable}
                    onClick={() => setIsvisible(!isVisible)}
                    className=" text-white bg-neutral-600/80 border-solid my-5 w-[50%] p-1 rounded-md"
                    whileHover="whileHover"
                  >
                    Cancelar
                  </motion.button>
                  <motion.button
                    variants={ButtonVariable}
                    whileHover="whileHover"
                    className="border-solid my-5 w-[50%] p-1 rounded-md mx-2 bg-neutral-600/80 text-white"
                    onClick={handleAddTrack}
                  >
                    Enviar
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

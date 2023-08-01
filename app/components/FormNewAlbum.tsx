'use client';

import React, { useState } from 'react';
import { GrClose } from 'react-icons/gr';
import Image from 'next/image';
import { Album } from '@/lib/@types/types';
import { ToastContainer, toast } from 'react-toastify';
import { albumAPI } from '@/lib/axiosConfig';
import { motion } from 'framer-motion';
import { ButtonVariable, modalVariables } from '@/lib/animationVariables';

type Props = {
  onClose: () => void;
};

export default function FormNewAlbum({ onClose }: Props) {
  const [year, setYear] = useState('');
  const [name, setAlbumName] = useState('');

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async () => {
    const NewAlbum: Album = {
      year: parseInt(year),
      name,
    };
    await albumAPI
      .post('/album', NewAlbum)
      .then((response) => {
        toast.success('Sucesso ao adicionar álbum!');
        onClose();
      })
      .catch((error) => {
        toast.error('Erro ao adicinar um álbum!');
      });
  };

  return (
    <div className="fixed backdrop-blur-sm h-[100%] w-[100%] bg-black/50 flex justify-center">
      <motion.div
        variants={modalVariables}
        initial="initial"
        animate="animate"
        className="flex flex-col bg-white m-24 rounded-xl items-center relative h-fit sm:w-fit justify-center sm-"
      >
        <div className="m-12">
          <Image src="/logo.png" alt="Imagem logo do Tião Carreiro" width={300} height={200} />

          <div className=" flex flex-col gap-12">
            <div className="flex flex-col">
              <label className="text-black">Ano do álbum:</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="Digite o ano"
                className="self-start  border-solid  border-2 rounded-md  shadow-lg text-black"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-black ">Nome do álbum:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setAlbumName(e.target.value)}
                placeholder="Digite o nome do álbum"
                className=" border-solid  border-2 rounded-md self-start text-black shadow-lg"
              />
            </div>
          </div>
        </div>
        <motion.button
          variants={ButtonVariable}
          whileHover="whileHover"
          onClick={() => handleSubmit()}
          className="border-solid border-2 rounded-md w-[40%] mb-5 bg-neutral-600/80 text-white self-center"
        >
          Enviar
        </motion.button>
        <button
          className="absolute top-2 right-2 cursor-pointer text-black z-50 rounded-full border-2"
          onClick={handleClose}
        >
          <GrClose />
        </button>
      </motion.div>
    </div>
  );
}

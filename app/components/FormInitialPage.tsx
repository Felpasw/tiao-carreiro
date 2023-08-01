'use client';

import { useState } from 'react';
import DisplayAlbuns from './DisplayAlbuns';
import FormNewAlbum from './FormNewAlbum';
import { AlbumAndTracks } from '@/lib/@types/types';
import { albumAPI } from '@/lib/axiosConfig';
import { toast } from 'react-toastify';

import { AiOutlineFileSearch } from 'react-icons/ai';
import { RiPlayListAddLine } from 'react-icons/ri';
import { motion } from 'framer-motion';
import { ButtonVariable } from '@/lib/animationVariables';

export default function FormInitialPage(): JSX.Element {
  const [formValue, setFormValue] = useState<string>('');
  const [apiData, setApiData] = useState([] as AlbumAndTracks[]);
  const [isVisible, setIsVisible] = useState(false);

  const handleButtonClick = async () => {
    await albumAPI
      .get(`/album?keyword=${formValue}`)
      .then((response) => {
        setApiData(response.data.data);
      })
      .catch((error) => {
        toast.error('Erro ao realizar a pesquisa!');
      });
  };

  const handleChange = (e: { target: { value: string } }): void => {
    let value = e.target.value;
    setFormValue(value);
  };
  return (
    <>
      <div className="flex w-[80%] h-full justify-center">
        <input
          type="text"
          className="p-3 w-full h-full text-black mt-3 shadow-md max-w-[400px] focus:max-w-xl transition-all duration-700 rounded-md"
          onChange={handleChange}
          value={formValue}
        />
        <motion.button
          variants={ButtonVariable}
          whileHover="whileHover"
          className=" text-white bg-neutral-600/80 rounded-md hover:bg-blue mt-3 px-1 flex items-center gap-2 "
          onClick={() => handleButtonClick()}
        >
          Procurar <AiOutlineFileSearch size={20} />
        </motion.button>
      </div>
      {apiData && <DisplayAlbuns data={apiData} />}
      <motion.button
        variants={ButtonVariable}
        whileHover="whileHover"
        className=" rounded-md text-white bg-neutral-600/80 flex items-center gap-2 p-1"
        onClick={() => setIsVisible(true)}
      >
        Adicionar novo album <RiPlayListAddLine />
      </motion.button>
      {isVisible && <FormNewAlbum onClose={() => setIsVisible(false)} />}
    </>
  );
}

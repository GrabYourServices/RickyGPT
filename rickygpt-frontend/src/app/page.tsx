'use client'
import { apiLink } from '@/assets/urls';
import axios from 'axios'
import { useState } from 'react';
import Image from 'next/image'
import './globals.css'
import { data } from 'autoprefixer';
import { Typewriter } from 'react-simple-typewriter';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [oldInputValue, setOldInputValue] = useState('')

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
    adjustInputHeight(event.target);
  };

  const adjustInputHeight = (input: HTMLTextAreaElement) => {
    input.style.height = 'auto';
    input.style.height = `${input.scrollHeight}px`;
  };

  // AI Part

  const [outputValue, setOutputValue] = useState('')

  const handleBtnSubmit = async () => {
    if(oldInputValue == inputValue) {
      return
    }
    setOutputValue('Getting a Response...')
    const resp = await axios.get(`${apiLink}${inputValue}`)
    setOutputValue(resp.data.response || 'There was an error getting a response! Most Likely Rate Limit!')
    setOldInputValue(inputValue)
    console.log(resp.data.response)
  }

  return (
    <main className="flex bg-plurple min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col items-center justify-center">
        <p className='text-6xl font-white font-secondary text-center mb-0 fontOutlined text-white'>Ricky GPT</p>
      </div>
      <div className='w-screen flex flex-col items-center justify-center p-4 '>        
        <textarea
          className='px-4 py-2 mt-8 bg-white border-black border-2 text-black font-black placeholder:text-black font-primary border-solid w-3/6 rounded-lg cursor-pointer transition duration-500 hover:scale-105'
          placeholder='Click Here To Begin Typing'
          value={inputValue}
          onChange={handleInputChange}
          style={{ resize: 'none' }}
        />
        <button onClick={handleBtnSubmit} className='px-4 py-2 mt-4 bg-yeelow rounded-lg border-black border-2 text-black font-black border-solid w-3/6 transition duration-500 cursor-pointer hover:scale-105'>Submit</button>
      </div>
      <div className='flex w-screen justify-center items-center'>
      {outputValue == '' ? <></> : 
        <div
        className='justify-self-center px-4 py-2 mt-8 bg-white border-black border-2 text-black font-black font-primary border-solid w-3/6 rounded-lg cursor-pointer transition duration-500 hover:scale-105'
        >
          <h1 className='text-2xl mb-1'>Ricky: </h1>
          <p><Typewriter
            cursor
            cursorBlinking
            delaySpeed={750}
            deleteSpeed={500}
            loop={2}
            typeSpeed={100}
            words={[
              outputValue
            ]}
          /></p>
        </div>}
      </div>
    </main>
  )
}

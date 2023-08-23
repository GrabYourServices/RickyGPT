'use client'
import axios from 'axios'
import { useState } from 'react';
import Image from 'next/image'
import './globals.css'
import { data } from 'autoprefixer';

export default function Home() {
  const [inputValue, setInputValue] = useState('');

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
    const resp = await axios.get(`http://localhost:8080/api/ai/reply?query=${inputValue}`)
    setOutputValue(resp.data.response)
    console.log(outputValue)
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
    </main>
  )
}

'use client'
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Book, PlayIcon, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { toggleDarkMode, setDarkMode } from './store/darkModeSlice';



export default function Home() {

  const [word, setWord] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [font, setFont] = useState<'serif' | 'sans-serif' | 'monospace'>('sans-serif');
  const [history, setHistory] = useState<{ word: string, date: string }[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const fontClass = font === 'serif' ? 'font-serif' : font === 'monospace' ? 'font-mono' : 'font-sans';
  const darkMode = useSelector((state: RootState) => state.darkMode.value);
  const dispatch = useDispatch();

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };


  useEffect(() => {
    const savedHistory = localStorage.getItem('diccionario-history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('diccionario-history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    dispatch(setDarkMode(prefersDark));
  }, [dispatch]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: MediaQueryListEvent) => {
      dispatch(setDarkMode(event.matches));
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [dispatch]);

  const handleWordsSpace = async (e: React.FormEvent) => {
    e.preventDefault()

    const regex = /^[a-zA-Z]+$/;

    if (!word.trim()) {
      setError('Por favor ingresa una palabra.');
      setResult(null);
      return;
    }

    if (!regex.test(word.trim())) {
      setError('Solo se permiten letras sin espacios ni caracteres especiales.');
      setResult(null);
      return;
    }

    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      if (!res.ok) throw new Error('Palabra no encontrada.')
      const data = await res.json()
      setResult(data[0])
      const now = new Date().toLocaleString();
      const formattedDate = now.toLocaleString();
      setHistory((prev) => {
        const alreadyExists = prev.some(item => item.word.toLowerCase() === word.toLowerCase());
        if (alreadyExists) return prev;
        return [
          { word, date: formattedDate },
          ...prev,
        ];
      });
    } catch (err: any) {
      setError(err.message)
    }

  }

  return (
    <main className={`min-h-screen p-4 sm:p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} ${fontClass}`}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
          {/* Botón de historial a la izquierda */}
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-4 px-1 py-4  text-gray-400  transition cursor-pointer">
            <Book className="w-12 h-14" />
          </button>

          {/* Selector de fuente + Botón modo oscuro a la derecha */}
          <div className="flex items-center gap-4">
            <select
              id="font-select"
              value={font}
              onChange={(e) => setFont(e.target.value as 'serif' | 'sans-serif' | 'monospace')}
              className={`px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition 
              ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}>
              <option value="sans-serif">Sans-serif</option>
              <option value="serif">Serif</option>
              <option value="monospace">Monospace</option>
            </select>

            <div className="flex items-center gap-2">
              <div
                onClick={handleToggleDarkMode}
                className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors
              ${darkMode ? 'bg-gray-700' : 'bg-gray-400'}`}>
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform
              ${darkMode ? 'translate-x-6' : 'translate-x-0'}`}>
                </div>
              </div>
              {darkMode ? (
                <Moon className="text-white" size={20} />
              ) : (
                <Sun className="text-gray-600" size={20} />
              )}
            </div>
          </div>

        </div>

        {/* agregar caja de texto word space*/}
        <form onSubmit={handleWordsSpace} className="mb-6 relative ">
          <input
            type="text"
            placeholder="Buscar palabra..."
            value={word}
            onChange={(e) => {
              setWord(e.target.value);
              if (error) setError(null);
            }}
            className={`p-3 pr-10 border w-full transition  
            ${darkMode ? 'bg-gray-800 text-white placeholder-gray-400 border-gray-600' : 'bg-gray-200 text-black placeholder-gray-500 border-gray-300'}
            ${error ? 'border-red-500' : ''}
            rounded-xl`}
          />

          {/* Botón con ícono de lupa */}
          <button
            type="submit"
            className="absolute right-2 top-1/2  bg-purple-100transform -translate-y-1/2 text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer"
            aria-label="Buscar"
          >
            <Search className="w-6 h-6  text-purple-800" />
          </button>
        </form>


        {error && <p className="text-red-500">{error}</p>}

        {result && (
          <div className=" relative p-4 rounded shadow-md">
            <h2 className="text-6xl font-bold">{result.word}</h2>
            {/* agregar audio */}
            {result.phonetics?.find((p: any) => p.audio) && (
              <button
                onClick={() => {
                  const audio = new Audio(result.phonetics.find((p: any) => p.audio).audio)
                  audio.play()
                }}
                className="absolute top-8 right-4 bg-purple-200 text-gray text-2xl rounded-full p-4 hover:bg-purple-300 transition cursor-pointer">
                <PlayIcon className="w-6 h-6 fill-current text-purple-800" />
              </button>
            )}

            <p className="italic text-purple-500 text-xl">{result.phonetic}</p>
            <br />

            {result.meanings.map((meaning: any, index: number) => (
              <div key={index} className="mt-2">
                <div className="flex items-center gap-4 mb-2 text-xl">
                  <p className="font-semibold ">{meaning.partOfSpeech}  </p>
                  <div className="flex-grow h-px bg-gray-300">
                  </div>
                </div>
                <br />
                <p className="text-gray-400 text-sm uppercase mb-2">Meaning</p>
                <ul className="list-disc list-inside marker:text-purple-600">
                  {meaning.definitions.map((def: any, i: number) => (
                    <li key={i}>{def.definition}</li>
                  ))}

                  {meaning.synonyms && meaning.synonyms.length > 0 && (
                    <p className="mt-2 text-sm">
                      <span className="text-gray-500 font-medium">Synonyms: </span>
                      <span className="text-purple-500">{meaning.synonyms.slice(0, 5).join(', ')}</span>
                    </p>
                  )}
                </ul>

                <br></br>

                {result.sourceUrls && result.sourceUrls.length > 0 && (
                  <div className="mt-4 text-sm">
                    <span className="text-gray-500 font-medium">Source: </span>
                    <a
                      href={result.sourceUrls[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-300 underline hover:text-blue-700">
                      {result.sourceUrls[0]}
                    </a>
                  </div>
                )}
              </div>

            ))}
          </div>
        )}

        {/* agregar tabla history */}
        <AnimatePresence>
          {showHistory && history.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mt-4 border border-gray-300 dark:border-gray-600 rounded p-4 bg-white dark:bg-gray-800 shadow-md max-w-md w-full">
              <h3 className="text-black dark:text-white font-semibold mb-2 flex justify-between items-center">
                Historial de búsquedas
                <button
                  onClick={() => setHistory([])}
                  className="text-sm text-red-500 hover:text-red-700 transition cursor-pointer">
                  Borrar todo
                </button>
              </h3>
              <ul className="space-y-2">
                {history.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center text-sm text-gray-700 dark:text-gray-300">
                    <div>
                      <span>{item.word}</span>{' '}
                      <span className="italic text-xs ml-2 cursor-pointer">
                        {item.date}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        const newHistory = [...history];
                        newHistory.splice(index, 1);
                        setHistory(newHistory);
                      }}
                      className="text-sm text-red-500 hover:text-red-700 transition cursor-pointer">
                      ❌
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </main>
  )

}

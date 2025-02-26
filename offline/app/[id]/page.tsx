'use client';

import { useParams, useRouter } from 'next/navigation';
import { getQuestions } from '@/app/lib/actions';
import { Question } from '../lib/model';
import { useState, useEffect } from 'react';
import clsx from 'clsx';



export default function QuestionPage() {

  const { id } = useParams();
  const questionId = parseInt(id as string);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Ajout d'un état de chargement
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    async function fetchQuestions() {
      const fetchedQuestions = await getQuestions();
      setQuestions(fetchedQuestions);
      setIsLoading(false); // Fin du chargement
    }
    fetchQuestions();
  }, []);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  const question = questions[questionId - 1]; // L'id commence à 1, donc on accède à l'index - 1



  return (
    <div className="h-screen flex flex-col items-center justify-center ">
      <div className='h-1/3 flex items-center justify-center bg-[#4B1C80] w-screen' >
      <div className="flex justify-center items-center w-full px-4 relative h-full">
        <h4 className='text-white font-semibold text-center text-6xl'>
          Question:<br></br>
          {question.question}
        </h4>
        <button className='bg-[#E4B60E] text-white font-semibold py-2 px-4 rounded absolute bottom-4 right-4'
        onClick={() => setShowAnswer(true)}
        >
          {showAnswer ? 'Question suivante >>': 'Réponse ?'}
        </button>
      </div>
      </div>
      <div className='h-2/3 grid grid-cols-2 grid-rows-2 gap-4 px-4 py-4 bg-[#B097FB] w-screen ' >
        <div className={clsx('bg-[#3084D7] max-h-full max-w-full rounded-xl flex items-center justify-center', {
          'bg-blue-300': showAnswer && question.choices[0] != question.answer,
        })}>
          <h5 className='text-white font-semibold'> {question.choices[0]} </h5>
        </div>
        <div className={clsx('bg-[#E4B60E] max-h-full max-w-full rounded-xl flex items-center justify-center',{
          'bg-yellow-300': showAnswer && question.choices[1] != question.answer,
        })}>
          <h5 className='text-white font-semibold'> {question.choices[1]} </h5>
        </div>
        <div className={clsx('bg-[#C11717] max-h-full max-w-full rounded-xl flex items-center justify-center', {
          'bg-red-300': showAnswer && question.choices[2] != question.answer,
        })}>
          <h5 className='text-white font-semibold'>{question.choices[2]}</h5>
        </div>
        <div className={clsx('bg-[#0FB430] max-h-full max-w-full rounded-xl flex items-center justify-center', {
          'bg-green-300': showAnswer && question.choices[3] != question.answer,
        })}>
          <h5 className='text-white font-semibold'>{question.choices[3]}</h5>
        </div>
      </div>
      
    </div>
  );
}

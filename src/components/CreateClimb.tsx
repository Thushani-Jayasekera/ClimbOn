'use client'

import { createNewClimb } from '@/lib/createNewClimb';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

type CreateClimbProps = {
  onCreateClimb: () => void;
};


export default function CreateClimb({ onCreateClimb }: CreateClimbProps) {



  const [climbType, setClimbType] = useState('BOULDER');
  const [climbName, setClimbName] = useState('');
  const [grade, setGrade] = useState('V0');
  const [completed, setCompleted] = useState(0);


  // Grades based on the type of climb
  const boulderGrades = Array.from({ length: 18 }, (_, i) => `V${i}`);
  const routeGrades = Array.from({ length: 15 }, (_, i) => `5.${i + 1}`);




  const handleCompletedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompleted(e.target.checked ? 1 : 0);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await createNewClimb(climbName, grade, climbType, completed);
      onCreateClimb();
      toast.success('Climb created!');
    } catch (error) {
      console.error('An error occurred while creating the climb:', error);
      toast.error('An error occurred while creating the climb, try again.');
    }
  };

  return (
    <main className='px-12'>
      <div className='grid justify-center'>
        <h1 className='font-semibold'>Create Climb</h1>
      </div>
    <form onSubmit={handleSubmit}>
      
      <div className='mt-2 block text-sm font-medium leading-6 text-gray-900'>
        <label className=''>Name:</label>
        <div className='mt-2'>
          <input 
          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6' 
          type="text" 
          value={climbName} onChange={(e) => setClimbName(e.target.value)} 
          placeholder='Enter Climb Name'
          />
        </div>
      </div>
      <div>
        <label className='block text-sm font-medium leading-6 text-gray-900'>Type:</label>
        <select className='mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6' value={climbType} onChange={(e) => setClimbType(e.target.value)}>
          <option value="BOULDER">Boulder</option>
          <option value="ROUTE">Route</option>
        </select>
      </div>
      <div>
        <label className='mt-2 block text-sm font-medium leading-6 text-gray-900'>Grade:</label>
        <select className='mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6' value={grade} onChange={(e) => setGrade(e.target.value)}>
          {climbType === 'BOULDER'
            ? boulderGrades.map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))
            : routeGrades.map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
        </select>
      </div>
      <div className='text-center'>
        <label className='mt-4 block text-lg font-medium leading-6 text-gray-900'>
          SENT?
          <input className='ml-4 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600' type="checkbox" checked={completed === 1} onChange={handleCompletedChange} />
        </label>
      </div>
      <div className='grid justify-center'>
        <button className='rounded-md bg-blue-500 mt-4 mb-4 px-3 py-2 text-sm font-semibold text-white 
            shadow-md hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
          focus-visible:outline-blue-600' 
          type="submit">
            Create Climb
        </button>
      </div>
      
    </form>
    </main>
  );
}

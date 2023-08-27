'use client';

import { useState, useEffect } from 'react';
import { PlusIcon, MinusIcon, TrashIcon } from '@heroicons/react/20/solid';
import { toast } from 'react-hot-toast';


interface ClimbCardsProps {
  climbCreated: number;
  onUpdateClimbs: (climbs: Climb[]) => void;
}

export default function ClimbCards({ climbCreated, onUpdateClimbs }: ClimbCardsProps) {
  const [climbs, setClimbs] = useState<Climb[]>([]);
  const [error, setError] = useState<string | null>(null);

  const increaseAttempts = (climbIndex: number) => {
    const updatedClimbs = [...climbs];
    if (updatedClimbs[climbIndex].attempts < 30) {
      updatedClimbs[climbIndex].attempts += 1;
    }
    setClimbs(updatedClimbs);
  };

  const decreaseAttempts = (climbIndex: number) => {
    const updatedClimbs = [...climbs];
    if (updatedClimbs[climbIndex].attempts > 1) {
      updatedClimbs[climbIndex].attempts -= 1;
    }
    setClimbs(updatedClimbs);
  };

  const toggleCompleted = (climbIndex: number) => {
    const updatedClimbs = [...climbs];
    updatedClimbs[climbIndex].completed = updatedClimbs[climbIndex].completed === 0 ? 1 : 0;
    setClimbs(updatedClimbs);
  };

  useEffect(() => {
    if (climbCreated >= 1) {
      const fetchData = async () => {
        try {
          const response = await fetch('/api/climb/getworkoutclimbs');
      
          if (response.ok) {
            const fetchedClimbs: Climb[] = await response.json();
  
            const updatedClimbs = fetchedClimbs.map(fetchedClimb => {
              // Find the climb in the current state by its ID (assuming each climb has a unique ID)
              const existingClimb = climbs.find(climb => climb.climb_id === fetchedClimb.climb_id);
  
              // If the climb exists, use its current state, otherwise set the default values
              if (existingClimb) {
                return existingClimb;
              } else {
                return {
                  ...fetchedClimb,
                  attempts: 1
                };
              }
            });
  
            setClimbs(updatedClimbs);
            onUpdateClimbs(updatedClimbs); 
          } else {
            setError('An error occurred while fetching climbs.');
            toast.error('An error occurred while fetching climbs.');
          }
        } catch (err) {
          setError('An error occurred while fetching climbs.');
          toast.error('An error occurred while fetching climbs.');
        }
      };
  
      fetchData();
    }
  }, [climbCreated]);

  // ...

  const deleteClimb = async (climbId: number) => {
    try {
      const response = await fetch('/api/climb/getworkoutclimbs', {  // Adjust the URL to your API route
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ climb_id: climbId }),
      });

      if (response.ok) {
        const updatedClimbs = climbs.filter(climb => climb.climb_id !== climbId);
        setClimbs(updatedClimbs);
        toast.success('Climb deleted!');
      } else {
        throw new Error('Failed to delete climb.');
      }
    } catch (error) {
      console.error('An error occurred while deleting the climb:', error);
      toast.error('An error occurred while deleting the climb, try again.');
    }
  };


  

      return (
        <div className='mt-4'>            
        {error ? (
          <p>{error}</p>
            ) : (
            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {climbs.map((climb, index) => (
            <li key={index} className="col-span-1 divide-y divide-gray-200 rounded-lg shadow bg-white">
              <h3 className="py-2 text-center text-md bg-blue-600 rounded-t-lg font-medium text-slate-50">{climb.climb_name}</h3>
              <div className="flex w-full justify-around p-6">
                <div>
                  <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-2 py-1 text-md font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    Grade: {climb.grade}
                  </span>
                </div>
                <div className='mt-1'>
                  <span className="text-md font-semibold text-gray-700">Attempts </span>
                  <button className='mr-3' onClick={() => decreaseAttempts(index)} disabled={climb.attempts === 1}>
                    <MinusIcon className="w-5" />
                  </button>
                  <span className='text-lg font-semibold'>{climb.attempts}</span>
                  <button className='ml-3' onClick={() => increaseAttempts(index)} disabled={climb.attempts === 50}>
                    <PlusIcon className="w-5" />
                  </button>
                </div>
                <button 
                  aria-label="Delete Climb" 
                  className="text-red-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
                  onClick={() => deleteClimb(climb.climb_id)}
                >
                  <TrashIcon className="w-5 h-5" />
                </button>

                
                {/* <img className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" src="path-to-image" alt="" /> */}
              </div>
              <div
                className={`truncate text-sm text-center py-2 border rounded-b-lg ${climb.completed ? 'bg-emerald-400 text-white hover:bg-emerald-300' : 'text-gray-500 bg-gray-100 hover:bg-white'}`}
                onClick={() => toggleCompleted(index)}
              >
                Sent: {climb.completed ? 'Yes' : 'No'}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

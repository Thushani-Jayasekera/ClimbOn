'use client'
import { useEffect, useState } from 'react';
import { CalendarDaysIcon, ChartBarIcon, TrophyIcon } from '@heroicons/react/20/solid';
import { toast } from 'react-hot-toast';

interface HardestClimb {
  grade: string;
}
interface Workout {
  workout_name: string | null;
  createdAt?: Date | null;
  intensity: number | null;
  completed: number | null;
  hardestBoulder?: string | null;  // Adding this property
  hardestRoute?: string | null;    // Adding this property
  hardestClimb?: HardestClimb | null;
}

export default function WorkoutCards() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [showWorkouts, setShowWorkouts] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/workout/workouthistory');
      
      if (response.ok) {
        const data = await response.json();
        setWorkouts(data.userWorkouts);
        setShowWorkouts(true);  // Display the workouts after fetching
      } else {
        // throw new Error('Something went wrong');
        toast.error('An error occurred while fetching workouts.');
      }
    } catch (error) {
      console.log(error);
      toast.error('An error occurred while fetching workouts.');
    }
  };

  return (
    <div className="lg:col-start-3 lg:row-end-3 space-y-3 px-8"> 
       {!showWorkouts && (
        <button
          onClick={fetchData}
          className="mt-4 mb-4 relative inline-flex items-center gap-x-1.5 rounded-md bg-orange-500 px-4 py-3 text-sm font-bold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          View Climbing Session History
        </button>
        )}
<div className='grid grid-cols-1 lg:grid-cols-3 gap-y-4 gap-x-4'>
      {showWorkouts && workouts.map((workout, index) => (
       <div key={index} className="bg-gray-50 shadow-sm ring-1 ring-gray-900/5 rounded-2xl p-4 bg-gradient-to-b from-blue-50 to-white">
       
           <div className="flex-auto pl-6 border-b border-gray-900/5">
               <dt className="text-md font-semibold leading-6 text-gray-900 mb-3">Workout Name: <span>{workout.workout_name}</span></dt> 
           </div>
           {workout.hardestClimb && ( // Here, we're checking the hardestClimb property of the workout
           <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
               <dt className="flex-none">
                   <span className="sr-only">Date:</span>
                   <CalendarDaysIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
               </dt>
           </div>
       )}
       <div className="mt-4 flex justify-center w-full flex-none gap-x-4 px-6">
           <dt className="flex-none">
               <span className="sr-only">Date:</span>
               <CalendarDaysIcon className="h-6 w-5 text-slate-0" aria-hidden="true" />
           </dt>
           <dd className="text-sm leading-6 text-gray-500">
               <p>Date: {workout.createdAt ? new Date(workout.createdAt).toLocaleDateString() : 'N/A'}</p>
           </dd>
       </div>
       <div className="mt-4 flex justify-center w-full flex-none gap-x-4 px-6">
           <dt className="flex-none">
               <span className="sr-only">Workout Intensity:</span>
               <ChartBarIcon className="h-6 w-5 text-emerald-500" aria-hidden="true" />
           </dt>
           <dd className="text-sm leading-6 text-gray-500">
               <p>Intensity: {workout.intensity}</p>
           </dd>
       </div>
       <div className='pb-4 mt-4 flex flex-col items-center'>
    <h1 className='text-lg border-b border-gray-300 font-bold text-blue-600'>Hardest Climbs</h1>

    <div className="mt-4 flex items-center gap-x-4">
        <TrophyIcon className="h-6 w-5 text-yellow-500" aria-hidden="true" />
        <div className="text-sm leading-6 text-gray-500">
            Boulder: {workout.hardestBoulder || 'N/A'}
        </div>
    </div>

    <div className="mt-4 flex items-center gap-x-4">
        <TrophyIcon className="h-6 w-5 text-yellow-500" aria-hidden="true" />
        <div className="text-sm leading-6 text-gray-500">
            Route: {workout.hardestRoute || 'N/A'}
        </div>
    </div>
</div>
{/* 
<div className="mt-4 border-t border-gray-900/5 pt-4 flex justify-center">
    <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
        View Climbs <span aria-hidden="true">&rarr;</span>
    </a>
</div> */}

</div>
   ))}
    </div>
    </div>
  );
}

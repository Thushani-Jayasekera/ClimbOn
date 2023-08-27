'use client';
import { createBlankWorkout } from '@/lib/createBlankWorkout';
import React, { FormEvent, useState, useEffect } from 'react';
import Link from 'next/link';
import ClimbCards from '@/components/ClimbCards';
import CreateClimb from '@/components/CreateClimb';
import CurrentClimbStats from './CurrentClimbStats';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import WorkoutSummaryModal from './WorkoutSummaryModal';
import { toast } from 'react-hot-toast';


export default function CreateWorkout() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [climbCreated, setClimbCreated] = useState(0);
  const [climbs, setClimbs] = useState<Climb[]>([]);

  const handleCreateClimb = () => {
    setClimbCreated(climbCreated + 1);
  };

  const startWorkout = async (e: FormEvent) => {
    e.preventDefault();
    createBlankWorkout(setWorkoutStarted);
  };

  const handleUpdateClimbs = (updatedClimbs: Climb[]) => {
    setClimbs(updatedClimbs);
    console.log('Updated Climbs:', updatedClimbs)
  };

  const finishWorkout = async (e: FormEvent) => {
    e.preventDefault();
    console.log(climbs)
    // try {
    //   const response = await fetch('/api/climb/createclimb', {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(climbs)
    //   });

    //   if (response.ok) {
    //     console.log('Climbs Updated Successfully', await response.json())
    //   } else {
    //     console.log('Error updating climbs:', await response.text())
    //   }
    // } catch (error) {
    //   console.log('error updating climbs', error)
    // } 
    setIsModalOpen(true);
  };

  const handlePageExit = async (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = ""; // Required for the prompt to work

    // Make an API call to delete the last workout
    await fetch('/api/workout/createworkout', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    toast('Workout deleted.');
  };

  useEffect(() => {
    if (workoutStarted) {
      // Add the event listener when the workout starts
      window.addEventListener("beforeunload", handlePageExit);
    }
    
    return () => {
      // Cleanup: Remove the event listener when the component unmounts or when the workout finishes
      window.removeEventListener("beforeunload", handlePageExit);
    }
  }, [workoutStarted]);

  return (
    <div className='relative'>
    {isModalOpen && (
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
    )}
    <WorkoutSummaryModal  climbs={climbs} open={isModalOpen} setOpen={setIsModalOpen} />
      <form onSubmit={startWorkout}>
        <div className='grid justify-center'>
          {!workoutStarted && (
            <button
              type="submit"
              className='rounded-md bg-orange-500 mt-4 px-3 py-2 text-sm font-semibold text-white 
                shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
              focus-visible:outline-indigo-600'
              >
              Start New Climbing Session
            </button>
          )}
        </div>
      </form>

    <div className=''>
      {/* Display CreateClimb component if workoutStarted is true */}
      {workoutStarted && <CreateClimb onCreateClimb={handleCreateClimb} />}
      <ClimbCards climbCreated={climbCreated} onUpdateClimbs={handleUpdateClimbs} />

      <div className='grid justify-center'>
        {workoutStarted && <CurrentClimbStats climbs={climbs}/>}
        {workoutStarted && (
          <Link href={'/finishworkout'}>
          <button onClick={finishWorkout}
            className='mt w-screen bg-emerald-400 px-3 py-2 text-md font-bold text-white flex items-center justify-center
            shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
            focus-visible:outline-blue-600'
          >
            Finish Workout
            <ArrowRightIcon className='h-6 ml-2'/> {/* Add a margin-left if you need space between the text and icon */}
          </button>
          </Link>
        )}
      </div>
      </div>
      
    </div>
  );
}

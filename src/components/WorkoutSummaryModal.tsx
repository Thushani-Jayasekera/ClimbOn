'use client';
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { BoltIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';



type WorkoutSummaryModalProps = {
  climbs: Climb[];
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
  
export default function WorkoutSummaryModal({ climbs, open, setOpen }: WorkoutSummaryModalProps & { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {


  const [workoutName, setWorkoutName] = useState('');
  const [workoutIntensity, setWorkoutIntensity] = useState(5);  // Defaulting to mid value

  const [notes, setNotes] = useState('');

  const router = useRouter();


  const publishClimbs = async () => {
    try {
        // Update climbs
        const responseClimbs = await fetch('/api/climb/createclimb', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(climbs)
        });
  
        if (!responseClimbs.ok) {
            toast.error('Error updating climbs');
            return;
        } 

        toast.success('Climbs Updated Successfully')

        console.log("Notes received:", notes);
        // Update workout
        const responseWorkout = await fetch('/api/workout/createworkout', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                workoutName: workoutName,
                workoutIntensity: workoutIntensity,
                notes: notes
            })
        });

        if (!responseWorkout.ok) {
            toast.error('Error updating workout')
            return;
        }
        
        toast.success('Workout Updated Successfully')

    } catch (error) {
        console.log('Error:', error)
    }
    setOpen(false);  
    router.push('/workouthistory');
    
};

  
    return (
      <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 flex items-center justify-center z-10" onClose={setOpen}>
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:max-w-sm sm:p-6">
            <div>
              <div className='px-5'>
                <label className="text-center block text-sm font-medium leading-6 text-gray-900">
                  Add Workout Name
                </label>
                <div className="mt-2 px-4">
                  <input
                    type="text"
                    className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                    value={workoutName} onChange={(e) => setWorkoutName(e.target.value)} 
                    placeholder='Enter Workout Name'
                  />
                </div>
              </div>
              <div className='px-5 mt-4'>
                <label className="text-center block text-sm font-medium leading-6 text-gray-900">
                  Workout Intensity
                </label>
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  value={workoutIntensity} 
                  onChange={(e) => setWorkoutIntensity(Number(e.target.value))} 
                  className="mt-2 w-full"
                />
                <div className="text-center">
                  {workoutIntensity}
                </div>
            </div>
              
              <div className="mt-4 text-center sm:mt-5 p-2">
                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                  Session Summary
                </Dialog.Title>
                <div className="mt-4 scrollable-modal-section">
                  {climbs.map((climb, index) => (
                    <div key={index} className="text-sm text-gray-500">
                    <strong>Name:</strong> {climb.climb_name} <br />
                    <strong>Type:</strong> {climb.type} <br />
                    <strong>Grade:</strong> {climb.grade} <br />
                    <strong>Attempts:</strong> {climb.attempts} {climb.attempts === 1 && <BoltIcon className="h-5 inline-block ml-2 text-yellow-500"/>}<br />
                    <strong>Sent? </strong> {climb.completed ? 'Yes' : 'No'} <br />
                    <hr className="my-2" />
                  </div>
                  ))}
                </div>
                <div className='mt-4 px-4'>
                <label className="text-center block text-sm font-medium leading-6 text-gray-900">
                  Notes
                </label>
                <div className="mt-2">
                  <textarea
                    rows={2}
                    className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                    value={notes} onChange={(e) => setNotes(e.target.value)} 
                    placeholder='Climbing session notes...'
                  />
                </div>
              </div>
                
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <div className="mt-5 sm:mt-6 flex justify-between gap-4"> 
                <button
                    type="button"
                    className="p-2 w-1/2 flex justify-center items-center rounded-md bg-white px-3 text-sm font-semibold text-black border border-gray-100 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() => setOpen(false)}
                    >
                    Back
                </button>
                <button
                  type="button"
                  className="w-1/2 flex justify-center items-center rounded-md bg-blue-500 px-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                  onClick={publishClimbs}
                  
                  >
                  Publish
                </button>
              </div>
            </div>
          </Dialog.Panel>
          {/* ... other code ... */}
        </Dialog>
      </Transition.Root>
    )
  }
  
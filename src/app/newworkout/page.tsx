import CreateWorkout from '@/components/CreateWorkout';

export default function WorkoutForm() {
  return (
    <div className='px-10 mt-2 '>
      <h1 className='grid justify-center font-bold text-xl text-slate-800 mb-2 text-center '>Climbing Session</h1>
      <CreateWorkout />
      {/* ... other components and markup ... */}
    </div>
  );
}

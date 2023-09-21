export async function getUserWorkoutHistory(): Promise<Workout[]> {
  const res = await fetch(`/api/workout/workouthistory`)
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
    
  }
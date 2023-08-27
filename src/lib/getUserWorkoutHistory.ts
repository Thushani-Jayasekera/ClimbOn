export async function getUserWorkoutHistory(): Promise<Workout[]> {
  const res = await fetch(`${process.env.BASE_URL}/api/workout/workouthistory`)
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
    
  }
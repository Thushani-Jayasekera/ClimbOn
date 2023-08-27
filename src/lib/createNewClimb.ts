import { toast } from "react-hot-toast";

export async function createNewClimb(climbName: string, grade: string, climbType: string, completed: number) {
    const response = await fetch('/api/climb/createclimb', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        climb_name: climbName,
        grade,
        type: climbType,
        completed,
      }),
    });
  
    if (response.status !== 200) {
      toast.error('Error creating climb');
      throw new Error('Error creating climb');
    }
}
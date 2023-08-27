export async function createBlankWorkout(setWorkoutStarted: (started: boolean) => void) {
    try {
        const response = await fetch('/api/workout/createworkout', {
          method: 'POST', // Specify the HTTP method
          headers: {
            'Content-Type': 'application/json', // Set the content type
          },
          body: JSON.stringify({ // Convert the request body to a JSON string
            
          }),
        });
        
        if (response.status === 200) {
          // alert('Workout added successfully!');
          setWorkoutStarted(true);
          // You might also navigate to another page or clear the form
        }
      } catch (error) {
        alert('An error occurred while adding the workout.');
        console.error(error);
      }
  }
  
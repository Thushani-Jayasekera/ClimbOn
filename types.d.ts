type User = {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    accounts: Account[];
    sessions: Session[];
    workouts: Workout[];
  };
  
  type Workout = {
    workout_id: number;
    user_id: string | null;
    user: User | null;
    workout_name: string | null;
    createdAt: Date | null;
    intensity: number | null;
    completed: number | null;
    notes: string | null;
    climbs: Climb[];
  };
  
  type Climb = {
    climb_id: number;
    workout_id: number;
    workout: Workout;
    climb_name: string;
    grade: string;
    completed: number;
    attempts: number;
    type: 'BOULDER' | 'ROUTE'
  };
  
  type Session = {
    id: string;
    sessionToken: string;
    userId: string;
    expires: Date;
    user: User;
  };
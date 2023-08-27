import ProfileStats from "@/components/ProfileStats";
import WorkoutCards from "@/components/WorkoutCards";


export default function WorkoutHistory() {
  return (
    <div className='min-h-screen pt-10 text-center'>
      <div className="text-center">
        <ProfileStats />
        <WorkoutCards />
      </div>
      
    </div>
  )
}

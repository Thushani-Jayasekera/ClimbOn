
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';
import WorkoutCards from '@/components/WorkoutCards';
import ProfileStats from '@/components/ProfileStats';


export default async function Profile() {
  const session = await getServerSession(options);
  const userWithId = session?.user as { name?: string, email?: string, image?: string } || {};

  const { name,  image } = userWithId;

  return (
    
    <div className='bg-white min-h-screen pt-10 text-center'>
    
      <div className="px-4 sm:px-0 ">
        <h3 className="text-lg font-semibold leading-7 text-gray-900">My Profile</h3>
      </div>
      <div className=" mt-6 border-t border-b border-gray-100 ">
        <dl className="divide-y divide-gray-100">
          <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-sm font-medium leading-6 text-gray-900">Profile Picture</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex justify-center">
              {image && <img src={image} className='rounded-3xl w-[50px]' alt="Profile Picture" />}
            </dd>
          </div>
          <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-sm font-medium leading-6 text-gray-900">Name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{name}</dd>
          </div>
          
          {/* Additional sections can be added here */}
       
        </dl>
      </div>
      <div className='mt-6'>
        <ProfileStats />
      </div>
    </div>
  )
}

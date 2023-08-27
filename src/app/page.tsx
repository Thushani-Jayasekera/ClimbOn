import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import Appscreenshot from 'src/assets/Appscreenshot.png'
import mobilescreenshot from 'src/assets/mobilescreenshot.png'

const features = [
  {
    name: 'Track Your Climbing Sessions.',
    description:
      'Managing your climbing sessions has never been easier. With our app you can track your progress and see how you are improving over time.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Track Individual Climbs.',
    description: 'Input your climbs for indoor and outdoor sessions, including the difficulty, attempts, and completion.',
    icon: LockClosedIcon,
  },
  {
    name: 'See your personal records',
    description: 'See your efforts pay off as you improve your climbing skills.',
    icon: ServerIcon,
  },
]

export default function Home() {
  return (
    <div className="overflow-hidden bg-white min-h-screen py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-blue-600">Track Your Progress</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Log your Climbing Sessions.</p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Keeping track of your climbing sessions in a structured manner has always been a challenge. With mobile first design, you can now log your climbing sessions on the go, with no downloads required!
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon className="absolute left-1 top-1 h-5 w-5 text-blue-600" aria-hidden="true" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div>
        <Image 
            src={mobilescreenshot} 
            alt="Mobile screenshot" 
            className="lg:hidden rounded-2xl" 
            layout="responsive"
            // You may want to adjust width and height for the mobilescreenshot as well
        />
        <Image 
            src={Appscreenshot} 
            alt="Product screenshot" 
            className="hidden lg:block w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0" 
            layout="responsive"
            width={2432}
            height={1442}
        />
    </div>
          {/* <Image
            src={Appscreenshot}
            alt="Product screenshot"
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
          /> */}
        </div>
      </div>
    </div>
  )
}

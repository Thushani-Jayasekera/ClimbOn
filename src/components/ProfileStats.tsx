'use client';
import React, { useState, useEffect } from 'react';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid';
import { toast } from 'react-hot-toast';

const statsTemplate = [
  // ... other static stats can be added here if needed
  { name: 'Climbs Completed', stat: ''},
  { name: 'Logged Sessions', stat: ''},
  { name: 'Highest Boulder Grade', stat: '' },
  { name: 'Highest Route Grade', stat: ''}
  
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function ProfileStats() {
  const [totalClimbs, setTotalClimbs] = useState('Loading...');
  const [totalWorkouts, setTotalWorkouts] = useState('Loading...');
  const [stats, setStats] = useState(statsTemplate);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/climb/climbstats'); 
        if (response.ok) {
          const data = await response.json();
          
          // Update stats array with fetched data
          const updatedStats = statsTemplate.map(item => {
            if (item.name === 'Climbs Completed') {
              return { ...item, stat: data.totalCompletedClimbs };
            }
            if (item.name === 'Logged Sessions') {
              return { ...item, stat: data.totalWorkouts };
            }
            if (item.name === 'Highest Boulder Grade') {  // Added this block
              return { ...item, stat: data.highestBoulderGrade };
            }
            if (item.name === 'Highest Route Grade') {  // Added this block
                return { ...item, stat: data.highestRouteGrade };
              }
            return item;
          });
          
          setStats(updatedStats);
        } else {
          setError('An error occurred while fetching stats.');
          toast.error('An error occurred while fetching stats.');
        }
      } catch (err) {
        setError('An error occurred while fetching stats.');
        toast.error('An error occurred while fetching stats.');
      }
    };
  
    fetchData();
  }, []);

  return (
    <div className='px-9 mb-4'>
      <h3 className="text-base font-semibold leading-6 text-gray-900"></h3>
      <dl className="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-xl bg-slate-50 shadow-md md:grid-cols-4 md:divide-x md:divide-y-0">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
            stats.map((item) => (
                <div key={item.name} className="px-4 py-5 sm:p-6 text-center"> {/* Added text-center */}
                    <dt className="text-base font-normal text-gray-900">{item.name}</dt>
                    <dd className="mt-1">
                        <div className="text-2xl font-semibold text-blue-600">
                            {item.stat}
                        </div>
                    </dd>
                </div>
            ))
        )}
      </dl>
    </div>
  );
}

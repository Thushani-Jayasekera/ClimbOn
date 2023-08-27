interface CurrentClimbStatsProps {
  climbs: Climb[];
}

export default function CurrentClimbStats({ climbs }: CurrentClimbStatsProps) {
  console.log(climbs)
  const totalClimbs = climbs.length;

  const boulders = climbs
  .filter(climb => climb.type === 'BOULDER')
  .sort((a, b) => parseInt(a.grade.slice(1)) - parseInt(b.grade.slice(1)));

  const hardestBoulderGrade = boulders.length > 0 ? boulders[boulders.length -1].grade : null;
  
  
  const routes = climbs
  .filter(climb => climb.type === 'ROUTE')
  .sort((a, b) => {
    const [baseA, suffixA = ''] = a.grade.slice(2).split('.');
    const [baseB, suffixB = ''] = b.grade.slice(2).split('.');

    // Compare the numeric base first.
    const baseDifference = parseInt(baseA) - parseInt(baseB);

    // If they have the same numeric base, compare the suffix.
    if (baseDifference === 0) {
      return suffixA.localeCompare(suffixB);
    } else {
      return baseDifference;
    }
  });

  const hardestRouteGrade = routes.length > 0 ? routes[routes.length -1].grade : null;


  const stats = [
    { name: 'Climbs', value: totalClimbs.toString() },
    { name: 'Top Boulder', value: hardestBoulderGrade?.toString() },
    { name: 'Top Route', value: hardestRouteGrade?.toString() },
  ];

  return (
    <div className="shadow bg-gradient-to-tr from-gray-50 to-gray-100 mt-4 grid grid-cols-3 gap-px border border-gray-300">
      {stats.map((stat, index) => (
        <div
          key={stat.name}
          className={`flex flex-col justify-between p-4 border-r ${index === stats.length - 1 ? '' : 'border-gray-300'}`}
        >
          <div className="text-md font-medium text-center">{stat.name}</div>
          <div className="text-sm text-center">{stat.value}</div>
        </div>
      ))}
    </div>
  );
}
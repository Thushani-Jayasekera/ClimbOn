import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../../auth/[...nextauth]/options";
import prisma from "../../../../../prisma/client";

export async function GET(request: NextRequest) {
  const session = await getServerSession(options);

  // Check for a valid session
  if (!session?.user?.email) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  // Check for a valid user
  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!currentUser) {
    return new NextResponse('Unauthorized', { status: 404 });
  }

  try {
    // Fetch the workouts for the user
    const userWorkouts = await prisma.workout.findMany({
      where: { 
        user_id: currentUser.id 
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 5,
      include: {
        climbs: true
      }
    });

    // For each workout, determine hardest boulder and route
    const enrichedWorkouts = userWorkouts.map(workout => {
      const boulders = workout.climbs.filter(climb => climb.type === "BOULDER" && climb.completed === 1);
      const routes = workout.climbs.filter(climb => climb.type === "ROUTE" && climb.completed === 1);


      // Assume you have a function `getHardestGrade` that gets the hardest grade from an array of climbs.
      const hardestBoulder = getHardestGrade(boulders);
      const hardestRoute = getHardestGrade(routes);

      return {
        ...workout,
        hardestBoulder,
        hardestRoute
      };
    });

    // Return the enriched workouts
    return NextResponse.json({ userWorkouts: enrichedWorkouts });
  } catch (error) {
    console.error("Error fetching user workouts:", error);
    return new NextResponse('Error fetching user workouts', { status: 500 });
  }
}

function getHardestGrade(climbs: any) {
  if (climbs.length === 0) return null;

  // Sort the climbs based on grade and take the last one as the hardest.
  // Assuming grades can be sorted as strings. Adjust this if your grade sorting is different.
  return climbs.sort((a: any, b: any) => a.grade.localeCompare(b.grade)).slice(-1)[0].grade;
}

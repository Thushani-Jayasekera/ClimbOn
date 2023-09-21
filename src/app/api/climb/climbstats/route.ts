
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import { options } from "../../auth/[...nextauth]/options";
import prisma from "../../../../../prisma/client";
import { getSession } from "next-auth/react";


export async function GET(request: NextRequest) {
    const session = await getServerSession(options);

    /*
    if (!session?.user?.email) {
        return new NextResponse('Unauthorized', { status: 401 });
    }
    console.log("thushi1214@gmail.com");
    */
    // Check for the current user
    const currentUser = await prisma.user.findUnique({
        where: { email: "thushi1214@gmail.com" },
    });

    if (!currentUser) {
        return new NextResponse('Unauthorized', { status: 404 });
    }

    try {
        // Get the total count of workouts for that user
        const totalWorkouts = await prisma.workout.count({
            where: {
                user_id: currentUser.id
            }
        });

        // Get the total count of climbs associated with those workouts
        const totalCompletedClimbs = await prisma.climb.count({
            where: {
                workout: {
                    user_id: currentUser.id,
                },
                completed: 1
            }
        });

        const highestBoulderClimb = await prisma.climb.findFirst({
            where: {
                workout: {
                    user_id: currentUser.id,
                },
                type: 'BOULDER',
                completed: 1
            },
            orderBy: {
                grade: 'desc',
            },
        });

        const highestRouteClimb = await prisma.climb.findFirst({
            where: {
                workout: {
                    user_id: currentUser.id,
                },
                type: 'ROUTE',
                completed: 1
            },
            orderBy: {
                grade: 'desc', 
            },
        });

        console.log(currentUser,totalWorkouts, totalCompletedClimbs,highestRouteClimb  );

        const highestBoulderGrade = highestBoulderClimb ? highestBoulderClimb.grade : 'N/A';
        const highestRouteGrade = highestRouteClimb ? highestRouteClimb.grade : 'N/A';

        return new NextResponse(JSON.stringify({
            highestRouteGrade,
            highestBoulderGrade,
            totalWorkouts,
            totalCompletedClimbs
        }));
    } catch (error) {
        return new NextResponse('Error getting workout and climb counts', { status: 500 });
    }
}

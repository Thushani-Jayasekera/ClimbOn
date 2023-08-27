
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import { options } from "../../auth/[...nextauth]/options";
import prisma from "../../../../../prisma/client";

export async function GET(request: NextRequest) {
    const session = await getServerSession(options);

    if (!session?.user?.email) {
        return new NextResponse('Unauthorized', { status: 401 });
    }
    // console.log(session.user, 'getworkout climbs')


    //check for the current user
    const currentUser = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    if (!currentUser) {
        return new NextResponse('Unauthorized', { status: 404 });
    }

    //check for the current workout
    const recentWorkout = await prisma.workout.findFirst({
        where: {
            user_id: currentUser.id
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    if (!recentWorkout) {
        return new NextResponse('Unauthorized', { status: 404 });
    }

    try {
        const climbs = await prisma.climb.findMany({
            where: {
                workout_id: recentWorkout.workout_id
            }
        });
        return new NextResponse(JSON.stringify(climbs));
    } catch (error) {
        return new NextResponse('Error getting climbs', { status: 500 });
    }
}

// In the same file as your GET and POST methods...

export async function DELETE(request: NextRequest) {
    const session = await getServerSession(options);

    if (!session?.user?.email) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const { climb_id } = body;  // Assume you send the climb_id you want to delete in the request body

    if (!climb_id) {
        return new NextResponse('Missing climb ID', { status: 400 });
    }

    try {
        const deletedClimb = await prisma.climb.delete({
            where: { climb_id },
        });

        return NextResponse.json({ deletedClimb });
    } catch (error) {
        console.error(error);
        return new NextResponse('Error deleting climb', { status: 500 });
    }
}


// export async function PUT(request: NextRequest) {
//     const session = await getServerSession(options);

//     if (!session?.user?.email) {
//         return new NextResponse('Unauthorized', { status: 401 });
//     }
//     console.log(session.user, 'update climbs')

//     // check for the current user
//     const currentUser = await prisma.user.findUnique({
//         where: { email: session.user.email },
//     });

//     if (!currentUser) {
//         return new NextResponse('Unauthorized', { status: 404 });
//     }

//     // check for the current workout
//     const recentWorkout = await prisma.workout.findFirst({
//         where: {
//             user_id: currentUser.id
//         },
//         orderBy: {
//             createdAt: 'desc'
//         }
//     });

//     if (!recentWorkout) {
//         return new NextResponse('Unauthorized', { status: 404 });
//     }

//     // Get the climb data from the request body
//     const updatedClimbs = await request.json();

//     // If you're destructuring attempts and completed for some other operations, you can do so:
//     // But in the below loop, you're using the entire climb object for the update operation.
//     // const { attempts, completed } = updatedClimbs

//     try {
//         // Update each climb in the updatedClimbs array.
//         for (let climb of updatedClimbs) {
//             // Assuming each climb object in updatedClimbs array has a unique identifier (e.g. id).
//             // Also assuming that the name of the identifier in your Prisma model is 'id'. 
//             // Adjust if the actual field name is different.
//             await prisma.climb.update({
//                 where: { climb_id: climb.id },
//                 data: climb
//             });
//         }

//         return new NextResponse('Climbs updated successfully', { status: 200 });
//     } catch (error) {
//         console.error("Error while updating climbs:", error);  // Log the error for debugging
//         return new NextResponse('Error updating climbs', { status: 500 });
//     }
// }


// export async function PUT(request: NextRequest) {
//     const session = await getServerSession(options);

//     if (!session?.user?.email) {
//         return new NextResponse('Unauthorized', { status: 401 });
//     }
//     console.log(session.user, 'user session climb api')

//     const body = await request.json();
//     const { attempts, completed } = body; 

//     // Check for the necessary fields
//     if (!attempts || completed === undefined) {
//         return new NextResponse('Missing Fields', { status: 400 });
//     }

//     // Check for the current user
//     const currentUser = await prisma.user.findUnique({
//         where: { email: session.user.email },
//     });

//     if (!currentUser) {
//         return new NextResponse('Unauthorized', { status: 404 });
//     }

//     // Check for the current workout
//     const recentWorkout = await prisma.workout.findFirst({
//         where: {
//             user_id: currentUser.id
//         },
//         orderBy: {
//             createdAt: 'desc'
//         }
//     });
//     console.log(recentWorkout, 'recent workout')

//     if (!recentWorkout) {
//         return new NextResponse('Unauthorized', { status: 404 });
//     }

//     try {
//         const updatedClimb = await prisma.climb.update({
//             where: { climb_id: climb_id }, // Assuming climb's primary key is `id`
//             data: {
//                 attempts,
//                 completed
//             },
//         });

//         return NextResponse.json({ updatedClimb });
//     } catch (error) {
//         console.error(error);
//         return new NextResponse('Error updating climb', { status: 500 });
//     }
// }

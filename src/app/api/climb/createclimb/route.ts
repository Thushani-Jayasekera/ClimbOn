
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/options";
import prisma from "../../../../../prisma/client";

export async function POST(request: NextRequest) {
    const session = await getServerSession(options);

    /*
    if (!session?.user?.email) {
        return new NextResponse('No session found', { status: 401 });
    }
    */
    // console.log(session)
    

    const body = await request.json();
    const { climb_name, type, grade, completed } = body; // Include completed in destructuring
    
    if (!climb_name || !type ||  !grade || completed === undefined) {
        return new NextResponse('Missing Fields', { status: 400 });
    }



            //check for the current user
    const currentUser = await prisma.user.findUnique({
        where: { email: "thushi1214@gmail.com" },
        });

        if (!currentUser) {
            return new NextResponse('Unable to find current user.', { status: 404 });
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
        return new NextResponse('Unable to find recent workout', { status: 404 });
    }

    try {
        const climb = await prisma.climb.create({
            data: {
                workout_id: recentWorkout.workout_id,
                climb_name,
                grade,
                completed,
                type,
            },
        });

        return NextResponse.json({ climb });
    } catch (error) {
        console.error(error);
        return new NextResponse('Error creating climb', { status: 500 });
    }

}

// export async function PUT(request: Request) {
//     const session = await getServerSession(options);

//     if (!session?.user?.email) {
//         return new NextResponse('No session found', { status: 401 });
//     }
//     console.log(session)

//     const body = await request.json();
//     // const { climb_name, type, grade, completed } = body; // Include completed in destructuring
    
//     // if (!climb_name || !type ||  !grade || completed === undefined) {
//     //     return new NextResponse('Missing Fields', { status: 400 });
//     // }
    
//     if (!Array.isArray(body)) {
//         return new NextResponse('Expected an array of climbs', { status: 400});
//     }

    

//             //check for the current user
//     const currentUser = await prisma.user.findUnique({
//         where: { email: "thushi1214@gmail.com" },
//         });

//         if (!currentUser) {
//             return new NextResponse('Unable to find current user.', { status: 404 });
//         }

// //check for the current workout
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
//         return new NextResponse('Unable to find recent workout', { status: 404 });
//     }

//     for (const climb of body) {
//         const { attempts, completed } = climb;

//         if (attempts === undefined || completed === undefined) {
//             return new NextResponse('Missing Fields in one of the climbs', { status: 400 });
//         }
//         console.log(`Processing climb_id: ${climb.climb_id}, attempts: ${climb.attempts}, completed: ${climb.completed}`);
 

//         try {
//             const updateWorkoutClimbs = await prisma.climb.updateMany({
//                 where: {
//                     workout_id: recentWorkout.workout_id,
//                     climb_id: climb.id  // assuming each climb in the array has its unique id
//                 },
//                 data: {
//                     completed: climb.completed,
//                     attempts: climb.attempts
//                 },
//             });
//             console.log(`Updated ${updateWorkoutClimbs.count} climbs.`);
//         } catch (error) {
//             console.error(error);
//             return new NextResponse('Error updating a climb', { status: 500 });
//         }
//     }

//     // You might want to send a successful response after updating all climbs.
//     return NextResponse.json({ message: 'Climbs updated successfully!' });

//     }

   
export async function PUT(request: Request) {
    const session = await getServerSession(options);

    /*
    if (!session?.user?.email) {
        return new NextResponse('No session found', { status: 401 });
    }
    console.log(session)
    */

    const body = await request.json();

    if (!Array.isArray(body)) {
        return new NextResponse('Expected an array of climbs', { status: 400 });
    }

    // Check for the current user
    const currentUser = await prisma.user.findUnique({
        where: { email: "thushi1214@gmail.com" },
    });

    if (!currentUser) {
        return new NextResponse('Unable to find current user.', { status: 404 });
    }

    // Check for the current workout
    const recentWorkout = await prisma.workout.findFirst({
        where: {
            user_id: currentUser.id
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    if (!recentWorkout) {
        return new NextResponse('Unable to find recent workout', { status: 404 });
    }

    for (const climb of body) {
        const { attempts, completed, climb_id } = climb;

        if (attempts === undefined || completed === undefined || !climb_id) {
            return new NextResponse('Missing Fields in one of the climbs', { status: 400 });
        }

        console.log(`Processing climb_id: ${climb_id}, attempts: ${attempts}, completed: ${completed}`);
        
        try {
            await prisma.climb.update({
                where: {
                    workout_id: recentWorkout.workout_id,
                    climb_id: climb_id
                },
                data: {
                    completed: completed,
                    attempts: attempts
                },
            });

            console.log(`Updated climb_id: ${climb_id}.`);

        } catch (error) {
            console.error(error);
            return new NextResponse(`Error updating climb with id ${climb_id}`, { status: 500 });
        }
    }

    // Send a successful response after updating all climbs.
    return NextResponse.json({ message: 'Climbs updated successfully!' });
}

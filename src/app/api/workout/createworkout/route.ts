
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../../auth/[...nextauth]/options";

import prisma from "../../../../../prisma/client";

export async function POST(request: NextRequest) {
  const session = await getServerSession(options);

  // Check if the user is authenticated
  if (!session?.user?.email) {
    return new NextResponse('Unauthorized', { status: 401 });
  }
  

  // const body = await request.json();
  // const { workout_name, intensity, completed } = body;

  // if (!workout_name || !intensity || !completed) {
  //   return new NextResponse('Missing Fields', { status: 400 });
  // }

  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!currentUser) {
    return new NextResponse('Unauthorized', { status: 404 });
  }



  try {
    // Create a workout record in the database
    const workout = await prisma.workout.create({
      data: {
        user_id: currentUser.id,
      },
    });

    // Return a successful response
    console.log("workout created")
    return NextResponse.json({ workout });
  } catch (error) {
    console.error(error);
    return new NextResponse('Error creating workout', { status: 500 });
  }
}


export async function PUT(request: NextRequest) {
  const session = await getServerSession(options);

  // Check if the user is authenticated (optional, depending on your requirements)
  if (!session?.user?.email) {
    return new NextResponse('Unauthorized', { status: 401 });
  }
  // console.log(session.user, 'Name/Notes Updated');

  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!currentUser) {
    return new NextResponse('Unauthorized', { status: 404 });
  }

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

const { workoutName, workoutIntensity, notes } = await request.json(); 

const updateWorkout = await prisma.workout.update({
  where: {
    workout_id: recentWorkout.workout_id,
  },
  data: {
    workout_name: workoutName, // Use the workoutName from the request
    notes: notes,
    intensity: workoutIntensity,
  },
});


    return NextResponse.json({ updateWorkout });

}


export async function DELETE(request: NextRequest) {
  const session = await getServerSession(options);

  // Check if the user is authenticated
  if (!session?.user?.email) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!currentUser) {
    return new NextResponse('Unauthorized', { status: 404 });
  }

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

  // Delete the workout
  await prisma.workout.delete({
    where: {
      workout_id: recentWorkout.workout_id,
    }
  });

  return NextResponse.json({ message: "Workout deleted successfully" });
}

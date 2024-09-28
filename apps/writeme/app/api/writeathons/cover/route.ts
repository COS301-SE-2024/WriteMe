import { auth } from "apps/writeme/auth";
import { db } from "apps/writeme/db/db";
import { stories, writeathons } from "apps/writeme/db/schema";
import { updateStoryCoverSchema } from "apps/writeme/db/story-schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function PUT(req: Request) {
	try {
		const session = await auth();

		if (!session?.user) {
			return new NextResponse(
				JSON.stringify({
					status: "fail",
					message: "You are not logged in",
				}),
				{ status: 401 },
			);
		}

		// console.log(await req.json());

		const input = updateStoryCoverSchema.parse(await req.json());

		// todo: check user owns story

		// : ensure user owns story

		const writeathon = await db
			.update(writeathons)
			.set({
				cover: input.cover,
			})
			.where(eq(writeathons.id, input.id))
			.returning({
				updatedId: writeathons.id,
			});

		return NextResponse.json({
			story: {
				id: writeathon,
			},
		});
	} catch (error: any) {
		console.log(error);
		if (error instanceof ZodError) {
			return NextResponse.json(
				{
					status: "error",
					message: "Validation failed",
					errors: error.errors,
				},
				{ status: 400 },
			);
		}

		return NextResponse.json(
			{
				status: "error",
				message: error.message || "Internal Server Error",
			},
			{ status: 500 },
		);
	}
}

import { NextResponse, NextRequest } from 'next/server';
import { writeathonCheckSchema } from '../../../../db/story-schema';
import { ZodError } from 'zod';
import { db } from '../../../../db/db';
import {and, eq, lte, sql} from "drizzle-orm"
import { writeathons, stories, storyWriteathonVotes, userAwards } from '../../../../db/schema';

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { util_token } = writeathonCheckSchema.parse(await req.json());
    let all_awards = [
      {
        category: "Fan Favourite",
        description: "Awarded to a story with the most likes in a writeathon"
      },
      {
        category: "Poll Pro",
        description: "Awarded when you vote in a writeathon"
      },
      {
        category: "Pacing Pro",
        description: "Community Award for stories that have the best timing."
      },
      {
        category: "Sci-fi Specialist",
        description: "Community Award for stories that scream Stars Wars and Dune"
      }
      ,{
        category: "Emotion Evoker",
        description: "Community Award for stories that could make a grown man cry"
      },{
        category: "Imagery Expert",
        description: "Community Award for stories that speak to your third eye"
      },{
        category: "Creative Spark",
        description: "Community Award for stories show the most creativity"
      },{
        category: "First Draft",
        description: "Awarded when you enter your first writeathon"
      },{
        category: "Writathon Regular",
        description: "Award for competing in 2 writeathons"
      },{
        category: "Writathon Enthusiast",
        description: "Award for competing in 5 writeathons"
      },{
        category: "Writathon Veteran",
        description: "Award for competing in 10 writeathons"
      }
    ];

    if (util_token === process.env.UTIL_TOKEN) {
      //todo find completed writeathons
      const currDate = new Date();

      const completed_writeathons = await db.select().from(writeathons).where(and(lte(writeathons.endDate, currDate), eq(writeathons.complete, false)));

      completed_writeathons.forEach(async w => {
        let categoryId = "pacing-pro";
        const pacing_pro = await db.select({
          storyId: storyWriteathonVotes.storyId,
          voteCount: sql<number>`COUNT(${storyWriteathonVotes.storyId})`,
          writeathonId: storyWriteathonVotes.writeathonId,
          userId: stories.userId,  // Include the userId from the stories table
        })
          .from(storyWriteathonVotes)
          .innerJoin(stories, eq(storyWriteathonVotes.storyId, stories.id))  // Join the stories table to access userId
          .where(sql`${storyWriteathonVotes.writeathonId} = ${w.id} AND ${storyWriteathonVotes.categoryId} = ${categoryId}`)
          .groupBy(storyWriteathonVotes.storyId, storyWriteathonVotes.userId, storyWriteathonVotes.writeathonId, stories.userId)
          .orderBy(sql`COUNT(${storyWriteathonVotes.storyId}) DESC`)
          .limit(1);



        categoryId = "creative-spark";
        const creative_spark = await db.select({
          storyId: storyWriteathonVotes.storyId,
          voteCount: sql<number>`COUNT(${storyWriteathonVotes.storyId})`,
          userId: stories.userId,  // Include the userId from the stories table
          writeathonId: storyWriteathonVotes.writeathonId
        })
          .from(storyWriteathonVotes)
          .innerJoin(stories, eq(storyWriteathonVotes.storyId, stories.id))  // Join the stories table to access userId

          .where(sql`${storyWriteathonVotes.writeathonId} = ${w.id} AND ${storyWriteathonVotes.categoryId} = ${categoryId}`)
          .groupBy(storyWriteathonVotes.storyId, storyWriteathonVotes.userId, storyWriteathonVotes.writeathonId, stories.userId)
          .orderBy(sql`COUNT(${storyWriteathonVotes.storyId}) DESC`)
          .limit(1);

        categoryId = "emotion-evoker";
        const emotion_evoker = await db.select({
          storyId: storyWriteathonVotes.storyId,
          voteCount: sql<number>`COUNT(${storyWriteathonVotes.storyId})`,
          userId: stories.userId,  // Include the userId from the stories table
          writeathonId: storyWriteathonVotes.writeathonId
        })
          .from(storyWriteathonVotes)
          .innerJoin(stories, eq(storyWriteathonVotes.storyId, stories.id))  // Join the stories table to access userId

          .where(sql`${storyWriteathonVotes.writeathonId} = ${w.id} AND ${storyWriteathonVotes.categoryId} = ${categoryId}`)
          .groupBy(storyWriteathonVotes.storyId, storyWriteathonVotes.userId, storyWriteathonVotes.writeathonId, stories.userId)
          .orderBy(sql`COUNT(${storyWriteathonVotes.storyId}) DESC`)
          .limit(1);
        categoryId = "imagery-expert";
        const imagery_expert = await db.select({
          storyId: storyWriteathonVotes.storyId,
          voteCount: sql<number>`COUNT(${storyWriteathonVotes.storyId})`,
          userId: stories.userId,  // Include the userId from the stories table
          writeathonId: storyWriteathonVotes.writeathonId
        })
          .from(storyWriteathonVotes)
          .innerJoin(stories, eq(storyWriteathonVotes.storyId, stories.id))  // Join the stories table to access userId

          .where(sql`${storyWriteathonVotes.writeathonId} = ${w.id} AND ${storyWriteathonVotes.categoryId} = ${categoryId}`)
          .groupBy(storyWriteathonVotes.storyId, storyWriteathonVotes.userId, storyWriteathonVotes.writeathonId, stories.userId)
          .orderBy(sql`COUNT(${storyWriteathonVotes.storyId}) DESC`)
          .limit(1);

        categoryId = "sci-fi-specialist";
        const sci_fi_specialist = await db.select({
          storyId: storyWriteathonVotes.storyId,
          voteCount: sql<number>`COUNT(${storyWriteathonVotes.storyId})`,
          userId: stories.userId,  // Include the userId from the stories table
          writeathonId: storyWriteathonVotes.writeathonId
        })
          .from(storyWriteathonVotes)
          .innerJoin(stories, eq(storyWriteathonVotes.storyId, stories.id))  // Join the stories table to access userId

          .where(sql`${storyWriteathonVotes.writeathonId} = ${w.id} AND ${storyWriteathonVotes.categoryId} = ${categoryId}`)
          .groupBy(storyWriteathonVotes.storyId, storyWriteathonVotes.userId, storyWriteathonVotes.writeathonId, stories.userId)
          .orderBy(sql`COUNT(${storyWriteathonVotes.storyId}) DESC`)
          .limit(1);

        console.log(sci_fi_specialist, imagery_expert)
        const mostLikedStory = await db
          .select({
            writeathonId: storyWriteathonVotes.writeathonId,
            storyId: storyWriteathonVotes.storyId,
            userId: stories.userId,  // Include the userId from the stories table
            voteCount: sql<number>`COUNT(${storyWriteathonVotes.storyId})`,  // Counting the number of votes for the story
          })
          .from(storyWriteathonVotes)
          .innerJoin(stories, eq(storyWriteathonVotes.storyId, stories.id))  // Join the stories table to access userId

          .where(eq(storyWriteathonVotes.writeathonId, w.id))  // Filter for a particular writeathon
          .groupBy(storyWriteathonVotes.writeathonId, storyWriteathonVotes.storyId, stories.userId)  // Group by writeathon and story
          .orderBy(sql`COUNT(${storyWriteathonVotes.storyId}) DESC`)  // Order by vote count in descending order
          .limit(1);  // Return only one result (the most liked story)

        console.log(mostLikedStory)


        if (pacing_pro && pacing_pro.length > 0) {
          pacing_pro.forEach(async i => {
            await db.insert(userAwards).values({
              storyId: i.storyId,
              writeathonId: i.writeathonId,
              userId: i.userId,
              award: 'pacing-pro'
            });
          });
        }

        if (creative_spark && creative_spark.length > 0) {
          creative_spark.forEach(async i => {
            console.log(i)
            await db.insert(userAwards).values({
              storyId: i.storyId,
              writeathonId: i.writeathonId,
              userId: i.userId,
              award: 'creative-spark'
            });
          });
        }

        if (emotion_evoker && emotion_evoker.length > 0) {
          emotion_evoker.forEach(async i => {
            await db.insert(userAwards).values({
              storyId: i.storyId,
              writeathonId: i.writeathonId,
              userId: i.userId,
              award: 'emotion-evoker'
            });
          });
        }

        if (imagery_expert && imagery_expert.length > 0) {
          imagery_expert.forEach(async i => {
            await db.insert(userAwards).values({
              storyId: i.storyId,
              writeathonId: i.writeathonId,
              userId: i.userId,
              award: 'imagery-expert'
            });
          });
        }

        if (sci_fi_specialist && sci_fi_specialist.length > 0) {
          sci_fi_specialist.forEach(async i => {
            await db.insert(userAwards).values({
              storyId: i.storyId,
              writeathonId: i.writeathonId,
              userId: i.userId,
              award: 'sci-fi-specialist'
            });
          });
        }



        await db.update(writeathons).set({ complete: true }).where(eq(writeathons.id, w.id));

      })


      // calculate most likes

      // const most_liked_entry = await  db.select().from(stories).innerJoin()

      // const pacing_pro = await db.select().from(storyWriteathonVotes).leftJoin()

      //find participants
      //
      //award participants
      //
      //update users
      //
      //

      // await db.update(writeathons).set({ complete: true });
    }

    return NextResponse.json(
      {
        message: 'failed',
      },
      {
        status: 401,
      }
    );
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Validation failed',
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    console.log(error)

    return NextResponse.json(
      {
        status: 'error',
        message: error.message || 'Internal Server Error',
      },
      { status: 500 }
    );
  }
}

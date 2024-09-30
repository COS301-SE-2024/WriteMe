/* v8 ignore start */
import { NextResponse, NextRequest } from 'next/server';
import { createUserSchema } from '../../../../db/user-schema';
import { object, string, ZodError } from 'zod';
import { users , stories, storyGenres } from '../../../../db/schema';
import { db } from '../../../../db/db';
import { filterStorySchema } from '../../../../db/story-schema';
import { auth } from '../../../../auth';
import { eq, inArray } from 'drizzle-orm';


export async function POST(req: NextRequest) {
  try {
    
    const { filterby, orderby, genres } = filterStorySchema.parse(await req.json());
    let result;

    if (genres && genres.length > 0){
        let matchingStories = await  db.query.storyGenres.findMany({
            where: (storyGenres, {inArray})=> inArray(storyGenres.genreId, genres),
            columns: {
                storyId: true
            }
        });
        matchingStories = matchingStories.map((sg) => sg.storyId);

        if (orderby == "desc"){
            switch (filterby) {
              case 'all':
                result = await db.query.stories.findMany({
                  where: (stories, { eq, and, inArray }) => and(
                    eq(stories.published, true), 
                    inArray(stories.id, matchingStories)
                ),
                  with: {
                    chapters: {
                      with: {
                        likes: true,
                      },
                    },
                    author: true,
                    likes: true,
                    comments: true,
                  },
                });
                break;
              case 'date_created':
                result = await db.query.stories.findMany({
                    where: (stories, { eq, and, inArray }) => and(
                        eq(stories.published, true), 
                        inArray(stories.id, matchingStories)
                    ),
                  orderBy: (stories, { desc }) => [desc(stories.createdAt)],
                  with: {
                    chapters: {
                      with: {
                        likes: true,
                      },
                    },
                    author: true,
                    likes: true,
                    comments: true,
                  },
                });
                break;
              case 'date_updated':
                result = await db.query.stories.findMany({
                  where: (stories, { eq, and, inArray }) => and(
                    eq(stories.published, true), 
                    inArray(stories.id, matchingStories)
                ),
                  orderBy: (stories, { desc }) => [desc(stories.updatedAt)],
                  with: {
                    chapters: {
                      with: {
                        likes: true,
                      },
                    },
                    author: true,
                    likes: true,
                    comments: true,
                  },
                });
                break;
              default:
                result = await db.query.stories.findMany({
                  where: (stories, { eq, and, inArray }) => and(
                    eq(stories.published, true), 
                    inArray(stories.id, matchingStories)
                ),
                  with: {
                    chapters: {
                      with: {
                        likes: true,
                      },
                    },
                    author: true,
                    likes: true,
                    comments: true,
                  },
                });
            }
        }else {
            switch (filterby) {
                case 'all':
                  result = await db.query.stories.findMany({
                    where: (stories, { eq, and, inArray }) => and(
                    eq(stories.published, true), 
                    inArray(stories.id, matchingStories)
                ),
                    with: {
                      chapters: {
                        with: {
                          likes: true,
                        },
                      },
                      author: true,
                      likes: true,
                      comments: true,
                    },
                  });
                  break;
                case 'date_created':
                  result = await db.query.stories.findMany({
                    where: (stories, { eq, and, inArray }) => and(
                    eq(stories.published, true), 
                    inArray(stories.id, matchingStories)
                ),
                    orderBy: (stories, { asc }) => [asc(stories.createdAt)],
                    with: {
                      chapters: {
                        with: {
                          likes: true,
                        },
                      },
                      author: true,
                      likes: true,
                      comments: true,
                    },
                  });
                  break;
                case 'date_updated':
                  result = await db.query.stories.findMany({
                    where: (stories, { eq, and, inArray }) => and(
                    eq(stories.published, true), 
                    inArray(stories.id, matchingStories)
                ),
                    orderBy: (stories, { asc }) => [asc(stories.updatedAt)],
                    with: {
                      chapters: {
                        with: {
                          likes: true,
                        },
                      },
                      author: true,
                      likes: true,
                      comments: true,
                    },
                  });
                  break;
                default:
                  result = await db.query.stories.findMany({
                    where: (stories, { eq, and, inArray }) => and(
                    eq(stories.published, true), 
                    inArray(stories.id, matchingStories)
                ),
                    with: {
                      chapters: {
                        with: {
                          likes: true,
                        },
                      },
                      author: true,
                      likes: true,
                      comments: true,
                    },
                  });
              }
        }
    }else {
        if (orderby == "desc"){
            switch (filterby) {
              case 'all':
                result = await db.query.stories.findMany({
                  where: (stories, { eq, and }) => eq(stories.published, true),
                  with: {
                    chapters: {
                      with: {
                        likes: true,
                      },
                    },
                    author: true,
                    likes: true,
                    comments: true,
                  },
                });
                break;
              case 'date_created':
                result = await db.query.stories.findMany({
                  where: (stories, { eq }) => eq(stories.published, true),
                  orderBy: (stories, { desc }) => [desc(stories.createdAt)],
                  with: {
                    chapters: {
                      with: {
                        likes: true,
                      },
                    },
                    author: true,
                    likes: true,
                    comments: true,
                  },
                });
                break;
              case 'date_updated':
                result = await db.query.stories.findMany({
                  where: (stories, { eq }) => eq(stories.published, true),
                  orderBy: (stories, { desc }) => [desc(stories.updatedAt)],
                  with: {
                    chapters: {
                      with: {
                        likes: true,
                      },
                    },
                    author: true,
                    likes: true,
                    comments: true,
                  },
                });
                break;
              default:
                result = await db.query.stories.findMany({
                  where: (stories, { eq }) => eq(stories.published, true),
                  with: {
                    chapters: {
                      with: {
                        likes: true,
                      },
                    },
                    author: true,
                    likes: true,
                    comments: true,
                  },
                });
            }
        }else {
            switch (filterby) {
                case 'all':
                  result = await db.query.stories.findMany({
                    where: (stories, { eq }) => eq(stories.published, true),
                    with: {
                      chapters: {
                        with: {
                          likes: true,
                        },
                      },
                      author: true,
                      likes: true,
                      comments: true,
                    },
                  });
                  break;
                case 'date_created':
                  result = await db.query.stories.findMany({
                    where: (stories, { eq }) => eq(stories.published, true),
                    orderBy: (stories, { asc }) => [asc(stories.createdAt)],
                    with: {
                      chapters: {
                        with: {
                          likes: true,
                        },
                      },
                      author: true,
                      likes: true,
                      comments: true,
                    },
                  });
                  break;
                case 'date_updated':
                  result = await db.query.stories.findMany({
                    where: (stories, { eq }) => eq(stories.published, true),
                    orderBy: (stories, { asc }) => [asc(stories.updatedAt)],
                    with: {
                      chapters: {
                        with: {
                          likes: true,
                        },
                      },
                      author: true,
                      likes: true,
                      comments: true,
                    },
                  });
                  break;
                default:
                  result = await db.query.stories.findMany({
                    where: (stories, { eq }) => eq(stories.published, true),
                    with: {
                      chapters: {
                        with: {
                          likes: true,
                        },
                      },
                      author: true,
                      likes: true,
                      comments: true,
                    },
                  });
              }
        }
    }




    


    return NextResponse.json({
      stories: result,
    });
  } catch (error: any) {
    console.log(error);
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

    return NextResponse.json(
      {
        status: 'error',
        message: error.message || 'Internal Server Error',
      },
      { status: 500 }
    );
  }
}



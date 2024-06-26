/* v8 ignore start */
import { generateHTML } from '@tiptap/html';
import type { JSONContent} from '@tiptap/core'

import { auth } from '../../../../auth';
import { NextResponse } from 'next/server';
import { exportChapterSchema } from '../../../../db/chapter-schema';
import { getChapter } from '../../../../services/chapters';
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Bold from '@tiptap/extension-bold'
import StarterKit from '@tiptap/starter-kit'

import { any } from 'zod';

const puppeteer = require("puppeteer")

export async function POST(req: Request){
  try {
    const session = await auth();

    if (!session?.user){
      return new NextResponse(JSON.stringify({
        status: 'fail', message: "You are not logged in",
      }), { status : 401})
    }

    const input = exportChapterSchema.parse(await req.json());

    const chapter = await getChapter(input.id);

    const content :JSONContent = {
      "type": 'doc',
      "content": <any>chapter.blocks,
    }

    // console.log(content)

    const html = generateHTML( content , [
      StarterKit,
    ])

    console.log(html)


    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html, {waitUntil: 'networkidle0'})
    const pdfBuffer = await page.pdf({format: 'A4'})
    await browser.close();
    const response = new NextResponse(pdfBuffer);

    response.headers.set("Content-Type", "application/pdf")
    console.log("render complete")

    return response;

  }catch (e) {
    console.log(e)
  }


}

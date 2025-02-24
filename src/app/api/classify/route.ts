import { NextResponse } from "next/server";
import { z } from "zod";
import OpenAI from "openai";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "@/lib/r2";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const responseSchema = z
  .object({
    name: z.string(),
    category: z.enum(["food", "drink"]),
    details: z.string().min(100),
    grade: z.enum(["A", "B", "C", "D"]),
    components: z.object({
      protein: z.number(),
      calories: z.number(),
      fat: z.number(),
      carbs: z.number(),
    }),
    ingredients: z.array(z.string()),
  })
  .or(z.object({})); // Allow empty object as a valid response

export async function POST(request: Request) {
  try {
    const { imageKey } = await request.json();

    if (!imageKey) {
      return NextResponse.json(
        { error: "No image key provided" },
        { status: 400 },
      );
    }

    // Retrieve the image from R2
    const image = await r2.send(
      new GetObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: imageKey,
      }),
    );

    if (!image || !image.Body) {
      throw new Error("Image not found.");
    }

    // Convert the image to base64
    const buffer = await image.Body.transformToByteArray();
    const base64Image = Buffer.from(buffer).toString("base64");

    const prompt = `Analyze the following image of a food or drink product. Respond with a JSON object containing this information:
    {
      name: z.string(),
      category: z.enum(["food", "drink"]),
      details: z.string().min(100),
      grade: z.enum(["A", "B", "C", "D"]),
      components: z.object({
        protein: z.number(),
        calories: z.number(),
        fat: z.number(),
        carbs: z.number(),
      }),
      ingredients: z.array(z.string()),
    }
    Be as accurate as possible based on the image content. Just return the JSON object starting with { and end with }. If it's still food or drink but you can't determined accurately, return JSON object with the closest data. If the image is neither food or drink, please respond with empty JSON object {}.`;

    const response = await openai.chat.completions.create({
      model: "chatgpt-4o-latest",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            {
              type: "image_url",
              image_url: { url: `data:image/jpeg;base64,${base64Image}` },
            },
          ],
        },
      ],
    });

    const content = response.choices[0].message.content;
    if (!content) {
      return NextResponse.json({});
    }

    // Extract JSON from the response, handling potential formatting issues
    const jsonStr = content.includes("```json")
      ? content.split("```json")[1].split("```")[0].trim()
      : content.trim();

    const result = JSON.parse(jsonStr);

    // If the result is an empty object, return it directly
    if (Object.keys(result).length === 0) {
      return NextResponse.json({});
    }

    // Otherwise validate the full response
    const validatedResult = responseSchema.parse(result);
    return NextResponse.json(validatedResult);
  } catch (err) {
    console.error("Error classifying image:", err);
    return NextResponse.json(
      { error: "Failed to classify image" },
      { status: 500 },
    );
  }
}

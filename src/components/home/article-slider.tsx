"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { capitalCase } from "change-case";
import { Article } from "@prisma/client";

interface ArticleCardProps {
  id: string;
  title: string;
  image: string;
  category: string;
}

export function ArticleSlider({
  TrendingArticles,
}: {
  TrendingArticles: Article[];
}) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="relative w-full"
    >
      <CarouselContent>
        {TrendingArticles?.map((article) => (
          <CarouselItem key={article.id} className="basis-full">
            <div className="p-1">
              <ArticleCard {...article} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-5 h-6 w-6" />
      <CarouselNext className="absolute right-5 h-6 w-6" />
    </Carousel>
  );
}

export function ArticleCard({ id, title, image, category }: ArticleCardProps) {
  return (
    <Card className="relative w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image src={image} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <CardContent className="relative flex min-h-[200px] flex-col items-center justify-between space-y-4 p-4">
        <div className="w-full text-start">
          <h2 className="text-sm font-semibold text-white sm:text-lg md:text-base">
            {title}
          </h2>
          <span className="text-xs font-semibold text-[#ff806e] sm:text-sm">
            {capitalCase(category)}
          </span>
        </div>
        <Link href={`/article/${id}`} className="w-full">
          <Button
            variant="default"
            className="w-full bg-[#ff8473] hover:bg-[#ff6b59]"
          >
            Read Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

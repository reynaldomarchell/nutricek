"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EditIcon, Heart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { UserArticle } from "@/types/article-types";
import { useDeleteArticle } from "@/services/article-service";
import { ConfirmDeleteModal } from "./confirm-delete-modal";
import { Button } from "@/components/ui/button";

export default function ArticleList({
  UserArticles,
}: {
  UserArticles: UserArticle[];
}) {
  const deleteArticleMutation = useDeleteArticle();
  const [articleToDelete, setArticleToDelete] = useState<UserArticle | null>(
    null,
  );

  function handleDeleteArticle(article: UserArticle) {
    setArticleToDelete(article);
  }

  function confirmDelete() {
    if (articleToDelete) {
      deleteArticleMutation.mutate(articleToDelete.id);
      setArticleToDelete(null);
    }
  }

  return (
    <div>
      {UserArticles?.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {UserArticles.map((article) => (
            <Card key={article.id} className="flex flex-col">
              <CardHeader className="p-4">
                <Image
                  src={article.image}
                  alt={article.title}
                  width={300}
                  height={200}
                  className="h-40 w-full rounded-lg object-cover"
                />
              </CardHeader>
              <CardContent className="flex-grow p-4 text-start">
                <CardTitle className="mb-2">{article.title}</CardTitle>
                <p className="line-clamp-3 text-sm text-gray-600">
                  {article.content.substring(0, 150)}...
                </p>
                <Link
                  href={`/article/${article.id}`}
                  className="text-sm font-medium text-[#4cab52] hover:underline"
                >
                  Read more
                </Link>
              </CardContent>
              <CardFooter className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-1">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span className="text-sm text-gray-600">
                    {article.likes.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Link href={`/edit-article/${article.id}`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <EditIcon className="h-4 w-4" />
                      <span className="sr-only">Edit article</span>
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteArticle(article)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete article</span>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 py-4 text-gray-400">
          <p className="text-xl font-semibold">
            You don&apos;t have any article yet
          </p>
          <p className="text-sm">Create one to track them</p>
        </div>
      )}
      <ConfirmDeleteModal
        isOpen={!!articleToDelete}
        onClose={() => setArticleToDelete(null)}
        onConfirm={confirmDelete}
        title={articleToDelete?.title || ""}
      />
    </div>
  );
}

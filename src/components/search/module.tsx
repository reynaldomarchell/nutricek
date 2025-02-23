"use client";

import {
  useGetPopularArticles,
  useGetTrendingArticles,
} from "@/services/article-service";
import { useGetAllProducts } from "@/services/product-service";
import type { Product } from "@prisma/client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { CiSearch } from "react-icons/ci";
import { IoAnalyticsOutline, IoCloseOutline } from "react-icons/io5";
import { RiShoppingBasket2Fill } from "react-icons/ri";
import LoadingSkeleton from "../skeleton/loading-skeleton";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function SearchModule() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<Product[]>([]);

  const allProductsQuery = useGetAllProducts();
  const popularArticlesQuery = useGetPopularArticles();
  const trendingArticlesQuery = useGetTrendingArticles();

  const allProducts = allProductsQuery.data;
  const popularArticles = popularArticlesQuery.data;
  const trendingArticles = trendingArticlesQuery.data;

  React.useEffect(() => {
    if (allProducts) {
      setSearchResults(allProducts);
    }
  }, [allProducts]);

  const filteredProducts =
    searchQuery.length > 0
      ? searchResults.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : [];

  const handleProductClick = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  if (
    allProductsQuery.isLoading ||
    popularArticlesQuery.isLoading ||
    trendingArticlesQuery.isLoading
  ) {
    return <LoadingSkeleton />;
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      className="container mx-auto flex h-screen flex-col overflow-hidden"
    >
      {/* Search Bar */}
      <motion.div variants={fadeInUp}>
        <div className="relative flex items-center rounded-full bg-[#f4f4f4] px-4 py-3">
          <CiSearch className="text-gray-400" />
          <input
            className="flex-1 bg-transparent px-2 text-sm outline-none"
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <AnimatePresence>
            {searchQuery && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => setSearchQuery("")}
              >
                <IoCloseOutline className="text-gray-400" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Search Results */}
      <AnimatePresence>
        {searchQuery.length > 0 && (
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeInUp}
          >
            {filteredProducts.length === 0 ? (
              <motion.div
                className="flex flex-1 flex-col items-center justify-center text-center"
                variants={fadeInUp}
              >
                <RiShoppingBasket2Fill className="flex h-48 w-48 text-gray-400" />
                <h2 className="text-xl">No Results Found</h2>
                <p className="text-sm">
                  Try searching for a different keyword or tweek your search a
                  little
                </p>
              </motion.div>
            ) : (
              <motion.div
                className="mt-4 flex-1 space-y-4 overflow-y-auto"
                variants={staggerChildren}
              >
                {filteredProducts.map((product) => (
                  <motion.button
                    key={product.id}
                    className="flex w-full items-center gap-4 rounded-lg p-2 hover:bg-gray-50"
                    onClick={() => handleProductClick(product.id)}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="h-12 w-12 rounded-full object-cover"
                      width={48}
                      height={48}
                    />
                    <p className="text-left text-sm">{product.name}</p>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Home Content */}
      <AnimatePresence>
        {!searchQuery && (
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex-1 overflow-y-auto"
          >
            {/* Hot Now Section */}
            <motion.div className="pt-6" variants={fadeInUp}>
              <h2 className="mb-4 text-xl font-semibold">Hot Now</h2>
              <motion.div
                className="flex gap-4 overflow-x-auto pb-4"
                variants={staggerChildren}
              >
                {popularArticles?.map((item) => (
                  <Link href={`/article/${item.id}`} key={item.title}>
                    <motion.div
                      key={item.title}
                      className="relative min-w-[240px] overflow-hidden rounded-2xl"
                      variants={fadeInUp}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="h-[200px] w-full object-cover transition-transform duration-300 hover:scale-105"
                        width={240}
                        height={200}
                      />
                      <div className="absolute bottom-0 w-full bg-white/95 p-3">
                        <p className="text-sm font-medium">
                          {item.title.length > 20
                            ? `${item.title.substring(0, 25)}...`
                            : item.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.content.substring(0, 50)}...
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </motion.div>
            </motion.div>

            {/* Trending Section */}
            <motion.div className="pt-6" variants={fadeInUp}>
              <h2 className="mb-4 text-xl font-semibold">Trending</h2>
              <motion.div className="space-y-4" variants={staggerChildren}>
                {trendingArticles?.map((item) => (
                  <Link href={`/article/${item.id}`} key={item.title}>
                    <motion.div
                      className="flex items-center justify-between border-b border-gray-100 pb-4"
                      variants={fadeInUp}
                      whileTap={{ scale: 0.98 }}
                    >
                      <p className="w-full text-[#e2782c]">{item.title}</p>
                      <IoAnalyticsOutline className="text-[#e2782c]" />
                    </motion.div>
                  </Link>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

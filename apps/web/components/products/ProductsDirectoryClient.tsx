"use client";

import React, { useMemo, useState } from "react";
import type {
  PlatformType,
  Product,
  ProductLifecycleStatus,
} from "@nevrora/types";
import {
  LIFECYCLE_STATUS_CONFIG,
  PRODUCT_CATEGORIES,
  PRODUCT_PLATFORM_FILTERS,
} from "@nevrora/config";
import { ProductCard } from "./ProductCard";
import { trackProductEvent } from "../../lib/analytics";
import { Search, Filter, RotateCcw } from "lucide-react";

interface ProductsDirectoryClientProps {
  products: Product[];
  initialCategory?: string;
  initialPlatform?: string;
  initialStatus?: string;
}

const PUBLIC_STATUS_FILTERS: ProductLifecycleStatus[] = [
  "coming_soon",
  "live",
  "beta",
  "maintenance",
  "discontinued",
];

export function ProductsDirectoryClient({
  products,
  initialCategory = "all",
  initialPlatform = "all",
  initialStatus = "all",
}: ProductsDirectoryClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedPlatform, setSelectedPlatform] = useState(initialPlatform);
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Never allow internal_draft in directory
      if (!product.published || product.lifecycle_status === "internal_draft") {
        return false;
      }

      if (
        selectedCategory !== "all" &&
        product.category.toLowerCase() !== selectedCategory.toLowerCase()
      ) {
        return false;
      }

      if (
        selectedPlatform !== "all" &&
        !product.platforms.some(
          (pl) =>
            pl.platformType.toLowerCase() === selectedPlatform.toLowerCase(),
        )
      ) {
        return false;
      }

      if (
        selectedStatus !== "all" &&
        product.lifecycle_status !== selectedStatus
      ) {
        return false;
      }

      if (searchQuery.trim().length > 0) {
        const q = searchQuery.trim().toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesTagline = product.tagline.toLowerCase().includes(q);
        const matchesSummary = product.summary.toLowerCase().includes(q);
        const matchesCategory = product.category.toLowerCase().includes(q);
        const matchesFeature = product.features.some((f) =>
          f.toLowerCase().includes(q),
        );
        return (
          matchesName ||
          matchesTagline ||
          matchesSummary ||
          matchesCategory ||
          matchesFeature
        );
      }

      return true;
    });
  }, [
    products,
    searchQuery,
    selectedCategory,
    selectedPlatform,
    selectedStatus,
  ]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    trackProductEvent({
      eventType: "product_filter_change",
      productId: "directory",
      productSlug: "all",
      lifecycleStatus: "coming_soon",
      ctaLabel: `category:${category}`,
    });
  };

  const handlePlatformChange = (platform: string) => {
    setSelectedPlatform(platform);
    trackProductEvent({
      eventType: "product_filter_change",
      productId: "directory",
      productSlug: "all",
      lifecycleStatus: "coming_soon",
      platform:
        platform === "all" ? undefined : (platform as PlatformType),
      ctaLabel: `platform:${platform}`,
    });
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedPlatform("all");
    setSelectedStatus("all");
  };

  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    selectedCategory !== "all" ||
    selectedPlatform !== "all" ||
    selectedStatus !== "all";

  return (
    <div className="space-y-10">
      {/* Accessible Filter & Search Controls (NW-FR-01, NW-FR-12) */}
      <section
        aria-label="Product directory filters"
        className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-6"
      >
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Keyword Search */}
          <div className="relative flex-1">
            <label htmlFor="product-search-input" className="sr-only">
              Search products by name, category, or feature
            </label>
            <Search className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="product-search-input"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by name, category, or feature..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-4 py-2.5 text-sm text-[#0B1020] placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Lifecycle Status Select */}
          <div className="flex items-center gap-3">
            <label
              htmlFor="status-filter-select"
              className="text-xs font-semibold text-slate-600 uppercase tracking-wider shrink-0"
            >
              Lifecycle:
            </label>
            <select
              id="status-filter-select"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-sm font-medium text-[#0B1020] focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="all">All Statuses</option>
              {PUBLIC_STATUS_FILTERS.map((st) => (
                <option key={st} value={st}>
                  {LIFECYCLE_STATUS_CONFIG[st].label}
                </option>
              ))}
            </select>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 hover:border-blue-400 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <Filter className="h-3.5 w-3.5 text-blue-600" />
            <span>Filter by Category</span>
          </div>
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter products by category"
          >
            <button
              type="button"
              onClick={() => handleCategoryChange("all")}
              aria-pressed={selectedCategory === "all"}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                selectedCategory === "all"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "border border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              All Categories
            </button>
            {PRODUCT_CATEGORIES.map((category) => {
              const isSelected =
                selectedCategory.toLowerCase() === category.toLowerCase();
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryChange(category)}
                  aria-pressed={isSelected}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                    isSelected
                      ? "bg-blue-600 text-white shadow-sm"
                      : "border border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-300 hover:text-blue-600"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Platform Filter Pills */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Filter by Platform
          </span>
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter products by platform"
          >
            <button
              type="button"
              onClick={() => handlePlatformChange("all")}
              aria-pressed={selectedPlatform === "all"}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                selectedPlatform === "all"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "border border-slate-200 bg-slate-50 text-slate-700 hover:border-indigo-300 hover:text-indigo-600"
              }`}
            >
              All Platforms
            </button>
            {PRODUCT_PLATFORM_FILTERS.map((plat) => {
              const isSelected =
                selectedPlatform.toLowerCase() === plat.id.toLowerCase();
              return (
                <button
                  key={plat.id}
                  type="button"
                  onClick={() => handlePlatformChange(plat.id)}
                  aria-pressed={isSelected}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                    isSelected
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "border border-slate-200 bg-slate-50 text-slate-700 hover:border-indigo-300 hover:text-indigo-600"
                  }`}
                >
                  {plat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Results Count */}
      <div
        className="flex items-center justify-between text-xs text-slate-600"
        aria-live="polite"
      >
        <p>
          Showing{" "}
          <span className="font-bold text-[#0B1020]">
            {filteredProducts.length}
          </span>{" "}
          of{" "}
          <span className="font-bold text-[#0B1020]">{products.length}</span>{" "}
          published products
        </p>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="products-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200/80 bg-white p-12 text-center space-y-4">
          <h3 className="font-display text-xl font-bold text-[#0B1020]">
            No matching products found
          </h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            No published products match your active category, platform, or
            lifecycle filter criteria.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </div>
  );
}

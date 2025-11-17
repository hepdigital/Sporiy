import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCategoryBySlug, getAllCategorySlugs } from '@/lib/sport-categories';
import { CategoryHero } from '@/components/category/category-hero';
import { CategoryExploreView } from '@/components/category/category-explore-view';
import { CategorySeoContent } from '@/components/category/category-seo-content';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

// Generate static params for all categories
export async function generateStaticParams() {
  const slugs = getAllCategorySlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  
  if (!category) {
    return {
      title: 'Kategori Bulunamadı - Sporiy',
    };
  }

  return {
    title: `${category.name} - Sporiy`,
    description: category.description,
    openGraph: {
      title: `${category.name} - Sporiy`,
      description: category.description,
      images: [category.heroImage],
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <CategoryHero category={category} />
      <CategoryExploreView categoryName={category.name} />
      <CategorySeoContent category={category} />
    </main>
  );
}

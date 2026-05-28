import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { BLOG_POSTS, ARTICLE_BODIES, PLANNERS } from '@/lib/data';
import Icon from '@/components/Icon';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return BLOG_POSTS.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find(p => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find(p => p.slug === slug);
  if (!post) notFound();
  const body = ARTICLE_BODIES[post.slug] || [
    { type: 'p' as const, text: 'Full article copy coming soon. In the meantime, the matcher uses the same benchmarks discussed here — try it now to see a personalised estimate for your wedding.' },
    { type: 'p' as const, text: 'This is a placeholder. Each blog post on the platform will have a full editorial body — written by our team or commissioned from working planners on the island.' },
  ];
  const related = BLOG_POSTS.filter(p => p.slug !== post.slug).slice(0, 3);
  const sara = PLANNERS.find(p => p.id === 'sara');

  return (
    <>
      <article>
        <div className="article-hero">
          <span className="cat">{post.category}</span>
          <h1>{post.title}</h1>
          <div className="meta">
            <span>{post.date}</span>
            <span className="sep">·</span>
            <span>{post.readTime}</span>
          </div>
          {sara && (
            <div className="byline">
              <div className="byline__avatar">
                <Image src={sara.img} alt="" width={44} height={44} style={{ width: '100%', height: '100%', objectFit: 'cover' }} unoptimized />
              </div>
              <div>
                <strong>Written by Sara Llabrés</strong>
                <span>Editor-in-chief · Working planner at Slow Finca, Pollença · <Link href="/standards" className="t-link">How we work</Link></span>
              </div>
            </div>
          )}
        </div>

        <div className="article-photo">
          <Image src={post.img} alt={post.title} width={1200} height={450} style={{ width: '100%', objectFit: 'cover', borderRadius: 'var(--radius-lg)', aspectRatio: '16/6' }} unoptimized />
        </div>

        <div className="article-body">
          <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 22, color: 'var(--ink)', borderBottom: '1px solid var(--hairline)', paddingBottom: 24, marginBottom: 32 }}>
            {post.excerpt}
          </p>
          {body.map((block, i) => {
            if (block.type === 'p') return <p key={i}>{block.text}</p>;
            if (block.type === 'h2') return <h2 key={i}>{block.text}</h2>;
            if (block.type === 'h3') return <h3 key={i}>{block.text}</h3>;
            if (block.type === 'blockquote') return <blockquote key={i}>{block.text}</blockquote>;
            if (block.type === 'ul') return <ul key={i}>{block.items.map((it: string, j: number) => <li key={j}>{it}</li>)}</ul>;
            return null;
          })}

          <div style={{ margin: '48px 0', padding: 32, background: 'var(--surface-soft)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--primary)' }}>
            <span className="kicker kicker--brand">Try it now</span>
            <h3 className="serif-h3" style={{ marginTop: 8, marginBottom: 12 }}>Get a personalised estimate for your wedding</h3>
            <p className="body-md" style={{ marginBottom: 20 }}>The matcher uses the same 2026 benchmarks discussed in this article. Answer six questions, see a market estimate and three planner shortlists. Free.</p>
            <Link href="/matcher" className="btn btn--primary">
              <Icon name="sparkle" size={14} /> Start the matcher
            </Link>
          </div>
        </div>
      </article>

      <section className="sec sec--sm wrap">
        <header className="sec__head">
          <span className="kicker">Keep reading</span>
          <h2 style={{ fontSize: 32 }}>More planning guides</h2>
        </header>
        <div className="blog-grid">
          {related.map(p => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="blog-card">
              <div className="blog-card__photo">
                <Image src={p.img} alt={p.title} width={400} height={250} style={{ width: '100%', height: '100%', objectFit: 'cover' }} unoptimized />
              </div>
              <span className="blog-card__cat">{p.category}</span>
              <h3 className="blog-card__title">{p.title}</h3>
              <p className="blog-card__excerpt">{p.excerpt}</p>
              <span className="blog-card__meta">{p.date} · {p.readTime}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

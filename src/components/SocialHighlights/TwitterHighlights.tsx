import React from 'react';
import styles from './TwitterHighlights.module.css';

interface TwitterHighlight {
  id: string;
  content: string;
  date: string;
  likes?: number;
  retweets?: number;
  replies?: number;
  url?: string;
  category?: string;
}

interface TwitterHighlightsProps {
  highlights: TwitterHighlight[];
  title?: string;
  showMetrics?: boolean;
  maxItems?: number;
}

const TwitterHighlight: React.FC<{ highlight: TwitterHighlight; showMetrics: boolean }> = ({
  highlight,
  showMetrics
}) => {
  const formatNumber = (num?: number): string => {
    if (!num) return '0';
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <article className={styles.tweetCard}>
      {highlight.category && (
        <span className={styles.category}>{highlight.category}</span>
      )}

      <div className={styles.tweetContent}>
        <p className={styles.content}>{highlight.content}</p>
      </div>

      <div className={styles.tweetFooter}>
        <time className={styles.date} dateTime={highlight.date}>
          {formatDate(highlight.date)}
        </time>

        {showMetrics && (
          <div className={styles.metrics}>
            {highlight.likes !== undefined && (
              <span className={styles.metric}>
                <span className={styles.metricIcon}>❤️</span>
                {formatNumber(highlight.likes)}
              </span>
            )}
            {highlight.retweets !== undefined && (
              <span className={styles.metric}>
                <span className={styles.metricIcon}>🔄</span>
                {formatNumber(highlight.retweets)}
              </span>
            )}
            {highlight.replies !== undefined && (
              <span className={styles.metric}>
                <span className={styles.metricIcon}>💬</span>
                {formatNumber(highlight.replies)}
              </span>
            )}
          </div>
        )}
      </div>

      {highlight.url && (
        <div className={styles.tweetActions}>
          <a
            href={highlight.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.viewOriginal}
          >
            View on X (Twitter) →
          </a>
        </div>
      )}
    </article>
  );
};

const TwitterHighlights: React.FC<TwitterHighlightsProps> = ({
  highlights,
  title = "Popular Tweets",
  showMetrics = true,
  maxItems = 6
}) => {
  const displayHighlights = maxItems ? highlights.slice(0, maxItems) : highlights;

  if (highlights.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No tweets to display yet. Check back soon!</p>
      </div>
    );
  }

  return (
    <section className={styles.twitterHighlights}>
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.headerMeta}>
          <span className={styles.platform}>
            <span className={styles.platformIcon}>🐦</span>
            X (Twitter)
          </span>
        </div>
      </header>

      <div className={styles.tweetsGrid}>
        {displayHighlights.map((highlight) => (
          <TwitterHighlight
            key={highlight.id}
            highlight={highlight}
            showMetrics={showMetrics}
          />
        ))}
      </div>

      {highlights.length > maxItems && (
        <footer className={styles.footer}>
          <p className={styles.moreInfo}>
            Showing {maxItems} of {highlights.length} popular tweets
          </p>
        </footer>
      )}
    </section>
  );
};

// Sample data - replace with your actual Twitter highlights
export const sampleHighlights: TwitterHighlight[] = [
  {
    id: '1',
    content: 'Just deployed my personal website using Docusaurus and Cloudflare Pages. The developer experience is fantastic! 🚀',
    date: '2024-01-15',
    likes: 42,
    retweets: 8,
    replies: 5,
    category: 'Tech'
  },
  {
    id: '2', 
    content: 'Learning how AI agents can accelerate development workflows. The future of coding is collaborative human-AI teams.',
    date: '2024-02-20',
    likes: 67,
    retweets: 15,
    replies: 12,
    category: 'AI'
  },
  {
    id: '3',
    content: 'Terraform + Cloudflare = Infrastructure as Code bliss. Managing DNS has never been this elegant.',
    date: '2024-03-10',
    likes: 28,
    retweets: 6,
    replies: 3,
    category: 'DevOps'
  }
];

export default TwitterHighlights;
export type { TwitterHighlight, TwitterHighlightsProps };

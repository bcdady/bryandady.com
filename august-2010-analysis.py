#!/usr/bin/env python3
"""
August 2010 Peak Analysis
Analyzes the peak Twitter activity period to understand what was happening
"""

import json
import re
from datetime import datetime
from collections import Counter
from urllib.parse import urlparse

def load_twitter_data(file_path):
    """Load and parse the Twitter data from the JavaScript file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    json_start = content.find('[')
    json_end = content.rfind(']') + 1
    json_data = content[json_start:json_end]
    
    return json.loads(json_data)

def analyze_august_2010(tweets_data):
    """Analyze tweets from August 2010"""
    
    august_2010_tweets = []
    hashtags = Counter()
    mentions = Counter()
    urls = []
    sources = Counter()
    
    for tweet_obj in tweets_data:
        tweet = tweet_obj['tweet']
        created_at = datetime.strptime(tweet['created_at'], '%a %b %d %H:%M:%S %z %Y')
        
        # Filter for August 2010
        if created_at.year == 2010 and created_at.month == 8:
            august_2010_tweets.append({
                'date': created_at.strftime('%Y-%m-%d %H:%M'),
                'text': tweet['full_text'],
                'source': re.sub(r'<[^>]+>', '', tweet['source']),
                'favorites': int(tweet.get('favorite_count', 0)),
                'retweets': int(tweet.get('retweet_count', 0))
            })
            
            # Extract hashtags
            if 'entities' in tweet and 'hashtags' in tweet['entities']:
                for hashtag in tweet['entities']['hashtags']:
                    hashtags[hashtag['text'].lower()] += 1
            
            # Extract mentions
            if 'entities' in tweet and 'user_mentions' in tweet['entities']:
                for mention in tweet['entities']['user_mentions']:
                    mentions[mention['screen_name']] += 1
            
            # Extract URLs
            if 'entities' in tweet and 'urls' in tweet['entities']:
                for url in tweet['entities']['urls']:
                    if 'expanded_url' in url:
                        urls.append(url['expanded_url'])
            
            # Track sources
            source = re.sub(r'<[^>]+>', '', tweet['source'])
            sources[source] += 1
    
    return {
        'tweets': august_2010_tweets,
        'total_count': len(august_2010_tweets),
        'hashtags': hashtags.most_common(10),
        'mentions': mentions.most_common(10),
        'urls': urls,
        'sources': sources.most_common(5),
        'sample_tweets': august_2010_tweets[:10]  # First 10 tweets
    }

def generate_august_report(analysis):
    """Generate a report for August 2010 activity"""
    
    report = []
    report.append("# August 2010 Twitter Peak Analysis")
    report.append("=" * 50)
    report.append("")
    report.append(f"**Total Tweets in August 2010**: {analysis['total_count']}")
    report.append("")
    
    # Top hashtags
    if analysis['hashtags']:
        report.append("## 🏷️ Top Hashtags")
        for hashtag, count in analysis['hashtags']:
            report.append(f"- **#{hashtag}**: {count} times")
        report.append("")
    
    # Top mentions
    if analysis['mentions']:
        report.append("## 👥 Most Mentioned Users")
        for mention, count in analysis['mentions']:
            report.append(f"- **@{mention}**: {count} times")
        report.append("")
    
    # Sources
    report.append("## 📱 Tweet Sources")
    for source, count in analysis['sources']:
        report.append(f"- **{source}**: {count} tweets")
    report.append("")
    
    # URL analysis
    if analysis['urls']:
        domains = Counter()
        for url in analysis['urls']:
            try:
                domain = urlparse(url).netloc
                if domain:
                    domains[domain] += 1
            except:
                pass
        
        if domains:
            report.append("## 🔗 Most Shared Domains")
            for domain, count in domains.most_common(10):
                report.append(f"- **{domain}**: {count} links")
            report.append("")
    
    # Sample tweets
    report.append("## 📝 Sample Tweets from August 2010")
    for i, tweet in enumerate(analysis['sample_tweets'], 1):
        report.append(f"### {i}. {tweet['date']}")
        report.append(f"   *Source: {tweet['source']}*")
        report.append(f"   {tweet['text'][:200]}{'...' if len(tweet['text']) > 200 else ''}")
        report.append("")
    
    # Insights
    report.append("## 🔍 Key Insights")
    
    # Calculate tweet frequency
    avg_per_day = analysis['total_count'] / 31  # August has 31 days
    report.append(f"- **Daily Average**: {avg_per_day:.1f} tweets per day")
    
    # Most active source
    if analysis['sources']:
        top_source = analysis['sources'][0][0]
        report.append(f"- **Primary Platform**: {top_source}")
    
    # Content themes
    if analysis['hashtags']:
        top_hashtags = [h for h, c in analysis['hashtags'][:3]]
        report.append(f"- **Main Topics**: {', '.join(['#' + h for h in top_hashtags])}")
    
    return "\n".join(report)

def main():
    """Main function to run the August 2010 analysis"""
    try:
        print("Loading Twitter data...")
        tweets_data = load_twitter_data('/home/bryan/github/bcdady/bryandady.com/twitter-2025-07-31-bcdady/data/tweets.js')
        
        print("Analyzing August 2010 tweets...")
        analysis = analyze_august_2010(tweets_data)
        
        print(f"Found {analysis['total_count']} tweets in August 2010")
        
        # Generate report
        report = generate_august_report(analysis)
        
        # Save report
        output_file = '/home/bryan/github/bcdady/bryandady.com/august-2010-analysis.md'
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(report)
        
        print(f"Analysis saved to: {output_file}")
        
        # Print quick summary
        print("\n" + "="*50)
        print("AUGUST 2010 SUMMARY")
        print("="*50)
        print(f"Total tweets: {analysis['total_count']}")
        print(f"Average per day: {analysis['total_count']/31:.1f}")
        
        if analysis['hashtags']:
            print(f"Top hashtag: #{analysis['hashtags'][0][0]} ({analysis['hashtags'][0][1]} times)")
        
        if analysis['mentions']:
            print(f"Most mentioned: @{analysis['mentions'][0][0]} ({analysis['mentions'][0][1]} times)")
        
        if analysis['sources']:
            print(f"Primary source: {analysis['sources'][0][0]}")
        
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
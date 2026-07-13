#!/usr/bin/env python3
"""
Twitter Archive Analysis Script
Analyzes Bryan Dady's Twitter history to create summaries and highlights
"""

import json
import re
from datetime import datetime
from collections import Counter, defaultdict
from urllib.parse import urlparse

def load_twitter_data(file_path):
    """Load and parse the Twitter data from the JavaScript file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract JSON data from the JavaScript assignment
    json_start = content.find('[')
    json_end = content.rfind(']') + 1
    json_data = content[json_start:json_end]
    
    return json.loads(json_data)

def extract_hashtags(text):
    """Extract hashtags from tweet text"""
    return re.findall(r'#\w+', text.lower())

def extract_mentions(entities):
    """Extract user mentions from tweet entities"""
    if 'user_mentions' in entities:
        return [mention['screen_name'] for mention in entities['user_mentions']]
    return []

def extract_urls(entities):
    """Extract URLs from tweet entities"""
    urls = []
    if 'urls' in entities:
        for url in entities['urls']:
            if 'expanded_url' in url:
                urls.append(url['expanded_url'])
    return urls

def analyze_twitter_data(tweets_data):
    """Analyze the Twitter data and generate insights"""
    
    # Initialize counters and collections
    hashtags = Counter()
    mentions = Counter()
    sources = Counter()
    monthly_activity = defaultdict(int)
    yearly_activity = defaultdict(int)
    retweets_count = 0
    original_tweets = 0
    replies_count = 0
    urls_shared = []
    
    # Professional/tech related keywords
    tech_keywords = ['devops', 'sre', 'terraform', 'aws', 'powershell', 'security', 'infosec', 
                    'reliability', 'infrastructure', 'kubernetes', 'docker', 'python', 'linux']
    tech_tweets = []
    
    # Personal interests
    personal_keywords = ['coffee', 'montana', 'missoula', 'skiing', 'motorcycle', 'family']
    personal_tweets = []
    
    # Most engaging tweets (by favorites + retweets)
    engaging_tweets = []
    
    for tweet_obj in tweets_data:
        tweet = tweet_obj['tweet']
        
        # Basic stats
        created_at = datetime.strptime(tweet['created_at'], '%a %b %d %H:%M:%S %z %Y')
        month_key = created_at.strftime('%Y-%m')
        year_key = created_at.strftime('%Y')
        
        monthly_activity[month_key] += 1
        yearly_activity[year_key] += 1
        
        # Tweet type analysis
        if tweet['full_text'].startswith('RT @'):
            retweets_count += 1
        elif 'in_reply_to_screen_name' in tweet and tweet['in_reply_to_screen_name']:
            replies_count += 1
        else:
            original_tweets += 1
        
        # Source analysis
        source = re.sub(r'<[^>]+>', '', tweet['source'])
        sources[source] += 1
        
        # Content analysis
        text = tweet['full_text'].lower()
        
        # Extract hashtags
        if 'entities' in tweet and 'hashtags' in tweet['entities']:
            for hashtag in tweet['entities']['hashtags']:
                hashtags[hashtag['text'].lower()] += 1
        
        # Extract mentions
        tweet_mentions = extract_mentions(tweet.get('entities', {}))
        for mention in tweet_mentions:
            mentions[mention] += 1
        
        # Extract URLs
        tweet_urls = extract_urls(tweet.get('entities', {}))
        urls_shared.extend(tweet_urls)
        
        # Categorize tweets
        if any(keyword in text for keyword in tech_keywords):
            tech_tweets.append({
                'date': created_at.strftime('%Y-%m-%d'),
                'text': tweet['full_text'][:200] + '...' if len(tweet['full_text']) > 200 else tweet['full_text'],
                'favorites': int(tweet.get('favorite_count', 0)),
                'retweets': int(tweet.get('retweet_count', 0))
            })
        
        if any(keyword in text for keyword in personal_keywords):
            personal_tweets.append({
                'date': created_at.strftime('%Y-%m-%d'),
                'text': tweet['full_text'][:200] + '...' if len(tweet['full_text']) > 200 else tweet['full_text'],
                'favorites': int(tweet.get('favorite_count', 0)),
                'retweets': int(tweet.get('retweet_count', 0))
            })
        
        # Track engaging tweets
        engagement = int(tweet.get('favorite_count', 0)) + int(tweet.get('retweet_count', 0))
        if engagement > 0:
            engaging_tweets.append({
                'date': created_at.strftime('%Y-%m-%d'),
                'text': tweet['full_text'][:200] + '...' if len(tweet['full_text']) > 200 else tweet['full_text'],
                'favorites': int(tweet.get('favorite_count', 0)),
                'retweets': int(tweet.get('retweet_count', 0)),
                'engagement': engagement
            })
    
    # Sort and limit results
    engaging_tweets.sort(key=lambda x: x['engagement'], reverse=True)
    tech_tweets.sort(key=lambda x: x['engagement'] if 'engagement' in x else x['favorites'] + x['retweets'], reverse=True)
    personal_tweets.sort(key=lambda x: x['engagement'] if 'engagement' in x else x['favorites'] + x['retweets'], reverse=True)
    
    return {
        'total_tweets': len(tweets_data),
        'original_tweets': original_tweets,
        'retweets': retweets_count,
        'replies': replies_count,
        'top_hashtags': hashtags.most_common(15),
        'top_mentions': mentions.most_common(10),
        'top_sources': sources.most_common(5),
        'yearly_activity': dict(yearly_activity),
        'monthly_activity': dict(monthly_activity),
        'most_engaging': engaging_tweets[:10],
        'tech_tweets': tech_tweets[:10],
        'personal_tweets': personal_tweets[:10],
        'urls_count': len(urls_shared),
        'unique_urls': len(set(urls_shared))
    }

def generate_report(analysis):
    """Generate a formatted report of the Twitter analysis"""
    
    report = []
    report.append("# Bryan Dady's Twitter Archive Analysis")
    report.append("=" * 50)
    report.append("")
    
    # Overview
    report.append("## 📊 Overview")
    report.append(f"- **Total Tweets**: {analysis['total_tweets']:,}")
    report.append(f"- **Original Tweets**: {analysis['original_tweets']:,}")
    report.append(f"- **Retweets**: {analysis['retweets']:,}")
    report.append(f"- **Replies**: {analysis['replies']:,}")
    report.append(f"- **URLs Shared**: {analysis['urls_count']:,} ({analysis['unique_urls']:,} unique)")
    report.append("")
    
    # Activity by year
    report.append("## 📅 Activity by Year")
    for year in sorted(analysis['yearly_activity'].keys(), reverse=True):
        count = analysis['yearly_activity'][year]
        report.append(f"- **{year}**: {count:,} tweets")
    report.append("")
    
    # Top hashtags
    report.append("## #️⃣ Top Hashtags")
    for hashtag, count in analysis['top_hashtags']:
        report.append(f"- **#{hashtag}**: {count} times")
    report.append("")
    
    # Top mentions
    report.append("## 👥 Most Mentioned Users")
    for mention, count in analysis['top_mentions']:
        report.append(f"- **@{mention}**: {count} times")
    report.append("")
    
    # Top sources
    report.append("## 📱 Tweet Sources")
    for source, count in analysis['top_sources']:
        report.append(f"- **{source}**: {count} tweets")
    report.append("")
    
    # Most engaging tweets
    report.append("## 🔥 Most Engaging Tweets")
    for i, tweet in enumerate(analysis['most_engaging'], 1):
        report.append(f"### {i}. {tweet['date']} (❤️ {tweet['favorites']} | 🔄 {tweet['retweets']})")
        report.append(f"   {tweet['text']}")
        report.append("")
    
    # Tech-focused tweets
    report.append("## 💻 Professional/Tech Highlights")
    for i, tweet in enumerate(analysis['tech_tweets'][:5], 1):
        report.append(f"### {i}. {tweet['date']} (❤️ {tweet['favorites']} | 🔄 {tweet['retweets']})")
        report.append(f"   {tweet['text']}")
        report.append("")
    
    # Personal tweets
    report.append("## 🏔️ Personal Life Highlights")
    for i, tweet in enumerate(analysis['personal_tweets'][:5], 1):
        report.append(f"### {i}. {tweet['date']} (❤️ {tweet['favorites']} | 🔄 {tweet['retweets']})")
        report.append(f"   {tweet['text']}")
        report.append("")
    
    # Insights
    report.append("## 🔍 Key Insights")
    
    # Calculate percentages
    total = analysis['total_tweets']
    original_pct = (analysis['original_tweets'] / total) * 100
    retweet_pct = (analysis['retweets'] / total) * 100
    reply_pct = (analysis['replies'] / total) * 100
    
    report.append(f"- **Content Mix**: {original_pct:.1f}% original content, {retweet_pct:.1f}% retweets, {reply_pct:.1f}% replies")
    
    # Most active year
    most_active_year = max(analysis['yearly_activity'], key=analysis['yearly_activity'].get)
    report.append(f"- **Most Active Year**: {most_active_year} with {analysis['yearly_activity'][most_active_year]:,} tweets")
    
    # Top interests based on hashtags
    tech_hashtags = [h for h, c in analysis['top_hashtags'] if h in ['devops', 'sre', 'aws', 'terraform', 'powershell', 'infosec', 'security']]
    if tech_hashtags:
        report.append(f"- **Top Tech Interests**: {', '.join(['#' + h for h in tech_hashtags[:3]])}")
    
    # Platform usage
    top_source = analysis['top_sources'][0][0] if analysis['top_sources'] else 'Unknown'
    report.append(f"- **Primary Platform**: {top_source}")
    
    return "\n".join(report)

def main():
    """Main function to run the analysis"""
    try:
        # Load the data
        print("Loading Twitter data...")
        tweets_data = load_twitter_data('/home/bryan/github/bcdady/bryandady.com/twitter-2025-07-31-bcdady/data/tweets.js')
        
        print(f"Loaded {len(tweets_data)} tweets")
        
        # Analyze the data
        print("Analyzing tweets...")
        analysis = analyze_twitter_data(tweets_data)
        
        # Generate report
        print("Generating report...")
        report = generate_report(analysis)
        
        # Save report
        output_file = '/home/bryan/github/bcdady/bryandady.com/twitter-analysis-report.md'
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(report)
        
        print(f"Analysis complete! Report saved to: {output_file}")
        
        # Also print a summary to console
        print("\n" + "="*50)
        print("QUICK SUMMARY")
        print("="*50)
        print(f"Total tweets analyzed: {analysis['total_tweets']:,}")
        print(f"Date range: {min(analysis['yearly_activity'].keys())} - {max(analysis['yearly_activity'].keys())}")
        print(f"Most used hashtag: #{analysis['top_hashtags'][0][0]} ({analysis['top_hashtags'][0][1]} times)")
        print(f"Most mentioned user: @{analysis['top_mentions'][0][0]} ({analysis['top_mentions'][0][1]} times)")
        print(f"Most engaging tweet had {analysis['most_engaging'][0]['engagement']} total engagements")
        
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
#!/usr/bin/env python3
"""
Twitter Activity Charts
Creates visualizations of Bryan Dady's Twitter activity patterns
"""

import json
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
from datetime import datetime
from collections import defaultdict
import pandas as pd

def load_twitter_data(file_path):
    """Load and parse the Twitter data from the JavaScript file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    json_start = content.find('[')
    json_end = content.rfind(']') + 1
    json_data = content[json_start:json_end]
    
    return json.loads(json_data)

def create_activity_charts(tweets_data):
    """Create charts showing Twitter activity by year and month"""
    
    # Collect activity data
    yearly_activity = defaultdict(int)
    monthly_activity = defaultdict(int)
    
    for tweet_obj in tweets_data:
        tweet = tweet_obj['tweet']
        created_at = datetime.strptime(tweet['created_at'], '%a %b %d %H:%M:%S %z %Y')
        
        year = created_at.year
        month_key = created_at.strftime('%Y-%m')
        
        yearly_activity[year] += 1
        monthly_activity[month_key] += 1
    
    # Create figure with subplots
    fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(14, 10))
    fig.suptitle("Bryan Dady's Twitter Activity (2009-2023)", fontsize=16, fontweight='bold')
    
    # Chart 1: Activity by Year
    years = sorted(yearly_activity.keys())
    year_counts = [yearly_activity[year] for year in years]
    
    bars1 = ax1.bar(years, year_counts, color='#1DA1F2', alpha=0.8, edgecolor='white', linewidth=0.5)
    ax1.set_title('Tweets by Year', fontsize=14, fontweight='bold', pad=20)
    ax1.set_xlabel('Year', fontsize=12)
    ax1.set_ylabel('Number of Tweets', fontsize=12)
    ax1.grid(axis='y', alpha=0.3)
    
    # Add value labels on bars
    for bar, count in zip(bars1, year_counts):
        height = bar.get_height()
        ax1.text(bar.get_x() + bar.get_width()/2., height + 10,
                f'{count:,}', ha='center', va='bottom', fontsize=9)
    
    # Chart 2: Activity by Month (heatmap-style)
    # Convert monthly data to DataFrame for easier plotting
    monthly_df = pd.DataFrame(list(monthly_activity.items()), columns=['month', 'count'])
    monthly_df['date'] = pd.to_datetime(monthly_df['month'])
    monthly_df = monthly_df.sort_values('date')
    
    # Plot monthly activity as line chart
    ax2.plot(monthly_df['date'], monthly_df['count'], color='#1DA1F2', linewidth=1.5, alpha=0.8)
    ax2.fill_between(monthly_df['date'], monthly_df['count'], alpha=0.3, color='#1DA1F2')
    
    ax2.set_title('Tweets by Month (2009-2023)', fontsize=14, fontweight='bold', pad=20)
    ax2.set_xlabel('Date', fontsize=12)
    ax2.set_ylabel('Number of Tweets', fontsize=12)
    ax2.grid(alpha=0.3)
    
    # Format x-axis for monthly chart
    ax2.xaxis.set_major_locator(mdates.YearLocator())
    ax2.xaxis.set_major_formatter(mdates.DateFormatter('%Y'))
    ax2.xaxis.set_minor_locator(mdates.MonthLocator())
    
    # Rotate x-axis labels
    plt.setp(ax2.xaxis.get_majorticklabels(), rotation=45)
    
    # Add some statistics as text
    total_tweets = sum(yearly_activity.values())
    peak_year = max(yearly_activity, key=yearly_activity.get)
    peak_month = max(monthly_activity, key=monthly_activity.get)
    
    stats_text = f"""Key Statistics:
• Total Tweets: {total_tweets:,}
• Peak Year: {peak_year} ({yearly_activity[peak_year]:,} tweets)
• Peak Month: {peak_month} ({monthly_activity[peak_month]:,} tweets)
• Active Years: {len(yearly_activity)}"""
    
    fig.text(0.02, 0.02, stats_text, fontsize=10, 
             bbox=dict(boxstyle="round,pad=0.5", facecolor="lightgray", alpha=0.8))
    
    plt.tight_layout()
    plt.subplots_adjust(bottom=0.15)
    
    # Save the chart
    output_file = '/home/bryan/github/bcdady/bryandady.com/twitter-activity-charts.png'
    plt.savefig(output_file, dpi=300, bbox_inches='tight', facecolor='white')
    print(f"Charts saved to: {output_file}")
    
    # Also create a simple yearly chart for the website
    plt.figure(figsize=(12, 6))
    bars = plt.bar(years, year_counts, color='#1DA1F2', alpha=0.8, edgecolor='white', linewidth=0.5)
    plt.title("Bryan Dady's Twitter Activity by Year", fontsize=16, fontweight='bold', pad=20)
    plt.xlabel('Year', fontsize=12)
    plt.ylabel('Number of Tweets', fontsize=12)
    plt.grid(axis='y', alpha=0.3)
    
    # Add value labels
    for bar, count in zip(bars, year_counts):
        height = bar.get_height()
        plt.text(bar.get_x() + bar.get_width()/2., height + 10,
                f'{count:,}', ha='center', va='bottom', fontsize=10)
    
    plt.tight_layout()
    yearly_output = '/home/bryan/github/bcdady/bryandady.com/twitter-yearly-chart.png'
    plt.savefig(yearly_output, dpi=300, bbox_inches='tight', facecolor='white')
    print(f"Yearly chart saved to: {yearly_output}")
    
    plt.show()
    
    return yearly_activity, monthly_activity

def main():
    """Main function to create the charts"""
    try:
        print("Loading Twitter data...")
        tweets_data = load_twitter_data('/home/bryan/github/bcdady/bryandady.com/twitter-2025-07-31-bcdady/data/tweets.js')
        
        print(f"Creating charts for {len(tweets_data)} tweets...")
        yearly_activity, monthly_activity = create_activity_charts(tweets_data)
        
        print("\nActivity Summary:")
        print("="*40)
        for year in sorted(yearly_activity.keys(), reverse=True):
            print(f"{year}: {yearly_activity[year]:,} tweets")
        
        print(f"\nTotal tweets: {sum(yearly_activity.values()):,}")
        print(f"Most active year: {max(yearly_activity, key=yearly_activity.get)} ({max(yearly_activity.values()):,} tweets)")
        
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
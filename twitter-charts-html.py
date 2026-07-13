#!/usr/bin/env python3
"""
Twitter Activity Charts - HTML Version
Creates HTML visualizations of Bryan Dady's Twitter activity patterns
"""

import json
from datetime import datetime
from collections import defaultdict

def load_twitter_data(file_path):
    """Load and parse the Twitter data from the JavaScript file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    json_start = content.find('[')
    json_end = content.rfind(']') + 1
    json_data = content[json_start:json_end]
    
    return json.loads(json_data)

def create_html_charts(tweets_data):
    """Create HTML charts showing Twitter activity by year and month"""
    
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
    
    # Prepare data for charts
    years = sorted(yearly_activity.keys())
    year_counts = [yearly_activity[year] for year in years]
    max_yearly = max(year_counts)
    
    months = sorted(monthly_activity.keys())
    month_counts = [monthly_activity[month] for month in months]
    max_monthly = max(month_counts)
    
    # Create HTML with Chart.js
    html_content = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bryan Dady's Twitter Activity Charts</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }}
        .container {{
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }}
        h1 {{
            color: #1DA1F2;
            text-align: center;
            margin-bottom: 30px;
        }}
        .chart-container {{
            margin: 40px 0;
            height: 400px;
        }}
        .stats {{
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }}
        .stats h3 {{
            margin-top: 0;
            color: #1DA1F2;
        }}
        .stat-item {{
            margin: 10px 0;
            font-size: 16px;
        }}
        .highlight {{
            color: #1DA1F2;
            font-weight: bold;
        }}
    </style>
</head>
<body>
    <div class="container">
        <h1>📊 Bryan Dady's Twitter Activity (2009-2023)</h1>
        
        <div class="stats">
            <h3>📈 Key Statistics</h3>
            <div class="stat-item">• Total Tweets: <span class="highlight">{sum(yearly_activity.values()):,}</span></div>
            <div class="stat-item">• Peak Year: <span class="highlight">{max(yearly_activity, key=yearly_activity.get)} ({max(yearly_activity.values()):,} tweets)</span></div>
            <div class="stat-item">• Peak Month: <span class="highlight">{max(monthly_activity, key=monthly_activity.get)} ({max(monthly_activity.values()):,} tweets)</span></div>
            <div class="stat-item">• Active Years: <span class="highlight">{len(yearly_activity)}</span></div>
        </div>
        
        <h2>📅 Tweets by Year</h2>
        <div class="chart-container">
            <canvas id="yearlyChart"></canvas>
        </div>
        
        <h2>📊 Monthly Activity Timeline</h2>
        <div class="chart-container">
            <canvas id="monthlyChart"></canvas>
        </div>
    </div>

    <script>
        // Yearly Chart
        const yearlyCtx = document.getElementById('yearlyChart').getContext('2d');
        new Chart(yearlyCtx, {{
            type: 'bar',
            data: {{
                labels: {years},
                datasets: [{{
                    label: 'Tweets',
                    data: {year_counts},
                    backgroundColor: '#1DA1F2',
                    borderColor: '#1DA1F2',
                    borderWidth: 1
                }}]
            }},
            options: {{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {{
                    legend: {{
                        display: false
                    }},
                    title: {{
                        display: true,
                        text: 'Annual Twitter Activity'
                    }}
                }},
                scales: {{
                    y: {{
                        beginAtZero: true,
                        title: {{
                            display: true,
                            text: 'Number of Tweets'
                        }}
                    }},
                    x: {{
                        title: {{
                            display: true,
                            text: 'Year'
                        }}
                    }}
                }}
            }}
        }});

        // Monthly Chart
        const monthlyCtx = document.getElementById('monthlyChart').getContext('2d');
        new Chart(monthlyCtx, {{
            type: 'line',
            data: {{
                labels: {months},
                datasets: [{{
                    label: 'Tweets',
                    data: {month_counts},
                    borderColor: '#1DA1F2',
                    backgroundColor: 'rgba(29, 161, 242, 0.1)',
                    fill: true,
                    tension: 0.1
                }}]
            }},
            options: {{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {{
                    legend: {{
                        display: false
                    }},
                    title: {{
                        display: true,
                        text: 'Monthly Twitter Activity Over Time'
                    }}
                }},
                scales: {{
                    y: {{
                        beginAtZero: true,
                        title: {{
                            display: true,
                            text: 'Number of Tweets'
                        }}
                    }},
                    x: {{
                        title: {{
                            display: true,
                            text: 'Month'
                        }},
                        ticks: {{
                            maxTicksLimit: 20
                        }}
                    }}
                }}
            }}
        }});
    </script>
</body>
</html>
"""
    
    # Save HTML file
    output_file = '/home/bryan/github/bcdady/bryandady.com/twitter-activity-charts.html'
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print(f"Interactive charts saved to: {output_file}")
    
    # Also create a simple CSV for the data
    csv_content = "Year,Tweets\\n"
    for year in sorted(yearly_activity.keys()):
        csv_content += f"{year},{yearly_activity[year]}\\n"
    
    csv_file = '/home/bryan/github/bcdady/bryandady.com/twitter-yearly-data.csv'
    with open(csv_file, 'w') as f:
        f.write(csv_content)
    
    print(f"Data saved to: {csv_file}")
    
    return yearly_activity, monthly_activity

def main():
    """Main function to create the charts"""
    try:
        print("Loading Twitter data...")
        tweets_data = load_twitter_data('/home/bryan/github/bcdady/bryandady.com/twitter-2025-07-31-bcdady/data/tweets.js')
        
        print(f"Creating charts for {len(tweets_data)} tweets...")
        yearly_activity, monthly_activity = create_html_charts(tweets_data)
        
        print("\\nActivity Summary:")
        print("="*40)
        for year in sorted(yearly_activity.keys(), reverse=True):
            print(f"{year}: {yearly_activity[year]:,} tweets")
        
        print(f"\\nTotal tweets: {sum(yearly_activity.values()):,}")
        print(f"Most active year: {max(yearly_activity, key=yearly_activity.get)} ({max(yearly_activity.values()):,} tweets)")
        
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
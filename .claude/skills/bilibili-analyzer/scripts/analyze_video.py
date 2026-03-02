#!/usr/bin/env python3
"""
Bilibili Video Analyzer Script
Fetches metadata and statistics for a given Bilibili video (BV ID).
"""

import json
import sys
import urllib.request
import urllib.error
import re
import time

# Constants
API_BASE = "https://api.bilibili.com"
USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"

def get_headers():
    return {
        "User-Agent": USER_AGENT,
        "Referer": "https://www.bilibili.com/"
    }

def extract_bv_id(url_or_id):
    """Extract BV ID from various Bilibili URL formats"""
    bv_pattern = r'BV[A-Za-z0-9]{10}'
    
    # Check if it's already a BV ID
    if re.match(f"^{bv_pattern}$", url_or_id):
        return url_or_id

    # Search in URL
    match = re.search(bv_pattern, url_or_id)
    if match:
        return match.group(0)
    
    return None

def fetch_json(url):
    """Fetch JSON data from a URL with error handling"""
    req = urllib.request.Request(url, headers=get_headers())
    try:
        with urllib.request.urlopen(req) as response:
            data = response.read()
            return json.loads(data)
    except urllib.error.HTTPError as e:
        return {"error": f"HTTP Error {e.code}: {e.reason}"}
    except Exception as e:
        return {"error": f"Error: {str(e)}"}

def analyze_video(bv_id):
    """Fetch and aggregate video analysis data"""
    
    # 1. Get Video View Info (Basic Info + Stats)
    # API: https://api.bilibili.com/x/web-interface/view?bvid={BV_ID}
    view_url = f"{API_BASE}/x/web-interface/view?bvid={bv_id}"
    view_data = fetch_json(view_url)
    
    if "code" in view_data and view_data["code"] != 0:
        return {"error": f"Bilibili API Error: {view_data.get('message', 'Unknown error')}"}
    
    if "error" in view_data:
        return view_data

    data = view_data.get("data", {})
    
    # Extract relevant fields
    analysis = {
        "basic_info": {
            "bv_id": data.get("bvid"),
            "av_id": data.get("aid"),
            "title": data.get("title"),
            "desc": data.get("desc"),
            "pubdate": data.get("pubdate"), # Unix timestamp
            "duration": data.get("duration"), # Seconds
            "owner": data.get("owner", {}),
            "pic": data.get("pic"),
            "tname": data.get("tname") # Category name
        },
        "stats": data.get("stat", {}),
        "tags": [], # Tags are sometimes in a separate field or endpoint, but 'view' usually has them
    }
    
    # Tags might be in a separate call if not in 'view', but let's check 'view' response structure
    # Actually 'view' endpoint usually returns 'tid' and 'tname' but not full tag list.
    # We can try to get tags from https://api.bilibili.com/x/web-interface/view/detail/tag?bvid={BV_ID}
    # But let's stick to what we have first to avoid too many requests.
    
    return analysis

def format_output(analysis):
    """Format the analysis result as JSON for the agent to read"""
    return json.dumps(analysis, indent=2, ensure_ascii=False)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "Usage: python analyze_video.py <bilibili_url_or_bv_id>"}))
        sys.exit(1)
        
    input_str = sys.argv[1]
    bv_id = extract_bv_id(input_str)
    
    if not bv_id:
        print(json.dumps({"error": "Could not extract valid BV ID from input"}))
        sys.exit(1)
        
    result = analyze_video(bv_id)
    print(format_output(result))

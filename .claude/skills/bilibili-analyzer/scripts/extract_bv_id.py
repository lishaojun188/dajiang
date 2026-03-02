#!/usr/bin/env python3
"""
Extract BV ID from Bilibili URL or identifier string
"""
import re
import sys

def extract_bv_id(url_or_id):
    """Extract BV ID from various Bilibili URL formats"""
    # Pattern to match BV IDs (BV followed by 10 alphanumeric characters)
    bv_pattern = r'BV[A-Za-z0-9]{10}'

    # Common Bilibili URL patterns
    url_patterns = [
        r'https?://www\.bilibili\.com/video/(BV[A-Za-z0-9]{10})',
        r'https?://b23\.tv/(BV[A-Za-z0-9]{10})',
        r'https?://m\.bilibili\.com/video/(BV[A-Za-z0-9]{10})',
        r'(BV[A-Za-z0-9]{10})'
    ]

    # Try to match BV ID directly
    direct_match = re.search(bv_pattern, url_or_id)
    if direct_match:
        return direct_match.group(0)

    # Try URL patterns
    for pattern in url_patterns:
        match = re.search(pattern, url_or_id, re.IGNORECASE)
        if match:
            return match.group(1)

    return None

if __name__ == "__main__":
    if len(sys.argv) > 1:
        input_str = sys.argv[1]
        bv_id = extract_bv_id(input_str)
        if bv_id:
            print(bv_id)
        else:
            print("No valid BV ID found")
            sys.exit(1)
    else:
        print("Usage: python extract_bv_id.py <bilibili_url_or_bv_id>")
        sys.exit(1)
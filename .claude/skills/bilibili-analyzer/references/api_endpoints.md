# Bilibili API Endpoints Reference

## Video Information
- `https://api.bilibili.com/x/web-interface/view?bvid={BV_ID}` - Get basic video information (title, stats, owner)
- `https://api.bilibili.com/x/web-interface/archive/stat?bvid={BV_ID}` - Get video statistics
- `https://api.bilibili.com/x/web-interface/archive/desc?bvid={BV_ID}` - Get video description
- `https://api.bilibili.com/x/player/pagelist?bvid={BV_ID}` - Get video page list (for multi-part videos)

## Comment Information
- `https://api.bilibili.com/x/v2/reply?type=1&oid={aid}&sort=2` - Get video comments (sort=2 for recent)
- `https://api.bilibili.com/x/v2/reply/reply?type=1&oid={aid}&root={comment_id}` - Get replies to comments

## User (UP主) Information
- `https://api.bilibili.com/x/space/acc/info?mid={user_id}` - Get user profile information
- `https://api.bilibili.com/x/space/navnum?mid={user_id}` - Get user stats (videos, followers, etc.)
- `https://api.bilibili.com/x/space/upstat?mid={user_id}` - Get user upload statistics

## Video URLs
- `https://api.bilibili.com/x/player/playurl?bvid={BV_ID}&cid={cid}&qn=112` - Get video URL (for downloading)
- `https://api.bilibili.com/x/player/wbi/v2?bvid={BV_ID}` - Get video quality options

## Search
- `https://api.bilibili.com/x/web-interface/search/all/v2?keyword={keyword}` - Search videos

## Rate Limiting
Bilibili APIs have rate limiting. Use reasonable delays between API calls (minimum 100ms between requests). If receiving 429 errors, add exponential backoff.

## Common Error Codes
- `404`: Video deleted or not found
- `-403`: Access denied (may need login)
- `-404`: Resource not found
- `412`: Precondition failed (complete CAPTCHA)
- `429`: Too many requests

## Notes
- BV ID is preferred over AV ID in modern Bilibili
- Video URLs often redirect (www.bilibili.com/video/BV... -> b23.tv/...)
- Mobile URLs (m.bilibili.com) will redirect to www.bilibili.com
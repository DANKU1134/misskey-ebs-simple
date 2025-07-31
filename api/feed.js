export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    const token = process.env.MISSKEY_TOKEN;
    
    res.status(200).json({
        message: 'Token updated test',
        hasToken: !!token,
        tokenLength: token ? token.length : 0,
        tokenStart: token ? token.substring(0, 4) : 'none',
        tokenEnd: token ? token.substring(token.length - 4) : 'none',
        timestamp: Date.now()
    });
}
// Force redeploy with new token - 2025-07-31 20:36
export default function handler(req, res) {
    // 既存のコード...
}

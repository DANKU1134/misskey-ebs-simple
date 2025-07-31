export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // 環境変数テスト
    const token = process.env.MISSKEY_TOKEN;
    
    res.status(200).json({
        message: 'Hello from API',
        hasToken: !!token,
        tokenLength: token ? token.length : 0,
        nodeVersion: process.version,
        timestamp: new Date().toISOString()
    });
}

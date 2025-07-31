export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    const token = process.env.MISSKEY_TOKEN;
    
    res.status(200).json({
        hasToken: !!token,
        tokenLength: token ? token.length : 0,
        tokenStart: token ? token.substring(0, 4) : 'none',
        tokenEnd: token ? token.substring(token.length - 4) : 'none'
    });
}

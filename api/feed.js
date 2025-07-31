export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    const token = process.env.MISSKEY_TOKEN;
    
    res.status(200).json({
        message: 'Safe environment test',
        hasToken: !!token,
        tokenExists: token !== undefined,
        envKeys: Object.keys(process.env).filter(key => key.includes('MISSKEY')),
        timestamp: Date.now()
    });
}

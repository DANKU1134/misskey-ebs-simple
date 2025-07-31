export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    try {
        const MISSKEY_TOKEN = process.env.MISSKEY_TOKEN;
        
        console.log('Testing with reset token...');
        
        const response = await fetch('https://misskey.io/api/i', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ i: MISSKEY_TOKEN })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            return res.status(response.status).json({ 
                error: 'Still failing',
                status: response.status,
                tokenInfo: {
                    hasToken: !!MISSKEY_TOKEN,
                    tokenLength: MISSKEY_TOKEN?.length
                }
            });
        }
        
        res.status(200).json({
            message: 'SUCCESS! Token working in Vercel',
            username: data.username,
            name: data.name,
            timestamp: Date.now()
        });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

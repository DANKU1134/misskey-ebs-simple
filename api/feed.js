export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    try {
        const MISSKEY_TOKEN = process.env.MISSKEY_TOKEN;
        
        console.log('Testing Misskey API...');
        
        const response = await fetch('https://misskey.io/api/i', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ i: MISSKEY_TOKEN })
        });
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            return res.status(response.status).json({ 
                error: 'Misskey API error',
                status: response.status,
                statusText: response.statusText
            });
        }
        
        const data = await response.json();
        
        if (data.error) {
            return res.status(401).json({ 
                error: 'Token validation failed',
                details: data.error
            });
        }
        
        res.status(200).json({
            message: 'Misskey API test successful',
            username: data.username,
            name: data.name,
            id: data.id,
            timestamp: Date.now()
        });
        
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ 
            error: 'Server error',
            message: error.message
        });
    }
}

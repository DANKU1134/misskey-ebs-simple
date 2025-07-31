export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    try {
        const MISSKEY_TOKEN = process.env.MISSKEY_TOKEN;
        
        // まずユーザー情報を取得
        const userResponse = await fetch('https://misskey.io/api/i', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ i: MISSKEY_TOKEN })
        });
        
        const userData = await userResponse.json();
        
        res.status(200).json({
            message: 'User ID confirmation',
            userId: userData.id,
            username: userData.username,
            name: userData.name,
            timestamp: Date.now()
        });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

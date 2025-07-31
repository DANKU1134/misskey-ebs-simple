export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    try {
        const MISSKEY_TOKEN = process.env.MISSKEY_TOKEN;
        
        // アカウント情報を取得してトークンをテスト
        const response = await fetch('https://misskey.io/api/i', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ i: MISSKEY_TOKEN })
        });
        
        const data = await response.json();
        
        if (data.error) {
            return res.status(401).json({ 
                error: 'Token invalid',
                details: data.error 
            });
        }
        
        // トークンが有効な場合、ユーザー情報を返す
        res.status(200).json({
            message: 'Token is valid',
            username: data.username,
            name: data.name,
            id: data.id
        });
        
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
}

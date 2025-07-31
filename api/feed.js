export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    try {
        const MISSKEY_TOKEN = process.env.MISSKEY_TOKEN || '8FsdG90g3CnSBZp5UAoLi6X9VnZ6T1je';
        
        console.log('Using token:', MISSKEY_TOKEN ? 'Token exists' : 'No token');
        
        const response = await fetch('https://misskey.io/api/notes/timeline', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ i: MISSKEY_TOKEN, limit: 10 })
        });
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`Misskey API error: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Data type:', typeof data, 'Is array:', Array.isArray(data));
        
        // エラーレスポンスをチェック
        if (data.error) {
            throw new Error(`Misskey API error: ${data.error.message || data.error}`);
        }
        
        // データが配列でない場合の対処
        if (!Array.isArray(data)) {
            console.log('Data is not array:', data);
            return res.status(500).json({ 
                error: 'Invalid response format', 
                received: data 
            });
        }
        
        const formattedData = data.map(note => ({
            id: note.id,
            text: note.text || '[画像・ファイル]',
            url: `https://misskey.io/notes/${note.id}`,
            createdAt: note.createdAt,
            user: {
                username: note.user.username,
                name: note.user.name,
                avatarUrl: note.user.avatarUrl
            },
            reactions: note.reactions || {},
            reactionCount: Object.values(note.reactions || {}).reduce((sum, count) => sum + count, 0),
            repliesCount: note.repliesCount || 0,
            renoteCount: note.renoteCount || 0
        }));
        
        res.status(200).json(formattedData);
        
    } catch (error) {
        console.error('EBS Error:', error);
        res.status(500).json({ 
            error: 'Failed to fetch timeline', 
            message: error.message 
        });
    }
}
        res.status(500).json({ error: 'Failed to fetch timeline', message: error.message });
    }
}

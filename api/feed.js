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
        
        console.log('Calling Misskey API...');
        
        const response = await fetch('https://misskey.io/api/notes/timeline', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                i: MISSKEY_TOKEN, 
                limit: 5,
                withFiles: false,
                includeReplies: true,
                includeMyRenotes: true
            })
        });
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`Misskey API error: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Data received, type:', typeof data, 'isArray:', Array.isArray(data));
        
        if (data.error) {
            throw new Error(`Misskey API error: ${data.error.message}`);
        }
        
        if (!Array.isArray(data)) {
            return res.status(500).json({ 
                error: 'Invalid response format',
                dataType: typeof data,
                data: data 
            });
        }
        
        const formattedData = data.slice(0, 3).map(note => ({
            id: note.id,
            text: note.text || '[画像・ファイル]',
            url: `https://misskey.io/notes/${note.id}`,
            createdAt: note.createdAt,
            user: {
                username: note.user.username,
                name: note.user.name || note.user.username,
                avatarUrl: note.user.avatarUrl
            },
            reactions: note.reactions || {},
            reactionCount: Object.values(note.reactions || {}).reduce((sum, count) => sum + count, 0)
        }));
        
        res.status(200).json({
            success: true,
            count: formattedData.length,
            data: formattedData
        });
        
    } catch (error) {
        console.error('EBS Error:', error);
        res.status(500).json({ 
            error: 'Failed to fetch timeline', 
            message: error.message 
        });
    }
}

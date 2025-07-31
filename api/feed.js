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
        
        const response = await fetch('https://misskey.io/api/notes/timeline', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ i: MISSKEY_TOKEN, limit: 10 })
        });
        
        const data = await response.json();
        
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
        res.status(500).json({ error: 'Failed to fetch timeline', message: error.message });
    }
}

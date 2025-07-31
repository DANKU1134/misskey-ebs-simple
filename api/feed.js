export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({ 
        message: 'Emergency fix - API working',
        timestamp: Date.now()
    });
}

export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({ message: 'New code is working', timestamp: Date.now() });
}

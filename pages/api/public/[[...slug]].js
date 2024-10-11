import fs from "fs"

export default function handler(req, res) {
    if (req.query.slug && req.query.slug.length) {
        const publicDir = __dirname.split(".next")[0] + "public/"
        const fileUrl = req.query.slug.join("/")
        fs.readFile(publicDir + fileUrl, (error, data) => {
            if(error) {
                return res.status(404).send(null)
            }
            return res.status(200).send(data)
        })
    } else {
        res.status(404).send(null)
    }
}
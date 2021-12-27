class Label {
    /**
     * @description function written to Added Label into the database
     * @param {*} a valid req body is expected
     * @param {*} res
     * @returns response
     */
    addLabelById = (req, res) => {
        try {
            if (req.user) {
                return res.status(201).json({
                    message: 'Token is Valid'
                });
            } else {
                return res.status(400).json({
                    message: 'InValid Entry of Token'
                });
            }
        } catch (err) {
            logger.error('Internal Server Error');
            return res.status(500).json({
                message: 'Internal Server Error'
            }
            )
        }
    }
}
module.exports = new Label();
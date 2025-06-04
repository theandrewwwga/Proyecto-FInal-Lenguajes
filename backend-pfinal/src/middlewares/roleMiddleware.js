export function roleMiddleware(...alowedRoles) {
    return (req, res, next) => {
        const { rol } = req.user
        if (!alowedRoles.includes(rol)) {
            return res.status(400).json({
                message: 'No tienes permisos para realizar la operación'
            })
        }
        next()
    }
}
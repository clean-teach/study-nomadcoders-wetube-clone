export const join = (req, res) => res.send('Join');
export const login = (req, res) => res.send('login');
export const logout = (req, res) => res.send('logout');
export const see = (req, res) => {
    return res.send(`See User #${req.params.id}`)
};
export const edit = (req, res) => res.send('Edit User');
export const remove = (req, res) => res.send('Remove User');
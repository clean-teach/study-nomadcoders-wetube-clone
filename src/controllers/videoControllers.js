const fakeUser = {
    username: 'nico',
    loggedIn: true
};

export const home = (req, res) => {
    return res.render('home', {pageTitle: 'Home', lovesTarget: 'tomato', fakeUser});
};
export const watch = (req, res) => {
    // const id = req.params.id;
    const {id} = req.params;
    return res.render('watch', {pageTitle: `Watching : `, fakeUser});
};
export const getEdit = (req, res) => {
    const {id} = req.params;
    res.render('edit', {pageTitle: `Editing : `, fakeUser});
};
export const postEdit = (req, res) => {
    const {id} = req.params;
    const {title} = req.body;
    return res.redirect(`/videos/${id}`)
};
export const getUpload = (req, res) => {
    return res.render('upload', {pageTitle: `Upload Video`, fakeUser});
};
export const postUpload = (req, res) => {
    const {title} = req.body;
    return res.redirect(`/`);
};
// export const search = (req, res) => res.send('Search Video');
// export const remove = (req, res) => {
//     return res.send(`Delete Video #${req.params.id}`);
// };
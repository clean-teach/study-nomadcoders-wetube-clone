const fakeUser = {
    username: 'nico',
    loggedIn: true
};
let videos = [
    {
        title: 'First video', 
        rating: 2,
        comments: 5,
        createAt: '2 minutes ago',
        views: 59,
        id: 1
    },
    {
        title: 'Second video', 
        rating: 2,
        comments: 5,
        createAt: '2 minutes ago',
        views: 59,
        id: 2
    },
    {
        title: 'Third video', 
        rating: 2,
        comments: 5,
        createAt: '2 minutes ago',
        views: 59,
        id: 3
    }
];

export const trending = (req, res) => {
    return res.render('home', {pageTitle: 'Home', lovesTarget: 'tomato', fakeUser, videos})
};
export const see = (req, res) => {
    // const id = req.params.id;
    const {id} = req.params;
    const video = videos[id - 1];
    return res.render('watch', {pageTitle: `Watching ${video.title}`, fakeUser});
};
export const edit = (req, res) => res.render('edit', {pageTitle: 'Edit', fakeUser});
export const search = (req, res) => res.send('Search Video');
export const upload = (req, res) => res.send('Upload Video');
export const remove = (req, res) => {
    return res.send(`Delete Video #${req.params.id}`);
};
const fakeUser = {
    username: 'nico',
    loggedIn: false
};

export const trending = (req, res) => {
    const videos = [
        {
            title: 'First video', 
            rating: 2,
            comments: 5,
            createAt: '2 minutes ago',
            views: 59
        },
        {
            title: 'Second video', 
            rating: 2,
            comments: 5,
            createAt: '2 minutes ago',
            views: 59
        },
        {
            title: 'Third video', 
            rating: 2,
            comments: 5,
            createAt: '2 minutes ago',
            views: 59
        }
    ]
    return res.render('home', {pageTitle: 'Home', lovesTarget: 'tomato', fakeUser, videos})
};
export const see = (req, res) => res.render('watch', {pageTitle: 'Watch'});
export const edit = (req, res) => res.render('edit', {pageTitle: 'Edit'});
export const search = (req, res) => res.send('Search Video');
export const upload = (req, res) => res.send('Upload Video');
export const remove = (req, res) => {
    return res.send(`Delete Video #${req.params.id}`);
};
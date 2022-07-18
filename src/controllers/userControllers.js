import User from '../models/User';
import fetch from 'node-fetch';
import bcrypt from 'bcrypt';

export const getJoin = (req, res) => res.render('join', {pageTitle: 'Join'});
export const postJoin = async (req, res) => {
    const {name, email, username, password, password2, location} = req.body;
    const pageTitle = 'Join';
    if(password !== password2) {
        return res.status(400).render('join', {pageTitle, errorMessage: 'Password Confirmation does not match'});
    }
    const exists = await User.exists({$or : [{email}, {username}]});
    if(exists){
        return res.status(400).render('join', {pageTitle, errorMessage: 'This Email/Username is already Token'})
    }
    await User.create({
        name, email, username, password, location
    });
    res.redirect('/login');
};
export const getLogin = (req, res) => res.render('login', {pageTitle: 'Login'});
export const postLogin = async (req, res) => {
    const { username, password } = req.body;
    const pageTitle = 'Login';
    // Check if account exists
    const user = await User.findOne({username});
    if(!user) {
        return res.status(400).render('login', {pageTitle, errorMessage: 'An account with this username dose not exists.'})
    }
    // Check if password correct
    const ok = await bcrypt.compare(password, user.password);
    if(!ok) {
        return res.status(400).render('login', {pageTitle, errorMessage: 'Wrong Password.'})
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect('/');
};
export const startGithubLogin = (req, res) => {
    const baseUrl = 'https://github.com/login/oauth/authorize';
    const config = {
        client_id: process.env.GH_CLIENT,
        allow_signup: false,
        scope: "read:user user:email",
    };
    const params = new URLSearchParams(config).toString();
    const finishUrl = `${baseUrl}?${params}`;
    return res.redirect(finishUrl);
};
export const finishGithubLogin = async (req, res) => {
    const baseUrl = 'https://github.com/login/oauth/access_token';
    const config = {
        client_id: process.env.GH_CLIENT,
        client_secret: process.env.GH_SECRET,
        code: req.query.code
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    const tokenRequest = await (await fetch(finalUrl, {
        method: 'POST',
        headers: {
            Accept: "application/json",
        },
    })).json();
    if('access_token' in tokenRequest){
        const {access_token} = tokenRequest;
        const userRequest = await (await fetch('GET https://api.github.com/user', {
            method: 'GET',
            headers: {
                Authorization: `token ${access_token}`
            }
        })).json();
        console.log(userRequest);
    }else{
        return res.redirect('/login');
    }
};
export const logout = (req, res) => res.send('logout');
export const see = (req, res) => {
    return res.send(`See User #${req.params.id}`)
};
export const edit = (req, res) => res.send('Edit User');
export const remove = (req, res) => res.send('Remove User');
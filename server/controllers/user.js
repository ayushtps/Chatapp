import { User } from '../modals/user.js'
//create a user and save it to the database and save cookie

const newUser = async (req, res) => {
    const { name, username, bio, password } = req.body
    console.log(req.body);
    const avatar = {
        public_id: 'jbsad',
        url: 'jncdj',
    }
    await User.create({
        name: 'ayush',
        username: 'paghadal',
        password: 'ayush',
        avatar
    })
    res.status(201).json({ message: 'User created successfullly' })
};
const login = (req, res) => {
    res.send('hello world')
};


export { login, newUser }
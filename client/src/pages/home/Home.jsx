import axios from 'axios';
import { useEffect, useState } from 'react';
import Featured from '../../components/featured/Featured';
import Footer from '../../components/footer/Footer';
import List from '../../components/list/List';
import Navbar from '../../components/navbar/Navbar';
import './home.scss';

const Home = ({ type }) => {
    const [lists, setLists] = useState([]);
    const [genre, setGenre] = useState(null);

    useEffect(() => {
        const getRandomLists = async () => {
            try {
                const res = await axios.get(
                    `lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`,
                    {
                        headers: {
                            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYjMxYjU1YTFjNjcyMmYzYjMwODZlYiIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NzI2ODIzNDQsImV4cCI6MTY3Mzk3ODM0NH0.wg2Q0fvjJ6V2uC4dNnCyMvFmHfQHXnqd9zd3NByCXi8",
                        },
                    }
                );
                setLists(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getRandomLists();
    }, [type, genre])


    return (
        <div className="home">
            <Navbar />
            <Featured type={type} setGenre={setGenre} />
            {lists.map((list) => (
                <List key={list._id} list={list} />
            ))}
            <Footer />
        </div>
    );
}

export default Home;

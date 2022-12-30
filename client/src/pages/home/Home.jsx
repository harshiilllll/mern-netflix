import axios from 'axios';
import { useEffect, useState } from 'react';
import Featured from '../../components/featured/Featured';
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
                            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTQxNzViOTM1ZWYxODY1YmRjMDRmNCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3MjIzODY2NywiZXhwIjoxNjcyNjcwNjY3fQ.R99XRjYNMSy0jF7glDx9WVsDLYoVAeOcjTB8kEdf4yQ",
                        },
                    }
                );
                setLists(res.data);
                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getRandomLists();
    }, [type, genre])


    return (
        <div className="home">
            <Navbar />
            <Featured type={type} />
            {lists.map((list) => (
                <List key={list._id} list={list} />
            ))}
        </div>
    );
}

export default Home;

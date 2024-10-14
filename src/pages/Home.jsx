import configService from "../appwrite/config";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PostCard from "../components/PostCard";
import authService from "../appwrite/auth";

function Home() {
  const [habits, setHabits] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const user = useSelector(state => state.auth.status) ;

  useEffect( () => {
   

    const fetchData = async () => {
      setLoading(true);
      setError(null)
      try {

        if(user){
          setLoggedIn(true);
          const res = await configService.getHabitList();
          
          if(res){
            setHabits(res.documents);
            setLoading(false);
          }

        }else{
          setLoggedIn(false);
          setLoading(false);
        }
      } catch (error) {
        setError(error.message);
        console.log("Appwrite :: getHabits :: Error :: ", error.message);
        setLoading(false);
      }
    }

    fetchData();

  }, []);

  if (loading) {
    return <p>Loading...</p>;
  } else {
    if (loggedIn) {
      if (habits == 0) {
        return (
          <div>
            <h1>No Habits Added yet</h1>
          </div>
        );
      } else {
        return (
          <div className="bg-black  text-white h-screen mt-2">
            <p className="font-bold text-center"> Welcome, Acer!</p>
            {error ? (
              <p className="text-red-400">{error}</p>
            ) : (
              habits.map((habit) => (
                <PostCard
                  key={habit.$id}
                  $id={habit.$id}
                  name={habit.name}
                  streak={habit.streak}
                  status={habit.complete}
                />
              ))
            )}
            <button onClick={() => authService.logout()}>Logout</button>
          </div>
        );
      }
    } else {
      return <h1>Please Log In or Sign Up</h1>;
    }
  }
}

export default Home;

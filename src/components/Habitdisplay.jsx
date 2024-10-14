import React, { useEffect, useState } from "react";
import { Card } from "./index";
import configService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "./Modal";

function Habitdisplay() {
  const [checkInRemaining, setCheckInRemaining] = useState(true);
  const [data, setData] = useState([]); //For Storing Streak Info..
  const [habit, setHabit] = useState({});
  const [remainDays , setRemainingDays] = useState(0)
  const [streakMaintained, setStreakMaintained] = useState(null);
  const [loading, SetLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);


  const navigate = useNavigate();
  let remainD = 0;
 

  const { habitId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        SetLoading(true);
        const habitRes = await configService.getHabit(habitId);

        setHabit(habitRes);
  
        const streakInfoRes = await configService.getStreakInfo(habitId);

        setData(streakInfoRes.documents[0]);
        console.log(streakInfoRes.documents[0]);
      } catch (error) {
        console.error(error);
      } finally {
        
        SetLoading(false);
      }
    };
  
    fetchData();
  }, [habitId]);

  // useEffect(() => {
    

    
  // }, []);

  useEffect(() => {
  

    if (data) {
      const currentDate = new Date();

      const prevDate = new Date(data.previousDate);
      const startDate = new Date(data.startDate);


      remainD = Math.floor((Math.abs(currentDate - startDate))/(1000 * 60 * 60 * 24) )

      setRemainingDays(habit.goal - remainD);
      const diffDays = Math.floor((Math.abs(currentDate - prevDate)) / (1000 * 60 * 60 * 24));


      if (diffDays >= 1) {
        setCheckInRemaining(true);
        if (diffDays === 1) {
          setStreakMaintained(true);
        } else {
          setStreakMaintained(false);
          habit.streak = 0;
        }
      } else {
        setCheckInRemaining(false);
        setStreakMaintained(true);
      }
    }
    

    
  }, [data]);

 const handleModal = ()=>{
    setShowModal(true)
 }
 const handleCloseModal = ()=>{
    setShowModal(false)
 }

  async function updateHabitStreak() {

    if (habit.streak == 0) {
      habit.streak++;
      console.log("zero if hit")
    } else {
      if (streakMaintained) {
        console.log("sbc hit");
        habit.streak++;
      } else {
        console.log("else hit")
        habit.streak = 0;
      }
    }
   
    if(remainDays <=0){
        habit.complete = true
    }

    const res = await configService.updateDocument(habitId, {
      streak: habit.streak,
      complete : habit.complete,
    });
    if (res) {
      console.log("successfully Habit updated!");
    }
  }

  async function updateStreakInfo() {
    if(habit.streak > data.maxStreak){
      data.maxStreak = habit.streak
    }
    const res = await configService.updateStreak(data.$id, {
      previousDate: new Date(),
      maxStreak : data.maxStreak,
    });
    if (res) {
      console.log("Successfully Updated Streak Info!");
    }
  }

  async function handleClick() {
    try {
      SetLoading(true);
      await updateHabitStreak();
       await updateStreakInfo();
       setCheckInRemaining(false);
    } catch (error) {
      console.log("Appwrite :: getHabitList  :: Error :: ", error.message);
    } finally {
      SetLoading(false);
    }
  }

  async function handleDelete() {
    try {
      SetLoading(true);
      const res = await configService.deleteDocument(habitId);
      const streakRes = await configService.deleteStreakinfo(data.$id)
      if (res && streakRes) {
        console.log("successfully Deleted!");
      }
    } catch (error) {
      console.log("Appwrite :: getHabitList  :: Error :: ", error.message);
    } finally {
      SetLoading(false);
      navigate("/");
    }
  }

  return (
    <div id="content">
      {loading? (<p className="text-2xl flex flex-row justify-center items-center"> Loading...Please Wait</p>) :
    (<>
      <Card>
        <p>{habit.name}</p>
        <div>
          {habit.complete ? <p>DeadLine Completed</p> : <p>In Progress</p>}
          <p>Ongoing Streak : {habit.streak} </p>
        </div>
      </Card>


        {habit.complete ? (
          <>
          <h1>Finished Succesfully</h1>
          <p>Stats</p>
          </>
        ): (
          <>
              <Card>
            <p>Today's Status</p>
            <div>
              {checkInRemaining ? (
                <div>
                  <p>Have You Completed the task today?</p>
                  <div className="flex flex-col gap-2 w-auto">
                  <button className="bg-green-700 rounded-md w-[65%] text-center " onClick={handleClick}>Yes</button>
                  <button className="bg-red-500 rounded-md w-[65%] text-center" onClick={handleModal}>
                    No
                  </button>
                  {showModal && <Modal
                   handleCloseModal={handleCloseModal} 
                   imp= {habit.importance} 
                   title = {"Do You Really Wanna Break The Streak ?"}
                   message = {"You Have a Ongoing Streak of " + habit.streak + "...Think About it.." }
                   actionLabel = {"Complete With Pomodoro Timer"}
                   actionHandler = {()=>{navigate("/pomodoro")}}
                    />}
                  <button onClick={()=>{navigate("/pomodoro")}}>Do Now With Pomodoro (Recommended)</button>
                  </div>
                </div>
              ) : (
                <p>Congrats Your Defeated Your Demon Today!</p>
              )}
            </div>
          </Card>
          <Card>
            <p>Analysis and Details</p>
            <div className="flex flex-row justify-evenly">
              <div>
                <p>Max Streak : {data.maxStreak}</p>
                <p>Goal : {habit.goal} Days</p>
              </div>
              <div>
                <p>Hrs/day : {habit.hrsday}</p>
                <p>Remaining Days : {remainDays}</p>
              </div>
            </div>
          </Card>
          
          </>
        )}


      <Card>
        <button className="bg-red-700 text-white rounded-md" onClick={handleDelete}>Delete {habit.name}</button>
      </Card>
      </>
)}
    </div>
  );
}

export default Habitdisplay;

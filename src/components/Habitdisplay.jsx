import React, { useEffect, useState } from "react";
import { Card } from "./index";
import configService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

function Habitdisplay() {
  const [checkInRemaining, setCheckInRemaining] = useState(true);
  const [data, setData] = useState([]);
  const [habit, setHabit] = useState({});
  const [streakMaintained, setStreakMaintained] = useState(null);
  const [loading, SetLoading] = useState(false);
  const navigate = useNavigate();

  const { habitId } = useParams();

  useEffect(() => {
    configService.getHabit(habitId).then((res) => {
      console.log(res);
      setHabit(res);
    });
  }, []);

  useEffect(() => {
    configService.getStreakInfo(habitId).then((res) => {
      setData(res.documents[0]);
    });
  }, [habitId]);

  useEffect(() => {
    if (data) {
      const currentDate = new Date();
      const diffTime = Math.abs(currentDate - data.previousDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays >= 1) {
        setCheckInRemaining(true);
        setStreakMaintained(false);
      } else {
        setCheckInRemaining(false);
        setStreakMaintained(true);
      }
    }
  });

  async function updateHabitStreak() {
    if (habit.streak == 0) {
      habit.streak++;
    } else {
      if (streakMaintained) {
        habit.streak++;
      } else {
        habit.streak = 0;
      }
    }

    const res = await configService.updateDocument(habitId, {
      streak: habit.streak,
    });
    if (res) {
      console.log("successfully Done!");
    }
  }

  async function updateStreakInfo() {
    const res = await configService.updateStreak(data.$id, {
      previousDate: new Date(),
    });
    if (res) {
      console.log("successfully Done!");
    }
  }

  async function handleClick() {
    try {
      SetLoading(true);
      await updateHabitStreak();
      await updateStreakInfo();
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
      if (res) {
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
    <div>
      <Card>
        <p>{habit.name}</p>
        <div>
          {habit.status ? <p>Aced it!</p> : <p>In Progress</p>}
          <p>Streak : {habit.streak} </p>
        </div>
      </Card>

      <Card>
        <p>Today's Status</p>
        <div>
          {checkInRemaining ? (
            <div>
              <p>HAve You Completed the task today?</p>
              <button onClick={handleClick}>Yes</button>
              <button>No</button>
              <button>Do Now With Pomodoro (Recommended)</button>
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
            <p>Streak Count : {habit.streak}</p>
            <p>Goal : {habit.goal}</p>
          </div>
          <div>
            <p>Perday Task : {habit.hrsday}</p>
            <p>Remaining Days : {habit.remainday}</p>
          </div>
        </div>
      </Card>

      <Card>
        <p>Delete {habit.name}</p>
        <button onClick={handleDelete}>Delete</button>
      </Card>
    </div>
  );
}

export default Habitdisplay;

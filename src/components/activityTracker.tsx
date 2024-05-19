import React, { useEffect, useState } from "react";
import ActivityList from './activityList';

interface Activity {
  name: string;
  time: number;
  isRunning: boolean;
}

const ActivityTracker: React.FC = () => {

  //States for activity
  const [activities, setActivities] = useState<Activity[]>([]);
  const [currentActivity, setCurrentActivity] = useState('');

  // Adds 1 to time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setActivities(prevActivities => {
        return prevActivities.map(activity => {
          if (activity.isRunning) {
            return { ...activity, time: activity.time + 1 };
          }
          return activity;
        });
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Adds new activity to Activities array
  const handleAddActivity = () => {
    setActivities([...activities, { name: currentActivity, time: 0, isRunning: false }]);
    setCurrentActivity('');
  };

  //iterates through the activities array
  //updates the isRunning to true for the index of the activity
  const handleStart = (index: number) => {
    setActivities(prevActivities =>
      prevActivities.map((activity, i) => {
        if (i === index) {
          return { ...activity, isRunning: true };
        }
        return activity;
      })
    );
  };

  //iterates through the activities array
  // updates the isRunning to false for the index of the activity
  const handleStop = (index: number) => {
    setActivities(prevActivities =>
      prevActivities.map((activity, i) => {
        if (i === index) {
          return { ...activity, isRunning: false };
        }
        return activity;
      })
    );
  };

  //keeps the activities that doesnt match with the index of the selected activity to be removed
  const handleRemove = (index: number) => {
    setActivities(prevActivities => prevActivities.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-4">
      <input
        type="text"
        value={currentActivity}
        onChange={(e) => setCurrentActivity(e.target.value)}
        className="border rounded p-2 mr-2"
        placeholder="Activity name"
      />
      <button 
        onClick={handleAddActivity}
        className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Activity
      </button>
      <ActivityList 
        activities={activities}
        onStart={handleStart}
        onStop={handleStop}
        onRemove={handleRemove}
         />
    </div>
  );
};

export default ActivityTracker;


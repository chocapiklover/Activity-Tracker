import React, { useEffect, useState } from "react";
import ActivityList from './activityList';

interface Activity {
  name: string;
  time: number;
  isRunning: boolean;
}

const ActivityTracker: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [currentActivity, setCurrentActivity] = useState('');

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

  const handleAddActivity = () => {
    setActivities([...activities, { name: currentActivity, time: 0, isRunning: false }]);
    setCurrentActivity('');
  };

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

  const handleReset = (index: number) => {
    setActivities(prevActivities =>
      prevActivities.map((activity, i) => {
        if (i === index) {
          return { ...activity, time: 0, isRunning: false };
        }
        return activity;
      })
    );
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
      <button onClick={handleAddActivity} className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Activity
      </button>
      <ActivityList activities={activities} onStart={handleStart} onStop={handleStop} onReset={handleReset} />
    </div>
  );
};

export default ActivityTracker;


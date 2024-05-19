import React from 'react';

interface Activity {
  name: string;
  time: number;
  isRunning: boolean;
}

interface ActivityListProps {
  activities: Activity[];
  onStart: (index: number) => void;
  onStop: (index: number) => void;
  onReset: (index: number) => void;
}

const ActivityList: React.FC<ActivityListProps> = ({ activities, onStart, onStop, onReset }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Activity List</h2>
      <ul>
        {activities.map((activity, index) => (
          <li key={index} className="border-b py-2 flex justify-between items-center">
            <span>
              {activity.name}: {new Date(activity.time * 1000).toISOString().slice(11, 19)}
            </span>
            <div>
              <button
                onClick={() => onStart(index)}
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                disabled={activity.isRunning}
              >
                Start
              </button>
              <button
                onClick={() => onStop(index)}
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                disabled={!activity.isRunning}
              >
                Stop
              </button>
              <button onClick={() => onReset(index)} className="bg-gray-500 text-white px-4 py-2 rounded">
                Reset
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityList;



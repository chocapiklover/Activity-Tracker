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
  
  onRemove: (index: number) => void;
}

const ActivityList: React.FC<ActivityListProps> = ({ activities, onStart, onStop, onRemove }) => {
  return (
    <div className="mt-4">
      <h2 className="text-3xl text-center font-bold mb-2">Activity List</h2>
      <ul className=' space-y-2 '>
        {activities.map((activity, index) => (
          <li key={index} className="border rounded-xl py-2 flex flex-col justify-between items-center">
            <span 
                className='mx-3 my-6 text-xl font-semibold '>
                {activity.name}
            </span>
            <span 
                className='mx-3 text-xl font-semibold '>
                 {new Date(activity.time * 1000).toISOString().slice(11, 19)}
            </span>
            <div className='mx-4 mt-6 my-2'>
              <button
                onClick={() => onStart(index)}
                className="bg-green-400 text-white px-4 py-2 rounded mr-2"
                disabled={activity.isRunning}
              >
                Start
              </button>
              <button
                onClick={() => onStop(index)}
                className="bg-orange-300 text-white px-4 py-2 rounded mr-2"
                disabled={!activity.isRunning}
              >
                Pause
              </button>
              
              <button onClick={() => onRemove(index)} className="bg-red-400 text-white px-4 py-2 mr-2 rounded">
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityList;



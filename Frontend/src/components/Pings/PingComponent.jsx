import React, { useState, useEffect } from 'react';
import { 
  FaBell, FaCheckCircle, FaTimesCircle, FaInfoCircle, FaUserPlus, 
  FaCommentDots, FaExclamationCircle, FaEnvelope, FaAt, FaFileUpload, 
  FaFlagCheckered, FaQuestionCircle, FaSyncAlt, FaCogs, FaUsers, FaHandshake 
} from 'react-icons/fa';


const Pings = () => {
  const [pings, setPings] = useState([]);

  useEffect(() => {
    // Dummy data for pings
    const dummyPings = [
      { id: 1, type: 'invite', message: 'You have been invited to collaborate on "Project Alpha".', date: new Date('2024-05-31T09:00:00'), status: 'new' },
      { id: 2, type: 'update', message: 'The status of "Project Beta" has been updated to "In Progress".', date: new Date('2024-05-31T11:30:00'), status: 'read' },
      { id: 3, type: 'task', message: 'A new task "Edit video" has been assigned to you for "Project Gamma".', date: new Date('2024-05-30T14:00:00'), status: 'new' },
      { id: 4, type: 'comment', message: 'A comment was added to "Project Delta".', date: new Date('2024-05-30T16:45:00'), status: 'new' },
      { id: 5, type: 'approval', message: 'Your video for "Project Epsilon" has been approved.', date: new Date('2024-05-29T10:20:00'), status: 'read' },
      { id: 6, type: 'reminder', message: 'Reminder: The deadline for "Project Zeta" is tomorrow.', date: new Date('2024-05-28T09:00:00'), status: 'new' },
      { id: 7, type: 'deadline', message: 'The deadline for "Project Eta" is today.', date: new Date('2024-05-28T12:00:00'), status: 'new' },
      { id: 8, type: 'message', message: 'You have a new message from John.', date: new Date('2024-05-27T14:30:00'), status: 'new' },
      { id: 9, type: 'mention', message: 'You were mentioned in a comment on "Project Theta".', date: new Date('2024-05-26T17:15:00'), status: 'new' },
      { id: 10, type: 'file-upload', message: 'A new file was uploaded to "Project Iota".', date: new Date('2024-05-26T09:45:00'), status: 'new' },
      { id: 11, type: 'milestone', message: '"Project Kappa" has reached its first milestone.', date: new Date('2024-05-25T16:00:00'), status: 'new' },
      { id: 12, type: 'feedback-request', message: 'Feedback is requested for the video on "Project Lambda".', date: new Date('2024-05-25T11:00:00'), status: 'new' },
      { id: 13, type: 'revision-request', message: 'Revisions requested for the video on "Project Mu".', date: new Date('2024-05-24T15:30:00'), status: 'new' },
      { id: 14, type: 'system-alert', message: 'System maintenance scheduled for midnight.', date: new Date('2024-05-23T18:00:00'), status: 'new' },
      { id: 15, type: 'team-join', message: 'Jane Doe has joined the team on "Project Nu".', date: new Date('2024-05-22T10:00:00'), status: 'new' },
      { id: 16, type: 'collaboration-request', message: 'Collaboration request received for "Project Xi".', date: new Date('2024-05-21T13:45:00'), status: 'new' },
    ];

    setPings(dummyPings);
  }, []);

  const formatDate = (date) => {
    const options = { month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const getIcon = (type) => {
    switch (type) {
      case 'invite':
        return <FaUserPlus className="text-blue-500" />;
      case 'update':
        return <FaInfoCircle className="text-yellow-500" />;
      case 'task':
        return <FaCheckCircle className="text-green-500" />;
      case 'comment':
        return <FaCommentDots className="text-purple-500" />;
      case 'approval':
        return <FaCheckCircle className="text-green-500" />;
      case 'reminder':
        return <FaBell className="text-red-500" />;
      case 'deadline':
        return <FaExclamationCircle className="text-red-500" />;
      case 'message':
        return <FaEnvelope className="text-blue-500" />;
      case 'mention':
        return <FaAt className="text-yellow-500" />;
      case 'file-upload':
        return <FaFileUpload className="text-blue-500" />;
      case 'milestone':
        return <FaFlagCheckered className="text-green-500" />;
      case 'feedback-request':
        return <FaQuestionCircle className="text-blue-500" />;
      case 'revision-request':
        return <FaSyncAlt className="text-yellow-500" />;
      case 'system-alert':
        return <FaCogs className="text-gray-500" />;
      case 'team-join':
        return <FaUsers className="text-green-500" />;
      case 'collaboration-request':
        return <FaHandshake className="text-blue-500" />;
      default:
        return <FaInfoCircle className="text-gray-500" />;
    }
  };

  // Group notifications by date
  const groupedPings = pings.reduce((acc, ping) => {
    const dateKey = ping.date.toDateString();
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(ping);
    return acc;
  }, {});

  return (
    <div className="pings-page p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Your Pings</h1>
      <div className="space-y-6">
        {Object.entries(groupedPings).map(([date, pings]) => (
          <div key={date} className="ping-thread">
            <h2 className="text-lg font-semibold mb-2">{formatDate(date)}</h2>
            <ul className="space-y-4">
              {pings.map((ping) => (
                <li key={ping.id} className={`ping-item p-4 rounded shadow-md ${ping.status === 'new' ? 'bg-white' : 'bg-gray-200'}`}>
                  <div className="flex items-center">
                    <div className="icon mr-4 text-xl">
                      {getIcon(ping.type)}
                    </div>
                    <div>
                      <p className="text-lg">{ping.message}</p>
                      <span className="text-sm text-gray-500">{new Date(ping.date).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pings;

   

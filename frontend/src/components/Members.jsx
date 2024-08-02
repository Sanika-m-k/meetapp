import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Members = ({ organizationCode, onSelectMember }) => {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        console.log(organizationCode)
        const response = await axios.get(`http://localhost:8080/api/organizations/members/${organizationCode.code}`);
        console.log(response.data)
        setMembers(response.data);
      } catch (error) {
        if (error) {
          console.log("Error:", error)
        } else {
          setError('Internal Server Error');
        }
      }
    };

    fetchMembers();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-midnight-blue p-4 rounded-lg">
      <h2 className="text-white text-xl mb-4">Members List</h2>
      <div className="space-y-2">
        {members.map((member, index) => (
          <button
            key={index}
            onClick={() => onSelectMember(member)}
            className="w-full text-left bg-soft-blue text-white p-2 rounded-lg hover:bg-blue-700"
          >
            {member}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Members;

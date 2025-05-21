import { useEffect, useState } from "react";
import axios from "axios";

const FriendsPage = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await axios.get("/api/users/friends");
        console.log("Fetched friends:", res.data);
        setFriends(res.data); // should be an array
      } catch (error) {
        console.error("Failed to fetch friends:", error);
        setFriends([]); // fallback
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  if (loading) {
    return (
      <div className="p-4 space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="skeleton h-20 w-full rounded-lg"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Friends</h2>
      {Array.isArray(friends) && friends.length === 0 ? (
        <p className="text-gray-500">You have no friends yet.</p>
      ) : (
        <div className="space-y-4">
          {Array.isArray(friends) &&
            friends.map((friend) => (
              <div
                key={friend._id}
                className="flex items-center gap-4 p-4 bg-base-200 rounded-lg shadow"
              >
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src={friend.profilePic} alt={friend.fullName} />
                  </div>
                </div>
                <div>
                  <p className="font-semibold">{friend.fullName}</p>
                  <p className="text-sm text-gray-500">
                    Speaks {friend.nativeLanguage} • Learning {friend.learningLanguage}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default FriendsPage;

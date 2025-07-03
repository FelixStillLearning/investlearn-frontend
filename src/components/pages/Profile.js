import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateUserProfile, getUserById, followUser, unfollowUser } from '../../store/slices/authSlice';

const Profile = () => {
  const { id } = useParams(); // Get user ID from URL, if any
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const [profileUser, setProfileUser] = useState(null); // User whose profile is being viewed

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: '',
    riskTolerance: 'moderate',
    profileVisibility: 'public',
  });

  useEffect(() => {
    if (id) {
      // Viewing another user's profile
      dispatch(getUserById(id)).then(res => {
        if (res.payload) {
          setProfileUser(res.payload);
        }
      });
    } else if (user) {
      // Viewing own profile
      setProfileUser(user);
      setFormData({
        firstName: user.profile.firstName || '',
        lastName: user.profile.lastName || '',
        country: user.profile.country || '',
        riskTolerance: user.profile.riskTolerance || 'moderate',
        profileVisibility: user.settings.privacy.profileVisibility || 'public',
      });
    }
  }, [dispatch, id, user]);

  const { firstName, lastName, country, riskTolerance, profileVisibility } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(formData));
  };

  const handleFollow = () => {
    dispatch(followUser(profileUser._id));
  };

  const handleUnfollow = () => {
    dispatch(unfollowUser(profileUser._id));
  };

  if (loading || !profileUser) return <p>Loading profile...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  const isOwnProfile = user && profileUser._id === user._id;
  const isFollowing = user && user.following.includes(profileUser._id);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">{isOwnProfile ? 'My Profile' : `${profileUser.username}'s Profile`}</h2>
      {error && <p className="text-red-500 mb-4">Error: {error.message}</p>}

      {!isOwnProfile && (
        <div className="mb-4">
          {isFollowing ? (
            <button
              onClick={handleUnfollow}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
            >
              Unfollow
            </button>
          ) : (
            <button
              onClick={handleFollow}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
            >
              Follow
            </button>
          )}
        </div>
      )}

      {isOwnProfile ? (
        <form onSubmit={onSubmit} className="bg-white rounded-xl shadow-sm p-6 max-w-lg mx-auto">
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={onChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={onChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="country" className="block text-gray-700 text-sm font-bold mb-2">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              value={country}
              onChange={onChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="riskTolerance" className="block text-gray-700 text-sm font-bold mb-2">Risk Tolerance</label>
            <select
              id="riskTolerance"
              name="riskTolerance"
              value={riskTolerance}
              onChange={onChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="conservative">Conservative</option>
              <option value="moderate">Moderate</option>
              <option value="aggressive">Aggressive</option>
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="profileVisibility" className="block text-gray-700 text-sm font-bold mb-2">Profile Visibility</label>
            <select
              id="profileVisibility"
              name="profileVisibility"
              value={profileVisibility}
              onChange={onChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="public">Public</option>
              <option value="friends">Friends</option>
              <option value="private">Private</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
          >
            Update Profile
          </button>
        </form>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-6 max-w-lg mx-auto">
          <p className="text-gray-700 text-lg mb-2">Username: {profileUser.username}</p>
          <p className="text-gray-700 text-lg mb-2">First Name: {profileUser.profile.firstName}</p>
          <p className="text-gray-700 text-lg mb-2">Last Name: {profileUser.profile.lastName}</p>
          <p className="text-gray-700 text-lg mb-2">Country: {profileUser.profile.country}</p>
          <p className="text-gray-700 text-lg mb-2">Risk Tolerance: {profileUser.profile.riskTolerance}</p>
          <p className="text-gray-700 text-lg mb-2">Followers: {profileUser.followers.length}</p>
          <p className="text-gray-700 text-lg mb-2">Following: {profileUser.following.length}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
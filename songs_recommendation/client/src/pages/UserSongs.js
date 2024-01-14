import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.js';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Song from './Song';

const UserSongs = () => {
    const { user } = useAuth();
    const [error, setError] = useState(null);
    const [songs, setSongs] = useState([]);
    const [similarSongs, setSimilarSongs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fisherYatesShuffle = (array) => {
        let currentIndex = array.length, temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    };

    useEffect(() => {
        const fetchUserSongs = async () => {
            try {
                console.log('Fetching user songs...');
                const { data } = await axios.get(`http://127.0.0.1:5000/songs/logged/${user}`);
                console.log('User songs:', data);
                setSongs(fisherYatesShuffle(data.songs));
            } catch (err) {
                console.error('Error fetching user songs:', err);
                setError(err.response?.data?.error || 'An error occurred');
            }
        };

        fetchUserSongs();
    }, [user]);

    useEffect(() => {
        const fetchSimilarSongs = async () => {
            try {
                if (songs.length > 0) {
                    console.log('Fetching similar songs...');
                    const { data: similarSongsData } = await axios.get(`http://127.0.0.1:5000/songs/song/similar/${songs[0].id}`);
                    console.log('Similar songs:', similarSongsData);
                    setSimilarSongs(fisherYatesShuffle(similarSongsData.songs));
                }
            } catch (err) {
                console.error('Error fetching similar songs:', err);
                setError(err.response?.data?.error || 'An error occurred');
            } finally {
                console.log('Setting loading to false.');
                setLoading(false);
            }
        };

        fetchSimilarSongs();
    }, [songs]);

    return (
        <div className="min-h-screen bg-emerald-900 p-4">
            <h3 className="text-xl font-bold mt-4 text-white">Your Songs</h3>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {error ? (
                        <p>Error: {error}</p>
                    ) : (
                        <div className='grid grid-cols-4 gap-y-4'>
                            {songs.map((song) => (
                                <Link key={song.id} to={`/songs/${song.id}`} className="text-decoration-none">
                                    <Song id={song.id} title={song.title} artist={song.artist} />
                                </Link>
                            ))}
                        </div>
                    )}
                </>
            )}

            <h3 className="text-xl font-bold mt-4 text-white">Similar Songs</h3>
            {similarSongs.length > 0 ? (
                <div className="grid grid-cols-4 gap-y-4">
                    {similarSongs.map((song) => (
                        <Link key={song.id} to={`/songs/${song.id}`} className="text-decoration-none">
                            <Song id={song.id} title={song.title} artist={song.artist} />
                        </Link>
                    ))}
                </div>
            ) : (
                <p>No similar songs found.</p>
            )}

        </div>
    );
};

export default UserSongs;

from flask import Flask, jsonify, request
from neo4j import GraphDatabase
from flask_cors import CORS
from dotenv import load_dotenv
import os

# TABLE OF CONTENTS

# def get_access(): LINE 48
# def get_songs(): LINE 77
# def like_song(songid): LINE 119
# def unlike_song(songid): LINE 139
# def get_song_by_id(songid): LINE 158
# def get_similar_song_by_id(songid): LINE 201
# def get_favourite_songs_by_user(userid): LINE 288
# def add_song_to_favourite(userid, songid): LINE 317
# def remove_song_from_favourite(userid, songid): LINE 338
# def get_artists(): LINE 360
# def get_songs_by_artist(artist): LINE 390
# def get_songs_by_tag(tag): LINE 417




app = Flask(__name__)
CORS(app)


load_dotenv()
uri = os.getenv("NEO4J_URI")
user = os.getenv("NEO4J_USERNAME")
password = os.getenv("NEO4J_PASSWORD")

with GraphDatabase.driver(uri, auth=(user, password)) as driver:
    driver.verify_connectivity()


    @app.route("/", methods=['GET'])
    def hello_world():
        response_body = {
            "message": "Hello World"
        }

        response = jsonify(response_body)
        return response


    @app.route("/user/login/access")
    def get_access():
        data = request.get_json()
        with driver.session() as session:
            def session_get_access(tx, email, password):
                result = tx.run(
                    """
                        MATCH (u:User {email: $email, password: $password})
                        RETURN u;
                    """,
                    email=email,
                    password=password
                )

                return [ record["u"] for record in result ]
            
            auth = session.execute_read(session_get_access, email=data["email"], password=data["password"])
        
        response_body = {}

        if len(auth) == 0:
            response_body["auth"] = False
        else:
            response_body["auth"] = True
        
        response = jsonify(response_body)
        return response


    @app.route('/songs', methods=['GET'])
    def get_songs():
        with driver.session() as session:
            def session_get_songs(tx):
                result = tx.run(
                    """
                        MATCH (s:Song)
                        RETURN s ORDER BY RAND() LIMIT 25;
                    """,
                )

                return [ record["s"] for record in result ]
            
            songs = session.execute_read(session_get_songs)

            session.close()

        response_body = {
            "songs": [
                {
                    "id": song["id"],
                    "title": song["title"],
                    "likes": song["likes"],
                    "loves": song["loves"],
                    "hates": song["hates"],
                    "compound": song["sentiment_compound"],
                    "angry": song["emotion_Angry"],
                    "happy": song["emotion_Happy"],
                    "surprise": song["emotion_Surprise"],
                    "sad": song["emotion_Sad"],
                    "sentiment": song["sentiment_category"],
                    "views": song["views"],
                    "artist": song["artist"],
                    "artist_id": song["artist_id"]
                } for song in songs
            ]
        }

        response = jsonify(response_body)
        return response


    @app.route("/songs/song/like/<songid>", methods=['GET'])
    def like_song(songid):
        with driver.session() as session:
            def session_like_song(tx, songid):
                print(songid)
                return tx.run(
                    """
                        MATCH (s:Song {id: toInteger($songid)})
                        SET s.likes = s.likes + 1;
                    """,
                    songid=songid
                )
            
            session.execute_write(session_like_song, songid=songid)

            session.close()
        
        return {"message": "success"}


    @app.route("/songs/song/unlike/<songid>", methods=['POST'])
    def unlike_song(songid):
        with driver.session() as session:
            def session_unlike_song(tx, songid):
                return tx.run(
                    """
                        MATCH (s:Song {id: toInteger($songid)})
                        SET s.likes = s.likes - 1;
                    """,
                    songid=songid
                )
            
            session.execute_write(session_unlike_song, songid=songid)

            session.close()
        
        return {"message": "success"}


    @app.route('/songs/song/<songid>', methods=['GET'])
    def get_song_by_id(songid):
        with driver.session() as session:
            def session_get_song_by_id(tx, songid):
                result = tx.run(
                    """
                        MATCH (s:Song {id: toInteger($songid)})
                        RETURN s;
                    """,
                    songid=songid
                )

                return [ record["s"] for record in result ]
            
            songs = session.execute_read(session_get_song_by_id, songid=songid)

            session.close()

        response_body = {
            "songs": [
                {
                    "id": song["id"],
                    "title": song["title"],
                    "likes": song["likes"],
                    "loves": song["loves"],
                    "hates": song["hates"],
                    "compound": song["sentiment_compound"],
                    "angry": song["emotion_Angry"],
                    "happy": song["emotion_Happy"],
                    "surprise": song["emotion_Surprise"],
                    "sad": song["emotion_Sad"],
                    "sentiment": song["sentiment_category"],
                    "views": song["views"],
                    "artist": song["artist"],
                    "artist_id": song["artist_id"]
                } for song in songs
            ]
        }

        response = jsonify(response_body)
        return response


    @app.route('/songs/song/similar/<songid>', methods=['GET'])
    def get_similar_song_by_id(songid):
        songs = []
        with driver.session() as session:
            def session_get_similar_song_by_id_point_one(tx, songid):
                result = tx.run(
                    """
                        MATCH (s:Song {id: toInteger($songid)})<-[:CLASSIFICATION]-(c:Cluster)
                        MATCH (c)-[:CLASSIFICATION]->(d:Song)<-[:SANG]-(a:Artist)
                        RETURN a, d ORDER BY RAND() LIMIT 15;
                    """,
                    songid=songid
                )

                d = [ record["d"] for record in result ]

                return d
            
            req1 = session.execute_read(session_get_similar_song_by_id_point_one, songid=songid)
            songs = songs + req1

        
            def session_get_similar_song_by_id_point_two(tx, songid):
                result = tx.run(
                    """
                        MATCH (s:Song {id: toInteger($songid)})<-[:SANG]-(a:Artist)-[:SANG]->(d:Song)
                        RETURN d ORDER BY RAND() LIMIT 15;
                    """,
                    songid=songid
                )

                d = [ record["d"] for record in result ]

                return d
            
            req2 = session.execute_read(session_get_similar_song_by_id_point_two, songid=songid)
            songs = songs + req2

        
            def session_get_similar_song_by_id_point_four(tx, songid):
                result = tx.run(
                    """
                        MATCH (s:Song {id: toInteger($songid)})-[:TAGGED]-(t:Tag)
                        MATCH (s)-[:RELEASED_IN]-(y:Year)
                        MATCH (s)-[:DECADE]-(d:Decade)
                        WITH s, t, y, d
                        MATCH (d)-[r1]-(n:Song)-[r2]-(t)
                        MATCH (n)--(y)
                        RETURN n ORDER BY RAND() LIMIT 5;
                    """,
                    songid=songid
                )

                n = [ record["n"] for record in result ]

                return n
            
            req4 = session.execute_read(session_get_similar_song_by_id_point_four, songid=songid)
            songs = songs + req4

            session.close()

        response_body = {
            "songs": [
                {
                    "id": song["id"],
                    "title": song["title"],
                    "likes": song["likes"],
                    "loves": song["loves"],
                    "hates": song["hates"],
                    "compound": song["sentiment_compound"],
                    "angry": song["emotion_Angry"],
                    "happy": song["emotion_Happy"],
                    "surprise": song["emotion_Surprise"],
                    "sad": song["emotion_Sad"],
                    "sentiment": song["sentiment_category"],
                    "views": song["views"],
                    "artist": song["artist"],
                    "artist_id": song["artist_id"]
                } for song in songs
            ]
        }

        response = jsonify(response_body)
        return response


    @app.route("/user/<userid>", methods=['GET'])
    def get_favourite_songs_by_user(userid):
        with driver.session() as session:
            def session_get_favourite_songs_by_user(tx, userid):
                result = tx.run(
                    """
                        MATCH (u:User {id: toInteger($userid)})
                        MATCH (u)-[:LOVED]->(s:Song)
                        RETURN s;
                    """,
                    userid=userid
                )

                return [ record["s"] for record in result ]
            
            songs = session.execute_read(session_get_favourite_songs_by_user, userid=userid)
            print(songs)
            session.close()

        response_body = {
            "songs": [ { "id": song["id"], "name": song["title"] } for song in songs ]
        }

        print(response_body)

        response = jsonify(response_body)
        return response


    @app.route("/user/<userid>/song/<songid>", methods=['POST'])
    def add_song_to_favourite(userid, songid):
        with driver.session() as session:
            def session_add_song_to_favourite(tx, userid, songid):
                return tx.run(
                    """
                        MATCH (u:User {id: toInteger($userid)})
                        MATCH (s:Song {id: toInteger($songid)})
                        MERGE (u)-[:LOVED]->(s);
                    """,
                    userid=userid,
                    songid=songid
                )
            
            session.execute_write(session_add_song_to_favourite, userid=userid, songid=songid)

            session.close()
        
        return {"message": "success"}


    @app.route("/user/<userid>/song/<songid>", methods=['DELETE'])
    def remove_song_from_favourite(userid, songid):
        with driver.session() as session:
            def session_remove_song_from_favourite(tx, userid, songid):
                return tx.run(
                    """
                        MATCH (u:User {id: toInteger($userid)})
                        MATCH (s:Song {id: toInteger($songid)})
                        MATCH (u)-[r:LOVED]->(s)
                        DELETE r;
                    """,
                    userid=userid,
                    songid=songid
                )
            
            session.execute_write(session_remove_song_from_favourite, userid=userid, songid=songid)

            session.close()
        
        return {"message": "success"}


    @app.route("/songs/artist", methods=['GET'])
    def get_artists():
        with driver.session() as session:
            def session_get_artists(tx):
                result = tx.run(
                    """
                        MATCH (a:Artist) RETURN a LIMIT 25;
                    """
                )

                return [ record["a"] for record in result ]
            
            artists = session.execute_read(session_get_artists)

            session.close()
        
        response_body = {
            "artists": [
                {
                    "id": artist["id"],
                    "name": artist["name"]
                }
                for artist in artists
            ]
        }

        response = jsonify(response_body)
        return response


    @app.route("/songs/artist/<artist>", methods=['GET'])
    def get_songs_by_artist(artist):
        with driver.session() as session:
            def session_get_songs_by_artist(tx, artist):
                result = tx.run(
                    """
                        MATCH (s:Song)<-[:SANG]-(:Artist {id: toInteger($id)})
                        RETURN s;
                    """,
                    id=artist
                )

                return [ record["s"] for record in result ]
            
            songs = session.execute_read(session_get_songs_by_artist, artist=artist)

            session.close()

        response_body = {
            "id": int(artist),
            "songs": [ {"id": song["id"], "title": song["title"]} for song in songs ]
        }
        
        response = jsonify(response_body)
        return response


    @app.route("/songs/tag/<tag>", methods=['GET'])
    def get_songs_by_tag(tag):
        with driver.session() as session:
            def session_get_songs_by_tag(tx, tag):
                result = tx.run(
                    """
                        MATCH (s:Song)<-[:TAGGED]-(t:Tag {title: $tag})
                        RETURN s;
                    """,
                    tag=tag
                )

                return [ record["s"] for record in result ]
            
            songs = session.execute_read(session_get_songs_by_tag, tag=tag)

            session.close()

        response_body = {
            "songs": [ {"id": song["id"], "title": song["title"]} for song in songs ]
        }
        
        response = jsonify(response_body)
        return response
    

    @app.route("/user/login/access", methods=['POST'])
    def login_user():
        json_data = request.get_json()
        login = json_data.get('email')
        password = json_data.get('password')

        with driver.session() as session:
            def session_login_user(tx, login, password):
                result = tx.run(
                    """
                    MATCH (u:User {email: $login, password: $password}) RETURN u;
                    """,
                    login=login,
                    password=password
                )

                return [record["u"] for record in result]

            auth = session.execute_read(session_login_user, login=login, password=password)

        # get user id
        with driver.session() as session:
            def session_get_user_id(tx, login):
                result = tx.run(
                    """
                    MATCH (u:User {email: $login}) RETURN u.id;
                    """,
                    login=login
                )

                return [record["u.id"] for record in result]

            user_id = session.execute_read(session_get_user_id, login=login)

        if len(auth) != 0:
            response_body = {
                "auth": 1,
                "id": user_id[0] if user_id else None
            }
        else:
            response_body = {
                "auth": 0,
                "id": None
            }

        response = jsonify(response_body)
        return response


    if __name__ == '__main__':
        app.run(debug=True)
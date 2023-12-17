from flask import Flask, jsonify, request
from neo4j import GraphDatabase

app = Flask(__name__)

driver = GraphDatabase.driver('neo4j://localhost:7687')
driver.verify_connectivity()


# PUNKT 1
@app.route("/", methods=['GET'])
def hello_world():
    response_body = {
        "message": "Hello World"
    }

    response = jsonify(response_body)
    return response


# PUNKT 2
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


# PUNKT 5
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


# PUNKT 6
@app.route("/artist/<artist>", methods=['GET'])
def get_songs_by_artist(artist):
    with driver.session() as session:
        def session_get_songs_by_artist(tx, artist):
            result = tx.run(
                """
                    MATCH (s:Song)<-[:SANG]-(:Artist {name: $artist})
                    RETURN s;
                """,
                artist=artist
            )

            return [ record["s"] for record in result ]
        
        songs = session.execute_read(session_get_songs_by_artist, artist=artist)

        session.close()

    response_body = {
        "songs": [ {"id": song["id"], "title": song["title"]} for song in songs ]
    }
    
    response = jsonify(response_body)
    return response



# PUNKT 7
@app.route("/tag/<tag>", methods=['GET'])
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


if __name__ == '__main__':
    app.run(debug=True)
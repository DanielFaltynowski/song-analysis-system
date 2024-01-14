from neo4j import GraphDatabase
from dotenv import load_dotenv
import os

load_dotenv()
uri = os.getenv("NEO4J_URI")
user = os.getenv("NEO4J_USERNAME")
password = os.getenv("NEO4J_PASSWORD")

with GraphDatabase.driver(uri, auth=(user, password)) as driver:
    driver.verify_connectivity()

    with driver.session() as session:
        def create_database_import_csv(tx):
            return tx.run(
                """
                    LOAD CSV WITH HEADERS
                    FROM 'https://drive.google.com/uc?export=download&id=1sA9UGeJIhNT5Tm7wnUjTY5OEVWBHf7eF' AS row
                    WITH row WHERE toInteger(row.id) IS NOT NULL
                    MERGE (s:Song {id: toInteger(row.id)})
                    SET
                    s.title = row.title,
                    s.tag = row.tag,
                    s.artist = row.artist,
                    s.year = toInteger(row.year),
                    s.views = toInteger(row.views),
                    s.features = CASE WHEN row.features IS NOT NULL THEN split(row.features, '|') ELSE NULL END,
                    s.decade = row.decade,
                    s.sentiment_category = row.sentiment_category,
                    s.sentiment_neg = toFloat(row.sentiment_neg),
                    s.sentiment_neu = toFloat(row.sentiment_neu),
                    s.sentiment_pos = toFloat(row.sentiment_pos),
                    s.sentiment_compound = toFloat(row.sentiment_compound),
                    s.cluster = toInteger(row.cluster),
                    s.emotion_Happy = toFloat(row.emotion_Happy),
                    s.emotion_Angry = toFloat(row.emotion_Angry),
                    s.emotion_Surprise = toFloat(row.emotion_Surprise),
                    s.emotion_Sad = toFloat(row.emotion_Sad),
                    s.emotion_Fear = toFloat(row.emotion_Fear),
                    s.likes = 0,
                    s.loves = 0,
                    s.hates = 0;
                """
            )
        session.execute_write(create_database_import_csv)

        session.close()


    with driver.session() as session:
        def refactor_cluster(tx):
            return tx.run(
                """
                    MATCH (s:Song)
                    UNWIND s.cluster AS cluster
                    WITH cluster, collect(s) AS songs
                    MERGE (c:Cluster {class: toInteger(cluster)})
                    WITH c, songs
                    UNWIND songs AS s
                    WITH s, c
                    MERGE (c)-[:CLASSIFICATION]->(s);
                """
            )
        
        def delete_cluster_information_from_songs(tx):
            return tx.run(
                """
                    MATCH (s:Song)
                    SET s.cluster = null;
                """
            )
        
        session.execute_write(refactor_cluster)
        session.execute_write(delete_cluster_information_from_songs)

        session.close()


    with driver.session() as session:
        def refactor_artist(tx):
            return tx.run(
                """
                    MATCH (s:Song)
                    UNWIND s.artist AS artist
                    WITH artist, collect(s) AS songs
                    MERGE (a:Artist {name: artist})
                    WITH a, songs
                    UNWIND songs AS s
                    WITH s, a
                    MERGE (a)-[:SANG]->(s)
                """
            )
        
        
        session.execute_write(refactor_artist)

        session.close()


    with driver.session() as session:
        def refactor_decade(tx):
            return tx.run(
                """
                    MATCH (s:Song)
                    UNWIND s.decade AS decade
                    WITH decade, collect(s) AS songs
                    MERGE (d:Decade {title: decade})
                    WITH d, songs
                    UNWIND songs AS s
                    WITH s, d
                    MERGE (d)-[:DECADE]->(s)
                """
            )
        
        def delete_decade_information_from_songs(tx):
            return tx.run(
                """
                    MATCH (s:Song)
                    SET s.decade = null;
                """
            )
        
        session.execute_write(refactor_decade)
        session.execute_write(delete_decade_information_from_songs)

        session.close()


    with driver.session() as session:
        def refactor_tag(tx):
            return tx.run(
                """
                    MATCH (s:Song)
                    UNWIND s.tag AS tag
                    WITH tag, collect(s) AS songs
                    MERGE (t:Tag {title: tag})
                    WITH t, songs
                    UNWIND songs AS s
                    WITH s, t
                    MERGE (t)-[:TAGGED]->(s)
                """
            )
        
        def delete_tag_information_from_songs(tx):
            return tx.run(
                """
                    MATCH (s:Song)
                    SET s.tag = null;
                """
            )
        
        session.execute_write(refactor_tag)
        session.execute_write(delete_tag_information_from_songs)

        session.close()


    with driver.session() as session:
        def refactor_year(tx):
            return tx.run(
                """
                    MATCH (s:Song)
                    UNWIND s.year AS year
                    WITH year, collect(s) AS songs
                    MERGE (y:Year {date: year})
                    WITH y, songs
                    UNWIND songs AS s
                    WITH s, y
                    MERGE (y)-[:RELEASED_IN]->(s)
                """
            )
        
        def delete_year_information_from_songs(tx):
            return tx.run(
                """
                    MATCH (s:Song)
                    SET s.year = null;
                """
            )
        
        session.execute_write(refactor_year)
        session.execute_write(delete_year_information_from_songs)

        session.close()


    with driver.session() as session:
        def create_users(tx):
            return tx.run(
                """
                    MERGE (u:User {id: ID(u), email:"kasia13@gmail.com", password:"qwerty"})
                    MERGE (v:User {id: ID(v), email:"konrad.wojt@gmail.com", password:"qwerty"})
                    MERGE (r:User {id: ID(r), email:"neofrommatrix@gmail.com", password:"qwerty"});
                """
            )
        
        def create_loved_relation_1(tx):
            return tx.run(
                """
                    MATCH (u:User {email: "kasia13@gmail.com"})
                    MATCH (a:Artist {name: "Eagles"})
                    MATCH (a)-[:SANG]->(s:Song)
                    MERGE (u)-[r:LOVED]->(s);
                """
            )
        def create_loved_relation_2(tx):
            return tx.run(
                """
                    MATCH (u:User {email: "konrad.wojt@gmail.com"})
                    MATCH (a:Artist {name: "Dolly Parton"})
                    MATCH (a)-[:SANG]->(s:Song)
                    MERGE (u)-[r:LOVED]->(s);
                """
            )
        def create_loved_relation_3(tx):
            return tx.run(
                """
                    MATCH (u:User {email: "neofrommatrix@gmail.com"})
                    MATCH (a:Artist {name: "Jimmy Buffett"})
                    MATCH (a)-[:SANG]->(s:Song)
                    MERGE (u)-[r:LOVED]->(s);
                """
            )
        
        session.execute_write(create_users)
        session.execute_write(create_loved_relation_1)
        session.execute_write(create_loved_relation_2)
        session.execute_write(create_loved_relation_3)


    with driver.session() as session:
        def set_id_everywhere(tx):
            return tx.run(
                """
                    MATCH (n) SET n.id = ID(n);
                """
            )
        
        session.execute_write(set_id_everywhere)